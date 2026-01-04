import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const teamMemberSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  bio: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
})

export async function GET(request: NextRequest) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const members = await prisma.teamMember.findMany({
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(members)
    } catch (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json(
        { error: 'Failed to fetch team members' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async (req, user) => {
    try {
      const body = await req.json()
      const data = teamMemberSchema.parse(body)

      const member = await prisma.teamMember.create({
        data: {
          ...data,
          userId: user.id,
        },
      })

      return NextResponse.json(member, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error creating team member:', error)
      return NextResponse.json(
        { error: 'Failed to create team member' },
        { status: 500 }
      )
    }
  })
}

