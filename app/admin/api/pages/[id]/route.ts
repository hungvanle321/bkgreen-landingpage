import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async () => {
    try {
      const { id } = await params
      const page = await prisma.page.findUnique({
        where: { id },
      })
      
      if (!page) {
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(page)
    } catch (error) {
      console.error('Error fetching page:', error)
      return NextResponse.json(
        { error: 'Failed to fetch page' },
        { status: 500 }
      )
    }
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async () => {
    try {
      const { id } = await params
      const data = await request.json()
      
      // Validate slug format and reserved check
      const { validateSlug } = await import('@/lib/page-validations')
      const slugValidation = validateSlug(data.slug)
      if (!slugValidation.valid) {
        return NextResponse.json(
          { error: slugValidation.error },
          { status: 400 }
        )
      }

      const normalizedSlug = data.slug.toLowerCase().trim()

      // Check if slug already exists (excluding current page)
      const existingPage = await prisma.page.findUnique({
        where: { slug: normalizedSlug },
      })

      if (existingPage && existingPage.id !== id) {
        return NextResponse.json(
          { error: `Slug "${normalizedSlug}" đã tồn tại. Vui lòng chọn slug khác.` },
          { status: 400 }
        )
      }
      
      const page = await prisma.page.update({
        where: { id },
        data: {
          title: data.title,
          title_en: data.title_en,
          title_fr: data.title_fr,
          slug: normalizedSlug,
          content: data.content,
          content_en: data.content_en,
          content_fr: data.content_fr,
          metaTitle: data.metaTitle,
          metaTitle_en: data.metaTitle_en,
          metaTitle_fr: data.metaTitle_fr,
          metaDescription: data.metaDescription,
          metaDescription_en: data.metaDescription_en,
          metaDescription_fr: data.metaDescription_fr,
        },
      })
      
      return NextResponse.json(page)
    } catch (error: any) {
      // Handle Prisma unique constraint error
      if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
        return NextResponse.json(
          { error: 'Slug đã tồn tại. Vui lòng chọn slug khác.' },
          { status: 400 }
        )
      }
      
      console.error('Error updating page:', error)
      return NextResponse.json(
        { error: 'Failed to update page' },
        { status: 500 }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async () => {
    try {
      const { id } = await params
      await prisma.page.delete({
        where: { id },
      })
      
      return NextResponse.json({ message: 'Page deleted successfully' })
    } catch (error) {
      console.error('Error deleting page:', error)
      return NextResponse.json(
        { error: 'Failed to delete page' },
        { status: 500 }
      )
    }
  })
}