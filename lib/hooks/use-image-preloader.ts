'use client'

import { useEffect } from 'react'

interface UseImagePreloaderProps {
  imageUrls: string[]
  priority?: boolean
}

export function useImagePreloader({ imageUrls, priority = false }: UseImagePreloaderProps) {
  useEffect(() => {
    if (!priority) return

    // Preload critical images
    imageUrls.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })

    // Cleanup function
    return () => {
      imageUrls.forEach((url) => {
        const existingLink = document.querySelector(`link[href="${url}"]`)
        if (existingLink) {
          document.head.removeChild(existingLink)
        }
      })
    }
  }, [imageUrls, priority])
}

// Hook for preloading images on hover
export function useHoverPreload(ref: React.RefObject<HTMLElement>, imageUrl: string) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageUrl
      document.head.appendChild(link)
    }

    element.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [ref, imageUrl])
}
