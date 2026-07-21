import { requirePortalUser } from "@/lib/applanding/require-auth";

export default async function ProtectedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePortalUser();

  return children;
}
