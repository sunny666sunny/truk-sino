import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma-client";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 },
      );
    }

    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid email address";
      return NextResponse.json(
        { success: false, error: msg },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const hash = crypto.createHash("sha256").update(email).digest("hex");

    try {
      await prisma.newsletterSubscriber.create({ data: { email, hash } });
    } catch {
      return NextResponse.json(
        { success: false, error: "This email is already subscribed." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Subscribed successfully!" },
      { status: 201 },
    );
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}