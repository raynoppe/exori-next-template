import { Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { defaultTestimonials } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type Testimonial = {
  quote: string
  name: string
  role: string
  company?: string
  initials: string
}

export type TestimonialCardsProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  rating?: string
  reviewCount?: string
  testimonials?: Testimonial[]
  className?: string
}

export function TestimonialCards({
  eyebrow = "Our service",
  headline = "Expectations customers feeling truly delighted",
  subhead = "Genuine feedback from those who know us best.",
  rating = "4.5",
  reviewCount = "2.3k + Reviews",
  testimonials = defaultTestimonials,
  className,
}: TestimonialCardsProps) {
  return (
    <section className={cn("nimbus-section", className)}>
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

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.name} className="shadow-sm">
              <CardContent className="space-y-4 pt-6">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-base leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{item.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.role}
                      {item.company ? ` of ${item.company}` : ""}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-2xl font-semibold text-foreground">{rating}</span>
          <span>({reviewCount})</span>
        </div>
      </div>
    </section>
  )
}
