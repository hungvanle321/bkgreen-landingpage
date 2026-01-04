import { z } from 'zod'

// Translation schema for multilingual fields
const translationSchema = z.object({
  locale: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().optional(),
  name: z.string().optional(),
})

// Equipment validation schema
export const equipmentSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  image: z.string().optional(),
  order: z.number().min(0, 'Order must be 0 or greater'),
  translations: z.array(translationSchema).length(3),
})

// Product validation schema
export const productSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  images: z.array(z.string()),
  price: z.number().optional(),
  specs: z.string().optional(),
  order: z.number().min(0, 'Order must be 0 or greater'),
  featured: z.boolean(),
  translations: z.array(translationSchema).length(3),
})

// Project validation schema
export const projectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  images: z.array(z.string()),
  location: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  year: z.string().optional(),
  capacity: z.string().optional(),
  order: z.number().min(0, 'Order must be 0 or greater'),
  featured: z.boolean(),
  translations: z.array(translationSchema).length(3),
})

// Service validation schema
const serviceTranslationSchema = z.object({
  locale: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

export const serviceSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  icon: z.string().optional(),
  image: z.string().optional(),
  order: z.number().min(0, 'Order must be 0 or greater'),
  translations: z.array(serviceTranslationSchema).length(3),
})

// Process validation schema
const processTranslationSchema = z.object({
  locale: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

export const processSchema = z.object({
  step: z.string().min(1, 'Step is required'),
  image: z.string().optional(),
  order: z.number().min(0, 'Order must be 0 or greater'),
  translations: z.array(processTranslationSchema).length(3),
})

// Page validation schema
export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

// Team member validation schema
export const teamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  bio: z.string().min(1, 'Bio is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  image: z.string().optional(),
})

// Media upload validation schema
export const mediaSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB
    'File size must be less than 10MB'
  ).refine(
    (file) => ['image/', 'video/', 'audio/', 'application/'].some(type => file.type.startsWith(type)),
    'File must be an image, video, audio, or document'
  ),
})