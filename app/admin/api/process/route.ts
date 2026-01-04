import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const processStepSchema = z.object({
  step: z.string().min(1),
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
      
      const steps = await prisma.processStep.findMany({
        include: {
          translations: {
            where: { locale },
          },
        },
        orderBy: { order: 'asc' },
      })

      return NextResponse.json(steps)
    } catch (error) {
      console.error('Error fetching process steps:', error)
      return NextResponse.json(
        { error: 'Failed to fetch process steps' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async (req, user) => {
    try {
      const body = await req.json()
      const data = processStepSchema.parse(body)

      const step = await prisma.processStep.create({
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

      return NextResponse.json(step, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error creating process step:', error)
      return NextResponse.json(
        { error: 'Failed to create process step' },
        { status: 500 }
      )
    }
  })
}

