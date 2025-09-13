// Utility functions for image optimization

// Base64 encoded 1x1 pixel placeholder
export const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='

// Generate blur placeholder for images
export function generateBlurDataURL(width: number = 1, height: number = 1): string {
  return BLUR_DATA_URL
}

// Get appropriate sizes for different layouts
export function getImageSizes(layout: 'hero' | 'card' | 'grid' | 'single'): string {
  switch (layout) {
    case 'hero':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    case 'grid':
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw'
    case 'single':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
    default:
      return '(max-width: 768px) 100vw, 33vw'
  }
}

// Determine if image should be prioritized
export function shouldPrioritize(index: number, threshold: number = 3): boolean {
  return index < threshold
}
