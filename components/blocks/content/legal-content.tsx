import { cn } from "@/lib/utils";

export type LegalSection = {
  title: string;
  body: string;
};

export type LegalContentProps = {
  title: string;
  updatedAt?: string;
  sections: LegalSection[];
  className?: string;
};

export function LegalContent({
  title,
  updatedAt,
  sections,
  className,
}: LegalContentProps) {
  return (
    <article className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Legal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {updatedAt ? (
            <p className="text-sm text-muted-foreground">
              Last updated {updatedAt}
            </p>
          ) : null}
        </header>
        <div className="prose prose-neutral max-w-none space-y-8 dark:prose-invert">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
