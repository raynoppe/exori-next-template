import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tokenCostRows } from "@/lib/content/applanding/content";
import { cn } from "@/lib/utils";

export type TokenCostRow = {
  action: string;
  cost: string;
  note: string;
};

export type TokenCostsProps = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  rows?: TokenCostRow[];
  className?: string;
};

export function TokenCosts({
  eyebrow = "Usage",
  headline = "Token costs",
  subhead = "Pay only for what you use beyond your plan allowance.",
  rows = tokenCostRows,
  className,
}: TokenCostsProps) {
  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p className="text-muted-foreground">{subhead}</p>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.action}>
                  <TableCell className="font-medium">{row.action}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
