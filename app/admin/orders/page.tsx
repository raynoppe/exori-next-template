import { AdminNav } from "@/components/admin/admin-nav";
import { OrderManagement } from "@/components/admin/order-management";
import { listAllOrders } from "@/lib/commerce/orders";

export default async function AdminOrdersPage() {
  const orders = await listAllOrders();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">View and manage customer orders.</p>
        </div>
        <OrderManagement
          orders={orders.map((o) => ({
            id: o.id,
            orderNumber: o.orderNumber,
            email: o.email,
            status: o.status,
            totalCents: o.totalCents,
            currency: o.currency,
            createdAt: o.createdAt,
          }))}
        />
      </div>
    </div>
  );
}
