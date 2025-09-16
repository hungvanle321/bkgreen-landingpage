"use client"

import { Droplets, Building, Users, Award } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Card, CardContent } from '@/components/ui/card'
// import { motion } from 'framer-motion'

export default function AboutSection() {
  const t = useTranslations('about')
  const features = [
    {
      icon: Droplets,
      title: t('features.expertise.title'),
      description: t('features.expertise.description')
    },
    {
      icon: Building,
      title: t('features.technology.title'),
      description: t('features.technology.description')
    },
    {
      icon: Users,
      title: t('features.team.title'),
      description: t('features.team.description')
    },
    {
      icon: Award,
      title: t('features.quality.title'),
      description: t('features.quality.description')
    }
  ]

  return (
    <section className="py-16 bg-secondary-gray">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:min-h-[600px] items-start lg:items-center">
          <div 
            data-aos="fade-right"
            className="flex flex-col justify-center"
          >
            <h2 
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {t('title')}
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-lg leading-8 text-gray-600">{t('p1')}</p>
              
              <p className="text-lg leading-8 text-gray-600">{t('p2')}</p>
              
              <p className="text-lg leading-8 text-gray-600">{t('p3')}</p>
            </div>
            <div className="mt-8">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/about-company.jpg"
                  alt={t('imageAlt')}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover"
                  priority={true}
                  loading="eager"
                />
              </div>
            </div>
          </div>
          <div 
            data-aos="fade-left"
            className="flex flex-col justify-center lg:justify-start"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 auto-rows-fr">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col h-full">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-blue">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <dt className="mt-4 text-lg font-semibold leading-7 text-gray-900">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </CardContent>
                </Card>
                </div>
              </div>
            ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
