import { prisma } from "@/lib/prisma";
import type { CatalogItemType } from "@/lib/generated/prisma/client";

import { getAllRegistryMetaEntries } from "./registry-meta";
import { defaultPreviewUrl } from "./types";

function registryFamily(
  type: CatalogItemType,
  entry: (typeof getAllRegistryMetaEntries)[number]["entry"],
) {
  if (type === "BLOCK" && "family" in entry) return entry.family;
  return null;
}

export async function syncCatalogFromRegistry() {
  const entries = getAllRegistryMetaEntries();
  let created = 0;
  let updated = 0;

  for (const { type, slug, entry } of entries) {
    const existing = await prisma.catalogItem.findUnique({
      where: { type_slug: { type, slug } },
    });

    const name = entry.label;
    const description = entry.description ?? null;
    const family = registryFamily(type, entry);
    const tags = entry.tags ?? [];
    const componentId = type === "BLOCK" || type === "NAVIGATION" ? slug : null;
    const previewUrl = defaultPreviewUrl(type, slug);

    if (existing) {
      await prisma.catalogItem.update({
        where: { id: existing.id },
        data: {
          name,
          description,
          family,
          componentId,
          tags,
          previewUrl: existing.previewUrl ?? previewUrl,
        },
      });
      updated += 1;
    } else {
      await prisma.catalogItem.create({
        data: {
          type,
          slug,
          name,
          description,
          family,
          componentId,
          tags,
          previewUrl,
        },
      });
      created += 1;
    }
  }

  return { created, updated, total: entries.length };
}

export function getUnmappedRegistrySlugs(
  dbItems: { type: CatalogItemType; slug: string }[],
) {
  const dbKeys = new Set(dbItems.map((item) => `${item.type}:${item.slug}`));

  return getAllRegistryMetaEntries().filter(
    ({ type, slug }) => !dbKeys.has(`${type}:${slug}`),
  );
}
