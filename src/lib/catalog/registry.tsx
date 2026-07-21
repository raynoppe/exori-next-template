import type { ComponentType } from "react";

import {
  BlogHighlights,
  BlogPost,
  CartSummary,
  CheckoutSummary,
  CtaBand,
  DirectoryGrid,
  FaqAccordion,
  FeatureChecklist,
  FeatureHub,
  FeatureSplit,
  HeroSplit,
  LegalContent,
  LogoCloud,
  NavHeader,
  NavCentered,
  PricingTiers,
  ProductDetail,
  ProductGrid,
  ProfileHeader,
  ServiceCards,
  SiteFooterPro,
  StatsBand,
  SupportSteps,
  TeamGrid,
  TestimonialCards,
  TokenCosts,
} from "@/components/blocks";
import { featureHubItems } from "@/lib/content/applanding/content";
import { blogPosts, defaultFaqItems, privacySections } from "@/lib/content/posts";

import {
  blockMeta,
  navigationMeta,
  pageLayoutMeta,
  type BlockMeta,
  type NavigationMeta,
  type PageLayoutMeta,
} from "./registry-meta";

export type BlockRegistryEntry = BlockMeta & {
  component: ComponentType;
};

export type NavigationRegistryEntry = NavigationMeta & {
  component: ComponentType;
};

export type PageLayoutRegistryEntry = PageLayoutMeta;

const sampleProduct = {
  id: "sample",
  slug: "classic-tee",
  name: "Classic Tee",
  description: "Soft cotton tee for everyday comfort.",
  priceCents: 2900,
  currency: "usd",
  categoryName: "Apparel",
};

const sampleDirectoryEntry = {
  slug: "alex-rivera",
  name: "Alex Rivera",
  summary: "Sample directory profile for preview.",
  meta: "Member since 2024",
  tags: ["Design", "Remote"],
};

export const blockRegistry: Record<string, BlockRegistryEntry> = {
  ...Object.fromEntries(
    Object.entries(blockMeta).map(([slug, meta]) => {
      const components: Record<string, ComponentType> = {
        "nav-header": NavHeader,
        "hero-split": HeroSplit,
        "logo-cloud": LogoCloud,
        "service-cards": ServiceCards,
        "testimonial-cards": TestimonialCards,
        "feature-split": () => <FeatureSplit imagePosition="left" />,
        "stats-band": StatsBand,
        "feature-checklist": FeatureChecklist,
        "team-grid": TeamGrid,
        "pricing-tiers": PricingTiers,
        "blog-highlights": BlogHighlights,
        "product-grid": () => <ProductGrid products={[sampleProduct]} />,
        "product-detail": () => (
          <ProductDetail
            productId="sample"
            name={sampleProduct.name}
            description={sampleProduct.description}
            priceCents={sampleProduct.priceCents}
            currency={sampleProduct.currency}
            stock={10}
            categoryName={sampleProduct.categoryName}
          />
        ),
        "cart-summary": () => (
          <CartSummary
            items={[
              {
                productId: sampleProduct.id,
                slug: sampleProduct.slug,
                name: sampleProduct.name,
                priceCents: sampleProduct.priceCents,
                currency: sampleProduct.currency,
                quantity: 1,
                stock: 10,
              },
            ]}
            totals={{
              subtotalCents: 2900,
              shippingCents: 599,
              taxCents: 239,
              totalCents: 3738,
              currency: "usd",
            }}
          />
        ),
        "checkout-summary": () => (
          <CheckoutSummary
            items={[
              {
                productId: sampleProduct.id,
                slug: sampleProduct.slug,
                name: sampleProduct.name,
                priceCents: sampleProduct.priceCents,
                currency: sampleProduct.currency,
                quantity: 1,
                stock: 10,
              },
            ]}
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
        ),
        "faq-accordion": () => <FaqAccordion items={defaultFaqItems} />,
        "legal-content": () => (
          <LegalContent title="Privacy Policy" sections={privacySections} />
        ),
        "blog-post": () => <BlogPost post={blogPosts[0]!} />,
        "cta-band": CtaBand,
        "site-footer-pro": SiteFooterPro,
        "directory-grid": () => (
          <DirectoryGrid
            entries={[
              {
                slug: sampleDirectoryEntry.slug,
                name: sampleDirectoryEntry.name,
                summary: sampleDirectoryEntry.summary,
                initials: "AR",
                meta: sampleDirectoryEntry.meta,
                tags: sampleDirectoryEntry.tags,
                href: `/members/${sampleDirectoryEntry.slug}`,
              },
            ]}
          />
        ),
        "profile-header": () => (
          <ProfileHeader
            eyebrow="Member"
            name="Alex Rivera"
            initials="AR"
            summary="Sample member profile for preview."
            details={[
              { label: "Location", value: "Remote" },
              { label: "Role", value: "Designer" },
            ]}
          />
        ),
        "feature-hub": () => <FeatureHub features={featureHubItems} />,
        "token-costs": TokenCosts,
        "support-steps": SupportSteps,
      };

      return [slug, { ...meta, component: components[slug]! }];
    }),
  ),
};

export const navigationRegistry: Record<string, NavigationRegistryEntry> = {
  "nav-header": {
    ...navigationMeta["nav-header"]!,
    component: NavHeader,
  },
  "nav-centered": {
    ...navigationMeta["nav-centered"]!,
    component: NavCentered,
  },
};

export const pageLayoutRegistry: Record<string, PageLayoutRegistryEntry> =
  pageLayoutMeta;

export function getBlockComponent(slug: string): ComponentType | null {
  return blockRegistry[slug]?.component ?? null;
}

export function getNavigationComponent(slug: string): ComponentType | null {
  return navigationRegistry[slug]?.component ?? null;
}

export function getPageLayout(slug: string): PageLayoutRegistryEntry | null {
  return pageLayoutRegistry[slug] ?? null;
}

export function getRegistryBlockList(): {
  id: string;
  label: string;
  component: ComponentType;
}[] {
  return Object.entries(blockRegistry).map(([id, { label, component }]) => ({
    id,
    label,
    component,
  }));
}

export {
  blockMeta,
  navigationMeta,
  pageLayoutMeta,
  getAllRegistryMetaEntries,
} from "./registry-meta";
