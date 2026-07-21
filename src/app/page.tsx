import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sections = [
  {
    href: "/blocks",
    title: "Blocks",
    description:
      "Reusable marketing, commerce, and content sections customers can pick for their site.",
  },
  {
    href: "/layouts",
    title: "Page layouts",
    description:
      "Full landing pages and page blueprints composed from ordered block stacks.",
  },
  {
    href: "/navigation",
    title: "Navigation styles",
    description:
      "Header and navigation variants customers can choose for their site chrome.",
  },
];

export default function CatalogHomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <section className="border-b bg-muted/30 py-16">
        <div className="nimbus-container space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Nimbus catalog
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Preview blocks, layouts, and navigation
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Browse the Nimbus design system. Each block has a dedicated preview
              page; layouts link to live tier routes. Customers will pick from
              this catalog inside the Exori app.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/blocks">Browse blocks</ButtonLink>
            <ButtonLink href="/gallery/blocks" variant="outline">
              All-in-one gallery
            </ButtonLink>
            <ButtonLink href="/admin" variant="outline">
              Admin
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="nimbus-container py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full transition-colors hover:bg-muted/30">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
