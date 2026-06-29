import { ExternalLink, Share2 } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { defaultTeam } from "@/lib/blocks/defaults"
import { cn } from "@/lib/utils"

export type TeamMember = {
  name: string
  role: string
  initials: string
}

export type TeamGridProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  members?: TeamMember[]
  className?: string
}

export function TeamGrid({
  eyebrow = "Team",
  headline = "Understand expectations, then delight customers completely",
  subhead = "Whether you're building a startup landing page or a modern web app, we give you full control.",
  members = defaultTeam,
  className,
}: TeamGridProps) {
  return (
    <section className={cn("nimbus-section", className)}>
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <Card key={member.name} className="text-center shadow-sm">
              <CardContent className="space-y-4 pt-6">
                <Avatar className="mx-auto size-16">
                  <AvatarFallback className="text-lg">{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <div className="flex justify-center gap-2">
                  <a
                    href="#"
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Share2 className="size-4" />
                  </a>
                  <a
                    href="#"
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={`${member.name} on social`}
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
