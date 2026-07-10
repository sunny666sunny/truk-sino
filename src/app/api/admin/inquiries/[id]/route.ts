import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { requireAuth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const inquiry = await prisma.inquiry.findUnique({ where: { id } })
    if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(inquiry)
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed' }, { status: statusCode })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const data = await req.json()
    const updateData: Record<string, unknown> = {}
    if (data.status) updateData.status = data.status
    if (data.note !== undefined) updateData.note = data.note
    if (data.assignedTo) updateData.assignedTo = data.assignedTo
    if (data.status === 'replied') updateData.repliedAt = new Date()
    if (data.status === 'closed') updateData.closedAt = new Date()

    const inquiry = await prisma.inquiry.update({ where: { id }, data: updateData })
    return NextResponse.json(inquiry)
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to update' }, { status: statusCode })
  }
}