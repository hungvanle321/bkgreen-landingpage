import { prisma } from '../lib/prisma'
import { hashPassword } from '../lib/auth'

async function createAdmin() {
  try {
    const email = process.argv[2] || 'admin@bkgreen.com'
    const password = process.argv[3] || 'admin123'
    const name = process.argv[4] || 'Admin User'

    console.log(`Creating admin user with email: ${email}`)

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    })

    if (existingAdmin) {
      console.log('Admin user already exists!')
      console.log(`Email: ${existingAdmin.email}`)
      console.log(`Role: ${existingAdmin.role}`)
      return
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    })

    console.log('✅ Admin user created successfully!')
    console.log(`Email: ${admin.email}`)
    console.log(`Name: ${admin.name}`)
    console.log(`Role: ${admin.role}`)
    console.log(`\nLogin credentials:`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)

  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

createAdmin()
