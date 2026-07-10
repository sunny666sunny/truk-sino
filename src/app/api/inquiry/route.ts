import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma-client";
import { sendInquiryNotification } from "@/lib/feishu";

/* 閳光偓閳光偓 Zod v4 schema 閳光偓閳光偓 */
const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  company: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptchaToken: z.string().optional(),
});

/* 閳光偓閳光偓 reCAPTCHA v3 verification 閳光偓閳光偓 */
const RECAPTCHA_THRESHOLD = 0.5;

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // Skip verification when secret key is not configured
    return { success: true, score: 1.0 };
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    });

    const data = await res.json();
    return {
      success: data.success === true,
      score: typeof data.score === "number" ? data.score : 0,
    };
  } catch (err) {
    console.error("[inquiry] reCAPTCHA verification error:", err);
    // Fail open: allow submission if Google API is unreachable
    return { success: true, score: 1.0 };
  }
}

/* 閳光偓閳光偓 In-memory rate limiter (per IP, 5 per hour) 閳光偓閳光偓 */
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

/* 閳光偓閳光偓 Periodic cleanup every 30 minutes 閳光偓閳光偓 */
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

/* 閳光偓閳光偓 Helper: extract client IP 閳光偓閳光偓 */
function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/* 閳光偓閳光偓 POST /api/inquiry 閳光偓閳光偓 */
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

    /* Verify reCAPTCHA token */
    const recaptchaToken = parsed.data.recaptchaToken;
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success || recaptchaResult.score < RECAPTCHA_THRESHOLD) {
        console.warn(
          `[inquiry] reCAPTCHA failed: success=${recaptchaResult.success}, score=${recaptchaResult.score}`,
        );
        return NextResponse.json(
          { success: false, error: "Spam protection check failed. Please try again." },
          { status: 403 },
        );
      }
    }

    /* Strip recaptchaToken from stored data */
    const inquiryData = { ...parsed.data };
    delete inquiryData.recaptchaToken;

    /* Store inquiry in the admin-managed database */
    const inquiry = await prisma.inquiry.create({
      data: {
        ...inquiryData,
        recaptchaScore: recaptchaToken ? 1.0 : null,
        ip,
        source: req.headers.get("referer"),
      },
    });

    /* Send Feishu notification (non-blocking) */
    sendInquiryNotification({
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone ?? undefined,
      country: inquiry.country ?? "",
      company: inquiry.company ?? undefined,
      productInterest: inquiry.productInterest ?? undefined,
      quantity: inquiry.quantity ?? undefined,
      message: inquiry.message,
      createdAt: inquiry.createdAt.toISOString(),
    }).catch((err) =>
      console.error("[inquiry] Feishu notification error:", err),
    );

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[inquiry] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
