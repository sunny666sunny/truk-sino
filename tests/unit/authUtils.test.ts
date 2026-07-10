import { describe, expect, it } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/auth-utils'

describe('auth password utilities', () => {
  it('verifies a password against its generated hash', async () => {
    const hash = await hashPassword('secure-pass-123')

    await expect(verifyPassword('secure-pass-123', hash)).resolves.toBe(true)
    await expect(verifyPassword('wrong-pass', hash)).resolves.toBe(false)
  })

  it('rejects malformed hashes', async () => {
    await expect(verifyPassword('secure-pass-123', 'not-a-valid-hash')).resolves.toBe(false)
  })
})