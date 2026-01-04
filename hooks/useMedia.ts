import { useState, useEffect } from 'react'

export interface MediaFile {
  id: string
  name: string
  url: string
  type: string
  size: number
  category: string
  createdAt: Date
  updatedAt: Date
}

export function useMedia(category: string) {
  const [media, setMedia] = useState<MediaFile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true)
        const response = await fetch(`/api/media/${category}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch media')
        }

        const data = await response.json()
        setMedia(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [category])

  return { media, loading, error }
}