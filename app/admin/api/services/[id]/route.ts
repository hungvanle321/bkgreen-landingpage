import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const serviceSchema = z.object({
  slug: z.string().min(1).optional(),
  icon: z.string().optional(),
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
      const service = await prisma.service.findUnique({
        where: { id },
        include: {
          translations: {
            select: {
              id: true,
              serviceId: true,
              locale: true,
              title: true,
              description: true,
            },
          },
        },
      })

      if (!service) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(service)
    } catch (error) {
      console.error('Error fetching service:', error)
      return NextResponse.json(
        { error: 'Failed to fetch service' },
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
      const data = serviceSchema.parse(body)

      const updateData: any = { ...data }
      delete updateData.translations

      await prisma.service.update({
        where: { id },
        data: updateData,
      })

      if (data.translations) {
        await prisma.serviceTranslation.deleteMany({
          where: { serviceId: id },
        })

        await prisma.serviceTranslation.createMany({
          data: data.translations.map((t) => ({
            ...t,
            serviceId: id,
          })),
        })
      }

      const updatedService = await prisma.service.findUnique({
        where: { id },
        include: {
          translations: {
            select: {
              id: true,
              serviceId: true,
              locale: true,
              title: true,
              description: true,
            },
          },
        },
      })

      return NextResponse.json(updatedService)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error updating service:', error)
      return NextResponse.json(
        { error: 'Failed to update service' },
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
      await prisma.service.delete({
        where: { id },
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting service:', error)
      return NextResponse.json(
        { error: 'Failed to delete service' },
        { status: 500 }
      )
    }
  })
}
