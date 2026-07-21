import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CatalogItem } from "@/lib/generated/prisma/client";

type CatalogCardProps = {
  item: CatalogItem;
  href: string;
};

export function CatalogCard({ item, href }: CatalogCardProps) {
  const previewHref = item.previewUrl ?? href;

  return (
    <Card className="overflow-hidden">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] bg-muted">
          {item.screenshotUrl ? (
            <Image
              src={item.screenshotUrl}
              alt={item.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No screenshot yet
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {item.family ? <Badge variant="secondary">{item.family}</Badge> : null}
          <Badge variant="outline">{item.status}</Badge>
        </div>
        <CardTitle className="text-lg">
          <Link href={href} className="hover:underline">
            {item.name}
          </Link>
        </CardTitle>
        {item.description ? (
          <CardDescription>{item.description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
        {previewHref ? (
          <Link
            href={previewHref}
            className="text-sm text-primary hover:underline"
          >
            Preview
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function CatalogGrid({
  items,
  hrefForItem,
}: {
  items: CatalogItem[];
  hrefForItem: (item: CatalogItem) => string;
}) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground">
        No catalog items published yet. Sign in as admin to sync from the registry.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <CatalogCard key={item.id} item={item} href={hrefForItem(item)} />
      ))}
    </div>
  );
}

export function CatalogPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b bg-muted/30 py-12">
      <div className="nimbus-container space-y-3">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
