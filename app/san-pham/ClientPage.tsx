"use client"
import { Droplets, Settings, Shield, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {useTranslations, useLocale} from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductsPageClient() {
  const t = useTranslations('productsPage')
  const locale = useLocale()

  const productCategories = [
    {
      id: 'pumps',
      title: t('categories.items.pumps.title'),
      icon: Droplets,
      description: t('categories.items.pumps.description'),
      image: '/equipment-pump.jpg',
      products: [
        {
          name: t('categories.items.pumps.products.0.name'),
          specs: t('categories.items.pumps.products.0.specs'),
          description: t('categories.items.pumps.products.0.description')
        },
        {
          name: t('categories.items.pumps.products.1.name'),
          specs: t('categories.items.pumps.products.1.specs'),
          description: t('categories.items.pumps.products.1.description')
        }
      ]
    },
    {
      id: 'valves',
      title: t('categories.items.valves.title'),
      icon: Settings,
      description: t('categories.items.valves.description'),
      image: '/equipment-valve.jpg',
      products: [
        {
          name: t('categories.items.valves.products.0.name'),
          specs: t('categories.items.valves.products.0.specs'),
          description: t('categories.items.valves.products.0.description')
        },
        {
          name: t('categories.items.valves.products.1.name'),
          specs: t('categories.items.valves.products.1.specs'),
          description: t('categories.items.valves.products.1.description')
        }
      ]
    },
    {
      id: 'fire-safety',
      title: t('categories.items.fire.title'),
      icon: Shield,
      description: t('categories.items.fire.description'),
      image: '/equipment-fire.jpg',
      products: [
        {
          name: t('categories.items.fire.products.0.name'),
          specs: t('categories.items.fire.products.0.specs'),
          description: t('categories.items.fire.products.0.description')
        },
        {
          name: t('categories.items.fire.products.1.name'),
          specs: t('categories.items.fire.products.1.specs'),
          description: t('categories.items.fire.products.1.description')
        }
      ]
    }
  ]

  const featuredProducts = [
    {
      name: t('featured.products.0.name'),
      category: t('featured.products.0.category'),
      image: '/equipment-pump.jpg',
      specs: t('featured.products.0.specs'),
      description: t('featured.products.0.description')
    },
    {
      name: t('featured.products.1.name'),
      category: t('featured.products.1.category'),
      image: '/equipment-valve.jpg',
      specs: t('featured.products.1.specs'),
      description: t('featured.products.1.description')
    },
    {
      name: t('featured.products.2.name'),
      category: t('featured.products.2.category'),
      image: '/equipment-ro.jpg',
      specs: t('featured.products.2.specs'),
      description: t('featured.products.2.description')
    }
  ]

  const filters = {
    type: [t('filters.type.0'), t('filters.type.1'), t('filters.type.2'), t('filters.type.3')],
    application: [t('filters.application.0'), t('filters.application.1'), t('filters.application.2')]
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t('header.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('header.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('featured.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Card key={product.name} className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
                <CardHeader>
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
                <CardContent>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Button asChild variant="outline" className="w-full" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                    <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('featured.detailBtn')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('categories.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {productCategories.map((category) => (
              <Card key={category.id} className="h-full">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#1844a7' }}>
                      <category.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.products.map((product, index) => (
                      <div key={index} className="border-l-2 pl-3" style={{ borderColor: '#cc0000' }}>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.specs}</p>
                        <p className="text-xs text-gray-500">{product.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('filters.title')}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t('filters.typeTitle')}</h4>
                    <div className="space-y-2">
                      {filters.type.map((item) => (
                        <label key={item} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm text-gray-600">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t('filters.applicationTitle')}</h4>
                    <div className="space-y-2">
                      {filters.application.map((item) => (
                        <label key={item} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm text-gray-600">{item}</span>
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('filters.searchPlaceholder')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{t('filters.filterBtn')}</span>
                </Button>
              </div>
              <p className="text-gray-600">
                {t('filters.helper')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('related.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
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


