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

function toTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((tag) => tag.trim()).filter(Boolean)
  return []
}

export async function GET(req: NextRequest) {
  try {
    await requireAuth()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const q = searchParams.get('q')
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
    const perPage = Math.min(parseInt(searchParams.get('per_page') || '20'), 50)

    const where: Prisma.NewsArticleWhereInput = {}
    if (status && status !== 'all') where.status = status
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
      ]
    }

    const [total, items] = await Promise.all([
      prisma.newsArticle.count({ where }),
      prisma.newsArticle.findMany({
        where,
        orderBy: { publishDate: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ])

    return NextResponse.json({ total, page, per_page: perPage, total_pages: Math.ceil(total / perPage), items })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to fetch articles' }, { status: statusCode })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth()
    const data = await req.json()

    if (!data.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const article = await prisma.newsArticle.create({
      data: {
        title: data.title,
        slug: data.slug ? slugify(data.slug) : slugify(data.title),
        author: data.author || 'SINOTRUK Editorial',
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
        featuredImage: data.featuredImage || null,
        excerpt: data.excerpt || null,
        content: toJson(data.content),
        tags: toTags(data.tags),
        faqs: toJson(data.faqs),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        status: data.status || 'draft',
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to create article' }, { status: statusCode })
  }
}