import { CtaBand, FeatureChecklist, FeatureSplit } from "@/components/blocks";
import { featurePages } from "@/lib/content/applanding/content";
import { notFound } from "next/navigation";

export default function Feature1Page() {
  const content = featurePages.feature1;
  if (!content) notFound();

  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.headline}
          </h1>
          <p className="text-lg text-muted-foreground">{content.subhead}</p>
        </div>
      </section>
      <FeatureSplit
        imagePosition="right"
        headline={content.splitHeadline}
        subhead={content.splitSubhead}
      />
      <FeatureChecklist
        headline={content.checklistHeadline}
        features={content.checklistItems}
      />
      <CtaBand primaryCta="Start free trial" secondaryCta="View pricing" />
    </>
  );
}
