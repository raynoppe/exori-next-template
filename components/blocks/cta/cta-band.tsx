import { ArrowRight } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CtaBandProps = {
  headline?: string
  subhead?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  className?: string
}

export function CtaBand({
  headline = "Customers who rely on our expertise — honest review.",
  subhead = "More balanced you — and works tirelessly to help you get there.",
  primaryCta = "Start trial for 14 days",
  primaryHref = "/register",
  secondaryCta = "Discover more",
  secondaryHref = "/about",
  className,
}: CtaBandProps) {
  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container">
        <div className="relative overflow-hidden rounded-2xl border bg-primary px-6 py-12 text-primary-foreground sm:px-10 sm:py-16">
          <div className="absolute inset-0 nimbus-gradient-hero opacity-40" />
          <div className="relative mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {headline}
            </h2>
            <p className="text-primary-foreground/80">{subhead}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink
                size="lg"
                variant="secondary"
                href={primaryHref}
              >
                {primaryCta}
              </ButtonLink>
              <ButtonLink
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                href={secondaryHref}
              >
                {secondaryCta}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
