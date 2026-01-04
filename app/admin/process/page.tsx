"use client"

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/ui/file-upload'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface ProcessStep {
  id: string
  step: string
  image?: string
  order: number
  translations: Array<{
    locale: string
    title: string
    description: string
  }>
}

export default function ProcessPage() {
  const t = useTranslations('admin.process')
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null)

  const [formData, setFormData] = useState({
    step: '',
    image: '',
    order: 0,
    translations: [
      { locale: 'vi', title: '', description: '' },
      { locale: 'en', title: '', description: '' },
      { locale: 'fr', title: '', description: '' },
    ],
  })

  const fetchSteps = async () => {
    try {
      const res = await fetch('/admin/api/process')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setSteps(data)
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchSteps()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingStep 
        ? `/admin/api/process/${editingStep.id}`
        : '/admin/api/process'
      const method = editingStep ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save')
      
      toast.success(editingStep ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchSteps()
    } catch {
      toast.error(t('errors.saveFailed'))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return

    try {
      const res = await fetch(`/admin/api/process/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      void fetchSteps()
    } catch {
      toast.error(t('errors.deleteFailed'))
    }
  }

  const resetForm = () => {
    setFormData({
      step: '',
      image: '',
      order: 0,
      translations: [
        { locale: 'vi', title: '', description: '' },
        { locale: 'en', title: '', description: '' },
        { locale: 'fr', title: '', description: '' },
      ],
    })
    setEditingStep(null)
  }

  const openEditDialog = (step: ProcessStep) => {
    setEditingStep(step)
    setFormData({
      step: step.step,
      image: step.image || '',
      order: step.order,
      translations: ['vi', 'en', 'fr'].map(loc => {
        const trans = step.translations.find(t => t.locale === loc)
        return {
          locale: loc,
          title: trans?.title || '',
          description: trans?.description || '',
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
              <DialogTitle>{editingStep ? t('edit') : t('create')}</DialogTitle>
              <DialogDescription>{t('formDescription')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('form.step')}</Label>
                  <Input
                    value={formData.step}
                    onChange={(e) => setFormData({ ...formData, step: e.target.value })}
                    placeholder="01, 02, 03..."
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

              <FileUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                placeholder={t('fileUpload.processPlaceholder')}
                showUrl={false}
              />

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
                  <TableHead className="w-24">{t('table.step')}</TableHead>
                  <TableHead className="w-32">{t('table.image')}</TableHead>
                  <TableHead>{t('table.title')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.order')}</TableHead>
                  <TableHead>{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {steps.map((step) => {
                  const trans = step.translations[0]
                  return (
                    <TableRow key={step.id}>
                      <TableCell className="font-mono">{step.step}</TableCell>
                      <TableCell>
                        {step.image ? (
                          <div className="relative w-16 h-16">
                            <Image src={step.image} alt="" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted" />
                        )}
                      </TableCell>
                      <TableCell>{trans?.title || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">{step.order}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(step)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(step.id)}
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
            {steps.map((step) => {
              const trans = step.translations[0]
              return (
                <div key={step.id} className="py-4 space-y-4">
                  {/* Step Number and Image */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600">{step.step}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-lg">{trans?.title || '-'}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t('table.order')}: {step.order}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {step.image ? (
                        <div className="relative w-16 h-16">
                          <Image src={step.image} alt="" fill className="object-cover rounded" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => openEditDialog(step)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {t('edit')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDelete(step.id)}
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

