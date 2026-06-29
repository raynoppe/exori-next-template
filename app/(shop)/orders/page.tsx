import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { listOrdersForUser } from "@/lib/commerce/orders";
import { formatCents } from "@/lib/commerce/stripe";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const orders = await listOrdersForUser(session.user.id);

  return (
    <section className="nimbus-section-sm">
      <div className="nimbus-container max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your orders</h1>
          <p className="text-muted-foreground">Order history for {session.user.email}</p>
        </div>
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No orders yet.{" "}
              <Link href="/shop" className="text-primary hover:underline">
                Start shopping
              </Link>
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{order.orderNumber}</CardTitle>
                  <CardDescription>
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(order.createdAt)}
                  </CardDescription>
                </div>
                <Badge>{order.status}</Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="font-medium">
                  {formatCents(order.totalCents, order.currency)}
                </span>
                <ButtonLink
                  size="sm"
                  variant="outline"
                  href={`/orders/${order.id}`}
                >
                  View details
                </ButtonLink>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
