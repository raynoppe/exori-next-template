import { CtaBand, FeatureChecklist, PricingTiers } from "@/components/blocks"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrade or downgrade at any time. Changes take effect on your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan includes a 14-day trial with full access to core features.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Annual billing is available on Professional and Enterprise with a 20% discount.",
  },
]

export default function PricingPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4 text-center mx-auto">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your stage. Scale up as your team grows.
          </p>
        </div>
      </section>
      <PricingTiers />
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-2xl space-y-6">
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <Accordion type="single" defaultValue="faq-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger value={`faq-${i}`}>{faq.q}</AccordionTrigger>
                <AccordionContent value={`faq-${i}`}>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <FeatureChecklist
        headline="Everything you need to launch and grow"
        subhead="All plans include core platform access, updates, and onboarding support."
      />
      <CtaBand />
    </>
  )
}
