import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const productSchema = z.object({
  slug: z.string().min(1),
  images: z.array(z.string()).default([]),
  price: z.number().optional(),
  specs: z.string().optional(),
  order: z.number().default(0),
  featured: z.boolean().default(false),
  translations: z.array(z.object({
    locale: z.enum(['vi', 'en', 'fr']),
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.string().optional(),
  })),
})

export async function GET(request: NextRequest) {
  return requireAdmin(request, async (req, _user) => {
    try {
      const { searchParams } = new URL(req.url)
      const locale = searchParams.get('locale') || 'vi'
      
      const products = await prisma.product.findMany({
        include: {
          translations: {
            where: { locale },
          },
        },
        orderBy: { order: 'asc' },
      })

      return NextResponse.json(products)
    } catch (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async (req, user) => {
    try {
      const body = await req.json()
      const data = productSchema.parse(body)

      const product = await prisma.product.create({
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

      return NextResponse.json(product, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error creating product:', error)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }
  })
}

