import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { defaultBrand, defaultNavLinks } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

import { NavAuthButtons } from "../shared/nav-auth-buttons"
import { NavDesktopLinks } from "../shared/nav-desktop-links"
import { NavMobileMenu } from "../shared/nav-mobile-menu"
import type { BaseNavProps } from "../types"

export type NavCenteredProps = BaseNavProps

export function NavCentered({
  brandName = defaultBrand.name,
  links = defaultNavLinks,
  ctaLabel = "Register",
  ctaHref = "/register",
  showAuthButtons = true,
  defaultTheme,
  cartSlot,
  className,
}: NavCenteredProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="nimbus-container py-3 md:py-4">
        <div className="flex h-14 items-center justify-between md:h-auto md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
          <div className="hidden md:block" aria-hidden />

          <Link
            href="/"
            className="text-lg font-semibold tracking-tight md:text-center"
          >
            {brandName}
          </Link>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <ThemeToggle defaultTheme={defaultTheme} />
            {cartSlot}
            <NavMobileMenu
              links={links}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              showAuthButtons={showAuthButtons}
              menuId="nav-centered-mobile-menu"
              panelTopClass="top-20 md:top-28"
            />
            <NavAuthButtons
              show={showAuthButtons}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
            />
          </div>
        </div>

        <NavDesktopLinks
          links={links}
          className="mt-3 hidden justify-center border-t border-border/60 pt-3 md:flex"
        />
      </div>
    </header>
  )
}
