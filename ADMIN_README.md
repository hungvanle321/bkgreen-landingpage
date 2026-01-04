# BK Green Admin Panel

A comprehensive admin panel built with Next.js, Shadcn UI, and Prisma for managing your BK Green website content.

## Features

### 🎯 Core Features
- **Full Admin Dashboard** with statistics and quick actions
- **Multi-language Support** (Vietnamese, English, French) using next-intl
- **Authentication System** with secure login/logout
- **CRUD Operations** for all content types
- **File Upload** with Vercel Blob storage
- **Responsive Design** with Shadcn UI components

### 📋 Content Management
- **Pages**: Create, edit, delete website pages
- **Services**: Manage service offerings
- **Projects**: Showcase completed projects
- **Products**: Product catalog management
- **Team Members**: Team information management
- **Media Library**: File upload and management
- **Contact Forms**: View and manage submissions

### 🔧 Technical Features
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Secure JWT-based auth with bcrypt
- **File Storage**: Vercel Blob for media files
- **API Routes**: RESTful API endpoints
- **Type Safety**: Full TypeScript support
- **i18n**: Internationalization with next-intl

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/bkgreen"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (if you have a database)
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

## Admin Panel Access

### Login
- Visit: `http://localhost:3000/admin/login`
- Default admin credentials (you'll need to create these):
  - Email: admin@example.com
  - Password: your-admin-password

### Admin Routes
- **Dashboard**: `/admin`
- **Login**: `/admin/login`
- **Logout**: `/admin/logout`
- **Pages**: `/admin/pages`
- **Services**: `/admin/services`
- **Projects**: `/admin/projects`
- **Products**: `/admin/products`
- **Team**: `/admin/team`
- **Media**: `/admin/media`
- **Contact Forms**: `/admin/contact-forms`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Content Management
- `GET /api/pages` - Get all pages
- `POST /api/pages` - Create new page
- `GET /api/pages/:id` - Get specific page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page

### Media Management
- `GET /api/media` - Get all media files
- `POST /api/media` - Upload new file
- `GET /api/media/:id` - Get specific file
- `DELETE /api/media/:id` - Delete file

## Database Schema

The admin panel uses the following models:

### User
- id, email, name, password, role, timestamps

### Page
- id, title, slug, content, metaTitle, metaDescription, timestamps

### Service
- id, title, description, icon, timestamps

### Project
- id, title, description, category, images, timestamps

### Product
- id, name, description, category, price, images, timestamps

### TeamMember
- id, name, position, bio, image, email, phone, timestamps

### ContactForm
- id, name, email, phone, message, status, timestamps

### Media
- id, name, url, type, size, timestamps

## File Upload

The admin panel supports file uploads via Vercel Blob storage:

1. Files are uploaded to Vercel Blob with public access
2. File metadata is stored in the database
3. Files can be downloaded or deleted through the admin interface
4. Supported file types: images, documents, etc.

## Internationalization

The admin panel supports three languages:

1. **Vietnamese** (vi) - Default
2. **English** (en)
3. **French** (fr)

Language files are located in `messages/admin/` directory.

To add a new language:
1. Create a new JSON file in `messages/admin/`
2. Add translations for all keys
3. Update the `i18n.ts` configuration

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Secure Cookies**: HTTP-only, secure, same-site
- **Admin Authorization**: Role-based access control
- **Input Validation**: Server-side validation for all inputs
- **CSRF Protection**: Built-in Next.js CSRF protection

## Development

### Adding New Content Types

1. Update the Prisma schema in `prisma/schema.prisma`
2. Run `npx prisma generate` to update the client
3. Create API routes in `app/admin/api/`
4. Create admin pages in `app/admin/`
5. Add translations to `messages/admin/`

### Customizing the UI

The admin panel uses Shadcn UI components. To customize:

1. Modify components in `components/ui/`
2. Update styles in `app/admin/globals.css`
3. Use Tailwind CSS classes for styling

## Testing

To test the admin panel:

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/admin/login`
3. Create an admin user (you'll need to seed the database or create one via API)
4. Log in and explore the dashboard
5. Test CRUD operations for each content type
6. Test file upload functionality
7. Test language switching

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **File Upload**: Verify BLOB_READ_WRITE_TOKEN is set and valid
3. **Authentication**: Check that cookies are enabled in your browser
4. **Translations**: Ensure all translation files have the same keys

### Getting Help

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Check the server logs for API errors
3. Verify all environment variables are set correctly
4. Ensure the database is properly configured

## License

This admin panel is part of the BK Green website project.