"use client";

import { useTransition } from "react";

import {
  createShippingMethodAction,
  deleteShippingMethodAction,
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
import { formatCents } from "@/lib/commerce/stripe";

type ShippingRow = {
  id: string;
  name: string;
  priceCents: number;
  freeThresholdCents: number | null;
  active: boolean;
};

export function ShippingManagement({ methods }: { methods: ShippingRow[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <form
        className="max-w-md space-y-3 rounded-lg border p-4"
        action={async (formData) => {
          startTransition(async () => {
            await createShippingMethodAction(formData);
          });
        }}
      >
        <p className="font-medium">Add shipping method</p>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceCents">Price (cents)</Label>
          <Input id="priceCents" name="priceCents" type="number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="freeThresholdCents">Free above (cents)</Label>
          <Input id="freeThresholdCents" name="freeThresholdCents" type="number" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked />
          Active
        </label>
        <input type="hidden" name="sortOrder" value="0" />
        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </form>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Free threshold</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methods.map((method) => (
              <TableRow key={method.id}>
                <TableCell>{method.name}</TableCell>
                <TableCell>{formatCents(method.priceCents)}</TableCell>
                <TableCell>
                  {method.freeThresholdCents
                    ? formatCents(method.freeThresholdCents)
                    : "—"}
                </TableCell>
                <TableCell>{method.active ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await deleteShippingMethodAction(method.id);
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
