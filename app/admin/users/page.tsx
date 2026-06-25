import { AdminNav } from "@/components/admin/admin-nav";
import { UserManagement } from "@/components/admin/user-management";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const session = await auth();
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
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Manage users</h1>
          <p className="text-muted-foreground">
            Promote users to admin, demote admins, or remove accounts.
          </p>
        </div>
        <UserManagement
          users={users}
          currentUserId={session!.user.id}
        />
      </div>
    </div>
  );
}
