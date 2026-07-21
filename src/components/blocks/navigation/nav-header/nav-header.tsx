import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { defaultBrand, defaultNavLinks } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

import { NavAuthButtons } from "../shared/nav-auth-buttons"
import { NavDesktopLinks } from "../shared/nav-desktop-links"
import { NavMobileMenu } from "../shared/nav-mobile-menu"
import type { BaseNavProps } from "../types"

export type NavHeaderProps = BaseNavProps

export function NavHeader({
  brandName = defaultBrand.name,
  links = defaultNavLinks,
  ctaLabel = "Register",
  ctaHref = "/register",
  showAuthButtons = true,
  defaultTheme,
  cartSlot,
  className,
}: NavHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="nimbus-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {brandName}
          </Link>
          <NavDesktopLinks links={links} className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle defaultTheme={defaultTheme} />
          {cartSlot}
          <NavMobileMenu
            links={links}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            showAuthButtons={showAuthButtons}
            menuId="nav-header-mobile-menu"
          />
          <NavAuthButtons
            show={showAuthButtons}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
          />
        </div>
      </div>
    </header>
  )
}
