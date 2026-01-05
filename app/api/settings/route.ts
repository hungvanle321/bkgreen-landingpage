import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.setting.findMany()
    const settingsMap = settings.reduce((acc: Record<string, string>, setting: any) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

    // Get media URLs for the selected images
    const mediaIds = [settingsMap.logo, settingsMap.hero_background, settingsMap.favicon].filter(Boolean)
    if (mediaIds.length > 0) {
      const mediaFiles = await prisma.media.findMany({
        where: { id: { in: mediaIds } },
        select: { id: true, url: true }
      })

      const mediaMap = mediaFiles.reduce((acc: Record<string, string>, media: any) => {
        acc[media.id] = media.url
        return acc
      }, {})

      settingsMap.logo_url = mediaMap[settingsMap.logo] || ''
      settingsMap.hero_background_url = mediaMap[settingsMap.hero_background] || ''
      settingsMap.favicon_url = mediaMap[settingsMap.favicon] || ''
    }

    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}