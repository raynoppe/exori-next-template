"use client";

import { useTransition } from "react";

import {
  refundOrderAction,
  updateOrderStatusAction,
} from "@/app/admin/commerce/actions";
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
import type { OrderStatus } from "@/lib/generated/prisma/client";

type OrderRow = {
  id: string;
  orderNumber: string;
  email: string;
  status: OrderStatus;
  totalCents: number;
  currency: string;
  createdAt: Date;
};

export function OrderManagement({ orders }: { orders: OrderRow[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{formatCents(order.totalCents, order.currency)}</TableCell>
              <TableCell>
                <Badge>{order.status}</Badge>
              </TableCell>
              <TableCell className="space-x-2 text-right">
                <ButtonLink
                  size="sm"
                  variant="outline"
                  href={`/admin/orders/${order.id}`}
                >
                  View
                </ButtonLink>
                {order.status === "PAID" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await updateOrderStatusAction(order.id, "FULFILLED");
                      });
                    }}
                  >
                    Fulfill
                  </Button>
                ) : null}
                {order.status === "PAID" || order.status === "FULFILLED" ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await refundOrderAction(order.id);
                      });
                    }}
                  >
                    Refund
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
