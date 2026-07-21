import { z } from "zod";

/** JSON shape for `src/lib/content/navigation/<tier>.json` — edited in the Exori app. */
export const navChildLinkSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1).optional(),
  children: z.array(navChildLinkSchema).optional(),
});

export const navigationConfigSchema = z.object({
  /** Which nav block component to render. */
  variant: z.enum(["nav-header", "nav-centered"]).default("nav-header"),
  brandName: z.string().min(1).optional(),
  links: z.array(navLinkSchema).min(1),
  ctaLabel: z.string().min(1).optional(),
  ctaHref: z.string().min(1).optional(),
  showAuthButtons: z.boolean().optional(),
  defaultTheme: z.enum(["light", "dark"]).optional(),
});

export type NavigationConfig = z.infer<typeof navigationConfigSchema>;
export type NavigationLink = z.infer<typeof navLinkSchema>;
export type NavigationChildLink = z.infer<typeof navChildLinkSchema>;

export type NavigationTier = "applanding";
