import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default

  try {
    const userId = cookieStore.get('auth')?.value

    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        { error: messages.admin?.login?.required || 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: messages.admin?.errors?.fetchFailed || 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching current user:', error)
    return NextResponse.json(
      { error: messages.admin?.users?.errors?.fetchFailed || 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
