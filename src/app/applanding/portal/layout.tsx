import { PortalNav } from "@/components/applanding/portal-nav";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[60vh] flex-1 flex-col lg:flex-row">
      <PortalNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
