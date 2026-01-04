"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MediaTable } from './components/media-table'

export default function MediaPage() {
  const t = useTranslations('admin')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('general')

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    if (!file) {
      toast.error(t('errors.noFileSelected') || 'No file selected')
      setLoading(false)
      return
    }

    // Add category to form data
    formData.append('category', category)

    try {
      const response = await fetch('/admin/api/media', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success(t('success.uploaded') || 'File uploaded successfully')
        setDialogOpen(false)
        setCategory('general') // Reset category
        // Refresh the table
        window.location.reload()
      } else {
        const data = await response.json()
        toast.error(data.error || t('errors.uploadFailed') || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(t('errors.uploadFailed') || 'Failed to upload file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">
          {t('navigation.media')}
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('actions.upload')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('media.uploadFile')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <Label htmlFor="file">{t('forms.file')}</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*,video/*,audio/*,application/*"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">{t('forms.category')}</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('forms.category')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">{t('forms.general')}</SelectItem>
                    <SelectItem value="logo">{t('forms.logo')}</SelectItem>
                    <SelectItem value="hero_background">{t('forms.hero_background')}</SelectItem>
                    <SelectItem value="favicon">{t('forms.favicon')}</SelectItem>
                    <SelectItem value="social_media">{t('forms.social_media')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('actions.cancel')}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? t('actions.uploading') : t('actions.upload')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <MediaTable />
    </div>
  )
}