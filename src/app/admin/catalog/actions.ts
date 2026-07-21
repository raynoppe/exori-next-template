"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin/require-admin";
import { syncCatalogFromRegistry } from "@/lib/catalog/sync";
import { defaultPreviewUrl } from "@/lib/catalog/types";
import { prisma } from "@/lib/prisma";
import type { CatalogItemType } from "@/lib/generated/prisma/client";

const catalogItemSchema = z.object({
  type: z.enum(["BLOCK", "PAGE_LAYOUT", "NAVIGATION"]),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().optional(),
  family: z.string().optional(),
  componentId: z.string().optional(),
  previewUrl: z.string().optional(),
  tags: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

function parseCatalogForm(formData: FormData) {
  return catalogItemSchema.safeParse({
    type: formData.get("type"),
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    family: formData.get("family") || undefined,
    componentId: formData.get("componentId") || undefined,
    previewUrl: formData.get("previewUrl") || undefined,
    tags: formData.get("tags") || undefined,
    sortOrder: formData.get("sortOrder") ?? 0,
    status: formData.get("status"),
  });
}

function parseTags(raw: string | undefined) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

async function saveScreenshot(
  formData: FormData,
  slug: string,
  existingUrl?: string | null,
) {
  const file = formData.get("screenshot");
  if (!(file instanceof File) || file.size === 0) {
    return existingUrl ?? null;
  }

  const ext = path.extname(file.name) || ".png";
  const uploadDir = path.join(process.cwd(), "public/uploads/catalog");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${slug}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/catalog/${filename}`;
}

function revalidateCatalogPaths() {
  revalidatePath("/");
  revalidatePath("/blocks");
  revalidatePath("/layouts");
  revalidatePath("/navigation");
  revalidatePath("/admin");
  revalidatePath("/api/catalog");
}

export async function syncCatalogFromRegistryAction() {
  await requireAdmin();
  const result = await syncCatalogFromRegistry();
  revalidateCatalogPaths();
  return result;
}

export async function createCatalogItemAction(formData: FormData) {
  await requireAdmin();
  const parsed = parseCatalogForm(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid catalog item");
  }

  const data = parsed.data;
  const previewUrl =
    data.previewUrl ||
    defaultPreviewUrl(data.type as CatalogItemType, data.slug);
  const screenshotUrl = await saveScreenshot(formData, data.slug);

  await prisma.catalogItem.create({
    data: {
      type: data.type,
      slug: data.slug,
      name: data.name,
      description: data.description,
      family: data.family,
      componentId: data.componentId,
      previewUrl,
      screenshotUrl,
      tags: parseTags(data.tags),
      sortOrder: data.sortOrder,
      status: data.status,
    },
  });

  revalidateCatalogPaths();
  redirect("/admin");
}

export async function updateCatalogItemAction(id: string, formData: FormData) {
  await requireAdmin();
  const parsed = parseCatalogForm(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid catalog item");
  }

  const existing = await prisma.catalogItem.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Catalog item not found");
  }

  const data = parsed.data;
  const previewUrl =
    data.previewUrl ||
    defaultPreviewUrl(data.type as CatalogItemType, data.slug);
  const screenshotUrl = await saveScreenshot(
    formData,
    data.slug,
    existing.screenshotUrl,
  );

  await prisma.catalogItem.update({
    where: { id },
    data: {
      type: data.type,
      slug: data.slug,
      name: data.name,
      description: data.description,
      family: data.family,
      componentId: data.componentId,
      previewUrl,
      screenshotUrl,
      tags: parseTags(data.tags),
      sortOrder: data.sortOrder,
      status: data.status,
    },
  });

  revalidateCatalogPaths();
  redirect("/admin");
}

export async function deleteCatalogItemAction(id: string) {
  await requireAdmin();
  await prisma.catalogItem.delete({ where: { id } });
  revalidateCatalogPaths();
}
