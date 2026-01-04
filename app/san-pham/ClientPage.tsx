"use client"
import { Droplets, Settings, Shield, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {useTranslations, useLocale} from 'next-intl'
import { useEffect, useState, useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  category: string
  specs: string
  description: string
  images?: string[]
}

export default function ProductsPageClient() {
  const t = useTranslations('productsPage')
  const locale = useLocale()

  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchProducts = useCallback(async (category = null) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ locale })
      if (category) params.append('category', category)
      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [locale])

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams({ locale, featured: 'true' })
      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setFeaturedProducts(data)
    } catch (error) {
      console.error('Error fetching featured products:', error)
    }
  }, [locale])

  const fetchCategoryProducts = useCallback(async (category: string) => {
    try {
      const params = new URLSearchParams({ locale, category, limit: '10' })
      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setCategoryProducts(prev => ({ ...prev, [category]: data }))
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error)
    }
  }, [locale])

  useEffect(() => {
    void fetchProducts()
    void fetchFeaturedProducts()
    // Fetch products for each category
    categoryMap.forEach(cat => {
      if (cat !== 'other') void fetchCategoryProducts(cat)
    })
  }, [fetchProducts, fetchFeaturedProducts, fetchCategoryProducts])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => product.category?.toLowerCase().includes(cat.toLowerCase()))
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const productCategories = [
    {
      id: 'pumps',
      title: t('categories.items.pumps.title'),
      icon: Droplets,
      description: t('categories.items.pumps.description'),
      image: '/equipment-pump.jpg',
      products: categoryProducts['pumps'] || []
    },
    {
      id: 'valves',
      title: t('categories.items.valves.title'),
      icon: Settings,
      description: t('categories.items.valves.description'),
      image: '/equipment-valve.jpg',
      products: categoryProducts['valves'] || []
    },
    {
      id: 'fire-safety',
      title: t('categories.items.fire.title'),
      icon: Shield,
      description: t('categories.items.fire.description'),
      image: '/equipment-fire.jpg',
      products: categoryProducts['fire-safety'] || []
    }
  ]


  const categoryMap = ['pumps', 'valves', 'fire-safety', 'other']

  const filters = {
    type: [t('filters.type.0'), t('filters.type.1'), t('filters.type.2'), t('filters.type.3')],
    application: [t('filters.application.0'), t('filters.application.1'), t('filters.application.2')]
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {t('header.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('header.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('featured.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Card key={product.name} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={product.images?.[0] || '/equipment-pump.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: '#007a3f' }}>
                      {product.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="text-sm font-mono">
                    {product.specs}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground flex-1 line-clamp-3 mb-4">{product.description}</p>
                  <Button asChild variant="outline" className="w-full mt-auto" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                    <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('featured.detailBtn')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('categories.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {productCategories.map((category) => (
              <Card key={category.id} className="flex flex-col h-full">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <category.icon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 space-y-3 mb-4">
                    {category.products.map((product, index) => (
                      <div key={index} className="border-l-2 border-primary pl-3">
                        <h4 className="font-semibold text-foreground">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.specs}</p>
                        <p className="text-xs text-muted-foreground/70 line-clamp-2">{product.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full mt-auto" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                    <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('categories.learnMore')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t('filters.title')}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('filters.typeTitle')}</h4>
                    <div className="space-y-2">
                      {filters.type.map((item, index) => (
                        <label key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedCategories.includes(categoryMap[index])}
                            onChange={(e) => handleCategoryChange(categoryMap[index], e.target.checked)}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('filters.applicationTitle')}</h4>
                    <div className="space-y-2">
                      {filters.application.map((item) => (
                        <label key={item} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm text-muted-foreground">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('filters.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{t('filters.filterBtn')}</span>
                </Button>
              </div>
              {loading ? (
                <p className="text-muted-foreground">{t('filters.loading')}</p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-muted-foreground">{t('filters.noProductsFound')}</p>
              ) : (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative rounded-t-lg overflow-hidden">
                        <Image
                          src={product.images?.[0] || '/equipment-pump.jpg'}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium" style={{ color: '#007a3f' }}>
                            {product.category}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription className="text-sm font-mono">
                          {product.specs}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-muted-foreground flex-1 line-clamp-3 mb-4">{product.description}</p>
                        <Button asChild variant="outline" className="w-full mt-auto" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                          <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('featured.detailBtn')}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('related.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('related.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href={`/${locale}/dich-vu`} className="focus:outline-none focus:ring-0">{t('related.servicesBtn')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/du-an`} className="focus:outline-none focus:ring-0">{t('related.projectsBtn')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('cta.primary')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


