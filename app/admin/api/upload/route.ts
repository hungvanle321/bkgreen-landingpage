import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { uploadFile } from '@/lib/blob'
import { requireAdmin } from '@/lib/middleware'

/**
 * API endpoint for uploading images in rich text editor
 * This endpoint only uploads to Vercel Blob Storage and returns the URL
 * It does NOT save to database (unlike /admin/api/media which saves to Media table)
 */
export async function POST(request: NextRequest) {
  return requireAdmin(request, async () => {
    try {
      const formData = await request.formData()
      const file = formData.get('file') as File

      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        )
      }

      // Only allow images for rich text editor
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Only image files are allowed' },
          { status: 400 }
        )
      }

      // Upload to Vercel Blob Storage
      const url = await uploadFile(file)

      // Return only the URL (not saved to database)
      return NextResponse.json({ url }, { status: 200 })
    } catch (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json(
        { error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}` },
        { status: 500 }
      )
    }
  })
}
