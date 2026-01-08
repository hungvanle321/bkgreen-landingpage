"use client"

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { MultiFileUpload } from '@/components/ui/multi-file-upload'
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface Project {
  id: string
  slug: string
  images: string[]
  location?: string
  type?: string
  status?: string
  year?: string
  capacity?: string
  order: number
  featured: boolean
  translations: Array<{
    locale: string
    title: string
    description: string
    category?: string
  }>
}

export default function ProjectsPage() {
  const t = useTranslations('admin.projects')
  const tValidation = useTranslations('admin.validation')
  const locale = useLocale() as 'vi' | 'en' | 'fr'
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [_activeTab, _setActiveTab] = useState('vi')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  // Helper to get translation by locale, fallback to 'vi' if not found
  const getTranslation = (translations: Project['translations']) => {
    return translations.find(t => t.locale === locale) || translations.find(t => t.locale === 'vi') || translations[0]
  }

  const [formData, setFormData] = useState({
    slug: '',
    images: [] as string[],
    location: '',
    type: '',
    status: '',
    year: '',
    capacity: '',
    order: 0,
    featured: false,
    translations: [
      { locale: 'vi', title: '', description: '', category: '' },
      { locale: 'en', title: '', description: '', category: '' },
      { locale: 'fr', title: '', description: '', category: '' },
    ],
  })

  const fetchProjects = async () => {
    try {
      const res = await fetch('/admin/api/projects')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setProjects(data)
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchProjects()
  }, [])

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

      const url = editingProject 
        ? `/admin/api/projects/${editingProject.id}`
        : '/admin/api/projects'
      const method = editingProject ? 'PATCH' : 'POST'

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
      
      toast.success(editingProject ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchProjects()
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
      const res = await fetch(`/admin/api/projects/${itemToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      setItemToDelete(null)
      void fetchProjects()
    } catch {
      toast.error(t('errors.deleteFailed'))
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      images: [],
      location: '',
      type: '',
      status: '',
      year: '',
      capacity: '',
      order: 0,
      featured: false,
      translations: [
        { locale: 'vi', title: '', description: '', category: '' },
        { locale: 'en', title: '', description: '', category: '' },
        { locale: 'fr', title: '', description: '', category: '' },
      ],
    })
    setEditingProject(null)
  }

  const openEditDialog = async (project: Project) => {
    try {
      // Fetch full project detail with all translations
      const res = await fetch(`/admin/api/projects/${project.id}`)
      if (!res.ok) throw new Error('Failed to fetch project detail')
      
      const fullProject = await res.json()
      
      setEditingProject(fullProject)
      setFormData({
        slug: fullProject.slug,
        images: fullProject.images,
        location: fullProject.location || '',
        type: fullProject.type || '',
        status: fullProject.status || '',
        year: fullProject.year || '',
        capacity: fullProject.capacity || '',
        order: fullProject.order,
        featured: fullProject.featured,
        translations: ['vi', 'en', 'fr'].map(loc => {
          const trans = fullProject.translations.find((t: any) => t.locale === loc)
          return {
            locale: loc,
            title: trans?.title || '',
            description: trans?.description || '',
            category: trans?.category || '',
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addNew')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? t('edit') : t('create')}</DialogTitle>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('form.location')}</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t('form.type')}</Label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('form.status')}</Label>
                  <Input
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t('form.year')}</Label>
                  <Input
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>{t('form.capacity')}</Label>
                <Input
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>

              <MultiFileUpload
                value={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                placeholder={t('fileUpload.projectPlaceholder')}
                maxFiles={10}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured">{t('form.featured')}</Label>
              </div>

              <Tabs defaultValue="vi" className="w-full">
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
                      <div>
                        <Label>{t('form.category')}</Label>
                        <Input
                          value={trans?.category || ''}
                          onChange={(e) => {
                            const newTrans = formData.translations.map(t =>
                              t.locale === loc ? { ...t, category: e.target.value } : t
                            )
                            setFormData({ ...formData, translations: newTrans })
                          }}
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
                  <TableHead className="hidden md:table-cell">{t('table.location')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.status')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.featured')}</TableHead>
                  <TableHead>{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const trans = getTranslation(project.translations)
                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        {project.images[0] ? (
                          <div className="relative w-16 h-16">
                            <Image src={project.images[0]} alt="" fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>{trans?.title || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">{project.location || '-'}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline">{project.status || '-'}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {project.featured && <Badge>{t('yes')}</Badge>}
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => openEditDialog(project)}
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
                                  onClick={() => handleDeleteClick(project.id)}
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
            {projects.map((project) => {
              const trans = getTranslation(project.translations)
              return (
                <div key={project.id} className="py-4 space-y-4">
                  {/* Image and Title */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {project.images[0] ? (
                        <div className="relative w-16 h-16">
                          <Image src={project.images[0]} alt="" fill className="object-cover rounded" unoptimized />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-lg">{trans?.title || '-'}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-1">
                        <div>
                          <span className="font-medium">{t('table.location')}:</span>
                          <span className="ml-2">{project.location || '-'}</span>
                        </div>
                        <div>
                          <span className="font-medium">{t('table.status')}:</span>
                          <span className="ml-2">{project.status || '-'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div>
                      <Badge>{t('yes')}</Badge>
                    </div>
                  )}

                  {/* Actions */}
                  <TooltipProvider>
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => openEditDialog(project)}
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
                            onClick={() => handleDeleteClick(project.id)}
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
        descriptionKey="projects.confirmDelete"
      />
    </div>
  )
}

