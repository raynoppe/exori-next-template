"use client";

import Link from "next/link";
import { useTransition } from "react";

import {
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/app/(shop)/cart/actions";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResolvedCartLine } from "@/lib/commerce/cart";
import type { OrderTotals } from "@/lib/commerce/pricing";
import { formatCents } from "@/lib/commerce/stripe";
import { cn } from "@/lib/utils";

export type CartSummaryProps = {
  items: ResolvedCartLine[];
  totals: OrderTotals;
  className?: string;
};

export function CartSummary({ items, totals, className }: CartSummaryProps) {
  const [isPending, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <section className={cn("nimbus-section-sm", className)}>
        <div className="nimbus-container max-w-2xl space-y-4 text-center">
          <h1 className="text-3xl font-semibold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Browse the shop and add something you like.
          </p>
          <ButtonLink href="/shop">Continue shopping</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
          {items.map((item) => (
            <Card key={item.productId}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">
                  <Link href={`/shop/${item.slug}`} className="hover:text-primary">
                    {item.name}
                  </Link>
                </CardTitle>
                <p className="font-medium">
                  {formatCents(item.priceCents * item.quantity, item.currency)}
                </p>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await updateCartQuantityAction(
                          item.productId,
                          item.quantity - 1
                        );
                      });
                    }}
                  >
                    −
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending || item.quantity >= item.stock}
                    onClick={() => {
                      startTransition(async () => {
                        await updateCartQuantityAction(
                          item.productId,
                          item.quantity + 1
                        );
                      });
                    }}
                  >
                    +
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={isPending}
                  onClick={() => {
                    startTransition(async () => {
                      await removeFromCartAction(item.productId);
                    });
                  }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCents(totals.subtotalCents, totals.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {totals.shippingCents === 0
                  ? "Free"
                  : formatCents(totals.shippingCents, totals.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCents(totals.taxCents, totals.currency)}</span>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatCents(totals.totalCents, totals.currency)}</span>
            </div>
            <ButtonLink className="mt-4 w-full" href="/checkout">
              Proceed to checkout
            </ButtonLink>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
