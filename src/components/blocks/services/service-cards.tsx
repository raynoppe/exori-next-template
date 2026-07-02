import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { defaultServices } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type Service = {
  title: string
  description: string
  tags: string[]
}

export type ServiceCardsProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  services?: Service[]
  className?: string
}

export function ServiceCards({
  eyebrow = "Our service",
  headline = "Expectations customers feeling truly delighted",
  subhead = "Genuine feedback from those who know us best.",
  services = defaultServices,
  className,
}: ServiceCardsProps) {
  return (
    <section className={cn("nimbus-section bg-muted/20", className)}>
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

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={service.title} className="shadow-sm">
              <CardHeader>
                <p className="text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
