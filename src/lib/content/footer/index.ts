import applandingFooter from "@/app/applanding/_settings/footer.json";
import {
  footerConfigSchema,
  type FooterConfig,
  type FooterTier,
} from "./schema";

/**
 * Static footer configs for tiers that do not use the database.
 * Each tier keeps its file at `src/app/<tier>/_settings/footer.json`.
 * Exori overwrites that file when a client edits footer links in the app.
 */
const footerByTier = {
  applanding: footerConfigSchema.parse(applandingFooter),
} satisfies Record<FooterTier, FooterConfig>;

export function getFooterConfig(tier: FooterTier): FooterConfig {
  return footerByTier[tier];
}

export {
  footerConfigSchema,
  footerColumnSchema,
  footerLinkSchema,
  type FooterConfig,
  type FooterColumn,
  type FooterLink,
  type FooterTier,
} from "./schema";
