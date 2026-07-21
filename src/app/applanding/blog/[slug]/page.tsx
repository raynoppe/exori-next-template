import { notFound } from "next/navigation";

import { BlogPost } from "@/components/blocks";
import { blogPostToBlockProps, getPostBySlug } from "@/lib/applanding/blog";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={blogPostToBlockProps(post)} />;
}
