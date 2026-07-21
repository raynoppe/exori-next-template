"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin/require-admin";
import type { TicketStatus } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function replyToTicketAsStaff(ticketId: string, formData: FormData) {
  const session = await requireAdmin();
  const body = String(formData.get("body") ?? "").trim();

  if (body.length < 1) {
    throw new Error("Message required");
  }

  await prisma.$transaction([
    prisma.ticketMessage.create({
      data: {
        ticketId,
        authorId: session.user.id,
        body,
        isStaff: true,
      },
    }),
    prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: "WAITING" },
    }),
  ]);

  revalidatePath(`/applanding/admin/tickets/${ticketId}`);
  revalidatePath("/applanding/admin/tickets");
  revalidatePath(`/applanding/portal/tickets/${ticketId}`);
}

export async function updateTicketStatus(ticketId: string, status: TicketStatus) {
  await requireAdmin();

  await prisma.supportTicket.update({
    where: { id: ticketId },
    data: { status },
  });

  revalidatePath(`/applanding/admin/tickets/${ticketId}`);
  revalidatePath("/applanding/admin/tickets");
  revalidatePath(`/applanding/portal/tickets/${ticketId}`);
}

export async function deleteTicket(ticketId: string) {
  await requireAdmin();

  await prisma.supportTicket.delete({
    where: { id: ticketId },
  });

  revalidatePath("/applanding/admin/tickets");
}

export async function updateUserRole(userId: string, role: "ADMIN" | "USER") {
  await requireAdmin();

  const session = await requireAdmin();

  if (session.user.id === userId && role !== "ADMIN") {
    throw new Error("You cannot remove your own admin access");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/applanding/admin/users");
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

  revalidatePath("/applanding/admin/users");
  revalidatePath("/admin/users");
}
