import { signOut } from "@/auth";
import { Button, ButtonLink } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const catalogAdminLinks = [
  { href: "/admin", label: "Catalog overview" },
  { href: "/admin/catalog/new", label: "Add item" },
  { href: "/blocks", label: "Public blocks" },
  { href: "/layouts", label: "Public layouts" },
  { href: "/navigation", label: "Public navigation" },
];

export function CatalogAdminNav() {
  return (
    <aside className="w-full border-b bg-muted/20 lg:w-56 lg:border-r lg:border-b-0">
      <div className="flex h-full flex-col gap-4 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nimbus catalog
          </p>
          <p className="text-sm font-semibold">Admin</p>
        </div>
        <nav className="flex flex-row gap-2 lg:flex-col">
          {catalogAdminLinks.map((link) => (
            <ButtonLink
              key={link.href}
              variant="ghost"
              className="justify-start"
              href={link.href}
            >
              {link.label}
            </ButtonLink>
          ))}
        </nav>
        <Separator className="hidden lg:block" />
        <form
          className="hidden lg:block"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button type="submit" variant="outline" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
    </aside>
  );
}
