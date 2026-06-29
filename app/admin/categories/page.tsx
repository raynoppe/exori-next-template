import { AdminNav } from "@/components/admin/admin-nav";
import { CategoryManagement } from "@/components/admin/category-management";
import { listCategories } from "@/lib/commerce/products";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize products into categories.</p>
        </div>
        <CategoryManagement
          categories={categories.map((c) => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            productCount: c._count.products,
          }))}
        />
      </div>
    </div>
  );
}
