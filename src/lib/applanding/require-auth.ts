import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { isAdmin } from "@/lib/auth";

export async function requirePortalUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/applanding/portal/login");
  }

  return session;
}

export async function requireApplandingAdmin() {
  const session = await auth();

  if (!session?.user || !isAdmin(session.user.role)) {
    redirect("/applanding/admin/login");
  }

  return session;
}
