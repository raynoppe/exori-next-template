import Link from "next/link";
import { notFound } from "next/navigation";

import {
  deleteTicket,
  replyToTicketAsStaff,
  updateTicketStatus,
} from "@/app/applanding/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getTicketById } from "@/lib/applanding/tickets";
import type { TicketStatus } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

type AdminTicketDetailPageProps = {
  params: Promise<{ id: string }>;
};

const statuses: TicketStatus[] = ["OPEN", "WAITING", "RESOLVED", "CLOSED"];

export default async function AdminTicketDetailPage({
  params,
}: AdminTicketDetailPageProps) {
  const { id } = await params;
  const ticket = await getTicketById(id);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Link
          href="/applanding/admin/tickets"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to tickets
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {ticket.subject}
          </h1>
          <Badge>{ticket.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {ticket.user.name ?? ticket.user.email} · {ticket.user.email}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <form key={status} action={updateTicketStatus.bind(null, ticket.id, status)}>
            <Button
              type="submit"
              size="sm"
              variant={ticket.status === status ? "default" : "outline"}
            >
              {status}
            </Button>
          </form>
        ))}
        <form action={deleteTicket.bind(null, ticket.id)}>
          <Button type="submit" size="sm" variant="destructive">
            Delete
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        {ticket.messages.map((message) => (
          <div
            key={message.id}
            className={
              message.isStaff
                ? "rounded-lg border border-primary/20 bg-primary/5 p-4"
                : "rounded-lg border p-4"
            }
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-medium">
                {message.author.name ?? message.author.email}
                {message.isStaff ? " (Staff)" : " (Customer)"}
              </span>
              <span className="text-muted-foreground">
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(message.createdAt)}
              </span>
            </div>
            <p className="whitespace-pre-wrap text-sm">{message.body}</p>
          </div>
        ))}
      </div>

      <form
        action={replyToTicketAsStaff.bind(null, ticket.id)}
        className="space-y-3 border-t pt-6"
      >
        <Textarea name="body" required rows={4} placeholder="Staff reply…" />
        <Button type="submit">Send staff reply</Button>
      </form>
    </div>
  );
}
