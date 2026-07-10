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
    const item = await prisma.productCategory.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug ? slugify(data.slug) : undefined,
        icon: data.icon || null,
        order: data.order === undefined ? undefined : Number(data.order),
        active: data.active !== false,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to update category" }, { status: statusCode });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.productCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to delete category" }, { status: statusCode });
  }
}