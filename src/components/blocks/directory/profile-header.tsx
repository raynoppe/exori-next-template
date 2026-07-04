import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type ProfileDetail = {
  label: string
  value: string
  /** Render the value as a link (url/email fields). */
  href?: string
}

export type ProfileHeaderProps = {
  /** Collection singular ("Designer") — the eyebrow above the name. */
  eyebrow?: string
  name: string
  initials: string
  summary?: string | null
  meta?: string | null
  tags?: string[]
  details?: ProfileDetail[]
  backHref?: string
  backLabel?: string
  className?: string
}

export function ProfileHeader({
  eyebrow,
  name,
  initials,
  summary,
  meta,
  tags,
  details,
  backHref,
  backLabel = "Back to directory",
  className,
}: ProfileHeaderProps) {
  return (
    <section className={cn("nimbus-section", className)}>
      <div className="nimbus-container max-w-3xl space-y-8">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {backLabel}
          </Link>
        ) : null}

        <div className="flex items-start gap-5">
          <Avatar className="size-20">
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-sm font-medium uppercase tracking-wider text-primary">{eyebrow}</p>
            ) : null}
            <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
            {meta ? <p className="text-muted-foreground">{meta}</p> : null}
            {tags && tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {summary ? <p className="text-lg text-muted-foreground">{summary}</p> : null}

        {details && details.length > 0 ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-lg border p-4">
                <dt className="text-sm text-muted-foreground">{detail.label}</dt>
                <dd className="mt-1 font-medium">
                  {detail.href ? (
                    <a href={detail.href} className="text-primary hover:underline" rel="noopener noreferrer">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
