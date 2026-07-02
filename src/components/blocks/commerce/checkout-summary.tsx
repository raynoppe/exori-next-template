"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResolvedCartLine } from "@/lib/commerce/cart";
import type { OrderTotals } from "@/lib/commerce/pricing";
import { formatCents } from "@/lib/commerce/stripe";
import { cn } from "@/lib/utils";

type ShippingOption = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
};

export type CheckoutSummaryProps = {
  items: ResolvedCartLine[];
  shippingMethods: ShippingOption[];
  defaultEmail?: string;
  totalsByShipping: Record<string, OrderTotals>;
  className?: string;
};

export function CheckoutSummary({
  items,
  shippingMethods,
  defaultEmail = "",
  totalsByShipping,
  className,
}: CheckoutSummaryProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [shippingMethodId, setShippingMethodId] = useState(
    shippingMethods[0]?.id ?? ""
  );

  const totals = totalsByShipping[shippingMethodId];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") ?? ""),
      shippingMethodId,
      shippingAddress: {
        name: String(form.get("name") ?? ""),
        line1: String(form.get("line1") ?? ""),
        line2: String(form.get("line2") ?? "") || undefined,
        city: String(form.get("city") ?? ""),
        state: String(form.get("state") ?? ""),
        postalCode: String(form.get("postalCode") ?? ""),
        country: String(form.get("country") ?? "US"),
      },
    };

    startTransition(async () => {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Checkout failed");
        return;
      }

      window.location.href = data.url;
    });
  }

  if (items.length === 0) {
    return (
      <section className={cn("nimbus-section-sm", className)}>
        <div className="nimbus-container text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={defaultEmail}
            />
          </div>

          <div className="space-y-4">
            <p className="font-medium">Shipping address</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="line1">Address line 1</Label>
                <Input id="line1" name="line1" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="line2">Address line 2</Label>
                <Input id="line2" name="line2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal code</Label>
                <Input id="postalCode" name="postalCode" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" defaultValue="US" required />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-medium">Shipping method</p>
            {shippingMethods.map((method) => (
              <label
                key={method.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3"
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={shippingMethodId === method.id}
                  onChange={() => setShippingMethodId(method.id)}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{method.name}</p>
                  {method.description ? (
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  ) : null}
                </div>
                <span className="text-sm">
                  {formatCents(method.priceCents)}
                </span>
              </label>
            ))}
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "Redirecting…" : "Pay with Stripe"}
          </Button>
        </form>

        <Card>
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {formatCents(item.priceCents * item.quantity, item.currency)}
                </span>
              </div>
            ))}
            {totals ? (
              <>
                <div className="flex justify-between border-t pt-3">
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
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCents(totals.totalCents, totals.currency)}</span>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
