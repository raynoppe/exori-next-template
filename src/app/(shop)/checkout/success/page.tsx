import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clearCartCookie } from "@/lib/commerce/cart";
import { getOrderByStripeSession } from "@/lib/commerce/orders";
import { formatCents } from "@/lib/commerce/stripe";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  await clearCartCookie();

  const order = sessionId
    ? await getOrderByStripeSession(sessionId)
    : null;

  return (
    <section className="nimbus-section-sm">
      <div className="nimbus-container max-w-lg space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          Payment was successful. A confirmation email will be sent shortly.
        </p>
        {order ? (
          <Card className="text-left">
            <CardHeader>
              <CardTitle>Order {order.orderNumber}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Status: {order.status}</p>
              <p>Total: {formatCents(order.totalCents, order.currency)}</p>
            </CardContent>
          </Card>
        ) : null}
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop">Continue shopping</ButtonLink>
          <ButtonLink variant="outline" href="/orders">
            View orders
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
