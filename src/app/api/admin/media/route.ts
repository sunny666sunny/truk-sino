import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const where = q ? { OR: [{ name: { contains: q, mode: "insensitive" as const } }, { alt: { contains: q, mode: "insensitive" as const } }, { caption: { contains: q, mode: "insensitive" as const } }] } : {};
    const [total, items] = await Promise.all([
      prisma.mediaItem.count({ where }),
      prisma.mediaItem.findMany({ where, orderBy: { createdAt: "desc" }, take: 100 }),
    ]);
    return NextResponse.json({ total, page: 1, per_page: items.length, total_pages: 1, items });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to fetch media" }, { status: statusCode });
  }
}