import { z } from 'zod'

// Type for validation messages
export interface ValidationMessages {
  titleRequired: string
  nameRequired: string
  descriptionRequired: string
  slugRequired: string
  stepRequired: string
  orderMin: string
  atLeastOneTranslation: string
  contentRequired: string
  positionRequired: string
  bioRequired: string
}

// Default Vietnamese messages (fallback)
const defaultMessages: ValidationMessages = {
  titleRequired: 'Tiêu đề không được để trống',
  nameRequired: 'Tên không được để trống',
  descriptionRequired: 'Mô tả không được để trống',
  slugRequired: 'Đường dẫn không được để trống',
  stepRequired: 'Bước không được để trống',
  orderMin: 'Thứ tự phải lớn hơn hoặc bằng 0',
  atLeastOneTranslation: 'Vui lòng nhập ít nhất một ngôn ngữ',
  contentRequired: 'Nội dung không được để trống',
  positionRequired: 'Chức vụ không được để trống',
  bioRequired: 'Tiểu sử không được để trống',
}

// Create validation schemas with i18n messages
export function createValidationSchemas(messages: Partial<ValidationMessages> = {}) {
  const msg = { ...defaultMessages, ...messages }

  // Translation schema for multilingual fields (for Equipment, Projects)
  // This is used for BACKEND validation - requires all fields
  const translationSchema = z.object({
    locale: z.string(),
    title: z.string().min(1, msg.titleRequired),
    description: z.string().min(1, msg.descriptionRequired),
    category: z.string().optional(),
  })

  // Form translation schema - for FRONTEND validation
  // Only VI is required, EN/FR are optional
  const formTranslationSchema = z.object({
    locale: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
  }).superRefine((data, ctx) => {
    // Only require title and description for Vietnamese
    if (data.locale === 'vi') {
      if (!data.title || data.title.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: msg.titleRequired,
          path: ['title'],
        })
      }
      if (!data.description || data.description.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: msg.descriptionRequired,
          path: ['description'],
        })
      }
    }
    // EN/FR are optional - can be empty
  })

  // Product translation schema (uses 'name' instead of 'title')
  const productTranslationSchema = z.object({
    locale: z.string(),
    name: z.string().min(1, msg.nameRequired),
    description: z.string().min(1, msg.descriptionRequired),
    category: z.string().optional(),
  })

  // Service translation schema
  const serviceTranslationSchema = z.object({
    locale: z.string(),
    title: z.string().min(1, msg.titleRequired),
    description: z.string().min(1, msg.descriptionRequired),
  })

  // Process translation schema
  const processTranslationSchema = z.object({
    locale: z.string(),
    title: z.string().min(1, msg.titleRequired),
    description: z.string().min(1, msg.descriptionRequired),
  })

  // Equipment validation schema (BACKEND - after filtering empty translations)
  const equipmentSchema = z.object({
    slug: z.string().min(1, msg.slugRequired),
    image: z.string().optional(),
    order: z.number().min(0, msg.orderMin),
    translations: z.array(translationSchema).min(1, msg.atLeastOneTranslation),
  })

  // Equipment form schema (FRONTEND - allows empty EN/FR)
  const equipmentFormSchema = z.object({
    slug: z.string().min(1, msg.slugRequired),
    image: z.string().optional(),
    order: z.number().min(0, msg.orderMin),
    translations: z.array(formTranslationSchema).min(1, msg.atLeastOneTranslation),
  })

  // Product validation schema
  const productSchema = z.object({
    slug: z.string().min(1, msg.slugRequired),
    images: z.array(z.string()),
    price: z.number().optional(),
    specs: z.string().optional(),
    order: z.number().min(0, msg.orderMin),
    featured: z.boolean(),
    translations: z.array(productTranslationSchema).min(1, msg.atLeastOneTranslation),
  })

  // Project validation schema
  const projectSchema = z.object({
    slug: z.string().min(1, msg.slugRequired),
    images: z.array(z.string()),
    location: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    year: z.string().optional(),
    capacity: z.string().optional(),
    order: z.number().min(0, msg.orderMin),
    featured: z.boolean(),
    translations: z.array(translationSchema).min(1, msg.atLeastOneTranslation),
  })

  // Service validation schema
  const serviceSchema = z.object({
    slug: z.string().min(1, msg.slugRequired),
    icon: z.string().optional(),
    image: z.string().optional(),
    order: z.number().min(0, msg.orderMin),
    translations: z.array(serviceTranslationSchema).min(1, msg.atLeastOneTranslation),
  })

  // Process validation schema
  const processSchema = z.object({
    step: z.string().min(1, msg.stepRequired),
    image: z.string().optional(),
    order: z.number().min(0, msg.orderMin),
    translations: z.array(processTranslationSchema).min(1, msg.atLeastOneTranslation),
  })

  // Page validation schema
  const pageSchema = z.object({
    title: z.string().min(1, msg.titleRequired),
    slug: z.string().min(1, msg.slugRequired),
    content: z.string().min(1, msg.contentRequired),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })

  // Team member validation schema
  const teamSchema = z.object({
    name: z.string().min(1, msg.nameRequired),
    position: z.string().min(1, msg.positionRequired),
    bio: z.string().min(1, msg.bioRequired),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional(),
    image: z.string().optional(),
  })

  return {
    equipmentSchema,
    equipmentFormSchema,
    productSchema,
    projectSchema,
    serviceSchema,
    processSchema,
    pageSchema,
    teamSchema,
  }
}

// Helper function to get validation messages from locale
export async function getValidationMessages(locale: string = 'vi'): Promise<ValidationMessages> {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default
    const validationMessages = messages.admin?.validation || {}
    
    return {
      titleRequired: validationMessages.titleRequired || defaultMessages.titleRequired,
      nameRequired: validationMessages.nameRequired || defaultMessages.nameRequired,
      descriptionRequired: validationMessages.descriptionRequired || defaultMessages.descriptionRequired,
      slugRequired: validationMessages.slugRequired || defaultMessages.slugRequired,
      stepRequired: validationMessages.stepRequired || defaultMessages.stepRequired,
      orderMin: validationMessages.orderMin || defaultMessages.orderMin,
      atLeastOneTranslation: validationMessages.atLeastOneTranslation || defaultMessages.atLeastOneTranslation,
      contentRequired: validationMessages.contentRequired || defaultMessages.contentRequired,
      positionRequired: validationMessages.positionRequired || defaultMessages.positionRequired,
      bioRequired: validationMessages.bioRequired || defaultMessages.bioRequired,
    }
  } catch {
    // Fallback to default Vietnamese messages
    return defaultMessages
  }
}

// Export default schemas (using Vietnamese as default)
export const {
  equipmentSchema,
  equipmentFormSchema,
  productSchema,
  projectSchema,
  serviceSchema,
  processSchema,
  pageSchema,
  teamSchema,
} = createValidationSchemas()
