import { NavHeader } from "@/components/blocks/layout/nav-header";
import { SiteFooterPro } from "@/components/blocks/layout/site-footer-pro";
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
      <NavHeader cartCount={count} />
      <main className="flex-1">{children}</main>
      <SiteFooterPro />
    </>
  );
}
