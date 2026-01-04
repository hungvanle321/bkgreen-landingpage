import { prisma } from './prisma'
import type { NextRequest, NextResponse } from 'next/server'

export interface User {
  id: string
  email: string
  name?: string
  role: 'USER' | 'ADMIN'
}

export async function findUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    role: user.role,
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  return user?.role === 'ADMIN'
}

export function setAuthCookie(response: NextResponse, userId: string): void {
  response.cookies.set('auth', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  })
}

export function getAuthCookie(request: NextRequest): string | null {
  return request.cookies.get('auth')?.value || null
}