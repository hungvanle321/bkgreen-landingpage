import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validations'
import { translateMissing } from '@/lib/azure-translate'

export async function GET(request: NextRequest) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      // For admin, return all translations (not filtered by locale)
      const projects = await prisma.project.findMany({
        include: {
          translations: true, // Get all translations
        },
        orderBy: { order: 'asc' },
      })

      return NextResponse.json(projects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async (req, user) => {
    try {
      const body = await req.json()
      // Filter out empty translations before validation
      const filteredBody = {
        ...body,
        translations: body.translations?.filter((t: any) => 
          t.title?.trim() && t.description?.trim()
        ) || []
      }

      const autoTranslated = await translateMissing(filteredBody.translations)
      const data = projectSchema.parse({ ...filteredBody, translations: autoTranslated })

      const project = await prisma.project.create({
        data: {
          ...data,
          userId: user.id,
          translations: {
            create: data.translations,
          },
        },
        include: {
          translations: true,
        },
      })

      return NextResponse.json(project, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error creating project:', error)
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      )
    }
  })
}

