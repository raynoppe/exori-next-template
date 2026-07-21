import { BlogHighlights, CtaBand } from "@/components/blocks"

export default function BlogPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Blog
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Insights, updates, and stories
          </h1>
          <p className="text-lg text-muted-foreground">
            Product thinking, growth tactics, and lessons from teams building
            modern SaaS products.
          </p>
        </div>
      </section>
      <BlogHighlights ctaLabel="" />
      <CtaBand
        headline="Ready to put these ideas into action?"
        subhead="Start your trial and build your next page with Exori blocks."
      />
    </>
  )
}
