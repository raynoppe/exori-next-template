import Link from "next/link";

import {
  CatalogGrid,
  CatalogPageHeader,
} from "@/components/catalog/catalog-card";
import { getCatalogItems } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export default async function NavigationCatalogPage() {
  const items = await getCatalogItems("NAVIGATION");

  return (
    <div>
      <CatalogPageHeader
        eyebrow="Navigation"
        title="Navigation styles"
        description="Header and navigation variants customers can choose when configuring their site."
      />
      <div className="nimbus-container space-y-6 py-10">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Catalog home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span>Navigation</span>
        </div>
        <CatalogGrid
          items={items}
          hrefForItem={(item) => `/navigation/${item.slug}`}
        />
      </div>
    </div>
  );
}
