"use client"

import { useState, useEffect } from 'react'

import { useTranslations } from 'next-intl'
import { Trash, Image as ImageIcon, Eye, Upload, MoreHorizontal, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface MediaFile {
  id: string
  name: string
  url: string
  type: string
  size: number
  category: string
  createdAt: Date
}

// Fixed categories that should appear in table
const FIXED_CATEGORIES = [
  'logo',
  'logo_white',
  'hero_background',
  'about_image',
  'process_background',
  'favicon',
  'social_media'
] as const

export function MediaTable() {
  const t = useTranslations('admin')
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fetchFiles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/admin/api/media')
      const data = await response.json()
      // Only show fixed category files
      const fixedFiles = data.filter((file: MediaFile) => 
        FIXED_CATEGORIES.includes(file.category as any)
      )
      setFiles(fixedFiles)
    } catch (error) {
      console.error('Error fetching files:', error)
      toast.error(t('errors.fetchFailed') || 'Failed to fetch files')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchFiles()
  }, [])

  const deleteFile = async (id: string) => {
    try {
      await fetch(`/admin/api/media/${id}`, {
        method: 'DELETE',
      })
      toast.success(t('success.deleted') || 'File deleted successfully')
      void fetchFiles()
    } catch (error) {
      console.error('Error deleting file:', error)
      toast.error(t('errors.deleteFailed') || 'Failed to delete file')
    }
  }

  const restoreFile = async (category: string) => {
    try {
      const response = await fetch(`/api/media/${category}/restore`, {
        method: 'POST',
      })
      
      if (response.ok) {
        toast.success(t('success.restored') || 'Image restored successfully')
        void fetchFiles()
      } else {
        const data = await response.json()
        toast.error(data.error || t('errors.restoreFailed') || 'Failed to restore image')
      }
    } catch (error) {
      console.error('Error restoring file:', error)
      toast.error(t('errors.restoreFailed') || 'Failed to restore image')
    }
  }

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>, fileId: string) => {
    e.preventDefault()
    setUploading(true)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    if (!file) {
      toast.error(t('errors.noFileSelected') || 'No file selected')
      setUploading(false)
      return
    }

    try {
      const response = await fetch(`/admin/api/media/${fileId}`, {
        method: 'PUT',
        body: formData,
      })

      if (response.ok) {
        toast.success(t('success.uploaded') || 'File uploaded successfully')
        setUploadDialogOpen(false)
        void fetchFiles()
      } else {
        const data = await response.json()
        toast.error(data.error || t('errors.uploadFailed') || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(t('errors.uploadFailed') || 'Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">{t('forms.name') || 'Name'}</TableHead>
                <TableHead className="hidden md:table-cell">{t('forms.category') || 'Category'}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('forms.type') || 'Type'}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('forms.size') || 'Size'}</TableHead>
                <TableHead className="hidden md:table-cell">{t('forms.createdAt') || 'Created'}</TableHead>
                <TableHead>{t('actions.actions') || 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="space-y-2">
                      {/* Preview Image and Name */}
                      <div className="flex items-center space-x-3">
                        <div className="max-w-12 max-h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={file.url}
                              alt={file.name}
                              className="max-w-full max-h-full object-contain rounded"
                            />
                          ) : (
                            <div className="text-center p-1">
                              <ImageIcon className="h-4 w-4 mx-auto text-gray-400 mb-1" />
                              <p className="text-xs text-gray-500">File</p>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate" title={file.name}>
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-600 md:hidden">
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      </div>
                      
                      {/* File Size - hidden on larger screens */}
                      <div className="text-xs text-gray-600 hidden md:block">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{t(`forms.${file.category}`) || file.category}</TableCell>
                  <TableCell className="hidden lg:table-cell">{file.type}</TableCell>
                  <TableCell className="hidden lg:table-cell">{formatFileSize(file.size)}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(file.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {/* View button - separate */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFile(file)
                          setImageDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {t('actions.view') || 'View'}
                      </Button>
                      
                      {/* Context menu for other actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Upload className="h-4 w-4 mr-2" />
                                {t('actions.upload') || 'Upload New'}
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t('media.uploadFile') || 'Upload File'} - {file.name}</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={(e) => handleFileUpload(e, file.id)} className="space-y-4">
                                <div>
                                  <Label htmlFor="file">{t('forms.file') || 'File'}</Label>
                                  <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/*,video/*,audio/*,application/*"
                                    required
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                                    {t('actions.cancel') || 'Cancel'}
                                  </Button>
                                  <Button type="submit" disabled={uploading}>
                                    {uploading ? t('actions.uploading') || 'Uploading...' : t('actions.upload') || 'Upload'}
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                          
                          {/* Restore button - only show for categories that can be restored */}
                          {['hero_background', 'about_image', 'logo', 'logo_white', 'process_background', 'favicon', 'social_media'].includes(file.category) && (
                            <DropdownMenuItem
                              onSelect={() => restoreFile(file.category)}
                              className="text-blue-600 focus:text-blue-800"
                            >
                              <RotateCcw className="h-4 w-4 mr-2" />
                              {t('actions.restore') || t('restore') || 'Restore Original'}
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuItem
                            onSelect={() => deleteFile(file.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            {t('actions.delete') || 'Delete'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {files.map((file) => (
            <div key={file.id} className="p-4 space-y-3">
              {/* Image Section - Centered on Mobile */}
              <div className="flex justify-center">
                <div className="h-24 sm:h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-full w-auto object-contain rounded"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">File</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Name and Info Section */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 text-sm text-center sm:text-left break-words">{file.name}</h3>
                <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">{t('forms.category') || 'Category'}:</span>
                    <span className="ml-1 capitalize">{t(`forms.${file.category}`) || file.category}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t('forms.type') || 'Type'}:</span>
                    <span className="ml-1">{file.type}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t('forms.size') || 'Size'}:</span>
                    <span className="ml-1">{formatFileSize(file.size)}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t('forms.createdAt') || 'Created'}:</span>
                    <span className="ml-1">{new Date(file.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions Section - Horizontal on all sizes */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedFile(file)
                    setImageDialogOpen(true)
                  }}
                >
                  <Eye className="h-3 w-3 mr-2" />
                  {t('actions.view') || 'View'}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MoreHorizontal className="h-3 w-3 mr-2" />
                      {t('actions.more') || 'More'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Upload className="h-4 w-4 mr-2" />
                          {t('actions.upload') || 'Upload New'}
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t('media.uploadFile') || 'Upload File'} - {file.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleFileUpload(e, file.id)} className="space-y-4">
                          <div>
                            <Label htmlFor="file">{t('forms.file') || 'File'}</Label>
                            <Input
                              id="file"
                              name="file"
                              type="file"
                              accept="image/*,video/*,audio/*,application/*"
                              required
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                              {t('actions.cancel') || 'Cancel'}
                            </Button>
                            <Button type="submit" disabled={uploading}>
                              {uploading ? t('actions.uploading') || 'Uploading...' : t('actions.upload') || 'Upload'}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Restore button - only show for categories that can be restored */}
                    {['hero_background', 'about_image', 'logo', 'logo_white', 'process_background', 'favicon', 'social_media'].includes(file.category) && (
                      <DropdownMenuItem
                        onSelect={() => restoreFile(file.category)}
                        className="text-blue-600 focus:text-blue-800"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {t('actions.restore') || t('restore') || 'Restore Original'}
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem
                      onSelect={() => deleteFile(file.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      {t('actions.delete') || 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedFile && (
              <div className="flex justify-center">
                {selectedFile.type.startsWith('image/') ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: '70vh' }}
                  />
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Preview not available for this file type</p>
                    <p className="text-sm text-gray-400 mt-2">{selectedFile.type}</p>
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">URL:</span>
                <a
                  href={selectedFile?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  {selectedFile?.url}
                </a>
              </div>
              <div>
                <span className="font-medium">Type:</span>
                <span className="ml-2">{selectedFile?.type}</span>
              </div>
              <div>
                <span className="font-medium">Size:</span>
                <span className="ml-2">{selectedFile ? formatFileSize(selectedFile.size) : ''}</span>
              </div>
              <div>
                <span className="font-medium">Created:</span>
                <span className="ml-2">{selectedFile ? new Date(selectedFile.createdAt).toLocaleDateString() : ''}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}