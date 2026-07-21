"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { NavLink } from "../types";
import { hasNavChildren, navLinkKey } from "./nav-utils";

type NavDesktopLinksProps = {
  links: NavLink[];
  className?: string;
  itemClassName?: string;
};

export function NavDesktopLinks({
  links,
  className,
  itemClassName,
}: NavDesktopLinksProps) {
  return (
    <nav className={cn("flex items-center gap-6 text-sm text-muted-foreground", className)}>
      {links.map((link) => (
        <NavDesktopLink key={navLinkKey(link)} link={link} className={itemClassName} />
      ))}
    </nav>
  );
}

function NavDesktopLink({
  link,
  className,
}: {
  link: NavLink;
  className?: string;
}) {
  if (hasNavChildren(link)) {
    return (
      <div className={cn("group relative", className)}>
        <span className="inline-flex items-center gap-1 transition-colors group-hover:text-foreground">
          {link.href ? (
            <Link href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ) : (
            <span>{link.label}</span>
          )}
          <ChevronDown className="size-3.5 opacity-70" aria-hidden />
        </span>

        <div className="invisible absolute left-0 top-full z-50 mt-2 min-w-44 rounded-lg border border-border/60 bg-background py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={link.href ?? "/"}
      className={cn("transition-colors hover:text-foreground", className)}
    >
      {link.label}
    </Link>
  );
}
