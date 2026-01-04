import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { setAuthCookie, verifyPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default

  try {
    const { email, password } = await request.json()
    console.log(locale)

    if (!email || !password) {
      return NextResponse.json(
        { error: messages.admin.login.required },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: messages.admin.login.invalidCredentials },
        { status: 401 }
      )
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: messages.admin.login.invalidCredentials },
        { status: 401 }
      )
    }

    const response = NextResponse.json({
      message: messages.admin.login.success,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    setAuthCookie(response, user.id)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: messages.admin.login.serverError },
      { status: 500 }
    )
  }
}