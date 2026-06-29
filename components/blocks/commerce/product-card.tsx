import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCents } from "@/lib/commerce/stripe";
import { cn } from "@/lib/utils";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  categoryName?: string | null;
};

export type ProductCardProps = {
  product: ProductCardData;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn("overflow-hidden shadow-sm", className)}>
      <div className="nimbus-gradient-card aspect-square border-b" />
      <CardHeader className="space-y-1">
        {product.categoryName ? (
          <p className="text-xs text-muted-foreground">{product.categoryName}</p>
        ) : null}
        <CardTitle className="text-lg">
          <Link href={`/shop/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-semibold">
          {formatCents(product.priceCents, product.currency)}
        </p>
      </CardContent>
      <CardFooter>
        <ButtonLink className="w-full" href={`/shop/${product.slug}`}>
          View product
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
