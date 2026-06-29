import { prisma } from "@/lib/prisma";
import type { ProductStatus } from "@/lib/generated/prisma/client";

export async function listActiveProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
}) {
  return prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(options?.featured ? { featured: true } : {}),
      ...(options?.categorySlug
        ? { category: { slug: options.categorySlug } }
        : {}),
    },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, status: "ACTIVE" },
    include: { category: true },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function listCategories() {
  return prisma.productCategory.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function listAllProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function listProductsByStatus(status?: ProductStatus) {
  return prisma.product.findMany({
    where: status ? { status } : undefined,
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });
}
