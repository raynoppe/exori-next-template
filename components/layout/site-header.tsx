import Link from "next/link";

import { auth } from "@/auth";
import { ButtonLink } from "@/components/ui/button";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/content", label: "Content" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Exori
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {user.role === "ADMIN" ? (
                <ButtonLink variant="ghost" href="/admin">
                  Admin
                </ButtonLink>
              ) : null}
              <ButtonLink variant="outline" href="/dashboard">
                Dashboard
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink variant="ghost" href="/login">
                Log in
              </ButtonLink>
              <ButtonLink href="/register">Register</ButtonLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
