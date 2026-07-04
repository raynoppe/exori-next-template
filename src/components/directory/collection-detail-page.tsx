import { notFound } from "next/navigation"

import { ProfileHeader, type ProfileDetail } from "@/components/blocks/directory/profile-header"
import { getCollection } from "@/lib/content/collections"
import { entryFieldValue, entryInitials, getEntry } from "@/lib/directory/entries"

/**
 * Generic detail/profile page for one collection entry. Exori's scripted
 * build emits the dynamic route wrapper per collection:
 *
 *   src/app/(marketing)/designers/[slug]/page.tsx
 *   → <CollectionDetailPage collectionId="designers" slug={params.slug} />
 *
 * Field rendering is driven by the collection's field config: tags become
 * badges, urls/emails become links, everything else a labeled detail card.
 */
export async function CollectionDetailPage({
  collectionId,
  slug,
}: {
  collectionId: string
  slug: string
}) {
  const collection = getCollection(collectionId)
  if (!collection) notFound()

  const entry = await getEntry(collection.id, slug)
  if (!entry) notFound()

  const meta = entryFieldValue(entry, "headline") ?? entryFieldValue(entry, "location")
  const tags = collection.fields
    .filter((f) => f.type === "tags")
    .flatMap((f) => {
      const value = entryFieldValue(entry, f.name)
      return Array.isArray(value) ? value : []
    })

  const details: ProfileDetail[] = []
  for (const field of collection.fields) {
    if (field.type === "tags" || field.name === "headline") continue
    const value = entryFieldValue(entry, field.name)
    if (typeof value !== "string") continue
    if (field.type === "url") {
      details.push({ label: field.label, value, href: value })
    } else if (field.type === "email") {
      details.push({ label: field.label, value, href: `mailto:${value}` })
    } else if (field.type === "phone") {
      details.push({ label: field.label, value, href: `tel:${value}` })
    } else {
      details.push({ label: field.label, value })
    }
  }

  return (
    <ProfileHeader
      eyebrow={collection.singular}
      name={entry.name}
      initials={entryInitials(entry.name)}
      summary={entry.summary}
      meta={typeof meta === "string" ? meta : null}
      tags={tags}
      details={details}
      backHref={`/${collection.id}`}
      backLabel={`All ${collection.label.toLowerCase()}`}
    />
  )
}
