"use client";

import { useTransition } from "react";

import {
  createTaxRateAction,
  deleteTaxRateAction,
} from "@/app/admin/commerce/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TaxRow = {
  id: string;
  name: string;
  percent: number;
  region: string | null;
  isDefault: boolean;
  active: boolean;
};

export function TaxManagement({ rates }: { rates: TaxRow[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <form
        className="max-w-md space-y-3 rounded-lg border p-4"
        action={async (formData) => {
          startTransition(async () => {
            await createTaxRateAction(formData);
          });
        }}
      >
        <p className="font-medium">Add tax rate</p>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="percent">Percent</Label>
          <Input id="percent" name="percent" type="number" step="0.01" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input id="region" name="region" placeholder="US" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked />
          Active
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isDefault" />
          Default rate
        </label>
        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </form>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Percent</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Default</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell>{rate.name}</TableCell>
                <TableCell>{rate.percent}%</TableCell>
                <TableCell>{rate.region ?? "—"}</TableCell>
                <TableCell>{rate.isDefault ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await deleteTaxRateAction(rate.id);
                      });
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
