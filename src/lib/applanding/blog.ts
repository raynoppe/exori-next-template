import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 6;

export async function listPosts(options: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = options.pageSize ?? PAGE_SIZE;
  const search = options.search?.trim();

  const where = {
    status: "PUBLISHED" as const,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { blurb: { contains: search, mode: "insensitive" as const } },
            { content: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    posts,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}

export function blogPostToBlockProps(post: {
  slug: string;
  title: string;
  blurb: string;
  content: string;
  author: string;
  readTime: string;
  publishedAt: Date;
  previewImage: string | null;
}) {
  const initials = post.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.blurb,
    body: post.content,
    author: post.author,
    role: "Nimbus Team",
    initials,
    readTime: post.readTime,
    timeAgo: post.publishedAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    image: post.previewImage ?? undefined,
  };
}
