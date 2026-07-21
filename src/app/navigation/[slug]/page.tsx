import { notFound } from "next/navigation";

import { getNavigationComponent } from "@/lib/catalog/registry";

type NavigationPreviewPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NavigationPreviewPage({
  params,
}: NavigationPreviewPageProps) {
  const { slug } = await params;
  const Nav = getNavigationComponent(slug);

  if (!Nav) {
    notFound();
  }

  return (
    <div>
      <Nav />
      <div className="nimbus-container py-16 text-sm text-muted-foreground">
        Navigation preview — scroll to see sticky behavior.
      </div>
      <div className="h-[120vh]" />
    </div>
  );
}
