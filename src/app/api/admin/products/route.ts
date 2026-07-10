import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma-client'
import { requireAuth } from '@/lib/auth'

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

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

export async function GET(req: NextRequest) {
  try {
    await requireAuth()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const q = searchParams.get('q')
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
    const perPage = Math.min(parseInt(searchParams.get('per_page') || '20'), 50)

    const where: Prisma.ProductWhereInput = {}
    if (status && status !== 'all') where.status = status
    if (category && category !== 'all') where.category = { slug: category }
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
        { subCategory: { contains: q, mode: 'insensitive' } },
      ]
    }

    const [total, items, categories] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: [{ sortOrder: 'desc' }, { updatedAt: 'desc' }],
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.productCategory.findMany({ orderBy: { order: 'asc' } }),
    ])

    return NextResponse.json({
      total,
      page,
      per_page: perPage,
      total_pages: Math.ceil(total / perPage),
      items,
      categories,
    })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to fetch products' }, { status: statusCode })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth()
    const data = await req.json()

    if (!data.name || !data.categoryId) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug ? slugify(data.slug) : slugify(data.name),
        categoryId: data.categoryId,
        subCategory: data.subCategory || null,
        status: data.status || 'active',
        heroImage: data.heroImage || null,
        gallery: toJson(data.gallery),
        excerpt: data.excerpt || null,
        content: toJson(data.content),
        specifications: toJson(data.specifications),
        features: toJson(data.features),
        brochure: data.brochure || null,
        sortOrder: Number(data.sortOrder || 0),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
      include: { category: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to create product' }, { status: statusCode })
  }
}