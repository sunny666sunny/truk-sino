import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma-client'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    await requireAuth()
    const settings = await prisma.siteSetting.findMany()
    const map: Record<string, unknown> = {}
    for (const setting of settings) {
      map[setting.key] = setting.value
    }
    return NextResponse.json(map)
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to fetch settings' }, { status: statusCode })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth()
    const data = await req.json()

    const upserts = Object.entries(data).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as Prisma.InputJsonValue },
        create: { key, value: value as Prisma.InputJsonValue },
      })
    )
    await Promise.all(upserts)
    return NextResponse.json({ success: true })
  } catch (error) {
    const statusCode = error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500
    return NextResponse.json({ error: statusCode === 401 ? 'Unauthorized' : 'Failed to save settings' }, { status: statusCode })
  }
}