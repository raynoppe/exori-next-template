import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type DirectoryCard = {
  slug: string
  name: string
  summary?: string | null
  initials: string
  /** Short secondary line (headline/role/location). */
  meta?: string | null
  tags?: string[]
  href: string
}

export type DirectoryGridProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  entries: DirectoryCard[]
  /** Shown when the directory has no published entries yet. */
  emptyMessage?: string
  className?: string
}

export function DirectoryGrid({
  eyebrow = "Directory",
  headline = "Browse the directory",
  subhead,
  entries,
  emptyMessage = "No entries yet — be the first to join.",
  className,
}: DirectoryGridProps) {
  return (
    <section className={cn("nimbus-section", className)}>
      <div className="nimbus-container space-y-10">
        <div className="max-w-2xl space-y-3 text-center mx-auto">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h1>
          {subhead ? <p className="text-muted-foreground">{subhead}</p> : null}
        </div>

        {entries.length === 0 ? (
          <p className="text-center text-muted-foreground">{emptyMessage}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <Link key={entry.slug} href={entry.href} className="group">
                <Card className="h-full shadow-sm transition-shadow group-hover:shadow-md">
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarFallback>{entry.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold group-hover:text-primary">{entry.name}</p>
                        {entry.meta ? (
                          <p className="text-sm text-muted-foreground">{entry.meta}</p>
                        ) : null}
                      </div>
                    </div>
                    {entry.summary ? (
                      <p className="text-sm text-muted-foreground line-clamp-3">{entry.summary}</p>
                    ) : null}
                    {entry.tags && entry.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
