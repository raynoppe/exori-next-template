import type { Metadata } from "next"

import { NavHeader } from "@/components/blocks"
import { SiteFooterPro } from "@/components/blocks/layout/site-footer-pro"

export const metadata: Metadata = {
  title: {
    template: "%s | Nimbus",
    default: "Nimbus — Modern SaaS Template",
  },
  description:
    "A modern SaaS marketing template with reusable blocks for Exori-generated websites.",
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavHeader />
      <main className="flex-1">{children}</main>
      <SiteFooterPro />
    </>
  )
}
