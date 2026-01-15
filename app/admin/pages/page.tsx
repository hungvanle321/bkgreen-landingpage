"use client"

import { useEffect, useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { useAdminTitle } from '../components/admin-title-context'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageTable } from './components/page-table'
import { RichTextEditor } from './components/rich-text-editor'
import { validateSlug } from '@/lib/page-validations'

interface Page {
  id: string
  title: string
  title_en?: string
  title_fr?: string
  slug: string
  content: string
  content_en?: string
  content_fr?: string
  metaTitle?: string
  metaTitle_en?: string
  metaTitle_fr?: string
  metaDescription?: string
  metaDescription_en?: string
  metaDescription_fr?: string
}

export default function PagesPage() {
  const t = useTranslations('admin')
  const { setTitle } = useAdminTitle()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [activeTab, setActiveTab] = useState('vi')
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    title_fr: '',
    slug: '',
    content: '',
    content_en: '',
    content_fr: '',
    metaTitle: '',
    metaTitle_en: '',
    metaTitle_fr: '',
    metaDescription: '',
    metaDescription_en: '',
    metaDescription_fr: '',
  })
  const [slugError, setSlugError] = useState<string | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  useEffect(() => {
    setTitle(t('navigation.pages') || 'Pages')
  }, [setTitle, t])

  const resetForm = () => {
    setFormData({
      title: '',
      title_en: '',
      title_fr: '',
      slug: '',
      content: '',
      content_en: '',
      content_fr: '',
      metaTitle: '',
      metaTitle_en: '',
      metaTitle_fr: '',
      metaDescription: '',
      metaDescription_en: '',
      metaDescription_fr: '',
    })
    setEditingPage(null)
    setSlugError(null)
    setIsUploadingImage(false)
    setActiveTab('vi')
  }

  const openCreateDialog = () => {
    resetForm()
    setDialogOpen(true)
  }

  const openEditDialog = (page: Page) => {
    setEditingPage(page)
    setFormData({
      title: page.title || '',
      title_en: page.title_en || '',
      title_fr: page.title_fr || '',
      slug: page.slug,
      content: page.content || '',
      content_en: page.content_en || '',
      content_fr: page.content_fr || '',
      metaTitle: page.metaTitle || '',
      metaTitle_en: page.metaTitle_en || '',
      metaTitle_fr: page.metaTitle_fr || '',
      metaDescription: page.metaDescription || '',
      metaDescription_en: page.metaDescription_en || '',
      metaDescription_fr: page.metaDescription_fr || '',
    })
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate slug before submit
    const slugValidation = validateSlug(formData.slug)
    if (!slugValidation.valid) {
      setSlugError(slugValidation.error || null)
      toast.error(slugValidation.error || 'Slug không hợp lệ')
      return
    }

    setLoading(true)

    try {
      const url = editingPage
        ? `/admin/api/pages/${editingPage.id}`
        : '/admin/api/pages'
      const method = editingPage ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(
          editingPage
            ? t('success.updated') || 'Cập nhật trang thành công'
            : t('success.created') || 'Tạo trang thành công'
        )
        setDialogOpen(false)
        resetForm()
        setSlugError(null)
        // Refresh the table
        window.dispatchEvent(new Event('admin:pages:refresh'))
      } else {
        const data = await response.json()
        const errorMessage = data.error || t('errors.saveFailed') || 'Failed to create page'
        toast.error(errorMessage)
        
        // If error is about slug, show it in the input
        if (errorMessage.includes('slug') || errorMessage.includes('Slug')) {
          setSlugError(errorMessage)
        }
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
      <div className="flex justify-end items-center">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary-red hover:bg-primary-red/90 text-white"
              onClick={openCreateDialog}
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('actions.create') || 'Create'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPage
                  ? (t('actions.edit') || 'Edit') + ' Page'
                  : (t('actions.create') || 'Create') + ' New Page'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="slug">{t('forms.slug') || 'Slug'}</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => {
                    const newSlug = e.target.value
                    setFormData({ ...formData, slug: newSlug })
                    
                    // Validate slug in real-time
                    if (newSlug.trim()) {
                      const validation = validateSlug(newSlug)
                      if (!validation.valid) {
                        setSlugError(validation.error || null)
                      } else {
                        setSlugError(null)
                      }
                    } else {
                      setSlugError(null)
                    }
                  }}
                  required
                  className={slugError ? 'border-red-500' : ''}
                />
                {slugError && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <span>{slugError}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  URL sẽ là: /vi/pages/{formData.slug || 'slug-cua-ban'}
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                </TabsList>
                {['vi', 'en', 'fr'].map((loc) => {
                  const localeKey = loc as 'vi' | 'en' | 'fr'
                  const titleKey = localeKey === 'vi' ? 'title' : `title_${localeKey}` as 'title_en' | 'title_fr'
                  const contentKey = localeKey === 'vi' ? 'content' : `content_${localeKey}` as 'content_en' | 'content_fr'
                  const metaTitleKey = localeKey === 'vi' ? 'metaTitle' : `metaTitle_${localeKey}` as 'metaTitle_en' | 'metaTitle_fr'
                  const metaDescKey = localeKey === 'vi' ? 'metaDescription' : `metaDescription_${localeKey}` as 'metaDescription_en' | 'metaDescription_fr'
                  
                  return (
                    <TabsContent key={loc} value={loc} className="space-y-4">
                      <div>
                        <Label>{t('forms.title') || 'Title'}</Label>
                        <Input
                          value={formData[titleKey] || ''}
                          onChange={(e) => {
                            const updates: any = { [titleKey]: e.target.value }
                            // Auto-fill metaTitle if empty and Vietnamese
                            if (localeKey === 'vi' && !formData.metaTitle) {
                              updates.metaTitle = e.target.value
                            }
                            if (localeKey === 'en' && !formData.metaTitle_en) {
                              updates.metaTitle_en = e.target.value
                            }
                            if (localeKey === 'fr' && !formData.metaTitle_fr) {
                              updates.metaTitle_fr = e.target.value
                            }
                            setFormData({ ...formData, ...updates })
                          }}
                          required={localeKey === 'vi'}
                        />
                      </div>
                      <div>
                        <Label>{t('forms.content') || 'Content'}</Label>
                        <RichTextEditor
                          value={formData[contentKey] || ''}
                          onChange={(jsonString) => {
                            setFormData({ ...formData, [contentKey]: jsonString })
                          }}
                          placeholder={localeKey === 'vi' 
                            ? "Nhập nội dung trang (có thể chèn tiêu đề, danh sách, hình ảnh...)"
                            : `Enter page content (${localeKey === 'en' ? 'English' : 'French'})...`}
                          onUploadStart={() => setIsUploadingImage(true)}
                          onUploadEnd={() => setIsUploadingImage(false)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>{t('forms.metaTitle') || 'Meta Title'}</Label>
                          <Input
                            value={formData[metaTitleKey] || ''}
                            onChange={(e) => {
                              setFormData({ ...formData, [metaTitleKey]: e.target.value })
                            }}
                          />
                        </div>
                        <div>
                          <Label>{t('forms.metaDescription') || 'Meta Description'}</Label>
                          <Input
                            value={formData[metaDescKey] || ''}
                            onChange={(e) => {
                              setFormData({ ...formData, [metaDescKey]: e.target.value })
                            }}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isUploadingImage}>
                  {t('actions.cancel') || 'Cancel'}
                </Button>
                <Button type="submit" disabled={loading || isUploadingImage}>
                  {loading
                    ? t('actions.saving') || 'Saving...'
                    : t('actions.save') || 'Save'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <PageTable onEdit={openEditDialog} />
    </div>
  )
}