import applandingManifest from "@/app/applanding/manifest.json";
import {
  templateManifestSchema,
  type TemplateManifest,
  type TemplateSection,
  type TemplateTier,
} from "./schema";

/**
 * Template manifests live at `src/app/<tier>/manifest.json`.
 * Lists every section (blog, about, portal, admin, etc.) with routes,
 * data sources, and build instructions for Exori.
 */
const manifestByTier = {
  applanding: templateManifestSchema.parse(applandingManifest),
} satisfies Record<TemplateTier, TemplateManifest>;

export function getTemplateManifest(tier: TemplateTier): TemplateManifest {
  return manifestByTier[tier];
}

export function getTemplateSections(
  tier: TemplateTier,
  type?: TemplateSection["type"],
): TemplateSection[] {
  const manifest = getTemplateManifest(tier);

  if (!type) {
    return manifest.sections;
  }

  return manifest.sections.filter((section) => section.type === type);
}

export {
  templateManifestSchema,
  templateSectionSchema,
  type TemplateManifest,
  type TemplateSection,
  type TemplateTier,
} from "./schema";
