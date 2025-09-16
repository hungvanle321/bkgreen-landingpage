'use client'

import { Phone, Mail, MapPin, Send } from 'lucide-react'
import {useTranslations} from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactSection() {
  const t = useTranslations('contact')
  const tCommon = useTranslations('common')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Contact Form */}
          <div data-aos="fade-right" data-aos-delay="300">
            <Card>
              <CardHeader>
                <CardTitle>{t('form.title')}</CardTitle>
                <CardDescription>
                  {t('form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder={t('form.name')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder={t('form.email')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder={t('form.phone')}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder={t('form.message')}
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    {t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6" data-aos="fade-left" data-aos-delay="400">
            <Card>
              <CardHeader>
                <CardTitle>{t('info.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-red" />
                  <div>
                    <p className="font-medium">{t('info.phone')}</p>
                    <p className="text-gray-600">{tCommon('phoneDisplay')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-red" />
                  <div>
                    <p className="font-medium">{t('info.email')}</p>
                    <p className="text-gray-600">dien.tran@bkgreen.vn</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-red mt-0.5" />
                  <div>
                    <p className="font-medium">{t('info.address')}</p>
                    <p className="text-gray-600">
                      {t('location.address')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="600">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('location.title')}</h3>
            <p className="text-gray-600">{t('location.address')}</p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.123456789!2d106.123456789!3d10.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDA3JzI0LjQiTiAxMDbCsDA3JzI0LjQiRQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BK Green Office Location"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <a 
              href="https://maps.app.goo.gl/FhF9VywGEWLKzvRy6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-red text-white rounded-lg hover:bg-primary-red/90 transition-colors"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {t('location.viewMap')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}