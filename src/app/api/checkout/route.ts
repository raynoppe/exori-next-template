import { NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  getResolvedCart,
  readCartCookie,
} from "@/lib/commerce/cart";
import {
  attachStripeSession,
  createPendingOrder,
} from "@/lib/commerce/orders";
import {
  computeTotals,
  getDefaultTaxRate,
  getShippingMethodById,
} from "@/lib/commerce/pricing";
import { getBaseUrl, getStripe } from "@/lib/commerce/stripe";
import { checkoutSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const items = await getResolvedCart();
    if (items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
    }

    const shippingMethod = await getShippingMethodById(
      parsed.data.shippingMethodId
    );
    if (!shippingMethod) {
      return NextResponse.json(
        { error: "Invalid shipping method" },
        { status: 400 }
      );
    }

    const taxRate = await getDefaultTaxRate();
    if (!taxRate) {
      return NextResponse.json(
        { error: "No tax rate configured" },
        { status: 500 }
      );
    }

    const totals = computeTotals(items, shippingMethod, taxRate);
    const session = await auth();
    const order = await createPendingOrder({
      userId: session?.user?.id ?? null,
      email: parsed.data.email,
      items,
      totals,
      shippingMethodName: shippingMethod.name,
      shippingAddress: parsed.data.shippingAddress,
    });

    const baseUrl = getBaseUrl();
    const stripe = getStripe();

    const lineItems = [
      ...items.map((item) => ({
        price_data: {
          currency: item.currency,
          product_data: { name: item.name },
          unit_amount: item.priceCents,
        },
        quantity: item.quantity,
      })),
      ...(totals.shippingCents > 0
        ? [
            {
              price_data: {
                currency: totals.currency,
                product_data: { name: `Shipping: ${shippingMethod.name}` },
                unit_amount: totals.shippingCents,
              },
              quantity: 1,
            },
          ]
        : []),
      ...(totals.taxCents > 0
        ? [
            {
              price_data: {
                currency: totals.currency,
                product_data: { name: `Tax: ${taxRate.name}` },
                unit_amount: totals.taxCents,
              },
              quantity: 1,
            },
          ]
        : []),
    ];

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.email,
      line_items: lineItems,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    await attachStripeSession(order.id, checkoutSession.id);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed. Please try again." },
      { status: 500 }
    );
  }
}

// Export for tests
export { readCartCookie };
