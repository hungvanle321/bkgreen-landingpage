"use client"

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useAdminTitle } from '../components/admin-title-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/ui/file-upload'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface Service {
  id: string
  slug: string
  icon?: string
  image?: string
  order: number
  translations: Array<{
    locale: string
    title: string
    description: string
  }>
}

export default function ServicesPage() {
  const t = useTranslations('admin.services')
  const { setTitle } = useAdminTitle()
  const tValidation = useTranslations('admin.validation')
  const locale = useLocale() as 'vi' | 'en' | 'fr'
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [activeTab, setActiveTab] = useState('vi')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  // Helper to get translation by locale, fallback to 'vi' if not found
  const getTranslation = (translations: Service['translations']) => {
    return translations.find(t => t.locale === locale) || translations.find(t => t.locale === 'vi') || translations[0]
  }

  const [formData, setFormData] = useState({
    slug: '',
    icon: '',
    image: '',
    order: 0,
    translations: [
      { locale: 'vi', title: '', description: '' },
      { locale: 'en', title: '', description: '' },
      { locale: 'fr', title: '', description: '' },
    ],
  })

  const fetchServices = async () => {
    try {
      const res = await fetch('/admin/api/services')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setServices(data)
    } catch {
      toast.error(t('services.errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTitle(t('title'))
    void fetchServices()
  }, [setTitle, t])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Filter out empty translations before submitting
      const filteredTranslations = formData.translations.filter(t => 
        (t.title?.trim() && t.description?.trim())
      )

      if (filteredTranslations.length === 0) {
        toast.error('Vui lòng nhập ít nhất một ngôn ngữ (tiêu đề và mô tả)')
        return
      }

      // Validate order: must be a valid integer >= 0
      let validatedOrder: number = 0
      const orderValue = typeof formData.order === 'string' 
        ? parseInt(formData.order) 
        : formData.order
      
      if (isNaN(orderValue)) {
        toast.error(tValidation('orderInvalid') || 'Thứ tự không hợp lệ')
        return
      }
      
      if (orderValue < 0) {
        toast.error(tValidation('orderMin') || 'Thứ tự phải lớn hơn hoặc bằng 0')
        return
      }
      
      validatedOrder = orderValue

      const url = editingService
        ? `/admin/api/services/${editingService.id}`
        : '/admin/api/services'
      const method = editingService ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: validatedOrder,
          translations: filteredTranslations,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to save')
      }

      toast.success(editingService ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchServices()
    } catch (error: any) {
      toast.error(error.message || t('errors.saveFailed'))
    }
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return

    try {
      const res = await fetch(`/admin/api/services/${itemToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      setItemToDelete(null)
      void fetchServices()
    } catch {
      toast.error(t('errors.deleteFailed'))
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      icon: '',
      image: '',
      order: 0,
      translations: [
        { locale: 'vi', title: '', description: '' },
        { locale: 'en', title: '', description: '' },
        { locale: 'fr', title: '', description: '' },
      ],
    })
    setEditingService(null)
  }

  const openEditDialog = async (service: Service) => {
    try {
      // Fetch full service detail with all translations
      const res = await fetch(`/admin/api/services/${service.id}`)
      if (!res.ok) throw new Error('Failed to fetch service detail')
      
      const fullService = await res.json()
      
      setEditingService(fullService)
      setFormData({
        slug: fullService.slug,
        icon: fullService.icon || '',
        image: fullService.image || '',
        order: fullService.order,
        translations: ['vi', 'en', 'fr'].map(loc => {
          const trans = fullService.translations.find((t: any) => t.locale === loc)
          return {
            locale: loc,
            title: trans?.title || '',
            description: trans?.description || '',
          }
        }),
      })
      setDialogOpen(true)
    } catch (error: any) {
      toast.error(error.message || t('errors.fetchFailed'))
    }
  }


  if (loading) {
    return <div className="flex items-center justify-center h-64">{t('loading')}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addNew')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? t('edit') : t('create')}</DialogTitle>
              <DialogDescription>{t('formDescription')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('form.slug')}</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>{t('form.order')}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.order}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '' || value === null || value === undefined) {
                        setFormData({ ...formData, order: 0 })
                      } else {
                        const numValue = parseInt(value)
                        if (!isNaN(numValue)) {
                          setFormData({ ...formData, order: numValue })
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <FileUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                placeholder={t('fileUpload.servicePlaceholder')}
                showUrl={false}
              />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                </TabsList>
                {['vi', 'en', 'fr'].map((loc) => {
                  const trans = formData.translations.find(t => t.locale === loc)
                  return (
                    <TabsContent key={loc} value={loc} className="space-y-4">
                      <div>
                        <Label>{t('form.title')}</Label>
                        <Input
                          value={trans?.title || ''}
                          onChange={(e) => {
                            const newTrans = formData.translations.map(t =>
                              t.locale === loc ? { ...t, title: e.target.value } : t
                            )
                            setFormData({ ...formData, translations: newTrans })
                          }}
                          required={loc === 'vi'}
                        />
                      </div>
                      <div>
                        <Label>{t('form.description')}</Label>
                        <Textarea
                          value={trans?.description || ''}
                          onChange={(e) => {
                            const newTrans = formData.translations.map(t =>
                              t.locale === loc ? { ...t, description: e.target.value } : t
                            )
                            setFormData({ ...formData, translations: newTrans })
                          }}
                          required={loc === 'vi'}
                        />
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit">{t('save')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('list')}</CardTitle>
          <CardDescription>{t('listDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">{t('table.image')}</TableHead>
                  <TableHead>{t('table.title')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.order')}</TableHead>
                  <TableHead>{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => {
                  const trans = getTranslation(service.translations)
                  return (
                    <TableRow key={service.id}>
                      <TableCell>
                        {service.image ? (
                          <div className="relative w-16 h-16">
                            <Image src={service.image} alt="" fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted" />
                        )}
                      </TableCell>
                      <TableCell>{trans?.title || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">{service.order}</TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => openEditDialog(service)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t('edit') || 'Edit'}</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleDeleteClick(service.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t('delete') || 'Delete'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {services.map((service) => {
              const trans = getTranslation(service.translations)
              return (
                <div key={service.id} className="py-4 space-y-3">
                  {/* Image */}
                  <div className="flex justify-center">
                    <div className="h-24 sm:h-32 bg-gray-100 rounded flex items-center justify-center">
                      {service.image ? (
                        <Image src={service.image} alt="" width={200} height={200} className="h-full w-auto object-contain rounded" unoptimized />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">{t('table.title') || 'Title'}:</span>
                      <p className="font-medium text-gray-900">{trans?.title || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">{t('table.order')}:</span>
                      <p className="text-gray-900">{service.order}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <TooltipProvider>
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => openEditDialog(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t('edit') || 'Edit'}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteClick(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t('delete') || 'Delete'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        descriptionKey="services.confirmDelete"
      />
    </div>
  )
}

