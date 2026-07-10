// POST /api/admin/init — Create initial admin user (one-time setup)
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { hashPassword } from '@/lib/auth-utils'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if admin already exists
    const existing = await prisma.adminUser.findFirst()
    if (existing) {
      return NextResponse.json(
        { error: 'Admin user already exists. Use /api/admin/reset-password to change.' },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.adminUser.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: 'admin',
      },
    })

    return NextResponse.json({ success: true, id: user.id })
  } catch (error) {
    console.error('Init admin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
