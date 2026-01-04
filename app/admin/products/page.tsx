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
import { Badge } from '@/components/ui/badge'
import { MultiFileUpload } from '@/components/ui/multi-file-upload'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface Product {
  id: string
  slug: string
  images: string[]
  price?: number
  specs?: string
  order: number
  featured: boolean
  translations: Array<{
    locale: string
    name: string
    description: string
    category?: string
  }>
}

export default function ProductsPage() {
  const t = useTranslations('admin.products')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState('vi')

  const [formData, setFormData] = useState({
    slug: '',
    images: [] as string[],
    price: undefined as number | undefined,
    specs: '',
    order: 0,
    featured: false,
    translations: [
      { locale: 'vi', name: '', description: '', category: '' },
      { locale: 'en', name: '', description: '', category: '' },
      { locale: 'fr', name: '', description: '', category: '' },
    ],
  })

  const fetchProducts = async () => {
    try {
      const res = await fetch('/admin/api/products')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setProducts(data)
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingProduct 
        ? `/admin/api/products/${editingProduct.id}`
        : '/admin/api/products'
      const method = editingProduct ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save')
      
      toast.success(editingProduct ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchProducts()
    } catch {
      toast.error(t('errors.saveFailed'))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return

    try {
      const res = await fetch(`/admin/api/products/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      void fetchProducts()
    } catch {
      toast.error(t('errors.deleteFailed'))
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      images: [],
      price: undefined,
      specs: '',
      order: 0,
      featured: false,
      translations: [
        { locale: 'vi', name: '', description: '', category: '' },
        { locale: 'en', name: '', description: '', category: '' },
        { locale: 'fr', name: '', description: '', category: '' },
      ],
    })
    setEditingProduct(null)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      slug: product.slug,
      images: product.images,
      price: product.price,
      specs: product.specs || '',
      order: product.order,
      featured: product.featured,
      translations: ['vi', 'en', 'fr'].map(loc => {
        const trans = product.translations.find(t => t.locale === loc)
        return {
          locale: loc,
          name: trans?.name || '',
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
              <DialogTitle>{editingProduct ? t('edit') : t('create')}</DialogTitle>
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
                  <Label>{t('form.price')}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value ? parseFloat(e.target.value) : undefined })}
                  />
                </div>
                <div>
                  <Label>{t('form.specs')}</Label>
                  <Input
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  />
                </div>
              </div>

              <MultiFileUpload
                value={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                placeholder={t('fileUpload.productPlaceholder')}
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
                        <Label>{t('form.name')}</Label>
                        <Input
                          value={trans?.name || ''}
                          onChange={(e) => {
                            const newTrans = formData.translations.map(t =>
                              t.locale === loc ? { ...t, name: e.target.value } : t
                            )
                            setFormData({ ...formData, translations: newTrans })
                          }}
                          required={loc === activeTab || Boolean(trans?.name && trans.name.trim() !== '')}
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
                          required={loc === activeTab || Boolean(trans?.description && trans.description.trim() !== '')}
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
                  <TableHead>{t('table.name')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.price')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.featured')}</TableHead>
                  <TableHead>{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const trans = product.translations[0]
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.images[0] ? (
                          <div className="relative w-16 h-16">
                            <Image src={product.images[0]} alt="" fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-muted" />
                        )}
                      </TableCell>
                      <TableCell>{trans?.name || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.price != null ? `$${product.price}` : '-'}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {product.featured && <Badge>{t('yes')}</Badge>}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
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
            {products.map((product) => {
              const trans = product.translations[0]
              return (
                <div key={product.id} className="py-4 space-y-4">
                  {/* Image and Name */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {product.images[0] ? (
                        <div className="relative w-16 h-16">
                          <Image src={product.images[0]} alt="" fill className="object-cover rounded" unoptimized />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-lg">{trans?.name || '-'}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-1">
                        <div>
                          <span className="font-medium">{t('table.price')}:</span>
                          <span className="ml-2">{product.price != null ? `$${product.price}` : '-'}</span>
                        </div>
                        {product.featured && (
                          <div>
                            <span className="font-medium">{t('table.featured')}:</span>
                            <span className="ml-2"><Badge>{t('yes')}</Badge></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {t('edit')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDelete(product.id)}
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

