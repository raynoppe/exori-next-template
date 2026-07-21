import Link from "next/link";
import { notFound } from "next/navigation";

import {
  replyToTicket,
  resolveTicket,
} from "@/app/applanding/portal/actions";
import { requirePortalUser } from "@/lib/applanding/require-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getTicketById } from "@/lib/applanding/tickets";

export const dynamic = "force-dynamic";

type TicketDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PortalTicketDetailPage({
  params,
}: TicketDetailPageProps) {
  const { id } = await params;
  const session = await requirePortalUser();
  const ticket = await getTicketById(id, session.user.id);

  if (!ticket) {
    notFound();
  }

  const canReply = ticket.status !== "CLOSED";

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Link
          href="/applanding/portal/tickets"
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
                {message.isStaff ? " (Support)" : ""}
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

      {canReply ? (
        <form
          action={replyToTicket.bind(null, ticket.id)}
          className="space-y-3 border-t pt-6"
        >
          <Textarea name="body" required rows={4} placeholder="Write a reply…" />
          <div className="flex flex-wrap gap-2">
            <Button type="submit">Send reply</Button>
            {ticket.status !== "RESOLVED" ? (
              <Button
                type="submit"
                variant="outline"
                formAction={resolveTicket.bind(null, ticket.id)}
              >
                Mark resolved
              </Button>
            ) : null}
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">This ticket is closed.</p>
      )}
    </div>
  );
}
