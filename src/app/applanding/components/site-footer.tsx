import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { FooterLinkColumns } from "@/components/blocks/footer/footer-link-columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFooterConfig } from "@/lib/content/footer";

const footer = getFooterConfig("applanding");

/**
 * Applanding site footer — edit layout and copy here.
 * Link columns are driven by `src/app/applanding/_settings/footer.json`.
 */
export function ApplandingSiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="nimbus-container space-y-12 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-6">
            <Link href={footer.brandHref} className="text-xl font-semibold">
              {footer.brandName}
            </Link>
            {footer.phone || footer.email ? (
              <div className="space-y-3 text-sm text-muted-foreground">
                {footer.phone ? (
                  <p className="flex items-center gap-2">
                    <Phone className="size-4" />
                    {footer.phone}
                  </p>
                ) : null}
                {footer.email ? (
                  <p className="flex items-center gap-2">
                    <Mail className="size-4" />
                    {footer.email}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          {footer.showNewsletter !== false ? (
            <div className="space-y-4">
              <div>
                <p className="font-medium">
                  {footer.newsletterHeadline ??
                    "Our newsletter delivers fresh updates to your inbox"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {footer.newsletterSubhead ??
                    "A weekly digest of latest news, articles and resources"}
                </p>
              </div>
              <form className="flex gap-2" action="#">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-sm"
                  aria-label="Email for newsletter"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          ) : null}
        </div>

        <FooterLinkColumns columns={footer.columns} />

        <div className="border-t pt-6 text-sm text-muted-foreground">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
