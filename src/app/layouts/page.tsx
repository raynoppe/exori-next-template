import Link from "next/link";

import {
  CatalogGrid,
  CatalogPageHeader,
} from "@/components/catalog/catalog-card";
import { getCatalogItems } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export default async function LayoutsCatalogPage() {
  const items = await getCatalogItems("PAGE_LAYOUT");

  return (
    <div>
      <CatalogPageHeader
        eyebrow="Page layouts"
        title="Landing pages and blueprints"
        description="Full page compositions with ordered block stacks. Open a layout to see its blocks or jump to the live tier route."
      />
      <div className="nimbus-container space-y-6 py-10">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Catalog home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span>Layouts</span>
        </div>
        <CatalogGrid
          items={items}
          hrefForItem={(item) => `/layouts/${item.slug}`}
        />
      </div>
    </div>
  );
}
