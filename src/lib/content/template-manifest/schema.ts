import { z } from "zod";

export const templateSectionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  route: z.string().min(1),
  folder: z.string(),
  type: z.enum(["marketing", "legal", "portal", "admin"]),
  optional: z.boolean(),
  dataSource: z.enum(["static", "database"]),
  models: z.array(z.string()).optional(),
  spec: z.string().optional(),
  parent: z.string().optional(),
  auth: z.enum(["required", "admin"]).optional(),
  description: z.string().min(1),
});

export const templateManifestSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  version: z.string().min(1),
  summary: z.string().min(1),
  defaultTheme: z.enum(["light", "dark"]).optional(),
  instructions: z.object({
    settings: z.string(),
    sections: z.string(),
    database: z.string(),
  }),
  settings: z.array(
    z.object({
      id: z.string(),
      path: z.string(),
      description: z.string(),
    }),
  ),
  staticContent: z.object({
    path: z.string(),
    files: z.array(z.string()).optional(),
    description: z.string(),
  }),
  components: z
    .object({
      layout: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  sections: z.array(templateSectionSchema).min(1),
  sectionTypes: z.record(z.string(), z.string()),
});

export type TemplateManifest = z.infer<typeof templateManifestSchema>;
export type TemplateSection = z.infer<typeof templateSectionSchema>;
export type TemplateTier = "applanding";
