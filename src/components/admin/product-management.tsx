"use client";

import { useTransition } from "react";

import { deleteProductAction } from "@/app/admin/commerce/actions";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCents } from "@/lib/commerce/stripe";
import type { ProductStatus } from "@/lib/generated/prisma/client";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  stock: number;
  status: ProductStatus;
  categoryName: string | null;
};

export function ProductManagement({ products }: { products: ProductRow[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      <ButtonLink href="/admin/products/new">Add product</ButtonLink>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categoryName ?? "—"}</TableCell>
                <TableCell>
                  {formatCents(product.priceCents, product.currency)}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.status}</Badge>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <ButtonLink
                    size="sm"
                    variant="outline"
                    href={`/admin/products/${product.id}`}
                  >
                    Edit
                  </ButtonLink>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await deleteProductAction(product.id);
                      });
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
