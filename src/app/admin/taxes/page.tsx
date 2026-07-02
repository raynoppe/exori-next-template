import { AdminNav } from "@/components/admin/admin-nav";
import { TaxManagement } from "@/components/admin/tax-management";
import { prisma } from "@/lib/prisma";

export default async function AdminTaxesPage() {
  const rates = await prisma.taxRate.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tax rates</h1>
          <p className="text-muted-foreground">
            Manage tax percentages applied at checkout.
          </p>
        </div>
        <TaxManagement
          rates={rates.map((r) => ({
            id: r.id,
            name: r.name,
            percent: r.percent,
            region: r.region,
            isDefault: r.isDefault,
            active: r.active,
          }))}
        />
      </div>
    </div>
  );
}
