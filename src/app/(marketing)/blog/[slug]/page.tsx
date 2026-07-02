import { notFound } from "next/navigation";

import { BlogPost } from "@/components/blocks/content/blog-post";
import { getBlogPost } from "@/lib/content/posts";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return <BlogPost post={post} />;
}
