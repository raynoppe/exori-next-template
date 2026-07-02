import type { ComponentType } from "react"

import {
  BlogHighlights,
  BlogPost,
  CartSummary,
  CheckoutSummary,
  CtaBand,
  FaqAccordion,
  FeatureChecklist,
  FeatureSplit,
  HeroSplit,
  LegalContent,
  LogoCloud,
  NavHeader,
  PricingTiers,
  ProductDetail,
  ProductGrid,
  ServiceCards,
  SiteFooterPro,
  StatsBand,
  TeamGrid,
  TestimonialCards,
} from "@/components/blocks"
import { blogPosts, defaultFaqItems, privacySections } from "@/lib/content/posts"

const sampleProduct = {
  id: "sample",
  slug: "classic-tee",
  name: "Classic Tee",
  description: "Soft cotton tee for everyday comfort.",
  priceCents: 2900,
  currency: "usd",
  categoryName: "Apparel",
}

const blocks: { id: string; label: string; component: ComponentType }[] = [
  { id: "nav-header", label: "Nav Header", component: NavHeader },
  { id: "hero-split", label: "Hero Split", component: HeroSplit },
  { id: "logo-cloud", label: "Logo Cloud", component: LogoCloud },
  { id: "service-cards", label: "Service Cards", component: ServiceCards },
  { id: "testimonial-cards", label: "Testimonial Cards", component: TestimonialCards },
  { id: "feature-split", label: "Feature Split", component: FeatureSplit },
  { id: "stats-band", label: "Stats Band", component: StatsBand },
  { id: "feature-checklist", label: "Feature Checklist", component: FeatureChecklist },
  { id: "team-grid", label: "Team Grid", component: TeamGrid },
  { id: "pricing-tiers", label: "Pricing Tiers", component: PricingTiers },
  { id: "blog-highlights", label: "Blog Highlights", component: BlogHighlights },
  { id: "product-grid", label: "Product Grid", component: () => (
    <ProductGrid products={[sampleProduct]} />
  ) },
  { id: "product-detail", label: "Product Detail", component: () => (
    <ProductDetail
      productId="sample"
      name={sampleProduct.name}
      description={sampleProduct.description}
      priceCents={sampleProduct.priceCents}
      currency={sampleProduct.currency}
      stock={10}
      categoryName={sampleProduct.categoryName}
    />
  ) },
  { id: "cart-summary", label: "Cart Summary", component: () => (
    <CartSummary
      items={[{ productId: sampleProduct.id, slug: sampleProduct.slug, name: sampleProduct.name, priceCents: sampleProduct.priceCents, currency: sampleProduct.currency, quantity: 1, stock: 10 }]}
      totals={{
        subtotalCents: 2900,
        shippingCents: 599,
        taxCents: 239,
        totalCents: 3738,
        currency: "usd",
      }}
    />
  ) },
  { id: "checkout-summary", label: "Checkout Summary", component: () => (
    <CheckoutSummary
      items={[{ productId: sampleProduct.id, slug: sampleProduct.slug, name: sampleProduct.name, priceCents: sampleProduct.priceCents, currency: sampleProduct.currency, quantity: 1, stock: 10 }]}
      shippingMethods={[
        {
          id: "std",
          name: "Standard",
          description: "5–7 days",
          priceCents: 599,
        },
      ]}
      totalsByShipping={{
        std: {
          subtotalCents: 2900,
          shippingCents: 599,
          taxCents: 239,
          totalCents: 3738,
          currency: "usd",
        },
      }}
    />
  ) },
  { id: "faq-accordion", label: "FAQ Accordion", component: () => (
    <FaqAccordion items={defaultFaqItems} />
  ) },
  { id: "legal-content", label: "Legal Content", component: () => (
    <LegalContent title="Privacy Policy" sections={privacySections} />
  ) },
  { id: "blog-post", label: "Blog Post", component: () => (
    <BlogPost post={blogPosts[0]!} />
  ) },
  { id: "cta-band", label: "CTA Band", component: CtaBand },
  { id: "site-footer-pro", label: "Site Footer Pro", component: SiteFooterPro },
]

export default function BlocksGalleryPage() {
  return (
    <div className="space-y-0">
      <section className="border-b bg-muted/30 py-12">
        <div className="nimbus-container space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Block gallery
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Nimbus reusable blocks
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Marketing, ecommerce, and content blocks for Exori-generated sites.
          </p>
        </div>
      </section>

      {blocks.map(({ id, label, component: Block }) => (
        <div key={id} id={id} className="border-b last:border-b-0">
          <div className="nimbus-container py-4">
            <p className="text-xs font-mono text-muted-foreground">{id}</p>
            <p className="text-sm font-medium">{label}</p>
          </div>
          <Block />
        </div>
      ))}
    </div>
  )
}
