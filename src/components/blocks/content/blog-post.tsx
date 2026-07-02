import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type BlogPostData = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  role: string;
  initials: string;
  readTime: string;
  timeAgo: string;
};

export type BlogPostProps = {
  post: BlogPostData;
  className?: string;
};

export function BlogPost({ post, className }: BlogPostProps) {
  return (
    <article className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container max-w-3xl space-y-8">
        <header className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {post.timeAgo} · {post.readTime}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{post.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.role}</p>
            </div>
          </div>
        </header>
        <div className="nimbus-gradient-card aspect-[16/9] rounded-xl border" />
        <div className="prose prose-neutral max-w-none space-y-4 dark:prose-invert">
          {post.body.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="text-sm">
          <Link href="/blog" className="text-primary hover:underline">
            ← Back to blog
          </Link>
        </p>
      </div>
    </article>
  );
}
