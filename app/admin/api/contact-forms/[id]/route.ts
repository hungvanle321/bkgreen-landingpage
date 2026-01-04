import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const updateSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (req, _user) => {
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
    const messages = (await import(`@/messages/${locale}.json`)).default

    try {
      const { id } = await params
      const body = await req.json()
      const data = updateSchema.parse(body)

      const form = await prisma.contactForm.update({
        where: { id },
        data,
      })

      return NextResponse.json(form)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: messages.errors.invalidData, details: error.message },
          { status: 400 }
        )
      }
      console.error('Error updating contact form:', error)
      return NextResponse.json(
        { error: messages.errors.updateContactFormFailed },
        { status: 500 }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (_req, _user) => {
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
    const messages = (await import(`@/messages/${locale}.json`)).default

    try {
      const { id } = await params
      await prisma.contactForm.delete({
        where: { id },
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting contact form:', error)
      return NextResponse.json(
        { error: messages.errors.deleteContactFormFailed },
        { status: 500 }
      )
    }
  })
}



