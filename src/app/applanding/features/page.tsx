import { CtaBand, FeatureHub } from "@/components/blocks";
import { featureHubItems } from "@/lib/content/applanding/content";

export default function FeaturesPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Features
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything Nimbus can do for you
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our core capabilities or dive into detailed feature pages below.
          </p>
        </div>
      </section>
      <FeatureHub features={featureHubItems} />
      <CtaBand />
    </>
  );
}
