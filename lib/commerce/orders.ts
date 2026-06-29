import type { ResolvedCartLine } from "@/lib/commerce/cart";
import type { OrderTotals } from "@/lib/commerce/pricing";
import type { OrderStatus, Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type ShippingAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NB-${ts}-${rand}`;
}

export async function createPendingOrder(input: {
  userId?: string | null;
  email: string;
  items: ResolvedCartLine[];
  totals: OrderTotals;
  shippingMethodName: string;
  shippingAddress: ShippingAddress;
}) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: input.userId ?? null,
        email: input.email,
        status: "PENDING",
        subtotalCents: input.totals.subtotalCents,
        shippingCents: input.totals.shippingCents,
        taxCents: input.totals.taxCents,
        totalCents: input.totals.totalCents,
        currency: input.totals.currency,
        shippingMethodName: input.shippingMethodName,
        shippingAddress: input.shippingAddress as Prisma.InputJsonValue,
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            priceCents: item.priceCents,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return order;
  });
}

export async function attachStripeSession(orderId: string, sessionId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { stripeSessionId: sessionId },
  });
}

export async function markOrderPaid(
  orderId: string,
  paymentIntentId?: string | null
) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || order.status !== "PENDING") {
      return order;
    }

    for (const item of order.items) {
      if (!item.productId) continue;
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return tx.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        stripePaymentIntentId: paymentIntentId ?? undefined,
      },
      include: { items: true },
    });
  });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true, user: true },
  });
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });
}

export async function getOrderByStripeSession(sessionId: string) {
  return prisma.order.findUnique({
    where: { stripeSessionId: sessionId },
    include: { items: true },
  });
}

export async function listOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function listAllOrders() {
  return prisma.order.findMany({
    include: { items: true, user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPaidRevenueCents() {
  const result = await prisma.order.aggregate({
    where: { status: { in: ["PAID", "FULFILLED"] } },
    _sum: { totalCents: true },
  });
  return result._sum.totalCents ?? 0;
}
