'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {useTranslations, useLocale} from 'next-intl'

import { Button } from '@/components/ui/button'
import { useImagePreloader } from '@/lib/hooks/use-image-preloader'

export default function HeroSectionClient() {
  const t = useTranslations('hero')
  const locale = useLocale()
  // Preload critical images
  useImagePreloader({ 
    imageUrls: ['/hero-bg.jpg'], 
    priority: true 
  })

  return (
    <section className="relative text-white bg-cover bg-center bg-no-repeat min-h-screen flex items-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
      <div className="absolute inset-0 bg-black/60 md:bg-black/70"></div>
      <div className="relative w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl lg:w-3/5">
            <h1 
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className="block">{t('title')}</span>
            </h1>
            
            <p 
              className="mt-6 text-base leading-7 text-gray-200 sm:text-lg sm:leading-8 md:mt-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {t('subtitle')}
            </p>
            
            <div 
              className="mt-8 sm:mt-10"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto bg-primary-red hover:bg-primary-red/90 text-white font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                <Link href={`/${locale}/lien-he`} className="flex items-center justify-center space-x-2 focus:outline-none focus:ring-0">
                  <span>{t('cta')}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
