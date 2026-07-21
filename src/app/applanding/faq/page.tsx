import { FaqAccordion } from "@/components/blocks";
import { applandingFaqItems } from "@/lib/content/applanding/faq";

export default function FaqPage() {
  return <FaqAccordion items={applandingFaqItems} />;
}
