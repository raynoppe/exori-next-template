import { NavCentered } from "./nav-centered/nav-centered";
import { NavHeader } from "./nav-header/nav-header";
import type { NavigationConfig } from "@/lib/content/navigation/schema";

type SiteNavigationProps = {
  config: NavigationConfig;
};

/**
 * Renders the nav block chosen in navigation.json for a site tier.
 */
export function SiteNavigation({ config }: SiteNavigationProps) {
  const props = {
    brandName: config.brandName,
    links: config.links,
    ctaLabel: config.ctaLabel,
    ctaHref: config.ctaHref,
    showAuthButtons: config.showAuthButtons,
    defaultTheme: config.defaultTheme,
  };

  switch (config.variant) {
    case "nav-centered":
      return <NavCentered {...props} />;
    case "nav-header":
    default:
      return <NavHeader {...props} />;
  }
}
