import type { Role } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/validations";

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) {
  const passwordHash = await hashPassword(input.password);

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      password: passwordHash,
      role: input.role ?? "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export function isAdmin(role: Role) {
  return role === "ADMIN";
}
