import "dotenv/config";

import { createUser, getUserByEmail } from "../lib/auth";
import { prisma } from "../lib/prisma";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@exori.local";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "changeme";
  const name = process.env.SEED_ADMIN_NAME ?? "Exori Admin";

  const existing = await getUserByEmail(email);

  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  await createUser({
    name,
    email,
    password,
    role: "ADMIN",
  });

  console.log(`Seeded admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
