import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { deleteFile, uploadFile } from '@/lib/blob'
import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async () => {
    try {
      const { id } = await params
      const file = await prisma.media.findUnique({
        where: { id },
      })
      
      if (!file) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(file)
    } catch (error) {
      console.error('Error fetching file:', error)
      return NextResponse.json(
        { error: 'Failed to fetch file' },
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
      const file = await prisma.media.findUnique({
        where: { id },
      })
      
      if (!file) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        )
      }
      
      // Delete from blob storage
      await deleteFile(file.url)
      
      // Delete from database
      await prisma.media.delete({
        where: { id },
      })
      
      return NextResponse.json({ message: 'File deleted successfully' })
    } catch (error) {
      console.error('Error deleting file:', error)
      return NextResponse.json(
        { error: 'Failed to delete file' },
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
      const formData = await request.formData()
      const file = formData.get('file') as File

      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        )
      }

      const existingFile = await prisma.media.findUnique({
        where: { id },
      })

      if (!existingFile) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        )
      }

      // Delete old file from blob storage
      await deleteFile(existingFile.url)

      // Upload new file
      const url = await uploadFile(file)

      // Update database record - keep the original name for fixed categories
      const updatedFile = await prisma.media.update({
        where: { id },
        data: {
          // Keep original name if it's a fixed category, otherwise use uploaded file name
          name: existingFile.name,
          url: url,
          type: file.type,
          size: file.size,
        },
      })

      return NextResponse.json({
        message: 'File uploaded successfully',
        file: updatedFile
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }
  })
}