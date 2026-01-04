import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { uploadFile } from '@/lib/blob'
import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  return requireAdmin(request, async () => {
    try {
      const { searchParams } = new URL(request.url)
      const category = searchParams.get('category')

      const files = await prisma.media.findMany({
        where: category ? { category } : undefined,
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(files)
    } catch (error) {
      console.error('Error fetching files:', error)
      return NextResponse.json(
        { error: 'Failed to fetch files' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async () => {
    try {
      console.warn('BLOB_READ_WRITE_TOKEN available:', !!process.env.BLOB_READ_WRITE_TOKEN)

      const formData = await request.formData()
      const file = formData.get('file') as File
      const category = formData.get('category') as string || 'general'

      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        )
      }

      console.warn('Uploading file:', file.name, 'Size:', file.size, 'Category:', category)

      const url = await uploadFile(file)
      console.warn('Upload successful, URL:', url)

      const media = await prisma.media.create({
        data: {
          name: file.name,
          url: url,
          type: file.type,
          size: file.size,
          category: category,
        },
      })

      console.warn('Media record created:', media.id)
      return NextResponse.json(media, { status: 201 })
    } catch (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json(
        { error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}` },
        { status: 500 }
      )
    }
  })
}