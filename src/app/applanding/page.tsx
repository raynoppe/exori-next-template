import {
  CtaBand,
  FaqAccordion,
  FeatureHub,
  FeatureSplit,
  HeroSplit,
  LogoCloud,
  PricingTiers,
  StatsBand,
  TestimonialCards,
} from "@/components/blocks";
import { applandingFaqItems } from "@/lib/content/applanding/faq";
import { featureHubItems } from "@/lib/content/applanding/content";

export default function ApplandingHomePage() {
  return (
    <>
      <HeroSplit
        eyebrow="Now on iOS & Android"
        headline="Ship faster with the app built for modern teams"
        subhead="Plan, build, and launch from one workspace — with AI that keeps up with your pace."
        primaryCta="Download free"
        secondaryCta="See pricing"
      />
      <LogoCloud />
      <FeatureSplit
        imagePosition="left"
        headline="Everything you need in one app"
        subhead="Replace your scattered tool stack with a single workspace designed for speed."
      />
      <StatsBand />
      <FeatureHub
        eyebrow="Explore"
        headline="Built for how you work"
        subhead="Whether you lead a team or create solo, Nimbus adapts to your workflow."
        features={featureHubItems}
      />
      <PricingTiers />
      <TestimonialCards />
      <FaqAccordion
        items={applandingFaqItems.slice(0, 3).map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <CtaBand
        headline="Ready to download?"
        subhead="Start your 14-day free trial — no credit card required."
        primaryCta="Get the app"
        secondaryCta="View pricing"
      />
    </>
  );
}
