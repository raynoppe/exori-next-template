"use client";

import { useTransition } from "react";

import { addToCartAction } from "@/app/(shop)/cart/actions";
import { Button } from "@/components/ui/button";
import { formatCents } from "@/lib/commerce/stripe";
import { cn } from "@/lib/utils";

export type ProductDetailProps = {
  productId: string;
  name: string;
  description: string;
  longDescription?: string | null;
  priceCents: number;
  currency: string;
  stock: number;
  categoryName?: string | null;
  className?: string;
};

export function ProductDetail({
  productId,
  name,
  description,
  longDescription,
  priceCents,
  currency,
  stock,
  categoryName,
  className,
}: ProductDetailProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container grid gap-10 lg:grid-cols-2">
        <div className="nimbus-gradient-card aspect-square rounded-2xl border" />
        <div className="space-y-6">
          {categoryName ? (
            <p className="text-sm font-medium text-primary">{categoryName}</p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {name}
          </h1>
          <p className="text-2xl font-semibold">
            {formatCents(priceCents, currency)}
          </p>
          <p className="text-muted-foreground">{description}</p>
          {longDescription ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {longDescription}
            </p>
          ) : null}
          <p className="text-sm text-muted-foreground">
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </p>
          <Button
            size="lg"
            disabled={stock <= 0 || isPending}
            onClick={() => {
              startTransition(async () => {
                await addToCartAction(productId, 1);
              });
            }}
          >
            {stock <= 0 ? "Out of stock" : isPending ? "Adding…" : "Add to cart"}
          </Button>
        </div>
      </div>
    </section>
  );
}
