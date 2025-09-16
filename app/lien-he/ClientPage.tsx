"use client"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Building } from 'lucide-react'
import {useTranslations} from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const t = useTranslations('contactPage')
  const tCommon = useTranslations('common')
  const contactInfo = [
    {
      icon: Phone,
      title: t('info.phoneTitle'),
      value: tCommon('phoneDisplay'),
      description: t('info.phoneDesc')
    },
    {
      icon: Mail,
      title: t('info.emailTitle'),
      value: 'dien.tran@bkgreen.vn',
      description: t('info.emailDesc')
    },
    {
      icon: MapPin,
      title: t('info.addressTitle'),
      value: 'TP. Hồ Chí Minh',
      description: t('info.addressDesc')
    },
    {
      icon: Clock,
      title: t('info.hoursTitle'),
      value: '8:00 - 17:00',
      description: t('info.hoursDesc')
    }
  ]

  const requestTypes = [
    t('form.requestTypes.0'),
    t('form.requestTypes.1'),
    t('form.requestTypes.2'),
    t('form.requestTypes.3'),
    t('form.requestTypes.4')
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t('header.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('header.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <Card key={info.title} className="h-full text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#1844a7' }}>
                    <info.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: '#1844a7' }}>
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900 mb-2">{info.value}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                {t('form.title')}
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.name')}
                    </label>
                    <Input id="name" name="name" type="text" required className="w-full" placeholder={t('form.placeholder.name')} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.email')}
                    </label>
                    <Input id="email" name="email" type="email" required className="w-full" placeholder={t('form.placeholder.email')} />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.company')}
                  </label>
                  <Input id="company" name="company" type="text" className="w-full" placeholder={t('form.placeholder.company')} />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.phone')}
                  </label>
                  <Input id="phone" name="phone" type="tel" className="w-full" placeholder={t('form.placeholder.phone')} />
                </div>

                <div>
                  <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.requestType')}
                  </label>
                  <select id="requestType" name="requestType" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">{t('form.placeholder.requestType')}</option>
                    {requestTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')}
                  </label>
                  <Textarea id="message" name="message" rows={6} required className="w-full" placeholder={t('form.placeholder.message')} />
                </div>

                <Button type="submit" size="lg" className="w-full flex items-center justify-center space-x-2" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                  <Send className="h-5 w-5" />
                  <span>{t('form.submit')}</span>
                </Button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                {t('office.title')}
              </h2>
              <div className="mb-8">
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe title="BK Green Office Map" src="https://www.google.com/maps?q=517B%20L%C3%AA%20Tr%E1%BB%8Dng%20T%E1%BA%A5n%2C%20T%C3%A2y%20Th%E1%BA%A1nh%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh&output=embed" width="100%" height="100%" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="border-0" />
                </div>
                <div className="text-center">
                  <a href="https://maps.app.goo.gl/FhF9VywGEWLKzvRy6" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm font-medium text-blue-600 hover:underline">
                    {t('office.viewMap')}
                  </a>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" style={{ color: '#007a3f' }} />
                    <span>{t('support.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{t('support.hotline')}</p>
                      <p className="text-gray-600">{tCommon('phoneDisplay')}</p>
                      <p className="text-sm text-gray-500">{t('support.hours')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{t('support.email')}</p>
                      <p className="text-gray-600">dien.tran@bkgreen.vn</p>
                      <p className="text-sm text-gray-500">{t('support.sla')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t('faqLink')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6">
              <Button asChild size="lg" className="w-full sm:w-auto" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <a href={`tel:${tCommon('phone')}`} className="focus:outline-none focus:ring-0">{t('cta.call')}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="mailto:dien.tran@bkgreen.vn" className="focus:outline-none focus:ring-0">{t('cta.email')}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


