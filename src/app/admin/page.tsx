import { CatalogAdminNav } from "@/components/admin/catalog-admin-nav";
import { CatalogManagement } from "@/components/admin/catalog-management";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllCatalogItemsAdmin } from "@/lib/catalog/queries";
import { getUnmappedRegistrySlugs } from "@/lib/catalog/sync";

export default async function CatalogAdminPage() {
  const session = await auth();
  const items = await getAllCatalogItemsAdmin();
  const unmapped = getUnmappedRegistrySlugs(items).map(({ type, slug, entry }) => ({
    type,
    slug,
    label: entry.label,
  }));

  const blockCount = items.filter((item) => item.type === "BLOCK").length;
  const layoutCount = items.filter((item) => item.type === "PAGE_LAYOUT").length;
  const navCount = items.filter((item) => item.type === "NAVIGATION").length;

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <CatalogAdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Catalog overview
          </h1>
          <p className="text-muted-foreground">
            Signed in as {session?.user.email}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Blocks</CardTitle>
              <CardDescription>Mapped block previews</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{blockCount}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Layouts</CardTitle>
              <CardDescription>Page layout blueprints</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{layoutCount}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Navigation style variants</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{navCount}</CardContent>
          </Card>
        </div>

        <CatalogManagement items={items} unmapped={unmapped} />
      </div>
    </div>
  );
}
