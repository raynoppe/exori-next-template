import { CtaBand, SupportSteps } from "@/components/blocks";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Support
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="text-lg text-muted-foreground">
            Get answers fast through our customer portal. Register for free, open a
            ticket, and track replies in one place.
          </p>
        </div>
      </section>

      <SupportSteps />

      <section className="nimbus-section-sm pt-0">
        <div className="nimbus-container grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>New to Nimbus?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create a portal account to open support tickets and manage your
                subscription.
              </p>
              <ButtonLink href="/applanding/portal/register">
                Register for portal
              </ButtonLink>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Already registered?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Log in and open a new ticket — we typically respond within one
                business day.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/applanding/portal/login">Portal login</ButtonLink>
                <ButtonLink href="/applanding/portal/tickets/new" variant="outline">
                  Open a ticket
                </ButtonLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CtaBand
        headline="Still have questions?"
        subhead="Browse our FAQ or contact us directly."
        primaryCta="View FAQ"
        secondaryCta="Contact us"
      />
    </>
  );
}
