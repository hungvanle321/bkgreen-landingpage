"use client"

import { Droplets, Settings, Zap, Shield, Wrench, Package } from 'lucide-react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

import { Card } from '@/components/ui/card'
import { getImageSizes, generateBlurDataURL, shouldPrioritize } from '@/lib/image-utils'

// import { motion } from 'framer-motion'

export default function ServicesSection() {
  const t = useTranslations('services')
  const services = [
    {
      icon: Droplets,
      title: t('wastewater.title'),
      description: t('wastewater.description'),
      image: '/service-wastewater.jpg'
    },
    {
      icon: Settings,
      title: t('operation.title'),
      description: t('operation.description'),
      image: '/service-operation.jpg'
    },
    {
      icon: Zap,
      title: t('ro.title'),
      description: t('ro.description'),
      image: '/service-ro.jpg'
    },
    {
      icon: Shield,
      title: t('electrical.title'),
      description: t('electrical.description'),
      image: '/service-electrical.jpg'
    },
    {
      icon: Wrench,
      title: t('equipment.title'),
      description: t('equipment.description'),
      image: '/service-equipment.jpg'
    },
    {
      icon: Package,
      title: t('consulting.title'),
      description: t('consulting.description'),
      image: '/service-consulting.jpg'
    }
  ]

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-primary-green/5"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <div className="mx-auto max-w-2xl text-center">
          <h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            data-aos="fade-up"
          >
            {t('title')}
          </h2>
          <p 
            className="mt-6 text-lg leading-8 text-gray-600"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('subtitle')}
          </p>
          </div>
        </div>
        <div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 auto-rows-fr">
          {services.map((service, index) => (
            <div 
              key={`service-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Card className="h-full min-h-[20rem] hover:shadow-lg transition-shadow overflow-hidden relative flex flex-col">
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes={getImageSizes('card')}
                    className="object-cover object-center"
                    priority={shouldPrioritize(index, 3)}
                    loading={shouldPrioritize(index, 3) ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL={generateBlurDataURL()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-green">
                      <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-center text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
