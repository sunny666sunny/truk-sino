import { NextResponse } from "next/server";
import { z } from "zod";
import { writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

/* ── Schema ── */
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/* ── POST /api/newsletter ── */
export async function POST(req: Request) {
  try {
    /* Parse body */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 },
      );
    }

    /* Validate */
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      const msg =
        parsed.error.issues[0]?.message ?? "Invalid email address";
      return NextResponse.json(
        { success: false, error: msg },
        { status: 400 },
      );
    }

    const { email } = parsed.data;
    const dataDir = path.join(process.cwd(), "data", "newsletter");
    await mkdir(dataDir, { recursive: true });

    /* Check for duplicates */
    try {
      const files = await readdir(dataDir);
      // Simple dedup: store email hash in filename
      const emailHash = Buffer.from(email.toLowerCase().trim()).toString(
        "base64url",
      );
      if (files.some((f) => f.includes(emailHash))) {
        return NextResponse.json(
          { success: false, error: "This email is already subscribed." },
          { status: 409 },
        );
      }
    } catch {
      // Directory may be empty or unreadable — continue
    }

    /* Store subscription */
    const createdAt = new Date().toISOString();
    const emailHash = Buffer.from(email.toLowerCase().trim()).toString(
      "base64url",
    );
    const fileName = `${createdAt.slice(0, 10)}_${emailHash}.json`;

    const record = {
      email: email.toLowerCase().trim(),
      subscribedAt: createdAt,
    };

    await writeFile(
      path.join(dataDir, fileName),
      JSON.stringify(record, null, 2),
      "utf-8",
    );

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
