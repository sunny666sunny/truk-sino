import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    await requireAuth()
    const [productsTotal, articlesTotal, inquiriesTotal, inquiriesNew, subscribersTotal] = await Promise.all([
      prisma.product.count(),
      prisma.newsArticle.count({ where: { status: 'published' } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'new' } }),
      prisma.newsletterSubscriber.count({ where: { active: true } }),
    ])

    return NextResponse.json({
      products: productsTotal,
      articles: articlesTotal,
      inquiries: inquiriesTotal,
      inquiriesNew,
      subscribers: subscribersTotal,
    })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to fetch stats' }, { status: statusCode })
  }
}