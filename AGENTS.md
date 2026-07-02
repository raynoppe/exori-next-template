<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Nimbus template conventions

Binding rules for any agent — human or AI — extending a project built from this
template. Exori's build pipeline injects this file into its AI prompts, and it
ships with every generated project. When these rules conflict with your
training data, these rules win.

## Layout

- All source lives under `src/`: `src/app/` (App Router), `src/components/`,
  `src/lib/`, `src/types/`, plus `src/auth.ts`, `src/auth.config.ts`, and
  `src/proxy.ts` (Next 16's middleware). Config stays at the repo root
  (`tsconfig.json`, `components.json`, `next.config.ts`, `prisma/`, `public/`).
- The `@/*` import alias maps to `./src/*`.
- Route placement: public/marketing pages go in
  `src/app/(marketing)/<route>/page.tsx` (inherits the marketing header/footer
  layout); pages that require a signed-in user go at the app root,
  `src/app/<route>/page.tsx`, alongside `/login`, `/register`, `/dashboard`;
  commerce pages go in `src/app/(shop)/<route>/page.tsx`.

## Prisma (v7 — differs from training data)

- The `generator` and `datasource` blocks in `prisma/schema.prisma` are
  **immutable**. Never add `url` or `directUrl` to the datasource — connection
  config lives in `prisma.config.ts`, and a `url` line fails `prisma generate`
  with error P1012. Never change the generator provider (`prisma-client`) or
  its `output` path (`../src/lib/generated/prisma`) — imports resolve the
  generated client from `@/lib/generated/prisma/client`, not `@prisma/client`.
- Only append models and enums to the schema. Never remove or rename existing
  models or fields.
- Migrations are append-only. Every schema change ships a NEW folder
  `prisma/migrations/<UTC-timestamp-YYYYMMDDHHMMSS>_<snake_case_name>/migration.sql`
  containing real Postgres DDL (`CREATE TABLE` / `CREATE TYPE ... AS ENUM` /
  `ALTER TABLE`, quoted identifiers, `TIMESTAMP(3) NOT NULL DEFAULT
  CURRENT_TIMESTAMP` for timestamps). Never edit an existing migration file.
  Deploys run `prisma migrate deploy`, which only applies pre-generated SQL —
  a schema-only change does nothing.

## UI

- Reusable page sections live in `src/components/blocks/`, re-exported from
  the barrel `src/components/blocks/index.ts`. Extend the barrel and reuse
  existing blocks (hero, feature grid, CTA band, pricing tiers, testimonials,
  stats, FAQ) before writing new ones.
- shadcn-style primitives live in `src/components/ui/`. Tailwind CSS 4 theme
  variables live in `src/app/globals.css` (`--primary`, `--background`,
  `--radius`, and the `--nimbus-*` base set) — use tokens, not inline styles.
- Auth is NextAuth v5 (`src/auth.ts`, `src/auth.config.ts` — credentials
  provider + Prisma adapter). Route protection is matcher-based in
  `src/proxy.ts`.

## SEO

- `src/app/sitemap.ts`, `src/app/robots.ts`, and `public/llms.txt` already
  exist — extend them, don't duplicate. Absolute URLs derive from
  `NEXT_PUBLIC_SITE_URL`.
