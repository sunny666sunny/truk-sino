import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ cookie: undefined as string | undefined }))
const findUnique = vi.hoisted(() => vi.fn())
const jwtVerify = vi.hoisted(() => vi.fn())

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    get: () => state.cookie ? { value: state.cookie } : undefined,
  })),
}))

vi.mock('@/lib/prisma-client', () => ({
  prisma: { adminUser: { findUnique } },
}))

vi.mock('jose', () => ({ jwtVerify }))

async function loadGetAuth() {
  vi.resetModules()
  return (await import('@/lib/auth')).getAuth
}

describe('admin request authentication', () => {
  beforeEach(() => {
    process.env.AUTH_SECRET = 'test-auth-secret-with-at-least-32-bytes'
    state.cookie = undefined
    findUnique.mockReset()
    jwtVerify.mockReset()
  })

  it('does not reuse an authenticated identity for a request without a cookie', async () => {
    const getAuth = await loadGetAuth()
    state.cookie = 'valid-session'
    jwtVerify.mockResolvedValue({ payload: { sub: 'admin-1', email: 'stale@example.com', role: 'admin' } })
    findUnique.mockResolvedValue({ id: 'admin-1', name: 'Lucien', email: 'admin@example.com', role: 'admin' })

    await expect(getAuth()).resolves.toMatchObject({ id: 'admin-1' })
    state.cookie = undefined
    await expect(getAuth()).resolves.toBeNull()
  })

  it('rejects a valid token when its administrator no longer exists', async () => {
    const getAuth = await loadGetAuth()
    state.cookie = 'valid-session'
    jwtVerify.mockResolvedValue({ payload: { sub: 'deleted-admin', email: 'stale@example.com', role: 'admin' } })
    findUnique.mockResolvedValue(null)

    await expect(getAuth()).resolves.toBeNull()
  })

  it('returns current database identity instead of stale token profile fields', async () => {
    const getAuth = await loadGetAuth()
    state.cookie = 'valid-session'
    jwtVerify.mockResolvedValue({ payload: { sub: 'admin-1', email: 'stale@example.com', role: 'admin' } })
    findUnique.mockResolvedValue({ id: 'admin-1', name: 'Current Name', email: 'current@example.com', role: 'editor' })

    await expect(getAuth()).resolves.toEqual({
      id: 'admin-1',
      name: 'Current Name',
      email: 'current@example.com',
      role: 'editor',
    })
  })
})
