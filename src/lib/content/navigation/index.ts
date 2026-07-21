import applandingNavigation from "@/app/applanding/_settings/navigation.json";
import {
  navigationConfigSchema,
  type NavigationConfig,
  type NavigationTier,
} from "./schema";

/**
 * Static navigation configs for tiers that do not use the database.
 * Each tier keeps its file at `src/app/<tier>/_settings/navigation.json`.
 * Exori overwrites that file when a client edits nav in the app.
 */
const navigationByTier = {
  applanding: navigationConfigSchema.parse(applandingNavigation),
} satisfies Record<NavigationTier, NavigationConfig>;

export function getNavigationConfig(tier: NavigationTier): NavigationConfig {
  return navigationByTier[tier];
}

export {
  navigationConfigSchema,
  navLinkSchema,
  navChildLinkSchema,
  type NavigationConfig,
  type NavigationLink,
  type NavigationChildLink,
  type NavigationTier,
} from "./schema";
