"use client"

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  accept?: string
  placeholder?: string
  className?: string
  showUrl?: boolean
}

export function FileUpload({
  value,
  onChange,
  accept = "image/*",
  placeholder,
  className = "",
  showUrl = true
}: FileUploadProps) {
  const t = useTranslations('admin.fileUpload')
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (accept === "image/*" && !file.type.startsWith('image/')) {
      toast.error(t('onlyImage'))
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('sizeLimit'))
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/admin/api/media', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Upload failed: ${response.status}`)
      }

      const media = await response.json()
      setPreview(media.url)
      onChange(media.url)
      toast.success(t('uploadSuccess'))
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(t('uploadFailed'))
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{t('imageLabel')}</Label>

      {preview ? (
        <div className="relative">
          <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized // Disable Next.js optimization for external images
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 p-0"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={handleClick}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              className="pointer-events-none"
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? t('uploading') : t('selectImage')}
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              {placeholder || t('placeholder')}
            </p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {value && showUrl && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 break-all">
          URL: {value}
        </div>
      )}
    </div>
  )
}