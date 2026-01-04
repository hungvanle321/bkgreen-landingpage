# Next Steps After Database Setup

Great! Your database is set up. Here's what to do next:

## 1. Create an Admin User

You need to create an admin user to access the admin panel:

```bash
npm run create-admin
# or
yarn create-admin
```

This will prompt you for:
- Email address
- Password
- Name (optional)

**Alternative: Quick Setup (Hardcoded)**

If you want to create an admin user quickly, you can modify `scripts/create-admin.ts` temporarily:

```typescript
// Quick setup - modify the script temporarily
const email = 'admin@example.com'
const password = 'your-secure-password'
const name = 'Admin User'
```

Or use Prisma Studio:
```bash
npx prisma studio
```
Then manually create a user with `role: 'ADMIN'` and a bcrypt-hashed password.

## 2. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

## 3. Access the Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Log in with the admin credentials you created
3. You'll be redirected to the admin dashboard

## 4. Upload Existing Data (Choose One Option)

### Option A: Use Migration Script (Recommended)

This automatically uploads all your existing images and data:

```bash
npm run migrate
```

**Requirements:**
- `DATABASE_URL` must be set in `.env`
- `BLOB_READ_WRITE_TOKEN` must be set in `.env`
- Images must exist in the `public` folder

**What it does:**
- Uploads all images from `public/` to Vercel Blob Storage
- Creates database entries for:
  - Projects (from `app/du-an/ClientPage.tsx`)
  - Services (from `components/ServicesSection.tsx`)
  - Equipment (from `components/EquipmentSection.tsx`)
  - Process Steps (from `components/ProcessSection.tsx`)
- Adds translations for vi, en, fr

### Option B: Manual Entry via Admin Panel

1. Log in to `/admin/login`
2. Navigate to each section:
   - `/admin/projects` - Add projects
   - `/admin/services` - Add services
   - `/admin/products` - Add products
   - `/admin/equipment` - Add equipment
   - `/admin/process` - Add process steps
3. Click "Add New" and fill in the forms
4. Upload images through the admin interface
5. Add translations for all three languages

## 5. Update Frontend Components (Optional)

Currently, your frontend components use hardcoded data. To fetch from the database:

### Create Public API Routes

Create API routes that don't require authentication:

**Example: `app/api/projects/route.ts`**
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
      featured: true, // or remove this to get all projects
    },
    orderBy: { order: 'asc' },
  })
  
  return NextResponse.json(projects)
}
```

Then update your components to fetch from the API:
```typescript
const projects = await fetch(`/api/projects?locale=${locale}`).then(r => r.json())
```

## 6. Test Everything

1. ✅ Create admin user
2. ✅ Log in to admin panel
3. ✅ Create/edit/delete content
4. ✅ Upload images
5. ✅ Test multilingual content
6. ✅ View contact forms
7. ✅ Test on frontend (if you updated components)

## Troubleshooting

### Can't log in?
- Make sure you created an admin user
- Check that the user's role is set to `ADMIN`
- Clear cookies and try again

### Images not uploading?
- Verify `BLOB_READ_WRITE_TOKEN` is set in `.env`
- Check Vercel Blob storage quota
- Check browser console for errors

### Database connection issues?
- Verify `DATABASE_URL` is correct in `.env`
- Test connection: `npx prisma studio` (should open Prisma Studio)

### Migration script fails?
- Make sure all images exist in `public/` folder
- Check that `BLOB_READ_WRITE_TOKEN` is valid
- Verify `DATABASE_URL` is set correctly

## What's Next?

After setting up the admin panel:

1. **Populate Content**: Use migration script or manual entry
2. **Customize**: Adjust admin UI, add custom fields if needed
3. **Update Frontend**: Create public API routes and update components
4. **Deploy**: Deploy to production with environment variables set
5. **Maintain**: Regularly update content through admin panel

## Quick Reference

- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin`
- **Create Admin**: `npm run create-admin`
- **Migrate Data**: `npm run migrate`
- **Prisma Studio**: `npx prisma studio`
- **Database Push**: `npm run db:push`
- **Generate Client**: `npm run db:generate`

Need help? Check `ADMIN_SETUP.md` for detailed documentation.

