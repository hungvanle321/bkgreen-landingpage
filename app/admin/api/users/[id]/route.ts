import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/auth'

const PROTECTED_EMAIL = 'admin@bkgreen.vn'

async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('auth')?.value

    if (!userId) return null

    return userId
  } catch {
    return null
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default
  const { id } = await params

  try {
    const user = await prisma.user.findUnique({
      where: { id },
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
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: messages.admin?.users?.errors?.fetchFailed || 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default
  const { id } = await params

  try {
    // Get current user
    const currentUserId = await getCurrentUserId(request)
    
    // User can only edit their own information
    if (currentUserId !== id) {
      return NextResponse.json(
        { error: 'You can only edit your own information' },
        { status: 403 }
      )
    }

    const { email, name, role, password, currentPassword, newPassword, avatar } = await request.json()

    // Get user to edit
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json(
        { error: messages.admin?.errors?.fetchFailed || 'User not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, any> = {}

    // If changing password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: messages.admin?.forms?.password || 'Current password is required' },
          { status: 400 }
        )
      }

      const isPasswordValid = await verifyPassword(currentPassword, user.password)
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: messages.admin?.users?.errors?.passwordMismatch || 'Current password is incorrect' },
          { status: 400 }
        )
      }

      updateData.password = await hashPassword(newPassword)
    }

    // Update other fields
    if (name !== undefined) updateData.name = name
    if (avatar !== undefined) updateData.avatar = avatar
    if (email !== undefined && email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })
      if (existingUser) {
        return NextResponse.json(
          { error: messages.admin?.users?.errors?.emailAlreadyExists || 'Email already exists' },
          { status: 400 }
        )
      }
      updateData.email = email
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: messages.admin?.users?.errors?.saveFailed || 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default
  const { id } = await params

  try {
    // Get user to check email
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json(
        { error: messages.admin?.errors?.fetchFailed || 'User not found' },
        { status: 404 }
      )
    }

    // Prevent deletion of admin account
    if (user.email === PROTECTED_EMAIL) {
      return NextResponse.json(
        { error: messages.admin?.users?.errors?.adminAccountProtected || 'Cannot delete admin account' },
        { status: 403 }
      )
    }

    // Delete user
    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ message: messages.admin?.success?.deleted || 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: messages.admin?.users?.errors?.deleteFailed || 'Failed to delete user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default
  const { id } = await params

  try {
    const { action } = await request.json()

    if (action === 'resetPassword') {
      const DEFAULT_PASSWORD = 'admin123'
      const hashedPassword = await hashPassword(DEFAULT_PASSWORD)

      const updatedUser = await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      })

      return NextResponse.json(updatedUser)
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json(
      { error: messages.admin?.users?.errors?.saveFailed || 'Failed to reset password' },
      { status: 500 }
    )
  }
}
