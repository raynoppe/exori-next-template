import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requirePortalUser } from "@/lib/applanding/require-auth";
import { listUserTickets } from "@/lib/applanding/tickets";

export const dynamic = "force-dynamic";

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  OPEN: "default",
  WAITING: "secondary",
  RESOLVED: "outline",
  CLOSED: "outline",
};

export default async function PortalTicketsPage() {
  const session = await requirePortalUser();
  const tickets = await listUserTickets(session.user.id);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My tickets</h1>
          <p className="text-muted-foreground">
            View status and continue conversations with support.
          </p>
        </div>
        <ButtonLink href="/applanding/portal/tickets/new">New ticket</ButtonLink>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-muted-foreground">
                  No tickets yet.{" "}
                  <Link
                    href="/applanding/portal/tickets/new"
                    className="font-medium text-foreground underline"
                  >
                    Create one
                  </Link>
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link
                      href={`/applanding/portal/tickets/${ticket.id}`}
                      className="font-medium hover:underline"
                    >
                      {ticket.subject}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[ticket.status] ?? "secondary"}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(ticket.updatedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
