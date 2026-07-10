import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { requireAuth } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await req.json();
    const item = await prisma.mediaItem.update({
      where: { id },
      data: {
        name: data.name,
        alt: data.alt || null,
        caption: data.caption || null,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to update media" }, { status: statusCode });
  }
}