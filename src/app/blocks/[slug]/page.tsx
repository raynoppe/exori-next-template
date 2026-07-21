import { notFound } from "next/navigation";

import { getBlockComponent } from "@/lib/catalog/registry";

type BlockPreviewPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlockPreviewPage({ params }: BlockPreviewPageProps) {
  const { slug } = await params;
  const Block = getBlockComponent(slug);

  if (!Block) {
    notFound();
  }

  return <Block />;
}
