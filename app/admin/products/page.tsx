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
import { Badge } from '@/components/ui/badge'
import { MultiFileUpload } from '@/components/ui/multi-file-upload'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { getProductCategoryOptions, getProductCategoryLabel, getProductCategoryColor } from '@/types/product'

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
    shortDescription?: string
    category?: string
  }>
}

export default function ProductsPage() {
  const t = useTranslations('admin.products')
  const { setTitle } = useAdminTitle()
  const tValidation = useTranslations('admin.validation')
  const locale = useLocale() as 'vi' | 'en' | 'fr'
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState('vi')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  // Helper to get translation by locale, fallback to 'vi' if not found
  const getTranslation = (translations: Product['translations']) => {
    return translations.find(t => t.locale === locale) || translations.find(t => t.locale === 'vi') || translations[0]
  }

  const [formData, setFormData] = useState({
    slug: '',
    images: [] as string[],
    price: undefined as number | undefined,
    specs: '',
    order: 0,
    featured: false,
    translations: [
      { locale: 'vi', name: '', description: '', shortDescription: '', category: '' },
      { locale: 'en', name: '', description: '', shortDescription: '', category: '' },
      { locale: 'fr', name: '', description: '', shortDescription: '', category: '' },
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
    setTitle(t('title'))
    void fetchProducts()
  }, [setTitle, t])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Filter out empty translations before submitting
      const filteredTranslations = formData.translations.filter(t => 
        (t.name?.trim() && t.description?.trim())
      )

      if (filteredTranslations.length === 0) {
        toast.error('Vui lòng nhập ít nhất một ngôn ngữ (tên và mô tả)')
        return
      }

      // Validate price: must be a valid number or undefined
      let validatedPrice: number | undefined = undefined
      if (formData.price !== undefined && formData.price !== null) {
        const priceValue = typeof formData.price === 'string' 
          ? parseFloat(formData.price) 
          : formData.price
        
        if (isNaN(priceValue)) {
          toast.error(tValidation('priceInvalid') || 'Giá không hợp lệ')
          return
        }
        
        if (priceValue < 0) {
          toast.error(tValidation('priceMin') || 'Giá phải lớn hơn hoặc bằng 0')
          return
        }
        
        validatedPrice = priceValue
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

      const url = editingProduct 
        ? `/admin/api/products/${editingProduct.id}`
        : '/admin/api/products'
      const method = editingProduct ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: validatedPrice,
          order: validatedOrder,
          translations: filteredTranslations,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to save')
      }
      
      toast.success(editingProduct ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchProducts()
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
      const res = await fetch(`/admin/api/products/${itemToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      setItemToDelete(null)
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
        { locale: 'vi', name: '', description: '', shortDescription: '', category: '' },
        { locale: 'en', name: '', description: '', shortDescription: '', category: '' },
        { locale: 'fr', name: '', description: '', shortDescription: '', category: '' },
      ],
    })
    setEditingProduct(null)
  }

  const openEditDialog = async (product: Product) => {
    try {
      // Fetch full product detail with all translations
      const res = await fetch(`/admin/api/products/${product.id}`)
      if (!res.ok) throw new Error('Failed to fetch product detail')
      
      const fullProduct = await res.json()
      
      setEditingProduct(fullProduct)
      setFormData({
        slug: fullProduct.slug,
        images: fullProduct.images,
        price: fullProduct.price,
        specs: fullProduct.specs || '',
        order: fullProduct.order,
        featured: fullProduct.featured,
        translations: ['vi', 'en', 'fr'].map(loc => {
          const trans = fullProduct.translations.find((t: any) => t.locale === loc)
          return {
            locale: loc,
            name: trans?.name || '',
            description: trans?.description || '',
            shortDescription: trans?.shortDescription || '',
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
                  <Label>{t('form.price')}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price !== undefined && formData.price !== null ? formData.price : ''}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '' || value === null || value === undefined) {
                        setFormData({ ...formData, price: undefined })
                      } else {
                        const numValue = parseFloat(value)
                        if (!isNaN(numValue)) {
                          setFormData({ ...formData, price: numValue })
                        }
                      }
                    }}
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
                          required={loc === 'vi'}
                        />
                      </div>
                      <div>
                        <Label>{t('form.shortDescription') || 'Short Description'}</Label>
                        <Input
                          value={trans?.shortDescription || ''}
                          onChange={(e) => {
                            const newTrans = formData.translations.map(t =>
                              t.locale === loc ? { ...t, shortDescription: e.target.value } : t
                            )
                            setFormData({ ...formData, translations: newTrans })
                          }}
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
                        <Select
                          value={trans?.category || ''}
                          onValueChange={(value) => {
                            const newTrans = formData.translations.map(t =>
                              t.locale === loc ? { ...t, category: value } : t
                            )
                            setFormData({ ...formData, translations: newTrans })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.selectCategory') || 'Select category'} />
                          </SelectTrigger>
                          <SelectContent>
                            {getProductCategoryOptions(locale).map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                  const trans = getTranslation(product.translations)
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
                      <TableCell>
                        <div>{trans?.name || '-'}</div>
                        {trans?.category && (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getProductCategoryColor(trans.category)}`}>
                            {getProductCategoryLabel(trans.category, locale)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{product.price != null ? `$${product.price}` : '-'}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {product.featured && <Badge>{t('yes')}</Badge>}
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
                                  onClick={() => openEditDialog(product)}
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
                                  onClick={() => handleDeleteClick(product.id)}
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
            {products.map((product) => {
              const trans = getTranslation(product.translations)
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
                  <TooltipProvider>
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => openEditDialog(product)}
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
                            onClick={() => handleDeleteClick(product.id)}
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
        descriptionKey="products.confirmDelete"
      />
    </div>
  )
}

