"use client";

import { useTransition } from "react";

import {
  createCategoryAction,
  deleteCategoryAction,
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

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  productCount: number;
};

export function CategoryManagement({ categories }: { categories: CategoryRow[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <form
        className="max-w-md space-y-3 rounded-lg border p-4"
        action={async (formData) => {
          startTransition(async () => {
            await createCategoryAction(formData);
          });
        }}
      >
        <p className="font-medium">Add category</p>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required />
        </div>
        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </form>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.slug}</TableCell>
                <TableCell>{cat.productCount}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await deleteCategoryAction(cat.id);
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
