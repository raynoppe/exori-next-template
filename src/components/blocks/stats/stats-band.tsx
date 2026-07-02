import { ArrowRight } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { defaultStats } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type Stat = { value: string; label: string }

export type StatsBandProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  stats?: Stat[]
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function StatsBand({
  eyebrow = "Feature",
  headline = "Get higher strategy boosted our engagement by 50x in a week.",
  subhead = "The focus isn't on features, but on the benefit to the user: gives you full control over the look and feel of your site.",
  stats = defaultStats.slice(1),
  ctaLabel = "Read more",
  ctaHref = "/about",
  className,
}: StatsBandProps) {
  return (
    <section className={cn("nimbus-section", className)}>
      <div className="nimbus-container grid items-center gap-12 lg:grid-cols-2">
        <div className="nimbus-gradient-card aspect-square max-h-[420px] overflow-hidden rounded-2xl border lg:aspect-auto lg:h-[420px]">
          <div className="flex h-full items-end p-8">
            <p className="text-sm font-medium text-muted-foreground">
              Visual proof placeholder
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {headline}
            </h2>
            <p className="text-muted-foreground">{subhead}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <ButtonLink
                  variant="link"
                  className="h-auto p-0"
                  href={ctaHref}
                >
                  {ctaLabel}
                  <ArrowRight className="size-3.5" data-icon="inline-end" />
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
