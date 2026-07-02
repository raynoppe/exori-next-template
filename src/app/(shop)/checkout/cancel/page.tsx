import { ButtonLink } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <section className="nimbus-section-sm">
      <div className="nimbus-container max-w-lg space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Checkout cancelled</h1>
        <p className="text-muted-foreground">
          Your cart is unchanged. You can return to checkout when ready.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/cart">Back to cart</ButtonLink>
          <ButtonLink variant="outline" href="/shop">
            Continue shopping
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
