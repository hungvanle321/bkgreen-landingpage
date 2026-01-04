/**
 * Seed script for products only
 *
 * Usage: npx tsx scripts/seed-products.ts
 */

import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { put } from '@vercel/blob'
import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
config({ path: join(__dirname, '../.env') })

// Create Prisma client
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Ensure BLOB_READ_WRITE_TOKEN is set
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN environment variable is not set')
  process.exit(1)
}

// Helper function to upload image file
async function uploadImage(filePath: string, fileName: string): Promise<string> {
  try {
    const fileBuffer = readFileSync(filePath)
    const file = new File([fileBuffer], fileName, { type: 'image/jpeg' })

    const blob = await put(fileName, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      addRandomSuffix: true,
    })

    console.log(`✓ Uploaded: ${fileName} -> ${blob.url}`)
    return blob.url
  } catch (error) {
    console.error(`✗ Failed to upload ${fileName}:`, error)
    throw error
  }
}

// Load translation data
function loadTranslations() {
  const viMessages = JSON.parse(
    readFileSync(join(__dirname, '../messages/vi.json'), 'utf-8')
  )
  const enMessages = JSON.parse(
    readFileSync(join(__dirname, '../messages/en.json'), 'utf-8')
  )
  const frMessages = JSON.parse(
    readFileSync(join(__dirname, '../messages/fr.json'), 'utf-8')
  )

  return { vi: viMessages, en: enMessages, fr: frMessages }
}

async function seedProducts(translations: any) {
  console.log('\n📦 Seeding Products...')

  const products = [
    // Featured products
    {
      slug: 'bom-cong-nghiep-bk-p100',
      images: ['/equipment-pump.jpg'],
      specs: 'Lưu lượng: 100 m³/h | Áp suất: 50m',
      order: 0,
      featured: true,
      translations: {
        vi: {
          name: translations.vi.productsPage.featured.products[0].name,
          description: translations.vi.productsPage.featured.products[0].description,
          category: translations.vi.productsPage.featured.products[0].category,
        },
        en: {
          name: translations.en.productsPage.featured.products[0].name,
          description: translations.en.productsPage.featured.products[0].description,
          category: translations.en.productsPage.featured.products[0].category,
        },
        fr: {
          name: translations.fr.productsPage.featured.products[0].name,
          description: translations.fr.productsPage.featured.products[0].description,
          category: translations.fr.productsPage.featured.products[0].category,
        },
      },
    },
    {
      slug: 'van-dieu-ap-bk-v50',
      images: ['/equipment-valve.jpg'],
      specs: 'Áp suất: 0-16 bar | Nhiệt độ: -10°C đến 80°C',
      order: 1,
      featured: true,
      translations: {
        vi: {
          name: translations.vi.productsPage.featured.products[1].name,
          description: translations.vi.productsPage.featured.products[1].description,
          category: translations.vi.productsPage.featured.products[1].category,
        },
        en: {
          name: translations.en.productsPage.featured.products[1].name,
          description: translations.en.productsPage.featured.products[1].description,
          category: translations.en.productsPage.featured.products[1].category,
        },
        fr: {
          name: translations.fr.productsPage.featured.products[1].name,
          description: translations.fr.productsPage.featured.products[1].description,
          category: translations.fr.productsPage.featured.products[1].category,
        },
      },
    },
    {
      slug: 'he-thong-ro-bk-ro2000',
      images: ['/equipment-ro.jpg'],
      specs: 'Công suất: 2000L/h | Tỷ lệ thu hồi: 75%',
      order: 2,
      featured: true,
      translations: {
        vi: {
          name: translations.vi.productsPage.featured.products[2].name,
          description: translations.vi.productsPage.featured.products[2].description,
          category: translations.vi.productsPage.featured.products[2].category,
        },
        en: {
          name: translations.en.productsPage.featured.products[2].name,
          description: translations.en.productsPage.featured.products[2].description,
          category: translations.en.productsPage.featured.products[2].category,
        },
        fr: {
          name: translations.fr.productsPage.featured.products[2].name,
          description: translations.fr.productsPage.featured.products[2].description,
          category: translations.fr.productsPage.featured.products[2].category,
        },
      },
    },
    // Category products - Pumps
    {
      slug: 'bom-cong-nghiep',
      images: ['/equipment-pump.jpg'],
      specs: 'Lưu lượng: 50-500 m³/h',
      order: 3,
      featured: false,
      translations: {
        vi: {
          name: translations.vi.productsPage.categories.items.pumps.products[0].name,
          description: translations.vi.productsPage.categories.items.pumps.products[0].description,
          category: 'Máy Bơm',
        },
        en: {
          name: translations.en.productsPage.categories.items.pumps.products[0].name,
          description: translations.en.productsPage.categories.items.pumps.products[0].description,
          category: 'Pumps',
        },
        fr: {
          name: translations.fr.productsPage.categories.items.pumps.products[0].name,
          description: translations.fr.productsPage.categories.items.pumps.products[0].description,
          category: 'Pompes',
        },
      },
    },
    {
      slug: 'bom-nuoc-thai',
      images: ['/equipment-pump.jpg'],
      specs: 'Lưu lượng: 20-200 m³/h',
      order: 4,
      featured: false,
      translations: {
        vi: {
          name: translations.vi.productsPage.categories.items.pumps.products[1].name,
          description: translations.vi.productsPage.categories.items.pumps.products[1].description,
          category: 'Máy Bơm',
        },
        en: {
          name: translations.en.productsPage.categories.items.pumps.products[1].name,
          description: translations.en.productsPage.categories.items.pumps.products[1].description,
          category: 'Pumps',
        },
        fr: {
          name: translations.fr.productsPage.categories.items.pumps.products[1].name,
          description: translations.fr.productsPage.categories.items.pumps.products[1].description,
          category: 'Pompes',
        },
      },
    },
    // Valves
    {
      slug: 'van-dieu-ap',
      images: ['/equipment-valve.jpg'],
      specs: 'Áp suất: 0-16 bar',
      order: 5,
      featured: false,
      translations: {
        vi: {
          name: translations.vi.productsPage.categories.items.valves.products[0].name,
          description: translations.vi.productsPage.categories.items.valves.products[0].description,
          category: 'Van',
        },
        en: {
          name: translations.en.productsPage.categories.items.valves.products[0].name,
          description: translations.en.productsPage.categories.items.valves.products[0].description,
          category: 'Valves',
        },
        fr: {
          name: translations.fr.productsPage.categories.items.valves.products[0].name,
          description: translations.fr.productsPage.categories.items.valves.products[0].description,
          category: 'Vannes',
        },
      },
    },
    {
      slug: 'van-chong-ro-ri',
      images: ['/equipment-valve.jpg'],
      specs: 'Áp suất: 0-25 bar',
      order: 6,
      featured: false,
      translations: {
        vi: {
          name: translations.vi.productsPage.categories.items.valves.products[1].name,
          description: translations.vi.productsPage.categories.items.valves.products[1].description,
          category: 'Van',
        },
        en: {
          name: translations.en.productsPage.categories.items.valves.products[1].name,
          description: translations.en.productsPage.categories.items.valves.products[1].description,
          category: 'Valves',
        },
        fr: {
          name: translations.fr.productsPage.categories.items.valves.products[1].name,
          description: translations.fr.productsPage.categories.items.valves.products[1].description,
          category: 'Vannes',
        },
      },
    },
    // Fire safety
    {
      slug: 'voi-phun-nuoc',
      images: ['/equipment-fire.jpg'],
      specs: 'Đường kính: 50-200mm',
      order: 7,
      featured: false,
      translations: {
        vi: {
          name: translations.vi.productsPage.categories.items.fire.products[0].name,
          description: translations.vi.productsPage.categories.items.fire.products[0].description,
          category: 'Phụ Kiện PCCC',
        },
        en: {
          name: translations.en.productsPage.categories.items.fire.products[0].name,
          description: translations.en.productsPage.categories.items.fire.products[0].description,
          category: 'Fire Accessories',
        },
        fr: {
          name: translations.fr.productsPage.categories.items.fire.products[0].name,
          description: translations.fr.productsPage.categories.items.fire.products[0].description,
          category: 'Accessoires Incendie',
        },
      },
    },
    {
      slug: 'he-thong-bao-chay',
      images: ['/equipment-fire.jpg'],
      specs: 'Phạm vi: 1000m²',
      order: 8,
      featured: false,
      translations: {
        vi: {
          name: translations.vi.productsPage.categories.items.fire.products[1].name,
          description: translations.vi.productsPage.categories.items.fire.products[1].description,
          category: 'Phụ Kiện PCCC',
        },
        en: {
          name: translations.en.productsPage.categories.items.fire.products[1].name,
          description: translations.en.productsPage.categories.items.fire.products[1].description,
          category: 'Fire Accessories',
        },
        fr: {
          name: translations.fr.productsPage.categories.items.fire.products[1].name,
          description: translations.fr.productsPage.categories.items.fire.products[1].description,
          category: 'Accessoires Incendie',
        },
      },
    },
  ]

  for (const product of products) {
    try {
      // Upload images
      const uploadedImages: string[] = []
      for (const imagePath of product.images) {
        const fullPath = join(__dirname, '../public', imagePath)
        const fileName = imagePath.split('/').pop()!
        const url = await uploadImage(fullPath, fileName)
        uploadedImages.push(url)
      }

      // Create product with translations
      await prisma.product.create({
        data: {
          slug: product.slug,
          images: uploadedImages,
          specs: product.specs,
          order: product.order,
          featured: product.featured,
          translations: {
            create: [
              {
                locale: 'vi',
                name: product.translations.vi.name,
                description: product.translations.vi.description,
                category: product.translations.vi.category,
              },
              {
                locale: 'en',
                name: product.translations.en.name,
                description: product.translations.en.description,
                category: product.translations.en.category,
              },
              {
                locale: 'fr',
                name: product.translations.fr.name,
                description: product.translations.fr.description,
                category: product.translations.fr.category,
              },
            ],
          },
        },
      })

      console.log(`✓ Created product: ${product.slug}`)
    } catch (error) {
      console.error(`✗ Failed to create product ${product.slug}:`, error)
    }
  }
}

async function main() {
  console.log('🚀 Starting product seeding...\n')

  try {
    const translations = loadTranslations()

    await seedProducts(translations)

    console.log('\n✅ Product seeding completed successfully!')
  } catch (error) {
    console.error('\n❌ Product seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()