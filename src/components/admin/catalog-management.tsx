"use client";

import { useTransition } from "react";

import {
  deleteCatalogItemAction,
  syncCatalogFromRegistryAction,
} from "@/app/admin/catalog/actions";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CatalogItem } from "@/lib/generated/prisma/client";

type UnmappedEntry = {
  type: string;
  slug: string;
  label: string;
};

export function CatalogManagement({
  items,
  unmapped,
}: {
  items: CatalogItem[];
  unmapped: UnmappedEntry[];
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/admin/catalog/new">Add catalog item</ButtonLink>
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await syncCatalogFromRegistryAction();
            });
          }}
        >
          Sync from registry
        </Button>
      </div>

      {unmapped.length > 0 ? (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-sm font-medium">Unmapped registry entries</p>
          <p className="mt-1 text-sm text-muted-foreground">
            These code registry entries are not in the database yet. Run sync to
            create them.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {unmapped.map((entry) => (
              <Badge key={`${entry.type}:${entry.slug}`} variant="outline">
                {entry.type}: {entry.slug}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      {(["BLOCK", "PAGE_LAYOUT", "NAVIGATION"] as const).map((type) => {
        const group = items.filter((item) => item.type === type);
        if (group.length === 0) return null;

        return (
          <div key={type} className="space-y-3">
            <h2 className="text-lg font-semibold">{type.replace("_", " ")}</h2>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Family</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="font-mono text-xs">{item.slug}</TableCell>
                      <TableCell>{item.family ?? "—"}</TableCell>
                      <TableCell>
                        {item.previewUrl ? (
                          <a
                            href={item.previewUrl}
                            className="text-sm text-primary hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open
                          </a>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.status}</Badge>
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        <ButtonLink
                          size="sm"
                          variant="outline"
                          href={`/admin/catalog/${item.id}`}
                        >
                          Edit
                        </ButtonLink>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isPending}
                          onClick={() => {
                            startTransition(async () => {
                              await deleteCatalogItemAction(item.id);
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
      })}
    </div>
  );
}
