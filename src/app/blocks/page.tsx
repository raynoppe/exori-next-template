import Link from "next/link";

import {
  CatalogGrid,
  CatalogPageHeader,
} from "@/components/catalog/catalog-card";
import { ButtonLink } from "@/components/ui/button";
import { getCatalogItems } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export default async function BlocksCatalogPage() {
  const items = await getCatalogItems("BLOCK");

  return (
    <div>
      <CatalogPageHeader
        eyebrow="Blocks"
        title="Nimbus reusable blocks"
        description="Marketing, ecommerce, content, and directory blocks. Each block has a bare preview page for screenshots and in-app selection."
      />
      <div className="nimbus-container space-y-6 py-10">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Catalog home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span>Blocks</span>
        </div>
        <CatalogGrid
          items={items}
          hrefForItem={(item) => `/blocks/${item.slug}`}
        />
        <ButtonLink href="/gallery/blocks" variant="outline">
          View scroll gallery
        </ButtonLink>
      </div>
    </div>
  );
}
