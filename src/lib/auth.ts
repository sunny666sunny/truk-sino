// Authentication helpers for the admin panel.
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/prisma-client'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export async function getAuth(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value

  if (!session || !process.env.AUTH_SECRET) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
    const { payload } = await jwtVerify(session, secret)

    if (!payload.sub) return null

    return await prisma.adminUser.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, role: true },
    })
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuth()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }
  return user
}

export async function isAdmin(email?: string): Promise<boolean> {
  if (!email) return false
  try {
    const user = await prisma.adminUser.findUnique({
      where: { email },
      select: { role: true },
    })
    return user?.role === 'admin'
  } catch {
    return false
  }
}
