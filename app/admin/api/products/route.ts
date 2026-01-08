import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'
import { createValidationSchemas } from '@/lib/validation-i18n'
import { translateMissing } from '@/lib/azure-translate'

export async function GET(request: NextRequest) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      // For admin, return all translations (not filtered by locale)
      const products = await prisma.product.findMany({
        include: {
          translations: true, // Get all translations
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
      // Get locale from cookie or default to 'vi'
      const cookieStore = await cookies()
      const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'vi') as 'vi' | 'en' | 'fr'
      
      // Load validation messages and create schema with i18n
      const { getValidationMessages } = await import('@/lib/validation-i18n')
      const validationMessages = await getValidationMessages(locale)
      const { productSchema } = createValidationSchemas(validationMessages)

      const body = await req.json()
      // Filter out empty translations before validation
      const filteredBody = {
        ...body,
        translations: body.translations?.filter((t: any) => 
          t.name?.trim() && t.description?.trim()
        ) || []
      }

      // Auto-translate missing EN/FR from VI on create
      const autoTranslated = await translateMissing(filteredBody.translations)
      const data = productSchema.parse({ ...filteredBody, translations: autoTranslated })

      const product = await prisma.product.create({
        data: {
          ...data,
          userId: user.id,
          translations: {
            create: data.translations.map((t) => ({
              locale: t.locale,
              name: t.name,
              description: t.description,
              category: t.category,
            })),
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

