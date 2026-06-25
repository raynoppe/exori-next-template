import Link from "next/link";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Manage users" },
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
            <Button
              key={link.href}
              variant="ghost"
              className="justify-start"
              render={<Link href={link.href} />}
            >
              {link.label}
            </Button>
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
