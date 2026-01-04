"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PageTable } from './components/page-table'

export default function PagesPage() {
  const t = useTranslations('admin')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/admin/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(t('success.created') || 'Page created successfully')
        setDialogOpen(false)
        setFormData({
          title: '',
          slug: '',
          content: '',
          metaTitle: '',
          metaDescription: '',
        })
        // Refresh the table - you might need to implement this
        window.location.reload()
      } else {
        const data = await response.json()
        toast.error(data.error || t('errors.saveFailed') || 'Failed to create page')
      }
    } catch (error) {
      console.error('Error creating page:', error)
      toast.error(t('errors.saveFailed') || 'Failed to create page')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {t('navigation.pages') || 'Pages'}
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-blue hover:bg-primary-blue/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              {t('actions.create') || 'Create'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{(t('actions.create') || 'Create') + ' New Page'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">{t('forms.title') || 'Title'}</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">{t('forms.slug') || 'Slug'}</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="content">{t('forms.content') || 'Content'}</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="metaTitle">{t('forms.metaTitle') || 'Meta Title'}</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">{t('forms.metaDescription') || 'Meta Description'}</Label>
                  <Input
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('actions.cancel') || 'Cancel'}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? t('actions.saving') || 'Saving...' : t('actions.save') || 'Save'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <PageTable />
    </div>
  )
}