import { supportSteps } from "@/lib/content/applanding/content";
import { cn } from "@/lib/utils";

export type SupportStep = {
  step: string;
  title: string;
  description: string;
};

export type SupportStepsProps = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  steps?: SupportStep[];
  className?: string;
};

export function SupportSteps({
  eyebrow = "How it works",
  headline = "Get help in four steps",
  subhead = "Register for the portal, open a ticket, and track replies in one place.",
  steps = supportSteps,
  className,
}: SupportStepsProps) {
  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p className="text-muted-foreground">{subhead}</p>
        </div>

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <p className="text-sm font-mono text-primary">{item.step}</p>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
