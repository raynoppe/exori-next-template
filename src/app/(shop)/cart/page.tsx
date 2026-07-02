import { CartSummary } from "@/components/blocks/commerce/cart-summary";
import { getResolvedCart } from "@/lib/commerce/cart";
import {
  computeTotals,
  getActiveShippingMethods,
  getDefaultTaxRate,
} from "@/lib/commerce/pricing";

export default async function CartPage() {
  const items = await getResolvedCart();
  const [shippingMethods, taxRate] = await Promise.all([
    getActiveShippingMethods(),
    getDefaultTaxRate(),
  ]);

  const defaultShipping = shippingMethods[0];
  const totals =
    items.length > 0 && defaultShipping && taxRate
      ? computeTotals(items, defaultShipping, taxRate)
      : {
          subtotalCents: 0,
          shippingCents: 0,
          taxCents: 0,
          totalCents: 0,
          currency: "usd",
        };

  return <CartSummary items={items} totals={totals} />;
}
