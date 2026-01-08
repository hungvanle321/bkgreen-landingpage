// Reserved slugs that conflict with existing routes
export const RESERVED_SLUGS = [
  'gioi-thieu',
  'san-pham',
  'du-an',
  'dich-vu',
  'lien-he',
  'pages',
  'admin',
  'api',
  '_next',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
] as const

// Validate slug format (only lowercase letters, numbers, and hyphens)
export function isValidSlugFormat(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && !slug.startsWith('-') && !slug.endsWith('-')
}

// Check if slug is reserved
export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.includes(slug as typeof RESERVED_SLUGS[number])
}

// Validate slug (format + reserved check)
export function validateSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug || slug.trim().length === 0) {
    return { valid: false, error: 'Slug không được để trống' }
  }

  const normalizedSlug = slug.toLowerCase().trim()

  if (!isValidSlugFormat(normalizedSlug)) {
    return {
      valid: false,
      error: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang (-), không được bắt đầu hoặc kết thúc bằng dấu gạch ngang',
    }
  }

  if (isReservedSlug(normalizedSlug)) {
    return {
      valid: false,
      error: `Slug "${normalizedSlug}" đã được sử dụng bởi hệ thống. Vui lòng chọn slug khác.`,
    }
  }

  return { valid: true }
}
