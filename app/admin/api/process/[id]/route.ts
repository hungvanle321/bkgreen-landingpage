import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const processStepSchema = z.object({
  step: z.string().min(1).optional(),
  image: z.string().optional(),
  order: z.number().optional(),
  translations: z.array(z.object({
    locale: z.enum(['vi', 'en', 'fr']),
    title: z.string().min(1),
    description: z.string().min(1),
  })).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const { id } = await params
      const step = await prisma.processStep.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      if (!step) {
        return NextResponse.json(
          { error: 'Process step not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(step)
    } catch (error) {
      console.error('Error fetching process step:', error)
      return NextResponse.json(
        { error: 'Failed to fetch process step' },
        { status: 500 }
      )
    }
  })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (req, _user) => {
    try {
      const { id } = await params
      const body = await req.json()
      // Filter out empty translations before validation
      const filteredBody = {
        ...body,
        translations: body.translations?.filter((t: any) => 
          t.title?.trim() && t.description?.trim()
        ) || []
      }
      const data = processStepSchema.parse(filteredBody)

      const updateData: any = { ...data }
      delete updateData.translations

      await prisma.processStep.update({
        where: { id },
        data: updateData,
      })

      if (data.translations && data.translations.length > 0) {
        await prisma.processStepTranslation.deleteMany({
          where: { processStepId: id },
        })

        await prisma.processStepTranslation.createMany({
          data: data.translations.map((t) => ({
            ...t,
            processStepId: id,
          })),
        })
      }

      const updatedStep = await prisma.processStep.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      return NextResponse.json(updatedStep)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error updating process step:', error)
      return NextResponse.json(
        { error: 'Failed to update process step' },
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
    try {
      const { id } = await params
      await prisma.processStep.delete({
        where: { id },
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting process step:', error)
      return NextResponse.json(
        { error: 'Failed to delete process step' },
        { status: 500 }
      )
    }
  })
}

