import { ArrowRight, Sparkles } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ButtonLink } from "@/components/ui/button"
import { defaultBrand } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type HeroSplitProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  socialProof?: string
  avatars?: string[]
  className?: string
}

export function HeroSplit({
  eyebrow = "Online program is now available",
  headline = defaultBrand.tagline,
  subhead = "When you join our journey, you are choosing a partner who believes in a healthier, more balanced you — and works tirelessly to help you get there.",
  primaryCta = "Start trial for 14 days",
  primaryHref = "/register",
  secondaryCta = "Explore more",
  secondaryHref = "/about",
  socialProof = "7.65m+ Content Creators and Teams",
  avatars = ["SC", "MD", "GC"],
  className,
}: HeroSplitProps) {
  return (
    <section className={cn("nimbus-gradient-hero nimbus-section", className)}>
      <div className="nimbus-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            {eyebrow}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {headline}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">{subhead}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink size="lg" href={primaryHref}>
              {primaryCta}
            </ButtonLink>
            <ButtonLink
              size="lg"
              variant="outline"
              href={secondaryHref}
            >
              {secondaryCta}
              <ArrowRight className="size-4" data-icon="inline-end" />
            </ButtonLink>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {avatars.map((initials) => (
                <Avatar key={initials} className="size-8">
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{socialProof}</p>
          </div>
        </div>

        <div className="relative">
          <div className="nimbus-gradient-card aspect-[4/3] overflow-hidden rounded-2xl border shadow-lg">
            <div className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  Dashboard preview
                </p>
                <p className="text-2xl font-semibold">Engagement up 50x</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Analytics", "Content", "Growth"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border bg-background/80 p-3 text-center text-xs font-medium backdrop-blur"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border bg-card p-4 shadow-md sm:block">
            <p className="text-2xl font-semibold text-primary">4.5</p>
            <p className="text-xs text-muted-foreground">2.3k+ Reviews</p>
          </div>
        </div>
      </div>
    </section>
  )
}
