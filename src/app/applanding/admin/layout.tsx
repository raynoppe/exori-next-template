import { ApplandingAdminNav } from "@/components/applanding/admin-nav";

export default function ApplandingAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[60vh] flex-1 flex-col lg:flex-row">
      <ApplandingAdminNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
