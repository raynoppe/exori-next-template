import { AdminNav } from "@/components/admin/admin-nav";
import { ShippingManagement } from "@/components/admin/shipping-management";
import { getActiveShippingMethods } from "@/lib/commerce/pricing";
import { prisma } from "@/lib/prisma";

export default async function AdminShippingPage() {
  const methods = await prisma.shippingMethod.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shipping</h1>
          <p className="text-muted-foreground">
            Configure shipping methods and free-shipping thresholds.
          </p>
        </div>
        <ShippingManagement
          methods={methods.map((m) => ({
            id: m.id,
            name: m.name,
            priceCents: m.priceCents,
            freeThresholdCents: m.freeThresholdCents,
            active: m.active,
          }))}
        />
        <p className="text-xs text-muted-foreground">
          {await getActiveShippingMethods().then((m) => m.length)} active method(s) at checkout.
        </p>
      </div>
    </div>
  );
}
