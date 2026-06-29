import { signOut } from "@/auth";
import { Button, ButtonLink } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/shipping", label: "Shipping" },
  { href: "/admin/taxes", label: "Taxes" },
];

export function AdminNav() {
  return (
    <aside className="w-full border-b bg-muted/20 lg:w-56 lg:border-r lg:border-b-0">
      <div className="flex h-full flex-col gap-4 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Admin
          </p>
          <p className="text-sm font-semibold">Control panel</p>
        </div>
        <nav className="flex flex-row gap-2 lg:flex-col">
          {adminLinks.map((link) => (
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
