/**
 * Migration script to upload existing images and data to PostgreSQL
 * 
 * This script:
 * 1. Uploads images from public folder to Vercel Blob Storage
 * 2. Creates database entries for Projects, Services, Products, Equipment, and Process Steps
 * 3. Uses existing translation data from messages files
 * 
 * Usage: npx tsx scripts/migrate-data.ts
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

// Create Prisma client for migration script
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

async function migrateProjects(translations: any) {
  console.log('\n📦 Migrating Projects...')
  
  const projects = [
    {
      slug: 'nha-may-nuoc-toc-tien',
      images: ['/service-wastewater.jpg'],
      location: 'Bà Rịa - Vũng Tàu',
      type: 'Nước cấp',
      status: 'Thử nghiệm',
      year: '2025',
      capacity: '500 m³/ngày',
      order: 0,
      featured: true,
      translations: {
        vi: {
          title: 'Nhà Máy Nước Tóc Tiên - BRVT',
          description: 'Dự án thử nghiệm hệ thống xử lý nước sạch cho khu vực Tóc Tiên, đang trong giai đoạn hoàn thiện.',
          category: 'Nước cấp',
        },
        en: {
          title: 'Toc Tien Water Plant - BRVT',
          description: 'Pilot project for clean water treatment system in Toc Tien area, currently in completion phase.',
          category: 'Water Supply',
        },
        fr: {
          title: 'Usine d\'Eau Toc Tien - BRVT',
          description: 'Projet pilote pour système de traitement d\'eau potable dans la zone de Toc Tien, actuellement en phase de finalisation.',
          category: 'Approvisionnement en eau',
        },
      },
    },
    {
      slug: 'nha-may-nuoc-ho-da-den-2',
      images: ['/service-ro.jpg'],
      location: 'Bà Rịa - Vũng Tàu',
      type: 'Nước cấp',
      status: 'Đang phát triển',
      year: '2025',
      capacity: '1000 m³/ngày',
      order: 1,
      featured: true,
      translations: {
        vi: {
          title: 'Nhà Máy Nước Hồ Đá Đen BRVT 2',
          description: 'Dự án nâng cấp hệ thống xử lý nước tại Hồ Đá Đen, mở rộng công suất và cải thiện chất lượng.',
          category: 'Nước cấp',
        },
        en: {
          title: 'Ho Da Den Water Plant BRVT 2',
          description: 'Water treatment system upgrade project at Ho Da Den, expanding capacity and improving quality.',
          category: 'Water Supply',
        },
        fr: {
          title: 'Usine d\'Eau Ho Da Den BRVT 2',
          description: 'Projet de modernisation du système de traitement de l\'eau à Ho Da Den, expansion de la capacité et amélioration de la qualité.',
          category: 'Approvisionnement en eau',
        },
      },
    },
    // Add more projects as needed
  ]

  for (const project of projects) {
    try {
      // Upload images
      const uploadedImages: string[] = []
      for (const imagePath of project.images) {
        const fullPath = join(__dirname, '../public', imagePath)
        const fileName = imagePath.split('/').pop()!
        const url = await uploadImage(fullPath, fileName)
        uploadedImages.push(url)
      }

      // Create project with translations
      await prisma.project.create({
        data: {
          slug: project.slug,
          images: uploadedImages,
          location: project.location,
          type: project.type,
          status: project.status,
          year: project.year,
          capacity: project.capacity,
          order: project.order,
          featured: project.featured,
          translations: {
            create: [
              {
                locale: 'vi',
                title: project.translations.vi.title,
                description: project.translations.vi.description,
                category: project.translations.vi.category,
              },
              {
                locale: 'en',
                title: project.translations.en.title,
                description: project.translations.en.description,
                category: project.translations.en.category,
              },
              {
                locale: 'fr',
                title: project.translations.fr.title,
                description: project.translations.fr.description,
                category: project.translations.fr.category,
              },
            ],
          },
        },
      })
      
      console.log(`✓ Created project: ${project.slug}`)
    } catch (error) {
      console.error(`✗ Failed to create project ${project.slug}:`, error)
    }
  }
}

async function migrateServices(translations: any) {
  console.log('\n🔧 Migrating Services...')
  
  const services = [
    {
      slug: 'xu-ly-nuoc-thai',
      image: '/service-wastewater.jpg',
      icon: 'Droplets',
      order: 0,
      translations: {
        vi: {
          title: translations.vi.services.wastewater.title,
          description: translations.vi.services.wastewater.description,
        },
        en: {
          title: translations.en.services.wastewater.title,
          description: translations.en.services.wastewater.description,
        },
        fr: {
          title: translations.fr.services.wastewater.title,
          description: translations.fr.services.wastewater.description,
        },
      },
    },
    {
      slug: 'van-hanh-he-thong',
      image: '/service-operation.jpg',
      icon: 'Settings',
      order: 1,
      translations: {
        vi: {
          title: translations.vi.services.operation.title,
          description: translations.vi.services.operation.description,
        },
        en: {
          title: translations.en.services.operation.title,
          description: translations.en.services.operation.description,
        },
        fr: {
          title: translations.fr.services.operation.title,
          description: translations.fr.services.operation.description,
        },
      },
    },
    {
      slug: 'he-thong-ro',
      image: '/service-ro.jpg',
      icon: 'Zap',
      order: 2,
      translations: {
        vi: {
          title: translations.vi.services.ro.title,
          description: translations.vi.services.ro.description,
        },
        en: {
          title: translations.en.services.ro.title,
          description: translations.en.services.ro.description,
        },
        fr: {
          title: translations.fr.services.ro.title,
          description: translations.fr.services.ro.description,
        },
      },
    },
    {
      slug: 'tu-dien-scada',
      image: '/service-electrical.jpg',
      icon: 'Shield',
      order: 3,
      translations: {
        vi: {
          title: translations.vi.services.electrical.title,
          description: translations.vi.services.electrical.description,
        },
        en: {
          title: translations.en.services.electrical.title,
          description: translations.en.services.electrical.description,
        },
        fr: {
          title: translations.fr.services.electrical.title,
          description: translations.fr.services.electrical.description,
        },
      },
    },
    {
      slug: 'thiet-bi-thi-cong',
      image: '/service-equipment.jpg',
      icon: 'Wrench',
      order: 4,
      translations: {
        vi: {
          title: translations.vi.services.equipment.title,
          description: translations.vi.services.equipment.description,
        },
        en: {
          title: translations.en.services.equipment.title,
          description: translations.en.services.equipment.description,
        },
        fr: {
          title: translations.fr.services.equipment.title,
          description: translations.fr.services.equipment.description,
        },
      },
    },
    {
      slug: 'tu-van-thiet-ke',
      image: '/service-consulting.jpg',
      icon: 'Package',
      order: 5,
      translations: {
        vi: {
          title: translations.vi.services.consulting.title,
          description: translations.vi.services.consulting.description,
        },
        en: {
          title: translations.en.services.consulting.title,
          description: translations.en.services.consulting.description,
        },
        fr: {
          title: translations.fr.services.consulting.title,
          description: translations.fr.services.consulting.description,
        },
      },
    },
  ]

  for (const service of services) {
    try {
      // Upload image
      const fullPath = join(__dirname, '../public', service.image)
      const fileName = service.image.split('/').pop()!
      const imageUrl = await uploadImage(fullPath, fileName)

      // Create service with translations
      await prisma.service.create({
        data: {
          slug: service.slug,
          image: imageUrl,
          icon: service.icon,
          order: service.order,
          translations: {
            create: [
              {
                locale: 'vi',
                title: service.translations.vi.title,
                description: service.translations.vi.description,
              },
              {
                locale: 'en',
                title: service.translations.en.title,
                description: service.translations.en.description,
              },
              {
                locale: 'fr',
                title: service.translations.fr.title,
                description: service.translations.fr.description,
              },
            ],
          },
        },
      })
      
      console.log(`✓ Created service: ${service.slug}`)
    } catch (error) {
      console.error(`✗ Failed to create service ${service.slug}:`, error)
    }
  }
}

async function migrateEquipment(translations: any) {
  console.log('\n⚙️ Migrating Equipment...')
  
  const equipment = [
    {
      slug: 'may-bom-cong-nghiep',
      image: '/equipment-pump.jpg',
      order: 0,
      translations: {
        vi: {
          title: translations.vi.equipment.items.pump.title,
          description: translations.vi.equipment.items.pump.description,
          category: translations.vi.equipment.items.pump.category,
        },
        en: {
          title: translations.en.equipment.items.pump.title,
          description: translations.en.equipment.items.pump.description,
          category: translations.en.equipment.items.pump.category,
        },
        fr: {
          title: translations.fr.equipment.items.pump.title,
          description: translations.fr.equipment.items.pump.description,
          category: translations.fr.equipment.items.pump.category,
        },
      },
    },
    {
      slug: 'van-cong-nghiep',
      image: '/equipment-valve.jpg',
      order: 1,
      translations: {
        vi: {
          title: translations.vi.equipment.items.valve.title,
          description: translations.vi.equipment.items.valve.description,
          category: translations.vi.equipment.items.valve.category,
        },
        en: {
          title: translations.en.equipment.items.valve.title,
          description: translations.en.equipment.items.valve.description,
          category: translations.en.equipment.items.valve.category,
        },
        fr: {
          title: translations.fr.equipment.items.valve.title,
          description: translations.fr.equipment.items.valve.description,
          category: translations.fr.equipment.items.valve.category,
        },
      },
    },
    {
      slug: 'thiet-bi-pccc',
      image: '/equipment-fire.jpg',
      order: 2,
      translations: {
        vi: {
          title: translations.vi.equipment.items.fire.title,
          description: translations.vi.equipment.items.fire.description,
          category: translations.vi.equipment.items.fire.category,
        },
        en: {
          title: translations.en.equipment.items.fire.title,
          description: translations.en.equipment.items.fire.description,
          category: translations.en.equipment.items.fire.category,
        },
        fr: {
          title: translations.fr.equipment.items.fire.title,
          description: translations.fr.equipment.items.fire.description,
          category: translations.fr.equipment.items.fire.category,
        },
      },
    },
    {
      slug: 'he-thong-ro',
      image: '/equipment-ro.jpg',
      order: 3,
      translations: {
        vi: {
          title: translations.vi.equipment.items.ro.title,
          description: translations.vi.equipment.items.ro.description,
          category: translations.vi.equipment.items.ro.category,
        },
        en: {
          title: translations.en.equipment.items.ro.title,
          description: translations.en.equipment.items.ro.description,
          category: translations.en.equipment.items.ro.category,
        },
        fr: {
          title: translations.fr.equipment.items.ro.title,
          description: translations.fr.equipment.items.ro.description,
          category: translations.fr.equipment.items.ro.category,
        },
      },
    },
  ]

  for (const item of equipment) {
    try {
      // Upload image
      const fullPath = join(__dirname, '../public', item.image)
      const fileName = item.image.split('/').pop()!
      const imageUrl = await uploadImage(fullPath, fileName)

      // Create equipment with translations
      await prisma.equipment.create({
        data: {
          slug: item.slug,
          image: imageUrl,
          order: item.order,
          translations: {
            create: [
              {
                locale: 'vi',
                title: item.translations.vi.title,
                description: item.translations.vi.description,
                category: item.translations.vi.category,
              },
              {
                locale: 'en',
                title: item.translations.en.title,
                description: item.translations.en.description,
                category: item.translations.en.category,
              },
              {
                locale: 'fr',
                title: item.translations.fr.title,
                description: item.translations.fr.description,
                category: item.translations.fr.category,
              },
            ],
          },
        },
      })
      
      console.log(`✓ Created equipment: ${item.slug}`)
    } catch (error) {
      console.error(`✗ Failed to create equipment ${item.slug}:`, error)
    }
  }
}

async function migrateProducts(translations: any) {
  console.log('\n📦 Migrating Products...')

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

async function migrateProcessSteps(translations: any) {
  console.log('\n🔄 Migrating Process Steps...')

  const steps = [
    {
      step: '01',
      image: '/process-survey.jpg',
      order: 0,
      translations: {
        vi: {
          title: translations.vi.process.steps.survey.title,
          description: translations.vi.process.steps.survey.description,
        },
        en: {
          title: translations.en.process.steps.survey.title,
          description: translations.en.process.steps.survey.description,
        },
        fr: {
          title: translations.fr.process.steps.survey.title,
          description: translations.fr.process.steps.survey.description,
        },
      },
    },
    {
      step: '02',
      image: '/process-design.jpg',
      order: 1,
      translations: {
        vi: {
          title: translations.vi.process.steps.design.title,
          description: translations.vi.process.steps.design.description,
        },
        en: {
          title: translations.en.process.steps.design.title,
          description: translations.en.process.steps.design.description,
        },
        fr: {
          title: translations.fr.process.steps.design.title,
          description: translations.fr.process.steps.design.description,
        },
      },
    },
    {
      step: '03',
      image: '/process-installation.jpg',
      order: 2,
      translations: {
        vi: {
          title: translations.vi.process.steps.installation.title,
          description: translations.vi.process.steps.installation.description,
        },
        en: {
          title: translations.en.process.steps.installation.title,
          description: translations.en.process.steps.installation.description,
        },
        fr: {
          title: translations.fr.process.steps.installation.title,
          description: translations.fr.process.steps.installation.description,
        },
      },
    },
    {
      step: '04',
      image: '/process-maintenance.jpg',
      order: 3,
      translations: {
        vi: {
          title: translations.vi.process.steps.maintenance.title,
          description: translations.vi.process.steps.maintenance.description,
        },
        en: {
          title: translations.en.process.steps.maintenance.title,
          description: translations.en.process.steps.maintenance.description,
        },
        fr: {
          title: translations.fr.process.steps.maintenance.title,
          description: translations.fr.process.steps.maintenance.description,
        },
      },
    },
  ]

  for (const step of steps) {
    try {
      // Upload image
      const fullPath = join(__dirname, '../public', step.image)
      const fileName = step.image.split('/').pop()!
      const imageUrl = await uploadImage(fullPath, fileName)

      // Create process step with translations
      await prisma.processStep.create({
        data: {
          step: step.step,
          image: imageUrl,
          order: step.order,
          translations: {
            create: [
              {
                locale: 'vi',
                title: step.translations.vi.title,
                description: step.translations.vi.description,
              },
              {
                locale: 'en',
                title: step.translations.en.title,
                description: step.translations.en.description,
              },
              {
                locale: 'fr',
                title: step.translations.fr.title,
                description: step.translations.fr.description,
              },
            ],
          },
        },
      })

      console.log(`✓ Created process step: ${step.step}`)
    } catch (error) {
      console.error(`✗ Failed to create process step ${step.step}:`, error)
    }
  }
}

async function main() {
  console.log('🚀 Starting data migration...\n')
  
  try {
    const translations = loadTranslations()
    
    // await migrateProjects(translations)
    // await migrateServices(translations)
    // await migrateEquipment(translations)
    await migrateProducts(translations)
    // await migrateProcessSteps(translations)
    
    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

