import {
  BlogHighlights,
  CtaBand,
  FeatureChecklist,
  FeatureSplit,
  HeroSplit,
  LogoCloud,
  PricingTiers,
  ServiceCards,
  StatsBand,
  TeamGrid,
  TestimonialCards,
} from "@/components/blocks"

export default function MarketingHomePage() {
  return (
    <>
      <HeroSplit />
      <LogoCloud />
      <ServiceCards />
      <TestimonialCards />
      <FeatureSplit imagePosition="left" />
      <StatsBand />
      <FeatureChecklist />
      <TeamGrid />
      <PricingTiers />
      <BlogHighlights />
      <CtaBand />
    </>
  )
}
