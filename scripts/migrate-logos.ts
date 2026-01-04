import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
config({ path: join(__dirname, '../.env') })

// Create Prisma client for migration script
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function migrateFixedImages() {
  console.log('Starting fixed images migration...')

  try {
    // Check if images already exist
    const existingImages = await prisma.media.findMany({
      where: { category: { not: 'general' } }
    })

    if (existingImages.length > 0) {
      console.log('Fixed images already migrated, skipping...')
      return
    }

    // Define fixed image files to migrate (only truly fixed/hardcoded images)
    const fixedImages = [
      // Logos (multiple variants for different contexts)
      {
        name: 'Logo Transparent Rectangle',
        url: '/logo-transparent-rectangle.svg',
        type: 'image/svg+xml',
        size: 1024,
        category: 'logo'
      },
      {
        name: 'Logo Transparent Square',
        url: '/logo-transparent-square.svg',
        type: 'image/svg+xml',
        size: 1024,
        category: 'logo'
      },
      {
        name: 'Logo White Rectangle',
        url: '/logo-white-rectangle.svg',
        type: 'image/svg+xml',
        size: 1024,
        category: 'logo_white'
      },
      {
        name: 'Logo White Square PNG',
        url: '/logo-white-square.png',
        type: 'image/png',
        size: 2048,
        category: 'logo_white'
      },
      {
        name: 'Logo White Square SVG',
        url: '/logo-white-square.svg',
        type: 'image/svg+xml',
        size: 1024,
        category: 'logo_white'
      },

      // Hero Background (fixed background image)
      {
        name: 'Hero Background',
        url: '/hero-bg.jpg',
        type: 'image/jpeg',
        size: 204800,
        category: 'hero_background'
      },

      // Process Section Background (fixed background image)
      {
        name: 'Process Diagram Background',
        url: '/process-diagram.jpg',
        type: 'image/jpeg',
        size: 153600,
        category: 'process_background'
      },

      // About Company Image (fixed image in about section)
      {
        name: 'About Company Image',
        url: '/about-company.jpg',
        type: 'image/jpeg',
        size: 102400,
        category: 'about_image'
      }
    ]

    // Create image records
    for (const image of fixedImages) {
      await prisma.media.create({
        data: image
      })
      console.log(`Created image: ${image.name}`)
    }

    // Set default settings
    const settings = [
      { key: 'logo', url: '/logo-transparent-rectangle.svg' },
      { key: 'hero_background', url: '/hero-bg.jpg' },
      { key: 'process_background', url: '/process-diagram.jpg' },
      { key: 'about_image', url: '/about-company.jpg' }
    ]

    for (const setting of settings) {
      const media = await prisma.media.findFirst({
        where: { url: setting.url }
      })

      if (media) {
        await prisma.setting.upsert({
          where: { key: setting.key },
          update: { value: media.id },
          create: { key: setting.key, value: media.id }
        })
        console.log(`Set default setting: ${setting.key}`)
      }
    }

    console.log('Fixed images migration completed successfully!')
  } catch (error) {
    console.error('Error during fixed images migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateFixedImages()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })