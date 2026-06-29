import { redirect } from "next/navigation";

import {
  createProductAction,
  updateProductAction,
} from "@/app/admin/commerce/actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { listCategories } from "@/lib/commerce/products";
import { prisma } from "@/lib/prisma";

async function saveProduct(formData: FormData) {
  "use server";
  const id = formData.get("id");
  if (typeof id === "string" && id) {
    await updateProductAction(id, formData);
    redirect("/admin/products");
  }
  await createProductAction(formData);
  redirect("/admin/products");
}

export default async function AdminProductFormPage({
  params,
}: {
  params?: Promise<{ id?: string }>;
}) {
  const resolvedParams = params ? await params : {};
  const productId = resolvedParams.id;
  const [product, categories] = await Promise.all([
    productId
      ? prisma.product.findUnique({ where: { id: productId } })
      : null,
    listCategories(),
  ]);

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold">
            {product ? "Edit product" : "New product"}
          </h1>
        </div>
        <form action={saveProduct} className="max-w-xl space-y-4">
          {product ? <input type="hidden" name="id" value={product.id} /> : null}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={product?.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={product?.slug} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longDescription">Long description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              defaultValue={product?.longDescription ?? ""}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="priceCents">Price (cents)</Label>
              <Input
                id="priceCents"
                name="priceCents"
                type="number"
                defaultValue={product?.priceCents ?? 0}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                defaultValue={product?.stock ?? 0}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product?.categoryId ?? ""}
              className="flex h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
            >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              defaultValue={product?.status ?? "DRAFT"}
              className="flex h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
            />
            Featured
          </label>
          <input type="hidden" name="currency" value={product?.currency ?? "usd"} />
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <ButtonLink variant="outline" href="/admin/products">
              Cancel
            </ButtonLink>
          </div>
        </form>
      </div>
    </div>
  );
}
