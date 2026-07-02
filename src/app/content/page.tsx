import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function ContentPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Sample content page
          </h1>
          <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-muted-foreground dark:prose-invert">
            <p>
              This page demonstrates a standard content route in the Exori
              template. Replace this copy with CMS-driven content, MDX, or
              database-backed pages as your product evolves.
            </p>
            <p>
              The layout shares the same site header and footer as the
              homepage, keeping navigation consistent across public routes.
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              What ships in the template
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>PostgreSQL via Docker Compose</li>
              <li>Prisma ORM with migrations and seed script</li>
              <li>Auth.js credentials login with USER and ADMIN roles</li>
              <li>Protected dashboard and admin routes</li>
            </ul>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
