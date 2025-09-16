"use client"
import { Droplets, Settings, Filter, Zap, Package, CheckCircle, ArrowRight, Clock, Shield, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {useTranslations, useLocale} from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ServicesPageClient() {
  const t = useTranslations('servicesPage')
  const tCore = useTranslations('services')
  const locale = useLocale()

  const services = [
    { icon: Droplets, title: tCore('wastewater.title'), description: t('services.wastewater.description'), features: [t('services.wastewater.features.0'), t('services.wastewater.features.1'), t('services.wastewater.features.2'), t('services.wastewater.features.3')], image: '/service-wastewater.jpg' },
    { icon: Settings, title: tCore('operation.title'), description: t('services.operation.description'), features: [t('services.operation.features.0'), t('services.operation.features.1'), t('services.operation.features.2'), t('services.operation.features.3')], image: '/service-operation.jpg' },
    { icon: Filter, title: tCore('ro.title'), description: t('services.ro.description'), features: [t('services.ro.features.0'), t('services.ro.features.1'), t('services.ro.features.2'), t('services.ro.features.3')], image: '/service-ro.jpg' },
    { icon: Zap, title: tCore('electrical.title'), description: t('services.electrical.description'), features: [t('services.electrical.features.0'), t('services.electrical.features.1'), t('services.electrical.features.2'), t('services.electrical.features.3')], image: '/service-electrical.jpg' },
    { icon: Package, title: tCore('equipment.title'), description: t('services.equipment.description'), features: [t('services.equipment.features.0'), t('services.equipment.features.1'), t('services.equipment.features.2'), t('services.equipment.features.3')], image: '/service-equipment.jpg' }
  ]

  const projectProcess = [
    { step: '01', title: t('process.steps.0.title'), description: t('process.steps.0.description'), image: '/process-survey.jpg' },
    { step: '02', title: t('process.steps.1.title'), description: t('process.steps.1.description'), image: '/process-design.jpg' },
    { step: '03', title: t('process.steps.2.title'), description: t('process.steps.2.description'), image: '/process-installation.jpg' },
    { step: '04', title: t('process.steps.3.title'), description: t('process.steps.3.description'), image: '/process-maintenance.jpg' }
  ]

  const technologies = [
    { title: t('technologies.items.ro.title'), description: t('technologies.items.ro.description'), image: '/service-ro.jpg', features: [t('technologies.items.ro.features.0'), t('technologies.items.ro.features.1'), t('technologies.items.ro.features.2')] },
    { title: t('technologies.items.scada.title'), description: t('technologies.items.scada.description'), image: '/service-electrical.jpg', features: [t('technologies.items.scada.features.0'), t('technologies.items.scada.features.1'), t('technologies.items.scada.features.2')] },
    { title: t('technologies.items.fire.title'), description: t('technologies.items.fire.description'), image: '/service-equipment.jpg', features: [t('technologies.items.fire.features.0'), t('technologies.items.fire.features.1'), t('technologies.items.fire.features.2')] }
  ]

  const caseStudies = [
    { title: t('cases.0.title'), industry: t('cases.0.industry'), description: t('cases.0.description'), image: '/service-wastewater.jpg', results: [t('cases.0.results.0'), t('cases.0.results.1'), t('cases.0.results.2')] },
    { title: t('cases.1.title'), industry: t('cases.1.industry'), description: t('cases.1.description'), image: '/service-ro.jpg', results: [t('cases.1.results.0'), t('cases.1.results.1'), t('cases.1.results.2')] },
    { title: t('cases.2.title'), industry: t('cases.2.industry'), description: t('cases.2.description'), image: '/service-equipment.jpg', results: [t('cases.2.results.0'), t('cases.2.results.1'), t('cases.2.results.2')] }
  ]

  const supportServices = [
    { icon: Clock, title: t('support.items.0.title'), description: t('support.items.0.description'), image: '/service-operation.jpg' },
    { icon: Shield, title: t('support.items.1.title'), description: t('support.items.1.description'), image: '/service-consulting.jpg' },
    { icon: Users, title: t('support.items.2.title'), description: t('support.items.2.description'), image: '/service-operation.jpg' }
  ]

  const faqItems = [
    { question: t('faq.items.0.q'), answer: t('faq.items.0.a') },
    { question: t('faq.items.1.q'), answer: t('faq.items.1.a') },
    { question: t('faq.items.2.q'), answer: t('faq.items.2.a') }
  ]

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{t('header.title')}</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('header.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('catalog.title')}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <Card key={service.title} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 bg-white overflow-hidden rounded-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                  <div className="relative h-56 lg:min-h-full overflow-hidden">
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" priority={index < 2} loading={index < 2 ? 'eager' : 'lazy'} />
                  </div>
                  <div className="p-6 flex h-full flex-col">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#007a3f' }}>
                          <service.icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4" style={{ color: '#007a3f' }} />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-auto" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                      <Link href={`/${locale}/lien-he`} className="flex items-center justify-center gap-2 focus:outline-none focus:ring-0">
                        <span>{t('catalog.learnMore')}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The rest of the original sections preserved */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('sustainability.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('sustainability.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('process.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('process.subtitle')}</p>
          </div>
          <div className="space-y-16">
            {projectProcess.map((process, index) => (
              <div key={process.step} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={process.image} alt={process.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw" className="object-cover" />
                    <div className="absolute top-6 left-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                        <span className="text-2xl font-bold" style={{ color: '#cc0000' }}>{process.step}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#007a3f' }}></div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{t('process.stepLabel', {step: process.step})}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 leading-tight">{process.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{process.description}</p>
                    <div className="pt-4">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">{t('process.badge')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('technologies.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('technologies.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <Card key={tech.title} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white overflow-hidden">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image src={tech.image} alt={tech.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">{tech.title}</CardTitle>
                  <CardDescription className="text-base">{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tech.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" style={{ color: '#007a3f' }} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('cases.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('cases.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.title} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image src={study.image} alt={study.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-900">{study.industry}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: '#1844a7' }}>{study.title}</CardTitle>
                  <CardDescription className="text-base">{study.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">{t('cases.resultsTitle')}</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4" style={{ color: '#007a3f' }} />
                          <span className="text-sm text-gray-600">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('support.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('support.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {supportServices.map((service) => (
              <Card key={service.title} className="h-full text-center hover:shadow-lg transition-shadow border-0 bg-white overflow-hidden">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 mx-auto">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl" style={{ color: '#1844a7' }}>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('faq.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('faq.subtitle')}</p>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg" style={{ color: '#1844a7' }}>{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{item.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('cta.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('cta.subtitle')}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('cta.primary')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/du-an`} className="focus:outline-none focus:ring-0">{t('cta.secondary')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




