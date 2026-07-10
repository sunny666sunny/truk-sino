import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { requireAuth } from "@/lib/auth";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await req.json();
    const item = await prisma.video.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug ? slugify(data.slug) : undefined,
        thumbnail: data.thumbnail || null,
        videoUrl: data.videoUrl || null,
        duration: data.duration || null,
        sortOrder: data.sortOrder === undefined ? undefined : Number(data.sortOrder),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to update video" }, { status: statusCode });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.video.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to delete video" }, { status: statusCode });
  }
}