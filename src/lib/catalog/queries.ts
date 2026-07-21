import { prisma } from "@/lib/prisma";
import type { CatalogItemType } from "@/lib/generated/prisma/client";

export async function getCatalogItems(type?: CatalogItemType) {
  return prisma.catalogItem.findMany({
    where: {
      status: "PUBLISHED",
      ...(type ? { type } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getAllCatalogItemsAdmin() {
  return prisma.catalogItem.findMany({
    orderBy: [{ type: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getCatalogItemBySlug(type: CatalogItemType, slug: string) {
  return prisma.catalogItem.findUnique({
    where: { type_slug: { type, slug } },
  });
}

export async function getCatalogItemById(id: string) {
  return prisma.catalogItem.findUnique({ where: { id } });
}
