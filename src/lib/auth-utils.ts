// Password hash utilities using WebCrypto PBKDF2 and constant-time comparison.
import { timingSafeEqual } from 'node:crypto'

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  const hashBytes = new Uint8Array(derived)
  // Format: $pbkdf2-sha256$iterations$salt$hash
  const saltBase64 = Buffer.from(salt).toString('base64')
  const hashBase64 = Buffer.from(hashBytes).toString('base64')
  return `$pbkdf2-sha256$100000$${saltBase64}$${hashBase64}`
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!hash.startsWith('$pbkdf2-sha256$')) return false

  const parts = hash.split('$')
  // $, pbkdf2-sha256, iterations, salt, hash
  if (parts.length !== 5) return false

  const iterations = parseInt(parts[2], 10)
  const salt = Buffer.from(parts[3], 'base64')
  const storedHash = Buffer.from(parts[4], 'base64')

  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: new Uint8Array(salt), iterations, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  const derivedHash = new Uint8Array(derived)

  if (derivedHash.byteLength !== storedHash.byteLength) return false
  return timingSafeEqual(Buffer.from(derivedHash), storedHash)
}

// Generate a demo hash 鈥?run once and paste into admin_users table
export async function generateDemoHash(): Promise<string> {
  return hashPassword('sinotruk2026')
}
