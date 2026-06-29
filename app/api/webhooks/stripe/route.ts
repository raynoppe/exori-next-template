import { NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  getOrderByStripeSession,
  markOrderPaid,
} from "@/lib/commerce/orders";
import { getStripe } from "@/lib/commerce/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await markOrderPaid(
        orderId,
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id
      );
    } else if (session.id) {
      const order = await getOrderByStripeSession(session.id);
      if (order) {
        await markOrderPaid(
          order.id,
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
