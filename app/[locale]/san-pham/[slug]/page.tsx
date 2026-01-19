import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ChevronRight, Home } from 'lucide-react'

import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { renderRichText } from '@/lib/richtext-render'
import { getProductCategoryLabel, getProductCategoryColor } from '@/types/product'

interface PageParams {
  locale: 'vi' | 'en' | 'fr'
  slug: string
}

export default async function ProductDetailPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params
  const t = await getTranslations('products')

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
      },
    },
  })

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Product not found</div>
          <div className="mt-6">
            <Link href={`/${locale}/san-pham`} className="text-blue-600 hover:underline">
              {t('details.back') || 'Back to Products'}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const name = product.translations[0]?.name || ''
  const description = product.translations[0]?.description || ''
  const shortDescription = product.translations[0]?.shortDescription || ''
  const category = product.translations[0]?.category || ''

  const mainImage = product.images?.[0] || '/placeholder-product.jpg'
  const additionalImages = product.images?.slice(1) || []

  // Try to parse description as rich text JSON, fallback to plain text
  let descriptionContent: React.ReactNode
  try {
    const parsedDescription = JSON.parse(description)
    descriptionContent = renderRichText(parsedDescription)
  } catch {
    descriptionContent = <p className="text-muted-foreground whitespace-pre-wrap">{description}</p>
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl h-[40vh] sm:h-[50vh] lg:h-[60vh]">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 text-white">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge 
                className={getProductCategoryColor(category)}
              >
                {getProductCategoryLabel(category, locale)}
              </Badge>
              {product.featured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  {t('featured.badge') || 'Featured'}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{name}</h1>
            {product.specs && (
              <p className="text-lg sm:text-xl text-white/90">{product.specs}</p>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/san-pham`} className="hover:text-foreground transition-colors">
            {t('title') || 'Products'}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{name}</span>
        </nav>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">{t('details.description') || 'Product Description'}</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {descriptionContent}
                </div>
              </CardContent>
            </Card>

            {/* Additional Images Gallery */}
            {additionalImages.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{t('details.gallery') || 'Product Gallery'}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {additionalImages.map((image, index) => (
                      <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${name} - ${index + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Info Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">{t('details.info') || 'Product Information'}</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('details.category') || 'Category'}</p>
                    <Badge className={getProductCategoryColor(category)}>
                      {getProductCategoryLabel(category, locale)}
                    </Badge>
                  </div>

                  {product.specs && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('details.specs') || 'Specifications'}</p>
                      <p className="font-medium">{product.specs}</p>
                    </div>
                  )}

                  {product.price && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t('details.price') || 'Price'}</p>
                      <p className="text-2xl font-bold text-primary">
                        {new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : locale === 'fr' ? 'fr-FR' : 'en-US', {
                          style: 'currency',
                          currency: locale === 'vi' ? 'VND' : locale === 'fr' ? 'EUR' : 'USD',
                        }).format(product.price)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button asChild className="w-full" style={{ backgroundColor: '#cc0000', color: 'white' }}>
                    <Link href={`/${locale}/lien-he`}>
                      {t('details.contact') || 'Contact Us'}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/${locale}/san-pham`}>
                      {t('details.back') || 'Back to Products'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
