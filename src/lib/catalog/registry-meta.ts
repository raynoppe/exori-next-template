export type BlockMeta = {
  label: string;
  family: string;
  description?: string;
  tags?: string[];
};

export type NavigationMeta = {
  label: string;
  description?: string;
  tags?: string[];
};

export type PageLayoutMeta = {
  label: string;
  description?: string;
  liveRoute: string;
  orderedBlocks: string[];
  tags?: string[];
};

export const blockMeta: Record<string, BlockMeta> = {
  "nav-header": {
    label: "Nav Header",
    family: "layout",
    description: "Sticky marketing navigation with brand, links, and CTAs.",
    tags: ["layout", "navigation"],
  },
  "hero-split": {
    label: "Hero Split",
    family: "hero",
    description: "Split hero with headline, CTAs, and product visual.",
    tags: ["hero", "marketing"],
  },
  "logo-cloud": {
    label: "Logo Cloud",
    family: "social-proof",
    description: "Trust bar with partner or customer logos.",
    tags: ["social-proof"],
  },
  "service-cards": {
    label: "Service Cards",
    family: "services",
    description: "Three-column service offering cards.",
    tags: ["services"],
  },
  "testimonial-cards": {
    label: "Testimonial Cards",
    family: "testimonials",
    description: "Grid of customer quote cards.",
    tags: ["testimonials", "social-proof"],
  },
  "feature-split": {
    label: "Feature Split",
    family: "features",
    description: "Image and copy feature section with configurable layout.",
    tags: ["features"],
  },
  "stats-band": {
    label: "Stats Band",
    family: "stats",
    description: "Headline paired with stat figures.",
    tags: ["stats"],
  },
  "feature-checklist": {
    label: "Feature Checklist",
    family: "features",
    description: "Bulleted feature list with check icons.",
    tags: ["features"],
  },
  "team-grid": {
    label: "Team Grid",
    family: "team",
    description: "Team member grid with avatar initials.",
    tags: ["team"],
  },
  "pricing-tiers": {
    label: "Pricing Tiers",
    family: "pricing",
    description: "Three-tier pricing cards with feature lists.",
    tags: ["pricing"],
  },
  "blog-highlights": {
    label: "Blog Highlights",
    family: "blog",
    description: "Blog post preview grid.",
    tags: ["blog"],
  },
  "product-grid": {
    label: "Product Grid",
    family: "commerce",
    description: "Responsive product catalog grid.",
    tags: ["commerce", "shop"],
  },
  "product-detail": {
    label: "Product Detail",
    family: "commerce",
    description: "Single product detail with add-to-cart.",
    tags: ["commerce", "shop"],
  },
  "cart-summary": {
    label: "Cart Summary",
    family: "commerce",
    description: "Cart line items with totals and checkout link.",
    tags: ["commerce", "cart"],
  },
  "checkout-summary": {
    label: "Checkout Summary",
    family: "commerce",
    description: "Checkout form with shipping and Stripe redirect.",
    tags: ["commerce", "checkout"],
  },
  "faq-accordion": {
    label: "FAQ Accordion",
    family: "content",
    description: "FAQ section using accordion for Q&A pairs.",
    tags: ["content", "faq"],
  },
  "legal-content": {
    label: "Legal Content",
    family: "content",
    description: "Structured legal document renderer.",
    tags: ["content", "legal"],
  },
  "blog-post": {
    label: "Blog Post",
    family: "content",
    description: "Full blog article layout.",
    tags: ["content", "blog"],
  },
  "cta-band": {
    label: "CTA Band",
    family: "cta",
    description: "Full-width gradient call-to-action band.",
    tags: ["cta", "marketing"],
  },
  "site-footer-pro": {
    label: "Site Footer Pro",
    family: "layout",
    description: "Multi-column footer with newsletter and links.",
    tags: ["layout", "footer"],
  },
  "directory-grid": {
    label: "Directory Grid",
    family: "directory",
    description: "Card grid for collection or directory entries.",
    tags: ["directory"],
  },
  "profile-header": {
    label: "Profile Header",
    family: "directory",
    description: "Collection profile header with avatar and details.",
    tags: ["directory"],
  },
  "feature-hub": {
    label: "Feature Hub",
    family: "features",
    description: "Linked feature cards for a features index page.",
    tags: ["features", "navigation"],
  },
  "token-costs": {
    label: "Token Costs",
    family: "pricing",
    description: "Usage-based token cost table for AI or metered features.",
    tags: ["pricing", "usage"],
  },
  "support-steps": {
    label: "Support Steps",
    family: "content",
    description: "Numbered steps explaining how to get support via the portal.",
    tags: ["support", "content"],
  },
};

export const navigationMeta: Record<string, NavigationMeta> = {
  "nav-header": {
    label: "Nav Header",
    description: "Default Nimbus sticky navigation with theme toggle and CTAs.",
    tags: ["default", "sticky"],
  },
  "nav-centered": {
    label: "Nav Centered",
    description:
      "Centered brand with links in a row below — suited to editorial and portfolio sites.",
    tags: ["centered", "editorial"],
  },
};

const homepageBlocks = [
  "nav-header",
  "hero-split",
  "logo-cloud",
  "service-cards",
  "testimonial-cards",
  "feature-split",
  "stats-band",
  "feature-checklist",
  "team-grid",
  "pricing-tiers",
  "blog-highlights",
  "cta-band",
  "site-footer-pro",
];

export const pageLayoutMeta: Record<string, PageLayoutMeta> = {
  "marketing-home": {
    label: "Marketing Homepage",
    description: "Default SaaS marketing homepage with full block stack.",
    liveRoute: "/marketing",
    orderedBlocks: homepageBlocks,
    tags: ["marketing", "homepage"],
  },
  "business-home": {
    label: "Business Homepage",
    description: "Business-tier homepage with the same Nimbus block stack.",
    liveRoute: "/business",
    orderedBlocks: homepageBlocks,
    tags: ["business", "homepage"],
  },
  "applanding-home": {
    label: "App Landing Homepage",
    description: "App landing tier homepage for mobile-first products.",
    liveRoute: "/applanding",
    orderedBlocks: homepageBlocks,
    tags: ["applanding", "homepage"],
  },
  "shop-catalog": {
    label: "Shop Catalog",
    description: "Product catalog page for the Nimbus shop tier.",
    liveRoute: "/shop/shop",
    orderedBlocks: ["nav-header", "product-grid", "site-footer-pro"],
    tags: ["commerce", "shop"],
  },
  pricing: {
    label: "Pricing Page",
    description: "Pricing-focused layout with tiers and FAQ.",
    liveRoute: "/marketing/pricing",
    orderedBlocks: [
      "nav-header",
      "pricing-tiers",
      "faq-accordion",
      "cta-band",
      "site-footer-pro",
    ],
    tags: ["marketing", "pricing"],
  },
  about: {
    label: "About Page",
    description: "About page with team and feature sections.",
    liveRoute: "/marketing/about",
    orderedBlocks: [
      "nav-header",
      "hero-split",
      "feature-split",
      "team-grid",
      "stats-band",
      "cta-band",
      "site-footer-pro",
    ],
    tags: ["marketing", "about"],
  },
  contact: {
    label: "Contact Page",
    description: "Contact page with hero and form area.",
    liveRoute: "/marketing/contact",
    orderedBlocks: ["nav-header", "hero-split", "cta-band", "site-footer-pro"],
    tags: ["marketing", "contact"],
  },
  "blog-list": {
    label: "Blog List",
    description: "Blog index with highlights grid.",
    liveRoute: "/marketing/blog",
    orderedBlocks: ["nav-header", "blog-highlights", "site-footer-pro"],
    tags: ["marketing", "blog"],
  },
  faq: {
    label: "FAQ Page",
    description: "Dedicated FAQ page with accordion content.",
    liveRoute: "/marketing/faq",
    orderedBlocks: ["nav-header", "faq-accordion", "cta-band", "site-footer-pro"],
    tags: ["marketing", "faq"],
  },
};

export type RegistryMetaEntry =
  | { type: "BLOCK"; slug: string; entry: BlockMeta }
  | { type: "NAVIGATION"; slug: string; entry: NavigationMeta }
  | { type: "PAGE_LAYOUT"; slug: string; entry: PageLayoutMeta };

export function getAllRegistryMetaEntries(): RegistryMetaEntry[] {
  const blocks: RegistryMetaEntry[] = Object.entries(blockMeta).map(
    ([slug, entry]) => ({ type: "BLOCK" as const, slug, entry }),
  );
  const navigation: RegistryMetaEntry[] = Object.entries(navigationMeta).map(
    ([slug, entry]) => ({ type: "NAVIGATION" as const, slug, entry }),
  );
  const layouts: RegistryMetaEntry[] = Object.entries(pageLayoutMeta).map(
    ([slug, entry]) => ({ type: "PAGE_LAYOUT" as const, slug, entry }),
  );

  return [...blocks, ...navigation, ...layouts];
}
