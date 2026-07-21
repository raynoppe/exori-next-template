import { CheckoutSummary } from "@/components/blocks/commerce/checkout-summary";
import { auth } from "@/auth";
import { getResolvedCart } from "@/lib/commerce/cart";
import {
  computeTotals,
  getActiveShippingMethods,
  getDefaultTaxRate,
} from "@/lib/commerce/pricing";

export default async function CheckoutPage() {
  const session = await auth();
  const items = await getResolvedCart();
  const [shippingMethods, taxRate] = await Promise.all([
    getActiveShippingMethods(),
    getDefaultTaxRate(),
  ]);

  const totalsByShipping: Record<string, ReturnType<typeof computeTotals>> = {};

  if (taxRate) {
    for (const method of shippingMethods) {
      totalsByShipping[method.id] = computeTotals(items, method, taxRate);
    }
  }

  return (
    <CheckoutSummary
      items={items}
      shippingMethods={shippingMethods}
      defaultEmail={session?.user?.email ?? ""}
      totalsByShipping={totalsByShipping}
    />
  );
}
