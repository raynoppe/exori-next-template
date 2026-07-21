import type { Metadata } from "next"

import { ApplandingSiteFooter } from "@/app/applanding/components/site-footer"
import { SiteNavigation } from "@/components/blocks/navigation/site-navigation"
import { getNavigationConfig } from "@/lib/content/navigation"

const navigation = getNavigationConfig("applanding")

export const metadata: Metadata = {
  title: {
    template: "%s | Nimbus",
    default: "Nimbus — Modern SaaS Template",
  },
  description:
    "A modern SaaS marketing template with reusable blocks for Exori-generated websites.",
}

export default function ApplandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteNavigation config={navigation} />
      <main className="flex-1">{children}</main>
      <ApplandingSiteFooter />
    </>
  )
}
