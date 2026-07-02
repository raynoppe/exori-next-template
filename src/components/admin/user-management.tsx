"use client";

import { useTransition } from "react";

import { deleteUser, updateUserRole } from "@/app/admin/users/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Role } from "@/lib/generated/prisma/client";

type ManagedUser = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
};

type UserManagementProps = {
  users: ManagedUser[];
  currentUserId: string;
};

export function UserManagement({ users, currentUserId }: UserManagementProps) {
  const [isPending, startTransition] = useTransition();

  function handleRoleChange(userId: string, role: Role) {
    startTransition(async () => {
      await updateUserRole(userId, role);
    });
  }

  function handleDelete(userId: string) {
    startTransition(async () => {
      await deleteUser(userId);
    });
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const isSelf = user.id === currentUserId;

            return (
              <TableRow key={user.id}>
                <TableCell>{user.name ?? "—"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                  }).format(user.createdAt)}
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  {user.role === "ADMIN" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending || isSelf}
                      onClick={() => handleRoleChange(user.id, "USER")}
                    >
                      Make user
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleRoleChange(user.id, "ADMIN")}
                    >
                      Make admin
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending || isSelf}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
