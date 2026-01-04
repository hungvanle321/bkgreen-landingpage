"use client"

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { equipmentSchema } from '@/lib/validations'

interface Equipment {
  id: string
  slug: string
  image?: string
  order: number
  translations: Array<{
    locale: string
    title: string
    description: string
    category?: string
  }>
}

export default function EquipmentPage() {
  const t = useTranslations('admin.equipment')
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm({
    resolver: zodResolver(equipmentSchema),
    mode: isSubmitted ? 'onChange' : 'onSubmit',
    defaultValues: {
      slug: '',
      image: '',
      order: 0,
      translations: [
        { locale: 'vi', title: '', description: '', category: '' },
        { locale: 'en', title: '', description: '', category: '' },
        { locale: 'fr', title: '', description: '', category: '' },
      ],
    },
  })

  const fetchEquipment = async () => {
    try {
      const res = await fetch('/admin/api/equipment')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setEquipment(data)
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchEquipment()
  }, [])

  const handleSubmit = async (data: any) => {
    setIsSubmitted(true)
    try {
      const url = editingEquipment
        ? `/admin/api/equipment/${editingEquipment.id}`
        : '/admin/api/equipment'
      const method = editingEquipment ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to save')

      toast.success(editingEquipment ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      form.reset()
      setEditingEquipment(null)
      void fetchEquipment()
    } catch {
      toast.error(t('errors.saveFailed'))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return

    try {
      const res = await fetch(`/admin/api/equipment/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      void fetchEquipment()
    } catch {
      toast.error(t('errors.deleteFailed'))
    }
  }

  const resetForm = () => {
    form.reset({
      slug: '',
      image: '',
      order: 0,
      translations: [
        { locale: 'vi', title: '', description: '', category: '' },
        { locale: 'en', title: '', description: '', category: '' },
        { locale: 'fr', title: '', description: '', category: '' },
      ],
    })
    setEditingEquipment(null)
    setIsSubmitted(false)
  }

  const openEditDialog = (item: Equipment) => {
    setEditingEquipment(item)
    form.reset({
      slug: item.slug,
      image: item.image || '',
      order: item.order,
      translations: ['vi', 'en', 'fr'].map(loc => {
        const trans = item.translations.find(t => t.locale === loc)
        return {
          locale: loc,
          title: trans?.title || '',
          description: trans?.description || '',
          category: trans?.category || '',
        }
      }),
    })
    setDialogOpen(true)
    setIsSubmitted(false)
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
              <DialogTitle>{editingEquipment ? t('edit') : t('create')}</DialogTitle>
              <DialogDescription>{t('formDescription')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('form.slug')}</Label>
                  <Input
                    {...form.register('slug')}
                  />
                  {form.formState.errors.slug && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.slug.message}</p>
                  )}
                </div>
                <div>
                  <Label>{t('form.order')}</Label>
                  <Input
                    type="number"
                    {...form.register('order', { valueAsNumber: true })}
                  />
                  {form.formState.errors.order && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.order.message}</p>
                  )}
                </div>
              </div>

              <div>
                <FileUpload
                  value={form.watch('image')}
                  onChange={(url) => form.setValue('image', url)}
                  placeholder={t('fileUpload.equipmentPlaceholder')}
                  showUrl={false}
                />
              </div>

              <Tabs defaultValue="vi" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                </TabsList>
                {['vi', 'en', 'fr'].map((loc, index) => (
                  <TabsContent key={loc} value={loc} className="space-y-4">
                    <div>
                      <Label>{t('form.title')}</Label>
                      <Input
                        {...form.register(`translations.${index}.title`)}
                      />
                      {form.formState.errors.translations?.[index]?.title && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.translations[index]?.title?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>{t('form.description')}</Label>
                      <Textarea
                        {...form.register(`translations.${index}.description`)}
                      />
                      {form.formState.errors.translations?.[index]?.description && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.translations[index]?.description?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>{t('form.category')}</Label>
                      <Input
                        {...form.register(`translations.${index}.category`)}
                      />
                    </div>
                  </TabsContent>
                ))}
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
                {equipment.map((item) => {
                  const trans = item.translations[0]
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.image ? (
                          <div className="relative w-16 h-16">
                            <Image src={item.image} alt="" fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted" />
                        )}
                      </TableCell>
                      <TableCell>{trans?.title || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.order}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
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
            {equipment.map((item) => {
              const trans = item.translations[0]
              return (
                <div key={item.id} className="py-4 space-y-4">
                  {/* Image and Title */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {item.image ? (
                        <div className="relative w-16 h-16">
                          <Image src={item.image} alt="" fill className="object-cover rounded" unoptimized />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-lg">{trans?.title || '-'}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t('table.order')}: {item.order}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {t('edit')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDelete(item.id)}
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

