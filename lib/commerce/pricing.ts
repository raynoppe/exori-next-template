import type { ResolvedCartLine } from "@/lib/commerce/cart";
import { prisma } from "@/lib/prisma";

export type ShippingMethodRecord = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  freeThresholdCents: number | null;
};

export type TaxRateRecord = {
  id: string;
  name: string;
  percent: number;
};

export type OrderTotals = {
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
};

export function computeSubtotal(items: ResolvedCartLine[]) {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

export function computeShippingCents(
  subtotalCents: number,
  method: ShippingMethodRecord
) {
  if (
    method.freeThresholdCents != null &&
    subtotalCents >= method.freeThresholdCents
  ) {
    return 0;
  }
  return method.priceCents;
}

export function computeTaxCents(subtotalCents: number, taxRate: TaxRateRecord) {
  return Math.round(subtotalCents * (taxRate.percent / 100));
}

export function computeTotals(
  items: ResolvedCartLine[],
  shippingMethod: ShippingMethodRecord,
  taxRate: TaxRateRecord
): OrderTotals {
  const subtotalCents = computeSubtotal(items);
  const shippingCents = computeShippingCents(subtotalCents, shippingMethod);
  const taxCents = computeTaxCents(subtotalCents, taxRate);
  const totalCents = subtotalCents + shippingCents + taxCents;
  const currency = items[0]?.currency ?? "usd";

  return { subtotalCents, shippingCents, taxCents, totalCents, currency };
}

export async function getActiveShippingMethods() {
  return prisma.shippingMethod.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getShippingMethodById(id: string) {
  return prisma.shippingMethod.findFirst({
    where: { id, active: true },
  });
}

export async function getDefaultTaxRate() {
  return prisma.taxRate.findFirst({
    where: { active: true, isDefault: true },
  });
}

export async function getTaxRateById(id: string) {
  return prisma.taxRate.findFirst({
    where: { id, active: true },
  });
}
