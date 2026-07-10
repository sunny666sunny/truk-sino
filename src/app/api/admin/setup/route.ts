// POST /api/admin/setup - 生成管理员密码哈希（一次性设置）
import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/auth-utils'

export async function POST(req: NextRequest) {
  try {
    const { password, email } = await req.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const hash = await hashPassword(password)

    return NextResponse.json({
      success: true,
      email: email || 'a1105452110@gmail.com',
      password,
      passwordHash: hash,
      sqlStatement: `
INSERT INTO "AdminUser" (id, name, email, "passwordHash", role, "createdAt", "updatedAt") 
VALUES (
  gen_random_uuid(),
  '管理员',
  '${email || 'a1105452110@gmail.com'}',
  '${hash}',
  'admin',
  now(),
  now()
);
      `.trim()
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
