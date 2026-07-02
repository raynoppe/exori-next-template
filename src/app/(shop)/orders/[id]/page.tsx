import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { getOrderById } from "@/lib/commerce/orders";
import { formatCents } from "@/lib/commerce/stripe";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const { id } = await params;
  const order = await getOrderById(id);

  if (!order || (order.userId && order.userId !== session.user.id)) {
    notFound();
  }

  const address = order.shippingAddress as {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };

  return (
    <section className="nimbus-section-sm">
      <div className="nimbus-container max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{order.orderNumber}</h1>
            <p className="text-muted-foreground">{order.email}</p>
          </div>
          <Badge>{order.status}</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatCents(item.priceCents * item.quantity, order.currency)}</span>
              </div>
            ))}
            <div className="border-t pt-3 font-semibold">
              Total: {formatCents(order.totalCents, order.currency)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{order.shippingMethodName}</p>
            <p className="mt-2">
              {address.name}
              <br />
              {address.line1}
              {address.line2 ? (
                <>
                  <br />
                  {address.line2}
                </>
              ) : null}
              <br />
              {address.city}, {address.state} {address.postalCode}
              <br />
              {address.country}
            </p>
          </CardContent>
        </Card>

        <ButtonLink variant="outline" href="/orders">
          Back to orders
        </ButtonLink>
      </div>
    </section>
  );
}
