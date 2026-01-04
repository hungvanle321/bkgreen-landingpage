"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Plus } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface MultiFileUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  accept?: string
  placeholder?: string
  maxFiles?: number
  className?: string
}

export function MultiFileUpload({
  value = [],
  onChange,
  accept = "image/*",
  placeholder = "Chọn hình ảnh để tải lên",
  maxFiles = 10,
  className = ""
}: MultiFileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []

    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (value.length + files.length > maxFiles) {
      toast.error(`Không thể tải lên quá ${maxFiles} hình ảnh`)
      return
    }

    setUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of files) {
        // Validate file type
        if (accept === "image/*" && !file.type.startsWith('image/')) {
          toast.error(`File ${file.name} không phải là hình ảnh`)
          continue
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} vượt quá 5MB`)
          continue
        }

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
          uploadedUrls.push(media.url)
        } catch (error) {
          console.error(`Upload error for ${file.name}:`, error)
          toast.error(`Tải lên ${file.name} thất bại`)
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...value, ...uploadedUrls])
        toast.success(`Đã tải lên ${uploadedUrls.length} hình ảnh`)
      }
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = (indexToRemove: number) => {
    const newUrls = value.filter((_, index) => index !== indexToRemove)
    onChange(newUrls)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>Hình ảnh</Label>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
        onClick={handleClick}
      >
        <Plus className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="pointer-events-none"
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? 'Đang tải lên...' : 'Chọn hình ảnh'}
          </Button>
          <p className="mt-2 text-sm text-gray-500">
            {placeholder} (tối đa {maxFiles} hình)
          </p>
        </div>
      </div>

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(index)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {value.length > 0 && (
        <p className="text-sm text-gray-500">
          {value.length} / {maxFiles} hình ảnh
        </p>
      )}
    </div>
  )
}