// Global type definitions for the BK Green website

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  subject: string
  message: string
}

export interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  image?: string
}

export interface Project {
  title: string
  description: string
  location: string
  year: string
  status: 'Hoàn thành' | 'Đang thi công' | 'Dự kiến'
  capacity: string
  features: string[]
  image: string
}

export interface Product {
  name: string
  description: string
  price: string
  image: string
  category: string
}

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}
