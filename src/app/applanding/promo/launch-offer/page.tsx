import { CtaBand, HeroSplit } from "@/components/blocks";
import { FeatureChecklist } from "@/components/blocks";

export default function LaunchOfferPromoPage() {
  return (
    <>
      <HeroSplit
        eyebrow="Limited time — 50% off"
        headline="Launch week special"
        subhead="Get Professional for half price when you sign up this week. Offer ends Sunday."
        primaryCta="Claim offer"
        secondaryCta="See all plans"
      />
      <FeatureChecklist
        headline="What's included"
        subhead="Everything in Professional, at launch pricing."
        features={[
          {
            title: "Unlimited projects",
            description: "No caps on workspaces or collaborators during your trial.",
          },
          {
            title: "AI token bundle",
            description: "10,000 bonus tokens included with your first month.",
          },
          {
            title: "Priority support",
            description: "Skip the queue with portal priority for 30 days.",
          },
        ]}
      />
      <CtaBand
        headline="Offer ends Sunday at midnight"
        subhead="Start your trial now — cancel anytime."
        primaryCta="Get 50% off"
      />
    </>
  );
}
