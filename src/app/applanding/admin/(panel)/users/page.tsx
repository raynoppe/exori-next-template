import { ApplandingUserManagement } from "@/components/applanding/user-management";
import { requireApplandingAdmin } from "@/lib/applanding/require-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ApplandingAdminUsersPage() {
  const session = await requireApplandingAdmin();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Manage users</h1>
        <p className="text-muted-foreground">
          Promote users to admin or remove accounts.
        </p>
      </div>
      <ApplandingUserManagement
        users={users}
        currentUserId={session.user.id}
      />
    </div>
  );
}
