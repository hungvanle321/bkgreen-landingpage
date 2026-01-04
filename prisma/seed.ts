import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

config({ path: '.env' })

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Starting seed...')

  // Create a default admin user if not exists
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@bkgreen.vn' },
    update: {},
    create: {
      email: 'admin@bkgreen.vn',
      name: 'Admin',
      password: '$2b$10$dummy.hash.for.seed', // This should be properly hashed in production
      role: 'ADMIN',
    },
  })

  // Seed Services
  const servicesData = [
    {
      slug: 'wastewater',
      icon: 'Droplets',
      image: '/service-wastewater.jpg',
      order: 1,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Xử Lý Nước Thải',
            description: 'Cung cấp giải pháp & thi công hệ thống xử lý nước thải cho tòa nhà, khu công nghiệp'
          },
          {
            locale: 'en',
            title: 'Wastewater Treatment',
            description: 'Providing solutions and construction of wastewater treatment systems for buildings and industrial zones'
          }
        ]
      }
    },
    {
      slug: 'ro',
      icon: 'Zap',
      image: '/service-ro.jpg',
      order: 2,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Hệ Thống RO',
            description: 'Cung cấp giải pháp & thi công hệ thống xử lý nước RO'
          },
          {
            locale: 'en',
            title: 'RO Systems',
            description: 'Providing solutions and construction of RO water treatment systems'
          }
        ]
      }
    },
    {
      slug: 'electrical',
      icon: 'Shield',
      image: '/service-electrical.jpg',
      order: 3,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Tủ Điện & SCADA',
            description: 'Cung cấp giải pháp và thi công hệ thống tủ điện, SCADA'
          },
          {
            locale: 'en',
            title: 'Electrical Cabinets & SCADA',
            description: 'Providing solutions and construction of electrical cabinets and SCADA systems'
          }
        ]
      }
    },
    {
      slug: 'equipment',
      icon: 'Wrench',
      image: '/service-equipment.jpg',
      order: 4,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Thiết Bị PCCC',
            description: 'Kinh doanh & phân phối thiết bị: Máy bơm, Van, Phụ kiện ngành nước và PCCC'
          },
          {
            locale: 'en',
            title: 'Fire Protection Equipment',
            description: 'Trading and distribution of equipment: Pumps, Valves, Water industry accessories and Fire Protection'
          }
        ]
      }
    },
    {
      slug: 'operation',
      icon: 'Settings',
      image: '/service-operation.jpg',
      order: 5,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Vận hành hệ thống',
            description: 'Dịch vụ vận hành và bảo trì hệ thống nước'
          },
          {
            locale: 'en',
            title: 'System Operation',
            description: 'Water system operation and maintenance services'
          }
        ]
      }
    },
    {
      slug: 'consulting',
      icon: 'Package',
      image: '/service-consulting.jpg',
      order: 6,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Tư Vấn Kỹ Thuật',
            description: 'Tư vấn và thiết kế hệ thống xử lý nước tối ưu cho từng dự án'
          },
          {
            locale: 'en',
            title: 'Technical Consulting',
            description: 'Consulting and designing optimal water treatment systems for each project'
          }
        ]
      }
    }
  ]

  for (const service of servicesData) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        ...service,
        userId: adminUser.id,
      },
    })
  }

  // Seed Equipment
  const equipmentData = [
    {
      slug: 'pump',
      image: '/equipment-pump.jpg',
      order: 1,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Máy Bơm Công Nghiệp',
            description: 'Máy bơm chuyên dụng cho hệ thống xử lý nước',
            category: 'Thiết bị chính'
          },
          {
            locale: 'en',
            title: 'Industrial Pumps',
            description: 'Specialized pumps for water treatment systems',
            category: 'Main Equipment'
          }
        ]
      }
    },
    {
      slug: 'valve',
      image: '/equipment-valve.jpg',
      order: 2,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Van Công Nghiệp',
            description: 'Van điều khiển, van an toàn cho hệ thống nước',
            category: 'Phụ kiện'
          },
          {
            locale: 'en',
            title: 'Industrial Valves',
            description: 'Control valves, safety valves for water systems',
            category: 'Accessories'
          }
        ]
      }
    },
    {
      slug: 'fire',
      image: '/equipment-fire.jpg',
      order: 3,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Thiết Bị PCCC',
            description: 'Hệ thống phòng cháy chữa cháy chuyên nghiệp',
            category: 'An toàn'
          },
          {
            locale: 'en',
            title: 'Fire Protection Equipment',
            description: 'Professional fire protection systems',
            category: 'Safety'
          }
        ]
      }
    },
    {
      slug: 'ro-system',
      image: '/equipment-ro.jpg',
      order: 4,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Hệ Thống RO',
            description: 'Thiết bị lọc nước RO công nghiệp',
            category: 'Xử lý nước'
          },
          {
            locale: 'en',
            title: 'RO Systems',
            description: 'Industrial RO water filtration equipment',
            category: 'Water Treatment'
          }
        ]
      }
    }
  ]

  for (const equipment of equipmentData) {
    await prisma.equipment.upsert({
      where: { slug: equipment.slug },
      update: {},
      create: {
        ...equipment,
        userId: adminUser.id,
      },
    })
  }

  // Seed Process Steps
  const processStepsData = [
    {
      step: '01',
      image: '/process-survey.jpg',
      order: 1,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Khảo Sát & Đánh Giá',
            description: 'Khảo sát hiện trạng và đánh giá nhu cầu xử lý nước'
          },
          {
            locale: 'en',
            title: 'Survey & Assessment',
            description: 'Survey current status and assess water treatment needs'
          }
        ]
      }
    },
    {
      step: '02',
      image: '/process-design.jpg',
      order: 2,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Thiết Kế Hệ Thống',
            description: 'Thiết kế hệ thống xử lý nước phù hợp với yêu cầu'
          },
          {
            locale: 'en',
            title: 'System Design',
            description: 'Design water treatment systems suitable for requirements'
          }
        ]
      }
    },
    {
      step: '03',
      image: '/process-installation.jpg',
      order: 3,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Thi Công & Lắp Đặt',
            description: 'Thi công và lắp đặt hệ thống theo thiết kế'
          },
          {
            locale: 'en',
            title: 'Construction & Installation',
            description: 'Construct and install systems according to design'
          }
        ]
      }
    },
    {
      step: '04',
      image: '/process-maintenance.jpg',
      order: 4,
      translations: {
        create: [
          {
            locale: 'vi',
            title: 'Vận Hành & Bảo Trì',
            description: 'Vận hành hệ thống và bảo trì định kỳ'
          },
          {
            locale: 'en',
            title: 'Operation & Maintenance',
            description: 'Operate systems and perform regular maintenance'
          }
        ]
      }
    }
  ]

  for (const step of processStepsData) {
    try {
      await prisma.processStep.create({
        data: {
          ...step,
          userId: adminUser.id,
        },
      })
    } catch (error) {
      // Step might already exist, skip
      console.log(`Process step ${step.step} might already exist, skipping...`)
    }
  }

  // Seed Team Member
  try {
    await prisma.teamMember.create({
      data: {
        name: 'Ông Trần Bá Điền',
        position: 'Giám đốc điều hành',
        bio: 'Kỹ sư môi trường với hơn 15 năm kinh nghiệm trong lĩnh vực xử lý nước thải và quản lý dự án',
        email: 'dien.tran@bkgreen.vn',
        phone: '0931252511',
        image: '/team-dien-tran.jpg',
        userId: adminUser.id,
      },
    })
  } catch (error) {
    console.log('Team member might already exist, skipping...')
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })