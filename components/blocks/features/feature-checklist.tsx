import { Check } from "lucide-react"

import { defaultFeatures } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type FeatureChecklistProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  features?: { title: string; description: string }[]
  className?: string
}

export function FeatureChecklist({
  eyebrow = "Features",
  headline = "Discover what customers expect and go beyond to amaze them",
  subhead = "More balanced you — and works tirelessly to help you get there.",
  features = defaultFeatures,
  className,
}: FeatureChecklistProps) {
  return (
    <section className={cn("nimbus-section bg-muted/20", className)}>
      <div className="nimbus-container grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {headline}
            </h2>
            <p className="text-muted-foreground">{subhead}</p>
          </div>
          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["Grows seamlessly", "Designed to evolve", "Precisely matched", "Future-proof"].map(
            (label) => (
              <div
                key={label}
                className="rounded-xl border bg-card p-4 text-sm font-medium shadow-sm"
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
