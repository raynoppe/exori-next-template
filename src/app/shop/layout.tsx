import { NavHeader } from "@/components/blocks";
import { SiteFooterPro } from "@/components/blocks/layout/site-footer-pro";
import { CartNavBadge } from "@/components/commerce/cart-nav-badge";
import { cartItemCount, readCartCookie } from "@/lib/commerce/cart";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lines = await readCartCookie();
  const count = cartItemCount(lines);

  return (
    <>
      <NavHeader cartSlot={<CartNavBadge count={count} />} />
      <main className="flex-1">{children}</main>
      <SiteFooterPro />
    </>
  );
}
