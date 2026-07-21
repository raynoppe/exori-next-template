import type { ComponentType } from "react";

import type { CatalogItemType } from "@/lib/generated/prisma/client";

export type BlockRegistryEntry = {
  label: string;
  family: string;
  description?: string;
  tags?: string[];
  component: ComponentType;
};

export type NavigationRegistryEntry = {
  label: string;
  description?: string;
  tags?: string[];
  component: ComponentType;
};

export type PageLayoutRegistryEntry = {
  label: string;
  description?: string;
  liveRoute: string;
  orderedBlocks: string[];
  tags?: string[];
};

export function defaultPreviewUrl(type: CatalogItemType, slug: string) {
  switch (type) {
    case "BLOCK":
      return `/blocks/${slug}`;
    case "NAVIGATION":
      return `/navigation/${slug}`;
    case "PAGE_LAYOUT":
      return `/layouts/${slug}`;
  }
}
