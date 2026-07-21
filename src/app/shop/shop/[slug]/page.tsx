import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/blocks/commerce/product-detail";
import { getProductBySlug } from "@/lib/commerce/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <ProductDetail
      productId={product.id}
      name={product.name}
      description={product.description}
      longDescription={product.longDescription}
      priceCents={product.priceCents}
      currency={product.currency}
      stock={product.stock}
      categoryName={product.category?.name}
    />
  );
}
