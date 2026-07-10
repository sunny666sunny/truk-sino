// Authentication helpers for the admin panel.
import { cookies } from 'next/headers'
import { JWTPayload, jwtVerify } from 'jose'
import { prisma } from '@/lib/prisma-client'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

interface AdminSessionPayload extends JWTPayload {
  sub: string
  name?: string
  email?: string
  role?: string
}

let cachedUser: AuthUser | null = null
let cacheTime = 0

export async function getAuth(): Promise<AuthUser | null> {
  const now = Date.now()
  if (cachedUser && now - cacheTime < 50) return cachedUser

  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value

  if (!session || !process.env.AUTH_SECRET) {
    cachedUser = null
    cacheTime = now
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
    const { payload } = await jwtVerify(session, secret)
    const adminPayload = payload as AdminSessionPayload

    if (adminPayload.sub && adminPayload.email) {
      cachedUser = {
        id: adminPayload.sub,
        name: adminPayload.name ?? adminPayload.email,
        email: adminPayload.email,
        role: adminPayload.role ?? 'admin',
      }
      cacheTime = now
      return cachedUser
    }
  } catch {
    // Invalid token.
  }

  cachedUser = null
  cacheTime = now
  return null
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