import { notFound } from "next/navigation";

import { CatalogFormPage } from "@/components/admin/catalog-form";
import { getCatalogItemById } from "@/lib/catalog/queries";

type EditCatalogItemPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCatalogItemPage({
  params,
}: EditCatalogItemPageProps) {
  const { id } = await params;
  const item = await getCatalogItemById(id);

  if (!item) {
    notFound();
  }

  return <CatalogFormPage title={`Edit ${item.name}`} item={item} />;
}
