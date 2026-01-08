import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'
import { validateSlug } from '@/lib/page-validations'
import { translatePageFields } from '@/lib/azure-translate'

export async function GET(request: NextRequest) {
  return requireAdmin(request, async () => {
    try {
      const pages = await prisma.page.findMany({
        orderBy: { createdAt: 'desc' },
      })
      
      return NextResponse.json(pages)
    } catch (error) {
      console.error('Error fetching pages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch pages' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async () => {
    try {
      const data = await request.json()
      
      // Validate slug format and reserved check
      const slugValidation = validateSlug(data.slug)
      if (!slugValidation.valid) {
        return NextResponse.json(
          { error: slugValidation.error },
          { status: 400 }
        )
      }

      const normalizedSlug = data.slug.toLowerCase().trim()

      // Check if slug already exists
      const existingPage = await prisma.page.findUnique({
        where: { slug: normalizedSlug },
      })

      if (existingPage) {
        return NextResponse.json(
          { error: `Slug "${normalizedSlug}" đã tồn tại. Vui lòng chọn slug khác.` },
          { status: 400 }
        )
      }

      // Auto-translate missing EN/FR fields
      const translatedFields = await translatePageFields({
        title: data.title,
        title_en: data.title_en,
        title_fr: data.title_fr,
        content: data.content,
        content_en: data.content_en,
        content_fr: data.content_fr,
        metaTitle: data.metaTitle,
        metaTitle_en: data.metaTitle_en,
        metaTitle_fr: data.metaTitle_fr,
        metaDescription: data.metaDescription,
        metaDescription_en: data.metaDescription_en,
        metaDescription_fr: data.metaDescription_fr,
      })
      
      const page = await prisma.page.create({
        data: {
          title: translatedFields.title || data.title,
          title_en: translatedFields.title_en,
          title_fr: translatedFields.title_fr,
          slug: normalizedSlug,
          content: translatedFields.content || data.content,
          content_en: translatedFields.content_en,
          content_fr: translatedFields.content_fr,
          metaTitle: translatedFields.metaTitle,
          metaTitle_en: translatedFields.metaTitle_en,
          metaTitle_fr: translatedFields.metaTitle_fr,
          metaDescription: translatedFields.metaDescription,
          metaDescription_en: translatedFields.metaDescription_en,
          metaDescription_fr: translatedFields.metaDescription_fr,
        },
      })
      
      return NextResponse.json(page, { status: 201 })
    } catch (error: any) {
      // Handle Prisma unique constraint error
      if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
        return NextResponse.json(
          { error: 'Slug đã tồn tại. Vui lòng chọn slug khác.' },
          { status: 400 }
        )
      }
      
      console.error('Error creating page:', error)
      return NextResponse.json(
        { error: 'Failed to create page' },
        { status: 500 }
      )
    }
  })
}