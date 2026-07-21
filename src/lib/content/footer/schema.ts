import { z } from "zod";

/** JSON shape for `src/app/<tier>/_settings/footer.json` — edited in the Exori app. */
export const footerLinkSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const footerColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(footerLinkSchema).min(1),
});

export const footerConfigSchema = z.object({
  brandName: z.string().min(1),
  brandHref: z.string().min(1),
  phone: z.string().min(1).optional(),
  email: z.string().min(1).optional(),
  showNewsletter: z.boolean().optional(),
  newsletterHeadline: z.string().min(1).optional(),
  newsletterSubhead: z.string().min(1).optional(),
  copyright: z.string().min(1),
  columns: z.array(footerColumnSchema).min(1),
});

export type FooterConfig = z.infer<typeof footerConfigSchema>;
export type FooterColumn = z.infer<typeof footerColumnSchema>;
export type FooterLink = z.infer<typeof footerLinkSchema>;

export type FooterTier = "applanding";
