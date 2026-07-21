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

async function seedCatalog() {
  const count = await prisma.catalogItem.count();
  if (count > 0) {
    console.log("Catalog already seeded");
    return;
  }

  const { syncCatalogFromRegistry } = await import("../src/lib/catalog/sync");
  const result = await syncCatalogFromRegistry();
  console.log(
    `Seeded catalog: ${result.created} created, ${result.updated} updated (${result.total} registry entries)`,
  );
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

async function seedApplanding() {
  const blogCount = await prisma.blogPost.count();
  if (blogCount > 0) {
    console.log("Applanding data already seeded");
    return;
  }

  const demoEmail = "user@exori.local";
  let demoUser = await getUserByEmail(demoEmail);
  if (!demoUser) {
    demoUser = await createUser({
      name: "Demo User",
      email: demoEmail,
      password: "changeme",
      role: "USER",
    });
    console.log(`Seeded demo portal user: ${demoEmail}`);
  }

  const admin = await getUserByEmail(
    process.env.SEED_ADMIN_EMAIL ?? "admin@exori.local",
  );

  const posts = [
    {
      slug: "shipping-faster-with-nimbus",
      title: "How teams ship 2x faster with Nimbus",
      blurb: "Real workflows from product teams who cut release cycles in half.",
      content:
        "Modern product teams face the same bottleneck: too many tools, too little flow.\n\nNimbus brings planning, building, and shipping into one workspace so your team stays in context.\n\nIn this post we walk through three teams who reduced cycle time by consolidating their stack.",
      author: "Alex Rivera",
      readTime: "6 min read",
    },
    {
      slug: "ai-tokens-explained",
      title: "Understanding AI token costs",
      blurb: "A plain-language guide to how tokens work and how to budget for them.",
      content:
        "Tokens are the unit we use to meter AI-powered actions in Nimbus.\n\nSimple text generation uses fewer tokens than image creation or long document analysis.\n\nWe publish transparent rates on the pricing page so you can forecast monthly spend before you commit.",
      author: "Jordan Lee",
      readTime: "4 min read",
    },
    {
      slug: "mobile-app-launch-checklist",
      title: "The app launch checklist we use internally",
      blurb: "Everything we verify before submitting to the App Store or Play Store.",
      content:
        "Launch day should be boring — in a good way.\n\nOur checklist covers store assets, privacy labels, crash reporting, and staged rollouts.\n\nSave this list and adapt it for your next mobile release.",
      author: "Sam Patel",
      readTime: "8 min read",
    },
    {
      slug: "collaboration-without-meetings",
      title: "Collaboration without another meeting",
      blurb: "Async patterns that actually work for distributed teams.",
      content:
        "Not every decision needs a calendar invite.\n\nWe share how Nimbus teams use threaded comments, Loom-style updates, and weekly digests to stay aligned without meeting fatigue.",
      author: "Alex Rivera",
      readTime: "5 min read",
    },
    {
      slug: "security-at-nimbus",
      title: "Security practices at Nimbus",
      blurb: "Encryption, access controls, and how we handle your data.",
      content:
        "Trust is earned in the details.\n\nWe encrypt data in transit and at rest, run regular penetration tests, and maintain SOC 2 Type II compliance.\n\nThis post outlines what that means for your workspace day to day.",
      author: "Jordan Lee",
      readTime: "7 min read",
    },
    {
      slug: "creator-workflow-tips",
      title: "Five creator workflow tips",
      blurb: "Publish faster without sacrificing quality.",
      content:
        "Creators juggle ideation, production, and distribution.\n\nBatch your content, reuse templates, and let AI handle first drafts while you refine the voice.\n\nThese five habits save our power users hours every week.",
      author: "Sam Patel",
      readTime: "5 min read",
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.create({ data: post });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: demoUser.id,
      subject: "Cannot sync projects on iOS",
      status: "OPEN",
      messages: {
        create: {
          authorId: demoUser.id,
          body: "My projects stopped syncing after the latest update. iPhone 15, iOS 18.",
          isStaff: false,
        },
      },
    },
  });

  if (admin) {
    await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        authorId: admin.id,
        body: "Thanks for reaching out. Can you try signing out and back in? We are investigating a sync issue on 2.4.1.",
        isStaff: true,
      },
    });
    await prisma.supportTicket.update({
      where: { id: ticket.id },
      data: { status: "WAITING" },
    });

    await prisma.supportTicket.create({
      data: {
        userId: demoUser.id,
        subject: "Billing question about annual plan",
        status: "RESOLVED",
        messages: {
          createMany: {
            data: [
              {
                authorId: demoUser.id,
                body: "Can I switch from monthly to annual mid-cycle?",
                isStaff: false,
              },
              {
                authorId: admin.id,
                body: "Yes — we prorate the difference. Upgrade from Settings > Subscription.",
                isStaff: true,
              },
            ],
          },
        },
      },
    });
  }

  console.log(`Seeded ${posts.length} blog posts and sample support tickets`);
}

async function main() {
  await seedAdmin();
  await seedCommerce();
  await seedCatalog();
  await seedCollections();
  await seedApplanding();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
