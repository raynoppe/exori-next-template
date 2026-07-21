import {
  createCatalogItemAction,
  updateCatalogItemAction,
} from "@/app/admin/catalog/actions";
import { CatalogAdminNav } from "@/components/admin/catalog-admin-nav";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CatalogItem } from "@/lib/generated/prisma/client";

async function saveCatalogItem(formData: FormData) {
  "use server";
  const id = formData.get("id");
  if (typeof id === "string" && id) {
    await updateCatalogItemAction(id, formData);
    return;
  }
  await createCatalogItemAction(formData);
}

export function CatalogItemForm({ item }: { item?: CatalogItem | null }) {
  return (
    <form action={saveCatalogItem} className="max-w-2xl space-y-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            name="type"
            defaultValue={item?.type ?? "BLOCK"}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            <option value="BLOCK">Block</option>
            <option value="PAGE_LAYOUT">Page layout</option>
            <option value="NAVIGATION">Navigation</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={item?.status ?? "PUBLISHED"}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={item?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={item?.slug}
            pattern="[a-z0-9-]+"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description ?? ""}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="family">Family</Label>
          <Input id="family" name="family" defaultValue={item?.family ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="componentId">Component ID</Label>
          <Input
            id="componentId"
            name="componentId"
            defaultValue={item?.componentId ?? ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="previewUrl">Preview URL</Label>
        <Input
          id="previewUrl"
          name="previewUrl"
          defaultValue={item?.previewUrl ?? ""}
          placeholder="/blocks/hero-split"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={item?.tags.join(", ") ?? ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sortOrder">Sort order</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={item?.sortOrder ?? 0}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="screenshot">Screenshot upload</Label>
        <Input id="screenshot" name="screenshot" type="file" accept="image/*" />
        {item?.screenshotUrl ? (
          <p className="text-sm text-muted-foreground">
            Current: {item.screenshotUrl}
          </p>
        ) : null}
      </div>

      <div className="flex gap-3">
        <Button type="submit">Save</Button>
        <ButtonLink href="/admin" variant="outline">
          Cancel
        </ButtonLink>
      </div>
    </form>
  );
}

export function CatalogFormPage({
  title,
  item,
}: {
  title: string;
  item?: CatalogItem | null;
}) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <CatalogAdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        </div>
        <CatalogItemForm item={item} />
      </div>
    </div>
  );
}
