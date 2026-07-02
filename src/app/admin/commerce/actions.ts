"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";
import {
  categorySchema,
  productSchema,
  shippingMethodSchema,
  taxRateSchema,
} from "@/lib/validations";

export async function createCategoryAction(formData: FormData) {
  await requireAdmin();
  const parsed = categorySchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  await prisma.productCategory.create({ data: parsed.data });
  revalidatePath("/admin/categories");
}

export async function updateCategoryAction(id: string, formData: FormData) {
  await requireAdmin();
  const parsed = categorySchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  await prisma.productCategory.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();
  await prisma.productCategory.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();
  const imagesRaw = String(formData.get("images") ?? "");
  const parsed = productSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description"),
    longDescription: formData.get("longDescription") || undefined,
    priceCents: formData.get("priceCents"),
    currency: formData.get("currency") || "usd",
    images: imagesRaw
      ? imagesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
      : [],
    categoryId: formData.get("categoryId") || null,
    stock: formData.get("stock"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  await prisma.product.create({ data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin();
  const imagesRaw = String(formData.get("images") ?? "");
  const parsed = productSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description"),
    longDescription: formData.get("longDescription") || undefined,
    priceCents: formData.get("priceCents"),
    currency: formData.get("currency") || "usd",
    images: imagesRaw
      ? imagesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
      : [],
    categoryId: formData.get("categoryId") || null,
    stock: formData.get("stock"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  await prisma.product.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function createShippingMethodAction(formData: FormData) {
  await requireAdmin();
  const parsed = shippingMethodSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    priceCents: formData.get("priceCents"),
    freeThresholdCents: formData.get("freeThresholdCents") || null,
    active: formData.get("active") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  await prisma.shippingMethod.create({ data: parsed.data });
  revalidatePath("/admin/shipping");
}

export async function updateShippingMethodAction(id: string, formData: FormData) {
  await requireAdmin();
  const parsed = shippingMethodSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    priceCents: formData.get("priceCents"),
    freeThresholdCents: formData.get("freeThresholdCents") || null,
    active: formData.get("active") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  await prisma.shippingMethod.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/shipping");
}

export async function deleteShippingMethodAction(id: string) {
  await requireAdmin();
  await prisma.shippingMethod.delete({ where: { id } });
  revalidatePath("/admin/shipping");
}

export async function createTaxRateAction(formData: FormData) {
  await requireAdmin();
  const parsed = taxRateSchema.safeParse({
    name: formData.get("name"),
    percent: formData.get("percent"),
    region: formData.get("region") || null,
    active: formData.get("active") === "on",
    isDefault: formData.get("isDefault") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  if (parsed.data.isDefault) {
    await prisma.taxRate.updateMany({ data: { isDefault: false } });
  }

  await prisma.taxRate.create({ data: parsed.data });
  revalidatePath("/admin/taxes");
}

export async function updateTaxRateAction(id: string, formData: FormData) {
  await requireAdmin();
  const parsed = taxRateSchema.safeParse({
    name: formData.get("name"),
    percent: formData.get("percent"),
    region: formData.get("region") || null,
    active: formData.get("active") === "on",
    isDefault: formData.get("isDefault") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  if (parsed.data.isDefault) {
    await prisma.taxRate.updateMany({
      where: { NOT: { id } },
      data: { isDefault: false },
    });
  }

  await prisma.taxRate.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/taxes");
}

export async function deleteTaxRateAction(id: string) {
  await requireAdmin();
  await prisma.taxRate.delete({ where: { id } });
  revalidatePath("/admin/taxes");
}

export async function updateOrderStatusAction(
  id: string,
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED" | "REFUNDED"
) {
  await requireAdmin();
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}

export async function refundOrderAction(id: string) {
  await requireAdmin();
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order?.stripePaymentIntentId) {
    throw new Error("No payment intent to refund");
  }

  const { getStripe } = await import("@/lib/commerce/stripe");
  await getStripe().refunds.create({
    payment_intent: order.stripePaymentIntentId,
  });

  await prisma.order.update({
    where: { id },
    data: { status: "REFUNDED" },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
