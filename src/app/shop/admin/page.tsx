import { AdminNav } from "@/components/admin/admin-nav";
import { auth } from "@/auth";
import { getPaidRevenueCents } from "@/lib/commerce/orders";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminPage() {
  const session = await auth();
  const [userCount, messageCount, adminCount, productCount, orderCount, revenueCents] =
    await Promise.all([
    prisma.user.count(),
    prisma.contactMessage.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.product.count(),
    prisma.order.count(),
    getPaidRevenueCents(),
  ]);

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">
            Signed in as {session?.user.email}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Total registered accounts</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{userCount}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Admins</CardTitle>
              <CardDescription>Accounts with admin access</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{adminCount}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Contact form submissions</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {messageCount}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Catalog items</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{productCount}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>All orders</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{orderCount}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Paid + fulfilled</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              ${(revenueCents / 100).toFixed(2)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
