import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const projectSchema = z.object({
  slug: z.string().min(1).optional(),
  images: z.array(z.string()).optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  year: z.string().optional(),
  capacity: z.string().optional(),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  translations: z.array(z.object({
    locale: z.enum(['vi', 'en', 'fr']),
    title: z.string().min(1),
    description: z.string().min(1),
    shortDescription: z.string().optional(),
    category: z.string().optional(),
  })).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const { id } = await params
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(project)
    } catch (error) {
      console.error('Error fetching project:', error)
      return NextResponse.json(
        { error: 'Failed to fetch project' },
        { status: 500 }
      )
    }
  })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (req, _user) => {
    try {
      const { id } = await params
      const body = await req.json()
      // Filter out empty translations before validation
      const filteredBody = {
        ...body,
        translations: body.translations?.filter((t: any) => 
          t.title?.trim() && t.description?.trim()
        ) || []
      }
      const data = projectSchema.parse(filteredBody)

      // Update project
      const updateData: any = { ...data }
      delete updateData.translations

      await prisma.project.update({
        where: { id },
        data: updateData,
      })

      // Update translations
      if (data.translations && data.translations.length > 0) {
        // Delete existing translations
        await prisma.projectTranslation.deleteMany({
          where: { projectId: id },
        })

        // Create new translations
        await prisma.projectTranslation.createMany({
          data: data.translations.map((t) => ({
            ...t,
            projectId: id,
          })),
        })
      }

      const updatedProject = await prisma.project.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      })

      return NextResponse.json(updatedProject)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error updating project:', error)
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const { id } = await params
      await prisma.project.delete({
        where: { id },
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting project:', error)
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      )
    }
  })
}

