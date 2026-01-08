import { z } from 'zod'

// Re-export schemas from validation-i18n for backward compatibility
// These use Vietnamese messages by default
export {
  equipmentSchema,
  equipmentFormSchema,
  productSchema,
  projectSchema,
  serviceSchema,
  processSchema,
  pageSchema,
  teamSchema,
} from './validation-i18n'

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