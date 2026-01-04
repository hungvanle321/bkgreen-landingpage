import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

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
      
      const page = await prisma.page.create({
        data: {
          title: data.title,
          slug: data.slug,
          content: data.content,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
        },
      })
      
      return NextResponse.json(page, { status: 201 })
    } catch (error) {
      console.error('Error creating page:', error)
      return NextResponse.json(
        { error: 'Failed to create page' },
        { status: 500 }
      )
    }
  })
}