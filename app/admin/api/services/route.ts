import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const serviceSchema = z.object({
  slug: z.string().min(1),
  icon: z.string().optional(),
  image: z.string().optional(),
  order: z.number().default(0),
  translations: z.array(z.object({
    locale: z.enum(['vi', 'en', 'fr']),
    title: z.string().min(1),
    description: z.string().min(1),
  })),
})

export async function GET(request: NextRequest) {
  return requireAdmin(request, async (req, _user) => {
    try {
      const { searchParams } = new URL(req.url)
      const locale = searchParams.get('locale') || 'vi'
      
      const services = await prisma.service.findMany({
        include: {
          translations: {
            where: { locale },
          },
        },
        orderBy: { order: 'asc' },
      })

      return NextResponse.json(services)
    } catch (error) {
      console.error('Error fetching services:', error)
      return NextResponse.json(
        { error: 'Failed to fetch services' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async (req, user) => {
    try {
      const body = await req.json()
      const data = serviceSchema.parse(body)

      const service = await prisma.service.create({
        data: {
          ...data,
          userId: user.id,
          translations: {
            create: data.translations,
          },
        },
        include: {
          translations: true,
        },
      })

      return NextResponse.json(service, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error creating service:', error)
      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      )
    }
  })
}

