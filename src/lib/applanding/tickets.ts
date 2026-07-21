import { prisma } from "@/lib/prisma";
import type { TicketStatus } from "@/lib/generated/prisma/client";

export async function listUserTickets(userId: string) {
  return prisma.supportTicket.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
}

export async function listAllTickets(status?: TicketStatus) {
  return prisma.supportTicket.findMany({
    where: status ? { status } : undefined,
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
}

export async function getTicketById(id: string, userId?: string) {
  return prisma.supportTicket.findFirst({
    where: {
      id,
      ...(userId ? { userId } : {}),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          author: { select: { id: true, name: true, email: true, role: true } },
        },
      },
    },
  });
}

export async function getTicketCounts() {
  const [open, waiting, resolved, closed, total] = await Promise.all([
    prisma.supportTicket.count({ where: { status: "OPEN" } }),
    prisma.supportTicket.count({ where: { status: "WAITING" } }),
    prisma.supportTicket.count({ where: { status: "RESOLVED" } }),
    prisma.supportTicket.count({ where: { status: "CLOSED" } }),
    prisma.supportTicket.count(),
  ]);

  return { open, waiting, resolved, closed, total };
}
