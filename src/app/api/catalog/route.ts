import { NextResponse } from "next/server";

import { getCatalogItems } from "@/lib/catalog/queries";
import type { CatalogItemType } from "@/lib/generated/prisma/client";

const typeMap: Record<string, CatalogItemType> = {
  block: "BLOCK",
  blocks: "BLOCK",
  layout: "PAGE_LAYOUT",
  layouts: "PAGE_LAYOUT",
  navigation: "NAVIGATION",
  nav: "NAVIGATION",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type")?.toLowerCase();
  const type = typeParam ? typeMap[typeParam] : undefined;

  if (typeParam && !type) {
    return NextResponse.json(
      { error: "Invalid type. Use block, layout, or navigation." },
      { status: 400 },
    );
  }

  const items = await getCatalogItems(type);

  return NextResponse.json({
    items: items.map((item) => ({
      id: item.id,
      type: item.type,
      slug: item.slug,
      name: item.name,
      description: item.description,
      family: item.family,
      componentId: item.componentId,
      previewUrl: item.previewUrl,
      screenshotUrl: item.screenshotUrl,
      tags: item.tags,
      sortOrder: item.sortOrder,
      status: item.status,
    })),
  });
}
