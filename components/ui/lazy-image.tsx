'use client'

import { useState, useRef, useEffect } from 'react'

import { cn } from '@/lib/utils'

import OptimizedImage from './optimized-image'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  fallbackSrc?: string
  threshold?: number
  rootMargin?: string
  priority?: boolean
}

export default function LazyImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc,
  threshold = 0.1,
  rootMargin = '50px',
  priority = false,
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(priority)
  const [hasIntersected, setHasIntersected] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsInView(true)
          setHasIntersected(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, priority, hasIntersected])

  return (
    <div ref={imgRef} className={cn('relative', containerClassName)}>
      {isInView ? (
        <OptimizedImage
          src={src}
          alt={alt}
          className={className}
          fallbackSrc={fallbackSrc}
          priority={priority}
          fill
        />
      ) : (
        <div className={cn('bg-gray-200 animate-pulse rounded-lg', className)} />
      )}
    </div>
  )
}
