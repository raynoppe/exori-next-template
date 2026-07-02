import { compare, hash } from "bcryptjs";
import { z } from "zod";

const SALT_ROUNDS = 12;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const shippingAddressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  line1: z.string().min(3, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required").default("US"),
});

export const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email"),
  shippingMethodId: z.string().min(1, "Select a shipping method"),
  shippingAddress: shippingAddressSchema,
});

export const productSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  name: z.string().min(2),
  description: z.string().min(10),
  longDescription: z.string().optional(),
  priceCents: z.coerce.number().int().min(0),
  currency: z.string().default("usd"),
  images: z.array(z.string().url()).default([]),
  categoryId: z.string().optional().nullable(),
  stock: z.coerce.number().int().min(0),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  featured: z.boolean().default(false),
});

export const categorySchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  name: z.string().min(2),
  description: z.string().optional(),
});

export const shippingMethodSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  priceCents: z.coerce.number().int().min(0),
  freeThresholdCents: z.coerce.number().int().min(0).optional().nullable(),
  active: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const taxRateSchema = z.object({
  name: z.string().min(2),
  percent: z.coerce.number().min(0).max(100),
  region: z.string().optional().nullable(),
  active: z.boolean().default(true),
  isDefault: z.boolean().default(false),
});

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashed: string) {
  return compare(password, hashed);
}
