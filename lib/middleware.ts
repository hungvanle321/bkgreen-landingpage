import { NextResponse } from 'next/server'
import { getAuthCookie, findUserById } from './auth'
import type { NextRequest } from 'next/server'

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
): Promise<NextResponse> {
  const userId = getAuthCookie(request)
  
  if (!userId) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    const user = await findUserById(userId)
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return handler(request, user)
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export async function requireAdmin(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
): Promise<NextResponse> {
  const userId = getAuthCookie(request)
  
  if (!userId) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    const user = await findUserById(userId)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return handler(request, user)
  } catch (error) {
    console.error('Admin middleware error:', error)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}