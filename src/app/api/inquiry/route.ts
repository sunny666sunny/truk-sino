import { NextResponse } from "next/server";
import { z } from "zod";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { sendInquiryNotification } from "@/lib/feishu";

/* ── Zod v4 schema ── */
const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  company: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/* ── In-memory rate limiter (per IP, 5 per hour) ── */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipHits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipHits.set(ip, timestamps);
  return false;
}

/* ── Periodic cleanup every 30 minutes ── */
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;
let lastCleanup = Date.now();

function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [ip, timestamps] of ipHits) {
    const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) {
      ipHits.delete(ip);
    } else {
      ipHits.set(ip, fresh);
    }
  }
}

/* ── Helper: extract client IP ── */
function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/* ── POST /api/inquiry ── */
export async function POST(req: Request) {
  try {
    maybeCleanup();

    /* Rate limiting */
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submissions. Please try again later.",
        },
        { status: 429 },
      );
    }

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
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.issues.reduce<
        Record<string, string>
      >((acc, issue) => {
        const key = issue.path[0]?.toString() ?? "form";
        if (!acc[key]) acc[key] = issue.message;
        return acc;
      }, {});

      return NextResponse.json(
        { success: false, error: "Validation failed", fieldErrors },
        { status: 400 },
      );
    }

    /* Generate unique ID and timestamp */
    const id = `INQ-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const createdAt = new Date().toISOString();

    const inquiry = {
      id,
      createdAt,
      ...parsed.data,
    };

    /* Store as JSON file */
    const dataDir = path.join(process.cwd(), "data", "inquiries");
    await mkdir(dataDir, { recursive: true });

    const fileName = `${createdAt.slice(0, 10)}_${id}.json`;
    await writeFile(
      path.join(dataDir, fileName),
      JSON.stringify(inquiry, null, 2),
      "utf-8",
    );

    /* Send Feishu notification (non-blocking) */
    sendInquiryNotification(inquiry).catch((err) =>
      console.error("[inquiry] Feishu notification error:", err),
    );

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("[inquiry] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
