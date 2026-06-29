import { FaqAccordion } from "@/components/blocks/content/faq-accordion";
import { defaultFaqItems } from "@/lib/content/posts";

export default function FaqPage() {
  return <FaqAccordion items={defaultFaqItems} />;
}
