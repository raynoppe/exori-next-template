"use client";

import { ShoppingBag } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

type CartNavBadgeProps = {
  count?: number;
};

export function CartNavBadge({ count = 0 }: CartNavBadgeProps) {
  return (
    <ButtonLink
      variant="ghost"
      size="icon"
      className="relative"
      href="/cart"
      aria-label={`Cart with ${count} items`}
    >
      <ShoppingBag className="size-4" />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </ButtonLink>
  );
}
