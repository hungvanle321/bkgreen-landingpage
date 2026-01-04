import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params
    
    const mediaFile = await prisma.media.findFirst({
      where: {
        category: category
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!mediaFile) {
      return NextResponse.json(
        { error: 'No media found for this category' },
        { status: 404 }
      )
    }

    return NextResponse.json(mediaFile)
  } catch (error) {
    console.error(`Error fetching media`, error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}