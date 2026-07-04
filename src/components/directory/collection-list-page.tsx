import { notFound } from "next/navigation"

import { DirectoryGrid, type DirectoryCard } from "@/components/blocks/directory/directory-grid"
import { getCollection } from "@/lib/content/collections"
import { entryFieldValue, entryInitials, listEntries } from "@/lib/directory/entries"

/**
 * Generic directory page for one collection. Exori's scripted build emits a
 * one-line route wrapper per collection:
 *
 *   src/app/(marketing)/designers/page.tsx
 *   → <CollectionListPage collectionId="designers" />
 *
 * Everything it renders is driven by src/lib/content/collections.ts + the
 * CollectionEntry table — adding a collection needs no new components.
 */
export async function CollectionListPage({
  collectionId,
  headline,
  subhead,
}: {
  collectionId: string
  /** Optional copy overrides from the build manifest's page brief. */
  headline?: string
  subhead?: string
}) {
  const collection = getCollection(collectionId)
  if (!collection) notFound()

  const entries = await listEntries(collection.id)
  const cards: DirectoryCard[] = entries.map((entry) => {
    const meta = entryFieldValue(entry, "headline") ?? entryFieldValue(entry, "location")
    const tags = collection.fields
      .filter((f) => f.type === "tags")
      .flatMap((f) => {
        const value = entryFieldValue(entry, f.name)
        return Array.isArray(value) ? value : []
      })
    return {
      slug: entry.slug,
      name: entry.name,
      summary: entry.summary,
      initials: entryInitials(entry.name),
      meta: typeof meta === "string" ? meta : null,
      tags,
      href: `/${collection.id}/${entry.slug}`,
    }
  })

  return (
    <DirectoryGrid
      eyebrow={collection.label}
      headline={headline ?? `Meet our ${collection.label.toLowerCase()}`}
      subhead={subhead ?? collection.description}
      entries={cards}
      emptyMessage={`No ${collection.label.toLowerCase()} yet — be the first to join.`}
    />
  )
}
