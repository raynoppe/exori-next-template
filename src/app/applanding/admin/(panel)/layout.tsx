import { requireApplandingAdmin } from "@/lib/applanding/require-auth";

export default async function ApplandingAdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireApplandingAdmin();

  return children;
}
