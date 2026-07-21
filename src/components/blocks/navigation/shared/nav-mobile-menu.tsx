"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { NavLink } from "../types";
import { NavMobileLinkList } from "./nav-mobile-link-list";

type NavMobileMenuProps = {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  showAuthButtons?: boolean;
  menuId?: string;
  panelTopClass?: string;
};

export function NavMobileMenu({
  links,
  ctaLabel,
  ctaHref,
  showAuthButtons = true,
  menuId = "nav-mobile-menu",
  panelTopClass = "top-16",
}: NavMobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden",
          panelTopClass,
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <nav
        id={menuId}
        className={cn(
          "fixed inset-x-0 z-50 border-b border-border/60 bg-background shadow-lg transition-all md:hidden",
          panelTopClass,
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0",
        )}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="nimbus-container py-4">
          <NavMobileLinkList links={links} onNavigate={() => setOpen(false)} />

          <div
            className={cn(
              "mt-4 flex flex-col gap-2 border-t border-border/60 pt-4",
              !showAuthButtons && "hidden",
            )}
          >
            <ButtonLink
              variant="outline"
              href="/login"
              className="w-full sm:hidden"
              onClick={() => setOpen(false)}
            >
              Sign in
            </ButtonLink>
            <ButtonLink
              href={ctaHref}
              className="w-full sm:hidden"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </nav>
    </>
  );
}
