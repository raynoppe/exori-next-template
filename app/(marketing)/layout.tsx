import type { Metadata } from "next"

import { NavHeader } from "@/components/blocks/layout/nav-header"
import { SiteFooterPro } from "@/components/blocks/layout/site-footer-pro"
import { cartItemCount, readCartCookie } from "@/lib/commerce/cart"

export const metadata: Metadata = {
  title: {
    template: "%s | Nimbus",
    default: "Nimbus — Modern SaaS Template",
  },
  description:
    "A modern SaaS marketing template with reusable blocks for Exori-generated websites.",
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lines = await readCartCookie()
  const count = cartItemCount(lines)

  return (
    <>
      <NavHeader cartCount={count} />
      <main className="flex-1">{children}</main>
      <SiteFooterPro />
    </>
  )
}
