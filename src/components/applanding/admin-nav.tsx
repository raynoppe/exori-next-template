"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { Button, ButtonLink } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const hiddenPaths = ["/applanding/admin/login"];

const links = [
  { href: "/applanding/admin", label: "Overview" },
  { href: "/applanding/admin/messages", label: "Messages" },
  { href: "/applanding/admin/tickets", label: "Tickets" },
  { href: "/applanding/admin/users", label: "Users" },
];

export function ApplandingAdminNav() {
  const pathname = usePathname();

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <aside className="w-full border-b bg-muted/20 lg:w-56 lg:border-r lg:border-b-0">
      <div className="flex h-full flex-col gap-4 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Applanding admin
          </p>
          <p className="text-sm font-semibold">Site control</p>
        </div>
        <nav className="flex flex-row gap-2 lg:flex-col">
          {links.map((link) => (
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
        <Button
          type="button"
          variant="outline"
          className="hidden w-full lg:inline-flex"
          onClick={() => signOut({ callbackUrl: "/applanding" })}
        >
          Sign out
        </Button>
      </div>
    </aside>
  );
}
