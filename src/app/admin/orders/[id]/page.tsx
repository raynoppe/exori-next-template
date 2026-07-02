import { notFound } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { getOrderById } from "@/lib/commerce/orders";
import { formatCents } from "@/lib/commerce/stripe";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{order.orderNumber}</h1>
            <p className="text-muted-foreground">{order.email}</p>
          </div>
          <Badge>{order.status}</Badge>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Line items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {formatCents(item.priceCents * item.quantity, order.currency)}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 font-medium">
              Total: {formatCents(order.totalCents, order.currency)}
            </div>
          </CardContent>
        </Card>
        <ButtonLink variant="outline" href="/admin/orders">
          Back to orders
        </ButtonLink>
      </div>
    </div>
  );
}
