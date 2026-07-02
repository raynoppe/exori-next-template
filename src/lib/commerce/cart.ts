import { cookies } from "next/headers";

import { getProductById } from "@/lib/commerce/products";

export const CART_COOKIE = "nimbus-cart";

export type CartLine = {
  productId: string;
  quantity: number;
};

export type ResolvedCartLine = {
  productId: string;
  quantity: number;
  name: string;
  priceCents: number;
  currency: string;
  stock: number;
  slug: string;
};

export async function readCartCookie(): Promise<CartLine[]> {
  const store = await cookies();
  const raw = store.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        typeof line.productId === "string" &&
        typeof line.quantity === "number" &&
        line.quantity > 0
    );
  } catch {
    return [];
  }
}

export async function writeCartCookie(lines: CartLine[]) {
  const store = await cookies();
  store.set(CART_COOKIE, JSON.stringify(lines), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearCartCookie() {
  const store = await cookies();
  store.delete(CART_COOKIE);
}

export async function resolveCart(lines: CartLine[]): Promise<ResolvedCartLine[]> {
  const resolved: ResolvedCartLine[] = [];

  for (const line of lines) {
    const product = await getProductById(line.productId);
    if (!product || product.status !== "ACTIVE") continue;
    const quantity = Math.min(line.quantity, product.stock);
    if (quantity <= 0) continue;
    resolved.push({
      productId: product.id,
      quantity,
      name: product.name,
      priceCents: product.priceCents,
      currency: product.currency,
      stock: product.stock,
      slug: product.slug,
    });
  }

  return resolved;
}

export async function getResolvedCart() {
  const lines = await readCartCookie();
  return resolveCart(lines);
}

export function cartItemCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}
