import { defaultBlogPosts } from "@/lib/blocks/defaults";

export type BlogPostEntry = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  role: string;
  initials: string;
  readTime: string;
  timeAgo: string;
};

const extraBodies: Record<string, string> = {
  "one-piece-garments-top-and-shorts-providing-comfort": `One-piece garments combining tops and shorts are reshaping how teams think about comfort and presentation. The trend reflects a broader shift toward versatile, low-friction wardrobe choices.

For product teams, the lesson is clear: reduce decision fatigue. When customers have fewer meaningful choices to make, conversion improves and satisfaction follows.

We see this pattern across SaaS onboarding too — guided defaults outperform blank slates for most users.`,
  "the-post-pandemic-consumer-is-embracing-clothes": `Consumer behavior continues to evolve as hybrid work normalizes. Brands that meet people where they are — online first, with authentic storytelling — win attention and trust.

Digital-first doesn't mean impersonal. The best experiences blend self-serve convenience with human support at key moments.

Marketing teams should audit every touchpoint: does this page answer the question a skeptical visitor is actually asking?`,
  "as-people-move-out-of-big-cities-fashion-retail-follows": `Regional growth is real, and digital commerce makes it accessible without a national footprint. Smaller markets reward brands that speak locally and ship reliably.

Infrastructure matters: fast checkout, transparent shipping, and clear tax display remove friction that otherwise kills impulse purchases.

Whether you're selling apparel or software, geography is no longer a barrier — operations are.`,
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const blogPosts: BlogPostEntry[] = defaultBlogPosts.map((post) => {
  const slug = slugify(post.title);
  return {
    slug,
    title: post.title,
    excerpt: post.excerpt,
    body: extraBodies[slug] ?? post.excerpt,
    author: post.author,
    role: post.role,
    initials: post.initials,
    readTime: post.readTime,
    timeAgo: post.timeAgo,
  };
});

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export const defaultFaqItems = [
  {
    question: "Do you offer free shipping?",
    answer:
      "Standard shipping is free on orders over $75. Express shipping is available at checkout.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unworn items in original packaging can be returned within 30 days of delivery for a full refund.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard shipping takes 5–7 business days. Express shipping arrives in 2–3 business days.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes. You'll receive a confirmation email with tracking once your order ships.",
  },
];

export const termsSections = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
  },
  {
    title: "Products and pricing",
    body: "We reserve the right to modify product offerings and prices at any time. All prices are shown in USD unless otherwise stated. Taxes and shipping are calculated at checkout.",
  },
  {
    title: "Orders and payment",
    body: "Orders are confirmed upon successful payment via Stripe. We may cancel orders for suspected fraud, pricing errors, or stock unavailability.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of our services.",
  },
];

export const privacySections = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly (name, email, shipping address) and order history when you create an account or complete a purchase.",
  },
  {
    title: "How we use information",
    body: "We use your information to process orders, provide customer support, send transactional emails, and improve our services. We do not sell your personal data.",
  },
  {
    title: "Payment processing",
    body: "Payments are processed by Stripe. We do not store full card numbers on our servers. See Stripe's privacy policy for details on payment data handling.",
  },
  {
    title: "Your rights",
    body: "You may request access, correction, or deletion of your personal data by contacting us. Account holders can update profile information from the dashboard.",
  },
];
