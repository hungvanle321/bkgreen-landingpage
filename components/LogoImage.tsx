'use client'

import Image from 'next/image'
import { useMedia } from '@/hooks/useMedia'

interface LogoImageProps {
  className?: string
  alt?: string
  priority?: boolean
}

export default function LogoImage({ className, alt = 'Logo', priority = false }: LogoImageProps) {
  // Lấy ảnh logo từ database
  const { media: logoImage, loading: logoLoading } = useMedia('logo')
  
  // Ảnh fallback nếu không có ảnh từ database
  const fallbackImage = '/logo.png'
  const logoImageUrl = logoImage?.url || fallbackImage

  if (logoLoading) {
    return (
      <div className={`animate-pulse bg-gray-300 ${className || 'w-32 h-16'}`}>
        <span className="sr-only">Loading logo...</span>
      </div>
    )
  }

  return (
    <Image
      src={logoImageUrl}
      alt={alt}
      fill
      className={className}
      priority={priority}
      sizes="100vw"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  )
}