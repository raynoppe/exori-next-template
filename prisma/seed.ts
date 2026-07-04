import "dotenv/config";

import { createUser, getUserByEmail } from "../src/lib/auth";
import { collections } from "../src/lib/content/collections";
import { prisma } from "../src/lib/prisma";

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@exori.local";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "changeme";
  const name = process.env.SEED_ADMIN_NAME ?? "Exori Admin";

  const existing = await getUserByEmail(email);
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  await createUser({ name, email, password, role: "ADMIN" });
  console.log(`Seeded admin user: ${email}`);
}

async function seedCommerce() {
  const categoryCount = await prisma.productCategory.count();
  if (categoryCount > 0) {
    console.log("Commerce data already seeded");
    return;
  }

  const apparel = await prisma.productCategory.create({
    data: {
      slug: "apparel",
      name: "Apparel",
      description: "Comfortable everyday wear",
    },
  });

  const accessories = await prisma.productCategory.create({
    data: {
      slug: "accessories",
      name: "Accessories",
      description: "Bags, hats, and more",
    },
  });

  const products = [
    {
      slug: "classic-tee",
      name: "Classic Tee",
      description: "Soft cotton tee for everyday comfort.",
      longDescription:
        "Our best-selling classic tee is made from 100% organic cotton with a relaxed fit. Pre-washed for softness from day one.",
      priceCents: 2900,
      images: [],
      categoryId: apparel.id,
      stock: 100,
      status: "ACTIVE" as const,
      featured: true,
    },
    {
      slug: "hoodie",
      name: "Nimbus Hoodie",
      description: "Cozy fleece hoodie with embroidered logo.",
      longDescription:
        "Mid-weight fleece hoodie with kangaroo pocket and ribbed cuffs. Perfect for cool mornings and late-night builds.",
      priceCents: 5900,
      images: [],
      categoryId: apparel.id,
      stock: 50,
      status: "ACTIVE" as const,
      featured: true,
    },
    {
      slug: "cap",
      name: "Logo Cap",
      description: "Adjustable cap with embroidered mark.",
      longDescription: "Structured six-panel cap with adjustable strap. One size fits most.",
      priceCents: 2400,
      images: [],
      categoryId: accessories.id,
      stock: 75,
      status: "ACTIVE" as const,
      featured: false,
    },
    {
      slug: "tote-bag",
      name: "Canvas Tote",
      description: "Durable canvas tote for work and weekend.",
      longDescription:
        "Heavy-duty canvas with reinforced handles. Fits a laptop, notebook, and your favorite snacks.",
      priceCents: 3200,
      images: [],
      categoryId: accessories.id,
      stock: 40,
      status: "ACTIVE" as const,
      featured: true,
    },
    {
      slug: "socks-pack",
      name: "Socks 3-Pack",
      description: "Breathable crew socks in three colors.",
      longDescription: "Moisture-wicking blend with cushioned sole. Includes black, gray, and white.",
      priceCents: 1800,
      images: [],
      categoryId: apparel.id,
      stock: 200,
      status: "ACTIVE" as const,
      featured: false,
    },
    {
      slug: "water-bottle",
      name: "Insulated Bottle",
      description: "20oz stainless steel bottle keeps drinks cold 24h.",
      longDescription:
        "Double-wall vacuum insulation. Leak-proof lid. Fits standard cup holders.",
      priceCents: 3500,
      images: [],
      categoryId: accessories.id,
      stock: 60,
      status: "ACTIVE" as const,
      featured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  await prisma.shippingMethod.create({
    data: {
      name: "Standard Shipping",
      description: "5–7 business days",
      priceCents: 599,
      freeThresholdCents: 7500,
      active: true,
      sortOrder: 0,
    },
  });

  await prisma.shippingMethod.create({
    data: {
      name: "Express Shipping",
      description: "2–3 business days",
      priceCents: 1299,
      active: true,
      sortOrder: 1,
    },
  });

  await prisma.taxRate.create({
    data: {
      name: "Sales Tax",
      percent: 8.25,
      region: "US",
      active: true,
      isDefault: true,
    },
  });

  console.log("Seeded commerce catalog, shipping, and tax");
}

/**
 * A few sample entries per configured collection so directories render with
 * content on first preview instead of an empty state. Idempotent: skips any
 * collection that already has entries. Field values are derived from the
 * collection's own field config — no per-collection seed code.
 */
async function seedCollections() {
  const sampleNames = ["Alex Rivera", "Jordan Lee", "Sam Patel"];
  for (const collection of collections) {
    const count = await prisma.collectionEntry.count({
      where: { collection: collection.id },
    });
    if (count > 0) {
      console.log(`Collection "${collection.id}" already seeded`);
      continue;
    }
    for (const [i, name] of sampleNames.entries()) {
      const fields: Record<string, string | string[]> = {};
      for (const field of collection.fields) {
        if (field.type === "tags") fields[field.name] = ["Sample", collection.singular];
        else if (field.type === "url") fields[field.name] = "https://example.com";
        else if (field.type === "email") fields[field.name] = "hello@example.com";
        else if (field.name === "location") fields[field.name] = "Remote";
        else fields[field.name] = `${collection.singular} ${i + 1}`;
      }
      await prisma.collectionEntry.create({
        data: {
          collection: collection.id,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          name,
          summary: `Sample ${collection.singular.toLowerCase()} profile — replace with real ${collection.label.toLowerCase()} as they join.`,
          fields,
        },
      });
    }
    console.log(`Seeded ${sampleNames.length} sample ${collection.label.toLowerCase()}`);
  }
}

async function main() {
  await seedAdmin();
  await seedCommerce();
  await seedCollections();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
