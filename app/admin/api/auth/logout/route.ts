import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { clearAuthCookie } from '@/lib/auth'

export async function POST(_request: NextRequest) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default

  const response = NextResponse.json({
    message: messages.admin?.navigation?.logout || 'Logout successful',
  })

  clearAuthCookie(response)

  return response
}