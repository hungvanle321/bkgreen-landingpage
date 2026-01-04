import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Mapping category to default image URLs
const DEFAULT_IMAGES: Record<string, string> = {
  'hero_background': '/hero-bg.jpg',
  'about_image': '/about-company.jpg',
  'logo': '/logo-transparent-square.svg',
  'logo_white': '/logo-white.svg',
  'process_background': '/process-bg.jpg',
  'favicon': '/favicon.ico',
  'social_media': '/social-media.jpg',
  'general': '/default-image.jpg'
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params
    
    // Check if category exists in our mapping
    if (!DEFAULT_IMAGES[category]) {
      return NextResponse.json(
        { error: 'Invalid category for restore' },
        { status: 400 }
      )
    }

    const defaultImageUrl = DEFAULT_IMAGES[category]

    // Delete existing media for this category
    await prisma.media.deleteMany({
      where: {
        category: category
      }
    })

    // Create new media record with default image
    const restoredMedia = await prisma.media.create({
      data: {
        name: `Default ${category}`,
        url: defaultImageUrl,
        type: 'image/svg+xml', // Default type
        size: 0, // Default size
        category: category
      }
    })

    return NextResponse.json({
      message: 'Image restored successfully',
      media: restoredMedia
    })
  } catch (error) {
    console.error(`Error restoring media`, error)
    return NextResponse.json(
      { error: 'Failed to restore image' },
      { status: 500 }
    )
  }
}