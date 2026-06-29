import Link from "next/link";

import { AdminNav } from "@/components/admin/admin-nav";
import { ProductManagement } from "@/components/admin/product-management";
import { listAllProducts } from "@/lib/commerce/products";

export default async function AdminProductsPage() {
  const products = await listAllProducts();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage catalog items and inventory.</p>
        </div>
        <ProductManagement
          products={products.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            priceCents: p.priceCents,
            currency: p.currency,
            stock: p.stock,
            status: p.status,
            categoryName: p.category?.name ?? null,
          }))}
        />
      </div>
    </div>
  );
}
