# Admin Panel Setup Guide

This guide explains how to set up and use the admin panel for managing your landing page content.

## Prerequisites

1. **Create `.env` file**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Or create a new `.env` file in the root directory

2. **PostgreSQL Database (Neon)**
   - Set up a Neon PostgreSQL database at https://neon.tech
   - Get your `DATABASE_URL` connection string from the Neon dashboard
   - Add it to your `.env` file:
     ```
     DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
     ```
   - **Important**: Make sure there are no spaces around the `=` sign

3. **Vercel Blob Storage**
   - Set up Vercel Blob Storage in your Vercel dashboard
   - Go to Storage > Blob and get your `BLOB_READ_WRITE_TOKEN`
   - Add it to your `.env` file:
     ```
     BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
     ```

3. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Install Missing Dependencies**
   ```bash
   npm install bcrypt @types/bcrypt tsx
   # or
   yarn add bcrypt @types/bcrypt tsx
   ```

## Database Setup

1. **Push Prisma Schema to Database**
   ```bash
   npm run db:push
   ```

2. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

## Migrating Existing Data

The migration script will:
- Upload all images from the `public` folder to Vercel Blob Storage
- Create database entries for Projects, Services, Products, Equipment, and Process Steps
- Use existing translation data from your `messages` files

### Running the Migration

1. **Make sure your environment variables are set:**
   - `DATABASE_URL`
   - `BLOB_READ_WRITE_TOKEN`

2. **Run the migration script:**
   ```bash
   npm run migrate
   ```

   This will:
   - Upload images to Vercel Blob
   - Create database entries with multilingual translations
   - Preserve all existing content structure

### Manual Data Entry

If you prefer to enter data manually through the admin panel:

1. Log in to `/admin/login`
2. Navigate to the relevant section (Projects, Services, etc.)
3. Click "Add New" and fill in the form
4. Upload images directly through the admin interface
5. Add translations for all three languages (vi, en, fr)

## Admin Panel Features

### Available Sections

1. **Dashboard** (`/admin`)
   - Overview statistics
   - Quick access to all sections

2. **Projects** (`/admin/projects`)
   - Manage all projects
   - Upload multiple images per project
   - Set featured projects
   - Multilingual content support

3. **Services** (`/admin/services`)
   - Manage services
   - Upload service images
   - Multilingual content support

4. **Products** (`/admin/products`)
   - Manage products
   - Set prices and specifications
   - Upload product images
   - Multilingual content support

5. **Equipment** (`/admin/equipment`)
   - Manage equipment items
   - Upload equipment images
   - Multilingual content support

6. **Process** (`/admin/process`)
   - Manage process steps
   - Upload step images
   - Multilingual content support

7. **Contact Forms** (`/admin/contact-forms`)
   - View and manage contact form submissions
   - Update status (Pending, In Progress, Completed, Cancelled)
   - Delete submissions

8. **Media Library** (`/admin/media`)
   - Upload and manage media files
   - All uploaded files are stored in Vercel Blob Storage

## Creating an Admin User

To create an admin user, you can use Prisma Studio or create a script:

```typescript
// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('your-password', 12)
  
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })
  
  console.log('Admin user created!')
}

createAdmin()
```

Or use Prisma Studio:
```bash
npx prisma studio
```

## API Endpoints

All admin API endpoints are protected and require admin authentication:

- `GET /admin/api/projects` - List all projects
- `POST /admin/api/projects` - Create new project
- `PATCH /admin/api/projects/[id]` - Update project
- `DELETE /admin/api/projects/[id]` - Delete project

Similar endpoints exist for:
- `/admin/api/services`
- `/admin/api/products`
- `/admin/api/equipment`
- `/admin/api/process`
- `/admin/api/contact-forms`
- `/admin/api/media`

## Frontend Integration

To fetch data in your frontend components, create API routes that don't require authentication:

Example: `app/api/projects/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'vi'
  
  const projects = await prisma.project.findMany({
    include: {
      translations: {
        where: { locale },
      },
    },
    where: {
      featured: true, // or other filters
    },
    orderBy: { order: 'asc' },
  })
  
  return NextResponse.json(projects)
}
```

Then in your components:
```typescript
const projects = await fetch(`/api/projects?locale=${locale}`).then(r => r.json())
```

## Internationalization (i18n)

All admin pages support three languages:
- Vietnamese (vi)
- English (en)
- French (fr)

Translations are stored in:
- `messages/admin/vi.json`
- `messages/admin/en.json`
- `messages/admin/fr.json`

## Tips for Uploading Existing Data

### Option 1: Use the Migration Script (Recommended)
- Fastest way to migrate all existing data
- Automatically uploads images to Vercel Blob
- Preserves all translations

### Option 2: Manual Entry via Admin Panel
- More control over each entry
- Can review and edit before saving
- Good for small datasets or selective migration

### Option 3: Bulk Import via API
- Create a script that calls the admin API endpoints
- Useful for importing from external sources
- Requires authentication tokens

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if Neon database is accessible
- Run `npm run db:push` to sync schema

### Image Upload Issues
- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check Vercel Blob storage quota
- Ensure images exist in `public` folder for migration

### Authentication Issues
- Make sure you have an admin user created
- Check that user role is set to `ADMIN`
- Clear cookies and try logging in again

## Next Steps

1. Run database migrations
2. Create an admin user
3. Run the migration script or manually enter data
4. Update frontend components to fetch from API
5. Test all admin functionality
6. Deploy to production

For questions or issues, refer to the main README or check the code comments.

