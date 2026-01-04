"use client"

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [locale] = useState('vi')
  const [_activeTab, _setActiveTab] = useState('vi')

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
      const res = await fetch(`/admin/api/projects?locale=${locale}`)
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
      const url = editingProject 
        ? `/admin/api/projects/${editingProject.id}`
        : '/admin/api/projects'
      const method = editingProject ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save')
      
      toast.success(editingProject ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchProjects()
    } catch {
      toast.error(t('errors.saveFailed'))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return

    try {
      const res = await fetch(`/admin/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
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

  const openEditDialog = (project: Project) => {
    setEditingProject(project)
    setFormData({
      slug: project.slug,
      images: project.images,
      location: project.location || '',
      type: project.type || '',
      status: project.status || '',
      year: project.year || '',
      capacity: project.capacity || '',
      order: project.order,
      featured: project.featured,
      translations: ['vi', 'en', 'fr'].map(loc => {
        const trans = project.translations.find(t => t.locale === loc)
        return {
          locale: loc,
          title: trans?.title || '',
          description: trans?.description || '',
          category: trans?.category || '',
        }
      }),
    })
    setDialogOpen(true)
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
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
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
                          required
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
                          required
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
                  const trans = project.translations[0] || project.translations.find(t => t.locale === locale)
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
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
              const trans = project.translations[0] || project.translations.find(t => t.locale === locale)
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
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => openEditDialog(project)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {t('edit')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t('delete')}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

