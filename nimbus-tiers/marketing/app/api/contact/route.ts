import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Marketing-tier contact route (no database).
 *
 * The full template persists contact messages with Prisma + exposes an admin
 * GET. Marketing-only sites ship without a database, so this overlay validates
 * the submission and acknowledges it without storing anything. Wire it to your
 * email/CRM provider where the TODO is marked.
 */
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    // TODO: forward parsed.data to your email or CRM provider.
    console.info("[contact] new submission", { email: parsed.data.email });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
