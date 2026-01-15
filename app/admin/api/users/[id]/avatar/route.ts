import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
  const messages = (await import(`@/messages/${locale}.json`)).default
  const { id } = await params

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: messages.admin?.errors?.noFileSelected || 'No file selected' },
        { status: 400 }
      )
    }

    // For now, store the file in a simple way
    // In production, you might want to use a cloud storage service
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Update user with avatar
    const user = await prisma.user.update({
      where: { id },
      data: {
        // Note: You'll need to add an 'avatar' field to your User model
        // This is a placeholder implementation
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return NextResponse.json({
      user,
      avatar: dataUrl,
      message: messages.admin?.fileUpload?.uploadSuccess || 'Avatar uploaded successfully',
    })
  } catch (error) {
    console.error('Error uploading avatar:', error)
    return NextResponse.json(
      { error: messages.admin?.users?.errors?.avatarUploadFailed || 'Failed to upload avatar' },
      { status: 500 }
    )
  }
}
