import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { clearAuthCookie } from '@/lib/auth'

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({
    message: 'Logout successful',
  })

  clearAuthCookie(response)

  return response
}