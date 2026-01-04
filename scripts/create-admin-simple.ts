/**
 * Simple script to create an admin user using raw SQL
 * This bypasses Prisma Client adapter issues
 * 
 * Usage: npx tsx scripts/create-admin-simple.ts
 */

import 'dotenv/config'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'
import * as readline from 'readline'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function createAdmin() {
  try {
    console.log('🔐 Creating Admin User\n')

    // Check if admin already exists
    const existingAdmin = await pool.query(
      'SELECT * FROM "User" WHERE role = $1 LIMIT 1',
      ['ADMIN']
    )

    if (existingAdmin.rows.length > 0) {
      console.log(`⚠️  Admin user already exists: ${existingAdmin.rows[0].email}`)
      const overwrite = await question('Do you want to create another admin? (y/n): ')
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Cancelled.')
        process.exit(0)
      }
    }

    // Get user input
    const email = await question('Enter admin email: ')
    const password = await question('Enter admin password: ')
    const name = await question('Enter admin name (optional, press Enter to skip): ')

    if (!email || !password) {
      console.error('❌ Email and password are required!')
      process.exit(1)
    }

    // Check if email already exists
    const existingUser = await pool.query(
      'SELECT * FROM "User" WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      console.error(`❌ User with email ${email} already exists!`)
      process.exit(1)
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create admin user
    const result = await pool.query(
      `INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4, NOW(), NOW())
       RETURNING id, email, name, role`,
      [email, hashedPassword, name || null, 'ADMIN']
    )

    const admin = result.rows[0]

    console.log('\n✅ Admin user created successfully!')
    console.log(`   Email: ${admin.email}`)
    console.log(`   Name: ${admin.name || 'N/A'}`)
    console.log(`   Role: ${admin.role}`)
    console.log('\n🚀 You can now log in at /admin/login')
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  } finally {
    rl.close()
    await pool.end()
  }
}

createAdmin()

