import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { requireAuth } from "@/lib/auth";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const where = q ? { OR: [{ title: { contains: q, mode: "insensitive" as const } }, { slug: { contains: q, mode: "insensitive" as const } }] } : {};
    const [total, items] = await Promise.all([
      prisma.video.count({ where }),
      prisma.video.findMany({ where, orderBy: [{ sortOrder: "desc" }, { updatedAt: "desc" }] }),
    ]);
    return NextResponse.json({ total, page: 1, per_page: items.length, total_pages: 1, items });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to fetch videos" }, { status: statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const data = await req.json();
    if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    const item = await prisma.video.create({
      data: {
        title: data.title,
        slug: data.slug ? slugify(data.slug) : slugify(data.title),
        thumbnail: data.thumbnail || null,
        videoUrl: data.videoUrl || null,
        duration: data.duration || null,
        sortOrder: Number(data.sortOrder || 0),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to create video" }, { status: statusCode });
  }
}