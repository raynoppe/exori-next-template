"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requirePortalUser } from "@/lib/applanding/require-auth";
import { prisma } from "@/lib/prisma";

export async function createTicket(formData: FormData) {
  const session = await requirePortalUser();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (subject.length < 3 || body.length < 10) {
    throw new Error("Invalid ticket data");
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: session.user.id,
      subject,
      status: "OPEN",
      messages: {
        create: {
          authorId: session.user.id,
          body,
          isStaff: false,
        },
      },
    },
  });

  revalidatePath("/applanding/portal/tickets");
  revalidatePath("/applanding/admin/tickets");
  redirect(`/applanding/portal/tickets/${ticket.id}`);
}

export async function replyToTicket(ticketId: string, formData: FormData) {
  const session = await requirePortalUser();
  const body = String(formData.get("body") ?? "").trim();

  if (body.length < 1) {
    throw new Error("Message required");
  }

  const ticket = await prisma.supportTicket.findFirst({
    where: { id: ticketId, userId: session.user.id },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  await prisma.$transaction([
    prisma.ticketMessage.create({
      data: {
        ticketId,
        authorId: session.user.id,
        body,
        isStaff: false,
      },
    }),
    prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: "OPEN" },
    }),
  ]);

  revalidatePath(`/applanding/portal/tickets/${ticketId}`);
  revalidatePath("/applanding/portal/tickets");
  revalidatePath("/applanding/admin/tickets");
}

export async function resolveTicket(ticketId: string) {
  const session = await requirePortalUser();

  const ticket = await prisma.supportTicket.findFirst({
    where: { id: ticketId, userId: session.user.id },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  await prisma.supportTicket.update({
    where: { id: ticketId },
    data: { status: "RESOLVED" },
  });

  revalidatePath(`/applanding/portal/tickets/${ticketId}`);
  revalidatePath("/applanding/portal/tickets");
  revalidatePath("/applanding/admin/tickets");
}
