"use server";

import { revalidatePath } from "next/cache";

import {
  type CartLine,
  clearCartCookie,
  readCartCookie,
  writeCartCookie,
} from "@/lib/commerce/cart";

export async function getCartAction() {
  return readCartCookie();
}

export async function setCartAction(lines: CartLine[]) {
  await writeCartCookie(lines);
  revalidatePath("/cart");
  revalidatePath("/shop");
}

export async function addToCartAction(productId: string, quantity = 1) {
  const lines = await readCartCookie();
  const existing = lines.find((line) => line.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({ productId, quantity });
  }

  await writeCartCookie(lines);
  revalidatePath("/cart");
  revalidatePath("/shop");
}

export async function updateCartQuantityAction(
  productId: string,
  quantity: number
) {
  const lines = await readCartCookie();

  if (quantity <= 0) {
    await writeCartCookie(lines.filter((line) => line.productId !== productId));
  } else {
    await writeCartCookie(
      lines.map((line) =>
        line.productId === productId ? { ...line, quantity } : line
      )
    );
  }

  revalidatePath("/cart");
}

export async function removeFromCartAction(productId: string) {
  const lines = await readCartCookie();
  await writeCartCookie(lines.filter((line) => line.productId !== productId));
  revalidatePath("/cart");
}

export async function clearCartAction() {
  await clearCartCookie();
  revalidatePath("/cart");
}
