import {
  CtaBand,
  FeatureChecklist,
  FeatureSplit,
  TeamGrid,
  TestimonialCards,
} from "@/components/blocks"

export default function AboutPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            About
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            We help teams build products customers love
          </h1>
          <p className="text-lg text-muted-foreground">
            Nimbus is a modern SaaS template designed for startups, software
            companies, and digital agencies. Every section is a reusable block
            the Exori AI can compose into new pages.
          </p>
        </div>
      </section>
      <FeatureSplit
        eyebrow="Our story"
        headline="Built for teams who move fast and care about craft."
        subhead="We combine product thinking, design systems, and scalable engineering so you can launch with confidence."
        imagePosition="right"
      />
      <FeatureChecklist />
      <TeamGrid />
      <TestimonialCards />
      <CtaBand />
    </>
  )
}
