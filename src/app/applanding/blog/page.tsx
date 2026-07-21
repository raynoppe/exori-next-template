import Link from "next/link";

import { CtaBand } from "@/components/blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listPosts } from "@/lib/applanding/blog";

export const dynamic = "force-dynamic";

type BlogPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const q = params.q ?? "";
  const page = Number(params.page ?? "1") || 1;
  const { posts, totalPages, page: currentPage } = await listPosts({
    search: q,
    page,
  });

  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Blog
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Insights, updates, and stories
            </h1>
            <p className="text-lg text-muted-foreground">
              Product thinking, growth tactics, and lessons from teams building
              modern apps.
            </p>
          </div>
          <form className="flex gap-2" action="/applanding/blog" method="get">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search posts..."
              className="flex h-10 w-full max-w-md rounded-lg border border-input bg-background px-3 text-sm"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="nimbus-section-sm pt-0">
        <div className="nimbus-container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts found.</p>
          ) : (
            posts.map((post) => (
              <Link key={post.id} href={`/applanding/blog/${post.slug}`}>
                <Card className="h-full transition-colors hover:bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>{post.blurb}</p>
                    <p>
                      {post.author} · {post.readTime}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {totalPages > 1 ? (
          <div className="nimbus-container mt-8 flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/applanding/blog?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className={
                  p === currentPage
                    ? "rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
                    : "rounded-lg border px-3 py-1 text-sm hover:bg-muted"
                }
              >
                {p}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <CtaBand />
    </>
  );
}
