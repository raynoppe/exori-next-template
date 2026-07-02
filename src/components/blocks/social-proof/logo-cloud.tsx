import { defaultLogos } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type LogoCloudProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  logos?: string[]
  className?: string
}

export function LogoCloud({
  eyebrow = "Trusted by 150,000+ content creators agencies",
  headline,
  subhead = "Quizzes are working for them — and they can for you too.",
  logos = defaultLogos,
  className,
}: LogoCloudProps) {
  return (
    <section className={cn("nimbus-section-sm border-y bg-muted/30", className)}>
      <div className="nimbus-container space-y-8 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
          {headline ? (
            <h2 className="text-2xl font-semibold tracking-tight">{headline}</h2>
          ) : null}
          <p className="text-sm text-muted-foreground">{subhead}</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex h-12 items-center justify-center rounded-lg border bg-card px-3 text-sm font-semibold text-muted-foreground"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
