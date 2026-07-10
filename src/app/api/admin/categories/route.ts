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
    const where = q ? { OR: [{ name: { contains: q, mode: "insensitive" as const } }, { slug: { contains: q, mode: "insensitive" as const } }] } : {};
    const [total, items] = await Promise.all([
      prisma.productCategory.count({ where }),
      prisma.productCategory.findMany({ where, orderBy: [{ order: "asc" }, { updatedAt: "desc" }] }),
    ]);
    return NextResponse.json({ total, page: 1, per_page: items.length, total_pages: 1, items });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to fetch categories" }, { status: statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const data = await req.json();
    if (!data.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    const item = await prisma.productCategory.create({
      data: {
        name: data.name,
        slug: data.slug ? slugify(data.slug) : slugify(data.name),
        icon: data.icon || null,
        order: Number(data.order || 0),
        active: data.active !== false,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const statusCode = error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ error: statusCode === 401 ? "Unauthorized" : "Failed to create category" }, { status: statusCode });
  }
}