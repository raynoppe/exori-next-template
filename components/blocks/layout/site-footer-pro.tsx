import Link from "next/link"
import { Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { defaultBrand, defaultFooterColumns } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type FooterColumn = {
  title: string
  links: { href: string; label: string }[]
}

export type SiteFooterProProps = {
  brandName?: string
  phone?: string
  email?: string
  newsletterHeadline?: string
  newsletterSubhead?: string
  columns?: FooterColumn[]
  copyright?: string
  className?: string
}

export function SiteFooterPro({
  brandName = defaultBrand.name,
  phone = "+98 (7765) 3422",
  email = "chat@nimbus.app",
  newsletterHeadline = "Our newsletter delivers fresh updates to your inbox",
  newsletterSubhead = "A weekly digest of latest news, articles and resources",
  columns = defaultFooterColumns,
  copyright = `${defaultBrand.name} © 2026 — All Rights Reserved`,
  className,
}: SiteFooterProProps) {
  return (
    <footer className={cn("mt-auto border-t bg-muted/30", className)}>
      <div className="nimbus-container space-y-12 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-6">
            <Link href="/" className="text-xl font-semibold">
              {brandName}
            </Link>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="size-4" />
                {phone}
              </p>
              <p className="text-xs">Speak with our team</p>
              <p className="flex items-center gap-2">
                <Mail className="size-4" />
                {email}
              </p>
              <p className="text-xs">Chat with our team</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium">{newsletterHeadline}</p>
              <p className="text-sm text-muted-foreground">{newsletterSubhead}</p>
            </div>
            <form className="flex gap-2" action="#">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-sm"
                aria-label="Email for newsletter"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-sm font-semibold">{column.title}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  )
}
