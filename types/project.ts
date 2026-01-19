export const PROJECT_STATUS = {
  ACTIVE: 'ACTIVE',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  PLANNING: 'PLANNING',
  TESTING: 'TESTING',
  POTENTIAL: 'POTENTIAL',
  DESIGN: 'DESIGN',
  RESEARCH: 'RESEARCH',
} as const

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS]

export const PROJECT_TYPE = {
  WATER_SUPPLY: 'WATER_SUPPLY',
  WASTEWATER: 'WASTEWATER',
  FIRE_PROTECTION: 'FIRE_PROTECTION',
  RO_SYSTEM: 'RO_SYSTEM',
} as const

export type ProjectType = typeof PROJECT_TYPE[keyof typeof PROJECT_TYPE]

// Helper function to get status label by locale
export function getProjectStatusLabel(status: string, locale: 'vi' | 'en' | 'fr'): string {
  const labels: Record<string, Record<string, string>> = {
    [PROJECT_STATUS.ACTIVE]: {
      vi: 'Đang hoạt động',
      en: 'Active',
      fr: 'Actif',
    },
    [PROJECT_STATUS.IN_PROGRESS]: {
      vi: 'Đang thực hiện',
      en: 'In Progress',
      fr: 'En cours',
    },
    [PROJECT_STATUS.COMPLETED]: {
      vi: 'Hoàn thành',
      en: 'Completed',
      fr: 'Terminé',
    },
    [PROJECT_STATUS.PLANNING]: {
      vi: 'Lập kế hoạch',
      en: 'Planning',
      fr: 'Planification',
    },
    [PROJECT_STATUS.TESTING]: {
      vi: 'Thử nghiệm',
      en: 'Testing',
      fr: 'Essai',
    },
    [PROJECT_STATUS.POTENTIAL]: {
      vi: 'Tiềm năng',
      en: 'Potential',
      fr: 'Potentiel',
    },
    [PROJECT_STATUS.DESIGN]: {
      vi: 'Thiết kế',
      en: 'Design',
      fr: 'Conception',
    },
    [PROJECT_STATUS.RESEARCH]: {
      vi: 'Nghiên cứu',
      en: 'Research',
      fr: 'Recherche',
    },
  }
  
  return labels[status]?.[locale] || status
}

// Helper function to get type label by locale
export function getProjectTypeLabel(type: string, locale: 'vi' | 'en' | 'fr'): string {
  const labels: Record<string, Record<string, string>> = {
    [PROJECT_TYPE.WATER_SUPPLY]: {
      vi: 'Nước cấp',
      en: 'Water Supply',
      fr: 'Alimentation en eau',
    },
    [PROJECT_TYPE.WASTEWATER]: {
      vi: 'Nước thải',
      en: 'Wastewater',
      fr: 'Eaux usées',
    },
    [PROJECT_TYPE.FIRE_PROTECTION]: {
      vi: 'PCCC',
      en: 'Fire Protection',
      fr: 'Protection incendie',
    },
    [PROJECT_TYPE.RO_SYSTEM]: {
      vi: 'Hệ thống RO',
      en: 'RO System',
      fr: 'Système RO',
    },
  }
  
  return labels[type]?.[locale] || type
}

// Get all status options for dropdown
export function getProjectStatusOptions(locale: 'vi' | 'en' | 'fr') {
  return Object.values(PROJECT_STATUS).map(status => ({
    value: status,
    label: getProjectStatusLabel(status, locale),
  }))
}

// Get all type options for dropdown
export function getProjectTypeOptions(locale: 'vi' | 'en' | 'fr') {
  return Object.values(PROJECT_TYPE).map(type => ({
    value: type,
    label: getProjectTypeLabel(type, locale),
  }))
}

// Get status badge color
export function getProjectStatusColor(status: string): string {
  const colors: Record<string, string> = {
    [PROJECT_STATUS.ACTIVE]: 'bg-green-100 text-green-800 border-green-200',
    [PROJECT_STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-200',
    [PROJECT_STATUS.COMPLETED]: 'bg-purple-100 text-purple-800 border-purple-200',
    [PROJECT_STATUS.PLANNING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [PROJECT_STATUS.TESTING]: 'bg-orange-100 text-orange-800 border-orange-200',
    [PROJECT_STATUS.POTENTIAL]: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    [PROJECT_STATUS.DESIGN]: 'bg-pink-100 text-pink-800 border-pink-200',
    [PROJECT_STATUS.RESEARCH]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  }
  
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
}
