import { CollectionDetailPage } from "@/components/directory/collection-detail-page"

// Profiles are database-backed — always render on request (see members/page.tsx).
export const dynamic = "force-dynamic"

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <CollectionDetailPage collectionId="members" slug={slug} />
}
