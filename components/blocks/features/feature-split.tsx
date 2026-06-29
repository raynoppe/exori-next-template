import { ArrowRight } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FeatureSplitProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  ctaLabel?: string
  ctaHref?: string
  imagePosition?: "left" | "right"
  className?: string
}

export function FeatureSplit({
  eyebrow = "About",
  headline = "98.2% customer satisfaction from those who know us best.",
  subhead = "Genuine feedback from those who know us best. We build products that teams rely on every day.",
  ctaLabel = "Learn more",
  ctaHref = "/about",
  imagePosition = "left",
  className,
}: FeatureSplitProps) {
  const visual = (
    <div className="nimbus-gradient-card aspect-[4/3] overflow-hidden rounded-2xl border">
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
        Feature visual
      </div>
    </div>
  )

  const copy = (
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
      <ButtonLink href={ctaHref}>
        {ctaLabel}
        <ArrowRight className="size-4" data-icon="inline-end" />
      </ButtonLink>
    </div>
  )

  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {imagePosition === "left" ? (
          <>
            {visual}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {visual}
          </>
        )}
      </div>
    </section>
  )
}
