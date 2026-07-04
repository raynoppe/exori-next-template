import { prisma } from "@/lib/prisma"
import type { CollectionEntry } from "@/lib/generated/prisma/client"

/** Data access for collection directories. Published entries only — drafts
 * exist so registration/admin flows can stage profiles before they go live. */

export async function listEntries(collection: string): Promise<CollectionEntry[]> {
  return prisma.collectionEntry.findMany({
    where: { collection, status: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
  })
}

export async function getEntry(collection: string, slug: string): Promise<CollectionEntry | null> {
  return prisma.collectionEntry.findFirst({
    where: { collection, slug, status: "PUBLISHED" },
  })
}

/** String/tag values out of the flexible `fields` JSON, ready to render. */
export function entryFieldValue(entry: CollectionEntry, name: string): string | string[] | null {
  const fields = entry.fields as Record<string, unknown> | null
  const value = fields?.[name]
  if (typeof value === "string" && value.trim()) return value
  if (Array.isArray(value)) {
    const items = value.filter((v): v is string => typeof v === "string" && !!v.trim())
    return items.length ? items : null
  }
  return null
}

export function entryInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?"
}
