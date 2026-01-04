import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const mediaFiles = await prisma.media.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(mediaFiles)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media files' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'general'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // In a real implementation, you would upload the file to storage
    // For now, we'll just return the file info
    const mediaFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: `/uploads/${file.name}`,
      type: file.type,
      size: file.size,
      category: category,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json(mediaFile, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}