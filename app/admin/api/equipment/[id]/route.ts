import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const equipmentSchema = z.object({
  slug: z.string().min(1).optional(),
  image: z.string().optional(),
  order: z.number().optional(),
  translations: z.array(z.object({
    locale: z.enum(['vi', 'en', 'fr']),
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().optional(),
  })).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const { id } = await params
      const equipment = await prisma.equipment.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      if (!equipment) {
        return NextResponse.json(
          { error: 'Equipment not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(equipment)
    } catch (error) {
      console.error('Error fetching equipment:', error)
      return NextResponse.json(
        { error: 'Failed to fetch equipment' },
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
      const data = equipmentSchema.parse(filteredBody)

      const updateData: any = { ...data }
      delete updateData.translations

      await prisma.equipment.update({
        where: { id },
        data: updateData,
      })

      if (data.translations && data.translations.length > 0) {
        await prisma.equipmentTranslation.deleteMany({
          where: { equipmentId: id },
        })

        await prisma.equipmentTranslation.createMany({
          data: data.translations.map((t) => ({
            ...t,
            equipmentId: id,
          })),
        })
      }

      const updatedEquipment = await prisma.equipment.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      return NextResponse.json(updatedEquipment)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error updating equipment:', error)
      return NextResponse.json(
        { error: 'Failed to update equipment' },
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
      await prisma.equipment.delete({
        where: { id },
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting equipment:', error)
      return NextResponse.json(
        { error: 'Failed to delete equipment' },
        { status: 500 }
      )
    }
  })
}

