import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const productSchema = z.object({
  slug: z.string().min(1).optional(),
  images: z.array(z.string()).optional(),
  price: z.number().optional(),
  specs: z.string().optional(),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  translations: z.array(z.object({
    locale: z.enum(['vi', 'en', 'fr']),
    name: z.string().min(1),
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
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      return NextResponse.json(
        { error: 'Failed to fetch product' },
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
          t.name?.trim() && t.description?.trim()
        ) || []
      }
      const data = productSchema.parse(filteredBody)

      const updateData: any = { ...data }
      delete updateData.translations

      await prisma.product.update({
        where: { id },
        data: updateData,
      })

      if (data.translations && data.translations.length > 0) {
        await prisma.productTranslation.deleteMany({
          where: { productId: id },
        })

        await prisma.productTranslation.createMany({
          data: data.translations.map((t) => ({
            locale: t.locale,
            name: t.name,
            description: t.description,
            category: t.category,
            productId: id,
          })),
        })
      }

      const updatedProduct = await prisma.product.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      return NextResponse.json(updatedProduct)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error updating product:', error)
      return NextResponse.json(
        { error: 'Failed to update product' },
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
      await prisma.product.delete({
        where: { id },
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }
  })
}

