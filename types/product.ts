export const PRODUCT_CATEGORY = {
  PUMPS: 'PUMPS',
  VALVES: 'VALVES',
  FIRE_SAFETY: 'FIRE_SAFETY',
  RO_EQUIPMENT: 'RO_EQUIPMENT',
  PIPES_FITTINGS: 'PIPES_FITTINGS',
  CONTROL_SYSTEMS: 'CONTROL_SYSTEMS',
  FILTERS: 'FILTERS',
  TANKS: 'TANKS',
} as const

export type ProductCategory = typeof PRODUCT_CATEGORY[keyof typeof PRODUCT_CATEGORY]

// Helper function to get category label by locale
export function getProductCategoryLabel(category: string, locale: 'vi' | 'en' | 'fr'): string {
  const labels: Record<string, Record<string, string>> = {
    [PRODUCT_CATEGORY.PUMPS]: {
      vi: 'Máy bơm',
      en: 'Pumps',
      fr: 'Pompes',
    },
    [PRODUCT_CATEGORY.VALVES]: {
      vi: 'Van',
      en: 'Valves',
      fr: 'Vannes',
    },
    [PRODUCT_CATEGORY.FIRE_SAFETY]: {
      vi: 'PCCC',
      en: 'Fire Safety',
      fr: 'Sécurité incendie',
    },
    [PRODUCT_CATEGORY.RO_EQUIPMENT]: {
      vi: 'Thiết bị RO',
      en: 'RO Equipment',
      fr: 'Équipement RO',
    },
    [PRODUCT_CATEGORY.PIPES_FITTINGS]: {
      vi: 'Ống & Phụ kiện',
      en: 'Pipes & Fittings',
      fr: 'Tuyaux & Raccords',
    },
    [PRODUCT_CATEGORY.CONTROL_SYSTEMS]: {
      vi: 'Hệ thống điều khiển',
      en: 'Control Systems',
      fr: 'Systèmes de contrôle',
    },
    [PRODUCT_CATEGORY.FILTERS]: {
      vi: 'Bộ lọc',
      en: 'Filters',
      fr: 'Filtres',
    },
    [PRODUCT_CATEGORY.TANKS]: {
      vi: 'Bể chứa',
      en: 'Tanks',
      fr: 'Réservoirs',
    },
  }
  
  return labels[category]?.[locale] || category
}

// Get all category options for dropdown
export function getProductCategoryOptions(locale: 'vi' | 'en' | 'fr') {
  return Object.values(PRODUCT_CATEGORY).map(category => ({
    value: category,
    label: getProductCategoryLabel(category, locale),
  }))
}

// Get category badge color
export function getProductCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    [PRODUCT_CATEGORY.PUMPS]: 'bg-blue-100 text-blue-800 border-blue-200',
    [PRODUCT_CATEGORY.VALVES]: 'bg-green-100 text-green-800 border-green-200',
    [PRODUCT_CATEGORY.FIRE_SAFETY]: 'bg-red-100 text-red-800 border-red-200',
    [PRODUCT_CATEGORY.RO_EQUIPMENT]: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    [PRODUCT_CATEGORY.PIPES_FITTINGS]: 'bg-purple-100 text-purple-800 border-purple-200',
    [PRODUCT_CATEGORY.CONTROL_SYSTEMS]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    [PRODUCT_CATEGORY.FILTERS]: 'bg-teal-100 text-teal-800 border-teal-200',
    [PRODUCT_CATEGORY.TANKS]: 'bg-orange-100 text-orange-800 border-orange-200',
  }
  
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200'
}
