import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma-client'
import { requireAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await requireAuth()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const country = searchParams.get('country')
    const q = searchParams.get('q')
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
    const perPage = Math.min(parseInt(searchParams.get('per_page') || '20'), 100)

    const where: Prisma.InquiryWhereInput = {}
    if (status && status !== 'all') where.status = status
    if (country && country !== 'all') where.country = country
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
        { message: { contains: q, mode: 'insensitive' } },
      ]
    }

    const [total, items] = await Promise.all([
      prisma.inquiry.count({ where }),
      prisma.inquiry.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * perPage, take: perPage }),
    ])

    return NextResponse.json({ total, page, per_page: perPage, total_pages: Math.ceil(total / perPage), items })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to fetch inquiries' }, { status: statusCode })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAuth()
    const { ids, status, note } = await req.json()
    if (!ids || !Array.isArray(ids) || !status) {
      return NextResponse.json({ error: 'ids and status required' }, { status: 400 })
    }
    const updated = await prisma.inquiry.updateMany({
      where: { id: { in: ids } },
      data: {
        status,
        ...(note ? { note } : {}),
        ...(status === 'replied' ? { repliedAt: new Date() } : {}),
        ...(status === 'closed' ? { closedAt: new Date() } : {}),
      },
    })
    return NextResponse.json({ success: true, count: updated.count })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to update' }, { status: statusCode })
  }
}