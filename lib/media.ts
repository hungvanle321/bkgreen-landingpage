import { prisma } from '@/lib/prisma'

export interface MediaFile {
  id: string
  name: string
  url: string
  type: string
  size: number
  category: string
  createdAt: Date
  updatedAt: Date
}

export async function getMediaByCategory(category: string): Promise<MediaFile | null> {
  try {
    const mediaFile = await prisma.media.findFirst({
      where: {
        category: category
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return mediaFile ? {
      id: mediaFile.id,
      name: mediaFile.name,
      url: mediaFile.url,
      type: mediaFile.type,
      size: mediaFile.size,
      category: mediaFile.category,
      createdAt: mediaFile.createdAt,
      updatedAt: mediaFile.updatedAt
    } : null
  } catch (error) {
    console.error(`Error fetching media for category ${category}:`, error)
    return null
  }
}

export async function getAllMedia(): Promise<MediaFile[]> {
  try {
    const mediaFiles = await prisma.media.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return mediaFiles.map(mediaFile => ({
      id: mediaFile.id,
      name: mediaFile.name,
      url: mediaFile.url,
      type: mediaFile.type,
      size: mediaFile.size,
      category: mediaFile.category || 'general',
      createdAt: mediaFile.createdAt,
      updatedAt: mediaFile.updatedAt
    }))
  } catch (error) {
    console.error('Error fetching all media:', error)
    return []
  }
}