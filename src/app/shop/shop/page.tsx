import { ProductGrid } from "@/components/blocks/commerce/product-grid";
import { listActiveProducts, listCategories } from "@/lib/commerce/products";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    listActiveProducts({ categorySlug: category }),
    listCategories(),
  ]);

  return (
    <ProductGrid
      products={products.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceCents: p.priceCents,
        currency: p.currency,
        categoryName: p.category?.name,
      }))}
      categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
      activeCategory={category}
    />
  );
}
