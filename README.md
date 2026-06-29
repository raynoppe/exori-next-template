This is a [Next.js](https://nextjs.org) template for Exori-generated projects: auth, admin, **Nimbus** marketing blocks, **Stripe ecommerce**, and content pages.

## Getting Started

```bash
npm install
cp .env.example .env   # set AUTH_SECRET, Stripe keys, DATABASE_URL
npm run db:setup       # Postgres + Prisma migrate + seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing demo, or [http://localhost:3000/shop](http://localhost:3000/shop) for the storefront.

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection |
| `AUTH_SECRET` | Auth.js session secret |
| `STRIPE_SECRET_KEY` | Stripe API (server) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe (client, optional) |
| `STRIPE_WEBHOOK_SECRET` | Verify `POST /api/webhooks/stripe` |
| `NEXT_PUBLIC_BASE_URL` | Stripe redirect URLs (e.g. `http://localhost:3000`) |

For local Stripe webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## Nimbus block library

Reusable blocks under `components/blocks/` — marketing, commerce, and content. See `/blocks` for a live gallery.

### Marketing blocks

Hero, logo cloud, services, testimonials, features, stats, team, pricing, blog highlights, CTA, nav, footer.

### Commerce blocks

| Block | Path |
|-------|------|
| Product Grid | `components/blocks/commerce/product-grid.tsx` |
| Product Detail | `components/blocks/commerce/product-detail.tsx` |
| Cart Summary | `components/blocks/commerce/cart-summary.tsx` |
| Checkout Summary | `components/blocks/commerce/checkout-summary.tsx` |

### Content blocks

| Block | Path |
|-------|------|
| FAQ Accordion | `components/blocks/content/faq-accordion.tsx` |
| Legal Content | `components/blocks/content/legal-content.tsx` |
| Blog Post | `components/blocks/content/blog-post.tsx` |

## Storefront routes

| Route | Purpose |
|-------|---------|
| `/shop` | Product catalog + category filter |
| `/shop/[slug]` | Product detail + add to cart |
| `/cart` | Cookie cart with qty controls |
| `/checkout` | Address + shipping → Stripe Checkout |
| `/checkout/success` | Order confirmation (clears cart) |
| `/orders` | Logged-in order history |

Guest checkout supported; cart stored in httpOnly cookie, prices always re-validated server-side.

## Content pages

- `/blog`, `/blog/[slug]` — blog list and articles
- `/faq` — FAQ accordion
- `/legal/terms`, `/legal/privacy` — legal pages

## Admin (`/admin`, ADMIN role)

- **Users** — role management (existing)
- **Products** — CRUD, stock, status, categories
- **Categories** — product taxonomy
- **Orders** — view, fulfill, refund via Stripe
- **Shipping** — methods + free-shipping thresholds
- **Taxes** — rate CRUD with default flag

Seed admin: `admin@exori.local` / `changeme` (from `.env`).

## Exori website pack

Registry pack `nimbus` v1.1 in `be/templates/website-registry/` includes marketing + ecommerce + content block manifests and blueprints.

```bash
npm run dev
npm run capture-previews
```

## Starter routes

| Route | Purpose |
|-------|---------|
| `/` | Marketing homepage (Nimbus) |
| `/login`, `/register` | Auth |
| `/dashboard` | User dashboard |
| `/admin` | Admin control panel |
