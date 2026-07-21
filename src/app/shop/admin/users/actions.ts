"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { isAdmin } from "@/lib/auth";
import type { Role } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();

  if (!session?.user || !isAdmin(session.user.role)) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function updateUserRole(userId: string, role: Role) {
  await requireAdmin();

  const session = await auth();

  if (session?.user.id === userId && role !== "ADMIN") {
    throw new Error("You cannot remove your own admin access");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin();

  if (session.user.id === userId) {
    throw new Error("You cannot delete your own account");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/admin/users");
}
