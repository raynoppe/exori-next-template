import type { ReactNode } from "react";

/** A single nav destination. */
export type NavChildLink = {
  href: string;
  label: string;
};

/**
 * Top-level nav item. Pass `children` for a submenu (e.g. Shop → Mobiles, Tablets).
 * `href` on a parent is optional — use it when the label should also link to a landing page.
 */
export type NavLink = {
  label: string;
  href?: string;
  children?: NavChildLink[];
};

export type NavTheme = "light" | "dark";

export type BaseNavProps = {
  brandName?: string;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Show Sign in and Register buttons. Defaults to true. */
  showAuthButtons?: boolean;
  /** Initial theme when the visitor has no saved preference. Defaults to system preference. */
  defaultTheme?: NavTheme;
  cartSlot?: ReactNode;
  className?: string;
};
