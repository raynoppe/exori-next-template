import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const promoPages = [
  {
    href: "/applanding/promo/launch-offer",
    title: "Launch offer",
    description: "Example ad landing page for a limited-time launch promotion.",
  },
];

export default function PromoIndexPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Promo pages
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Campaign landing pages
          </h1>
          <p className="text-lg text-muted-foreground">
            Dedicated landing pages for ads and special offers. Each promo gets its
            own URL so you can track conversions separately.
          </p>
        </div>
      </section>

      <section className="nimbus-section-sm pt-0">
        <div className="nimbus-container grid gap-6 md:grid-cols-2">
          {promoPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="h-full transition-colors hover:bg-muted/30">
                <CardHeader>
                  <CardTitle>{page.title}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
