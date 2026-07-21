import { requireApplandingAdmin } from "@/lib/applanding/require-auth";
import { getTicketCounts } from "@/lib/applanding/tickets";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function ApplandingAdminPage() {
  const session = await requireApplandingAdmin();
  const [userCount, messageCount, adminCount, ticketCounts] = await Promise.all([
    prisma.user.count(),
    prisma.contactMessage.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    getTicketCounts(),
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Signed in as {session.user.email}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Registered accounts</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{userCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
            <CardDescription>Admin role accounts</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{adminCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Contact form inbox</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {messageCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open tickets</CardTitle>
            <CardDescription>
              {ticketCounts.total} total · {ticketCounts.waiting} waiting
            </CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {ticketCounts.open}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
