import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

function clean(value: unknown) {
  return String(value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function limit(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1).trim()}…` : value;
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const data = await req.json();
    const title = clean(data.title || data.name);
    const excerpt = clean(data.excerpt || data.description || data.content);
    const type = clean(data.type || "page");
    const primary = title || "SINOTRUK International";
    const seoTitle = limit(data.seoTitle || `${primary} | SINOTRUK International`, 70);
    const seoDescription = limit(data.seoDescription || excerpt || `${primary} from SINOTRUK International, with vehicle details, specifications, media, and export support.`, 160);
    const imageAlt = limit(data.imageAlt || `${primary} product image for SINOTRUK export and commercial vehicle buyers`, 120);
    const tags = Array.from(new Set([
      "SINOTRUK",
      type === "video" ? "video" : "commercial vehicle",
      ...primary.split(/\s+/).filter((word: string) => word.length > 2).slice(0, 4),
    ]));

    return NextResponse.json({ seoTitle, seoDescription, imageAlt, tags });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to generate SEO suggestions" }, { status: statusCode });
  }
}