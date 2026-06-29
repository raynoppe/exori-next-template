import AdminProductFormPage from "../product-form";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <AdminProductFormPage params={params} />;
}
