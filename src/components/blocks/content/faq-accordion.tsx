import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

export type FaqAccordionProps = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({
  eyebrow = "FAQ",
  headline = "Frequently asked questions",
  subhead = "Quick answers to common questions.",
  items,
  className,
}: FaqAccordionProps) {
  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container max-w-3xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h1>
          <p className="text-muted-foreground">{subhead}</p>
        </div>
        <Accordion type="single" defaultValue="faq-0">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger value={`faq-${index}`}>
                {item.question}
              </AccordionTrigger>
              <AccordionContent value={`faq-${index}`}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
