import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// Rate-limit state (in-memory, per-server-instance)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_MAX = 30
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Periodically clean up stale entries to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60_000).unref()

// ---------------------------------------------------------------------------
// Content Security Policy
// ---------------------------------------------------------------------------
function buildCsp(): string {
  const directives = [
    "default-src 'self'",
    // Allow self, inline scripts (Next.js hydration), and Google reCAPTCHA
    "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
    // Allow self and inline styles (Tailwind CSS)
    "style-src 'self' 'unsafe-inline'",
    // Allow Google Fonts
    "font-src 'self' https://fonts.gstatic.com",
    // Allow self and data URIs for images
    "img-src 'self' data:",
    // Allow Google Fonts stylesheets
    "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Allow reCAPTCHA challenge iframes
    "frame-src https://www.google.com",
    // Allow reCAPTCHA API connections
    "connect-src 'self' https://www.google.com",
    // Restrict other resource types
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ]

  return directives.join('; ')
}

// ---------------------------------------------------------------------------
// Proxy function
// ---------------------------------------------------------------------------
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- Rate limiting for API routes ---
  if (pathname.startsWith('/api/')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }
  }

  // --- Security headers ---
  const response = NextResponse.next()

  // Content Security Policy
  response.headers.set('Content-Security-Policy', buildCsp())

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME-type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // XSS protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Restrict browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // HTTP Strict Transport Security
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )

  return response
}

// ---------------------------------------------------------------------------
// Matcher — run on all requests except static assets
// ---------------------------------------------------------------------------
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder assets (images, svgs, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
}
