import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  return requireAdmin(request, async () => {
    try {
      const settings = await prisma.setting.findMany()
      const settingsMap = settings.reduce((acc: Record<string, string>, setting) => {
        acc[setting.key] = setting.value
        return acc
      }, {})

      return NextResponse.json(settingsMap)
    } catch (error) {
      console.error('Error fetching settings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async () => {
    try {
      const body = await request.json()
      const { key, value } = body

      if (!key || value === undefined) {
        return NextResponse.json(
          { error: 'Key and value are required' },
          { status: 400 }
        )
      }

      const setting = await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })

      return NextResponse.json(setting)
    } catch (error) {
      console.error('Error saving setting:', error)
      return NextResponse.json(
        { error: 'Failed to save setting' },
        { status: 500 }
      )
    }
  })
}