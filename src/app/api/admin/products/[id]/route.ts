import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma-client'
import { requireAuth } from '@/lib/auth'

function toJson(value: unknown): Prisma.InputJsonValue | undefined {
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as Prisma.InputJsonValue
    } catch {
      return value
    }
  }
  return value as Prisma.InputJsonValue
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id }, include: { category: true } })
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to fetch product' }, { status: statusCode })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const data = await req.json()

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug || undefined,
        categoryId: data.categoryId,
        subCategory: data.subCategory || null,
        status: data.status,
        heroImage: data.heroImage || null,
        gallery: toJson(data.gallery),
        excerpt: data.excerpt || null,
        content: toJson(data.content),
        specifications: toJson(data.specifications),
        features: toJson(data.features),
        brochure: data.brochure || null,
        sortOrder: data.sortOrder === undefined ? undefined : Number(data.sortOrder),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
      include: { category: true },
    })

    return NextResponse.json(product)
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to update product' }, { status: statusCode })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to delete product' }, { status: statusCode })
  }
}