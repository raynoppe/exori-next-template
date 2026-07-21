import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCatalogItemBySlug } from "@/lib/catalog/queries";
import { getPageLayout } from "@/lib/catalog/registry";

export const dynamic = "force-dynamic";

type LayoutDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LayoutDetailPage({ params }: LayoutDetailPageProps) {
  const { slug } = await params;
  const [item, layout] = await Promise.all([
    getCatalogItemBySlug("PAGE_LAYOUT", slug),
    Promise.resolve(getPageLayout(slug)),
  ]);

  if (!layout) {
    notFound();
  }

  return (
    <div>
      <section className="border-b bg-muted/30 py-12">
        <div className="nimbus-container space-y-4">
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Catalog home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/layouts" className="text-muted-foreground hover:text-foreground">
              Layouts
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>{layout.label}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {item?.name ?? layout.label}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {item?.description ?? layout.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={layout.liveRoute}>Open live page</ButtonLink>
            {item?.previewUrl ? (
              <ButtonLink href={item.previewUrl} variant="outline">
                Preview URL
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </section>

      <div className="nimbus-container grid gap-8 py-10 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Block stack</CardTitle>
            <CardDescription>
              Ordered blocks that compose this page layout.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {layout.orderedBlocks.map((blockId, index) => (
                <li key={blockId} className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Link href={`/blocks/${blockId}`} className="hover:underline">
                    {blockId}
                  </Link>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Live route</p>
              <p className="font-mono">{layout.liveRoute}</p>
            </div>
            {item?.tags.length ? (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
