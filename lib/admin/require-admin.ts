import { auth } from "@/auth";
import { isAdmin } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user || !isAdmin(session.user.role)) {
    throw new Error("Unauthorized");
  }

  return session;
}
