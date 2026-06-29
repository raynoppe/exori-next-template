import Link from "next/link"
import { Clock } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ButtonLink } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts, defaultFaqItems, privacySections } from "@/lib/content/posts"
import { cn } from "@/lib/utils"

export type BlogPost = {
  slug?: string
  title: string
  excerpt: string
  author: string
  role: string
  readTime: string
  timeAgo: string
  initials: string
}

export type BlogHighlightsProps = {
  eyebrow?: string
  headline?: string
  subhead?: string
  posts?: BlogPost[]
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function BlogHighlights({
  eyebrow = "Blog",
  headline = "Stay informed with our latest blog entries",
  subhead = "New blog articles, insights, and updates here.",
  posts = blogPosts,
  ctaLabel = "Check out for more blog",
  ctaHref = "/blog",
  className,
}: BlogHighlightsProps) {
  return (
    <section className={cn("nimbus-section", className)}>
      <div className="nimbus-container space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {headline}
            </h2>
            <p className="text-muted-foreground">{subhead}</p>
          </div>
          <ButtonLink variant="outline" href={ctaHref}>
            {ctaLabel}
          </ButtonLink>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} className="shadow-sm">
              <CardContent className="space-y-4 pt-6">
                <div className="nimbus-gradient-card aspect-[16/10] rounded-lg border" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{post.timeAgo}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold leading-snug">
                  <Link
                    href={`/blog/${post.slug ?? ""}`}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">{post.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
