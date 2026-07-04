import type { Metadata } from "next"

import { CollectionListPage } from "@/components/directory/collection-list-page"

// Example collection route — the shape Exori's scripted build emits for every
// collection in src/lib/content/collections.ts (a directory at /<collection>
// plus profiles at /<collection>/[slug]).
export const metadata: Metadata = { title: "Members" }

// Directory content lives in the database — always render on request. Without
// this, `next build` would try to prerender the page and hit the DB at build
// time (which the standalone template build has no database for).
export const dynamic = "force-dynamic"

export default function MembersPage() {
  return <CollectionListPage collectionId="members" />
}
