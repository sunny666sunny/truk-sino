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

function toTags(value: unknown): string[] | undefined {
  if (value === undefined) return undefined
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((tag) => tag.trim()).filter(Boolean)
  return []
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const article = await prisma.newsArticle.findUnique({ where: { id } })
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(article)
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to fetch' }, { status: statusCode })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const data = await req.json()
    const article = await prisma.newsArticle.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug || undefined,
        author: data.author,
        publishDate: data.publishDate ? new Date(data.publishDate) : undefined,
        featuredImage: data.featuredImage || null,
        excerpt: data.excerpt || null,
        content: toJson(data.content),
        tags: toTags(data.tags),
        faqs: toJson(data.faqs),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        status: data.status,
      },
    })
    return NextResponse.json(article)
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to update' }, { status: statusCode })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    await prisma.newsArticle.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to delete' }, { status: statusCode })
  }
}