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
      
      const page = await prisma.page.update({
        where: { id },
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
        },
      })
      
      return NextResponse.json(page)
    } catch (error) {
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