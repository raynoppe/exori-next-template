import { Check } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { defaultPricingTiers } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type PricingTier = {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export type PricingTiersProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  tiers?: PricingTier[]
  className?: string
}

export function PricingTiers({
  eyebrow = "Pricing",
  headline = "Built to scale with flexible pricing with your need",
  subhead = "Join thousands who trust us for quality and lasting relationships.",
  tiers = defaultPricingTiers,
  className,
}: PricingTiersProps) {
  return (
    <section className={cn("nimbus-section bg-muted/20", className)}>
      <div className="nimbus-container space-y-10">
        <div className="max-w-2xl space-y-3 text-center mx-auto">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p className="text-muted-foreground">{subhead}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "shadow-sm",
                tier.highlighted && "border-primary ring-2 ring-primary/20"
              )}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="pt-2">
                  <span className="text-4xl font-semibold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <ButtonLink
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                  href="/register"
                >
                  {tier.cta}
                </ButtonLink>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
