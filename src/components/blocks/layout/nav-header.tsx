import type { ReactNode } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button, ButtonLink } from "@/components/ui/button"
import { defaultBrand, defaultNavLinks } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type NavLink = { href: string; label: string }

export type NavHeaderProps = {
  brandName?: string
  links?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  /**
   * Optional commerce slot (e.g. a cart badge). Left empty for marketing-only
   * sites so the nav never imports commerce code. The shop layout passes
   * `<CartNavBadge />` here.
   */
  cartSlot?: ReactNode
  className?: string
}

export function NavHeader({
  brandName = defaultBrand.name,
  links = defaultNavLinks,
  ctaLabel = "Register",
  ctaHref = "/register",
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
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {links.map((link) => (
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

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {cartSlot}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-4" />
          </Button>
          <ButtonLink
            variant="outline"
            className="hidden sm:inline-flex"
            href="/login"
          >
            Sign in
          </ButtonLink>
          <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
        </div>
      </div>
    </header>
  )
}
