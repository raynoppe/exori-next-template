import { createTicket } from "@/app/applanding/portal/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewTicketPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New ticket</h1>
        <p className="text-muted-foreground">
          Describe your issue and our team will respond in the portal.
        </p>
      </div>
      <form action={createTicket} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" required minLength={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body">Message</Label>
          <Textarea id="body" name="body" required minLength={10} rows={6} />
        </div>
        <Button type="submit">Submit ticket</Button>
      </form>
    </div>
  );
}
