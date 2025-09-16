"use client"

import { Globe, Leaf, Droplets, Target, Lightbulb, Award, Users, Building, CheckCircle, Shield, Zap, Settings, Star, TrendingUp, Heart, Eye, GraduationCap, Briefcase } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'

import { InteractiveSection } from '@/components/InteractiveSection'
import { SimpleFlipSection } from '@/components/SimpleFlipSection'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FocusCards } from '@/components/ui/focus-cards'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { WobbleCard } from '@/components/ui/wobble-card'

export default function AboutPage() {
  const locale = useLocale()
  const t = useTranslations('aboutPage')
  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Award': Award,
      'Users': Users,
      'Building': Building,
      'Shield': Shield,
      'Zap': Zap,
      'Settings': Settings,
      'Star': Star,
      'TrendingUp': TrendingUp,
      'Heart': Heart,
      'Eye': Eye,
      'GraduationCap': GraduationCap,
      'Briefcase': Briefcase,
      'CheckCircle': CheckCircle,
      'Target': Target,
      'Lightbulb': Lightbulb,
      'Globe': Globe,
      'Leaf': Leaf,
      'Droplets': Droplets
    }
    return iconMap[iconName] || Star
  }
  const stats = [
    {
      icon: "Users",
      title: t('strengths.stats.0.title'),
      description: t('strengths.stats.0.description')
    },
    {
      icon: "Award",
      title: t('strengths.stats.1.title'),
      description: t('strengths.stats.1.description')
    },
    {
      icon: "Leaf",
      title: t('strengths.stats.2.title'),
      description: t('strengths.stats.2.description')
    }
  ]

  const leadership = [
    {
      id: 'tran-dien',
      title: t('leadership.members.0.name'),
      subtitle: t('leadership.members.0.role'),
      description: t('leadership.members.0.description'),
      image: '/director.jpg',
      icon: Users,
      details: {
        title: t('leadership.members.0.detailsTitle'),
        content: [
          t('leadership.members.0.details.0'),
          t('leadership.members.0.details.1'),
          t('leadership.members.0.details.2'),
          t('leadership.members.0.details.3'),
          t('leadership.members.0.details.4')
        ]
      }
    }
  ]


  const certifications = [
    {
      title: t('certifications.items.0.title'),
      description: t('certifications.items.0.description'),
      image: '/service-consulting.jpg'
    },
    {
      title: t('certifications.items.1.title'),
      description: t('certifications.items.1.description'),
      image: '/service-operation.jpg'
    },
    {
      title: t('certifications.items.2.title'),
      description: t('certifications.items.2.description'),
      image: '/service-equipment.jpg'
    }
  ]

  const facilities = [
    {
      title: t('facilities.items.0.title'),
      description: t('facilities.items.0.description'),
      image: '/about-company.jpg'
    },
    {
      title: t('facilities.items.1.title'),
      description: t('facilities.items.1.description'),
      image: '/service-equipment.jpg'
    },
    {
      title: t('facilities.items.2.title'),
      description: t('facilities.items.2.description'),
      image: '/service-ro.jpg'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* The rest of the JSX is identical to the previous about page */}
      {/* Company Overview */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
                  <Heart className="mr-2 h-3 w-3" />
                  {t('overview.badge')}
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  BK Green
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-8 text-gray-600">{t('overview.p1')}</p>
                <p className="text-lg leading-8 text-gray-600">{t('overview.p2')}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <WobbleCard>
                  <GlowingEffect color="rgba(0, 122, 63, 0.3)">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-6 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">{t('overview.cards.growth.title')}</h3>
                        <p className="text-sm text-gray-600">{t('overview.cards.growth.desc')}</p>
                      </CardContent>
                    </Card>
                  </GlowingEffect>
                </WobbleCard>
                <WobbleCard>
                  <GlowingEffect color="rgba(24, 68, 167, 0.3)">
                    <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="p-6 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                          <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">{t('overview.cards.environment.title')}</h3>
                        <p className="text-sm text-gray-600">{t('overview.cards.environment.desc')}</p>
                      </CardContent>
                    </Card>
                  </GlowingEffect>
                </WobbleCard>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-company.jpg"
                  alt={t('overview.imageAlt')}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover"
                  priority={true}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 opacity-20"></div>
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-green-500 to-blue-500 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
              <Star className="mr-2 h-4 w-4" />
              {t('strengths.badge')}
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              {t('strengths.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('strengths.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => {
              const IconComponent = getIcon(stat.icon)
              const backgroundImages = [
                '/service-equipment.jpg',
                '/service-consulting.jpg', 
                '/service-ro.jpg',
                '/service-wastewater.jpg',
                '/service-electrical.jpg',
                '/service-operation.jpg'
              ]
              const bgImage = backgroundImages[index % backgroundImages.length]
              
              return (
                <div
                  key={index}
                  className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={bgImage}
                      alt={stat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/60 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 mt-1">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white leading-tight">
                        {stat.title}
                      </h3>
                    </div>
                    
                    <div className="flex-1 flex items-center">
                      <p className="text-white/90 leading-relaxed text-sm">
                        {stat.description}
                      </p>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#cc0000' }}>
              <Heart className="mr-2 h-3 w-3" />
              {t('commit.badge')}
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t('commit.title')}
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">
              {t('commit.subtitle')}
            </p>
          </div>
          
          {/* Main commitment showcase - Based on BK Green Logo Meaning */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* BK - Kỹ thuật/Công nghệ - Đỏ */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-electrical.jpg"
                  alt="Kỹ Thuật & Công Nghệ"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Red Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-red-500/70 to-red-700/80 group-hover:from-red-600/70 group-hover:via-red-500/60 group-hover:to-red-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('commit.cards.tech.title')}</h3>
                <p className="text-white/90 leading-relaxed">{t('commit.cards.tech.desc')}</p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Green - Môi Trường - Xanh */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-wastewater.jpg"
                  alt="Môi Trường Bền Vững"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Green Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-500/70 to-green-700/80 group-hover:from-green-600/70 group-hover:via-green-500/60 group-hover:to-green-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('commit.cards.env.title')}</h3>
                <p className="text-white/90 leading-relaxed">{t('commit.cards.env.desc')}</p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Nước - Dương/Aqua */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-ro.jpg"
                  alt="Giải Pháp Nước"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Cyan/Blue Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/80 via-blue-500/70 to-blue-700/80 group-hover:from-cyan-600/70 group-hover:via-blue-500/60 group-hover:to-blue-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('commit.cards.water.title')}</h3>
                <p className="text-white/90 leading-relaxed">{t('commit.cards.water.desc')}</p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom highlight bar - Logo Meaning Summary */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-green-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
            <Card className="relative border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{t('commit.legend.tech')}</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{t('commit.legend.env')}</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{t('commit.legend.water')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section with Simple Flip Cards */}
      <SimpleFlipSection
        title={t('coreValues.title')}
        subtitle={t('coreValues.subtitle')}
        items={[
          {
            id: "quality",
            title: t('coreValues.items.quality.title'),
            content: [
              t('coreValues.items.quality.content.0'),
              t('coreValues.items.quality.content.1'),
              t('coreValues.items.quality.content.2')
            ]
          },
          {
            id: "innovation",
            title: t('coreValues.items.innovation.title'),
            content: [
              t('coreValues.items.innovation.content.0'),
              t('coreValues.items.innovation.content.1'),
              t('coreValues.items.innovation.content.2')
            ]
          },
          {
            id: "sustainability",
            title: t('coreValues.items.sustainability.title'),
            content: [
              t('coreValues.items.sustainability.content.0'),
              t('coreValues.items.sustainability.content.1'),
              t('coreValues.items.sustainability.content.2')
            ]
          },
          {
            id: "customer-support",
            title: t('coreValues.items.customerSupport.title'),
            content: [
              t('coreValues.items.customerSupport.content.0'),
              t('coreValues.items.customerSupport.content.1'),
              t('coreValues.items.customerSupport.content.2')
            ]
          }
        ]}
        className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100"
      />


      {/* Partners & Technology with Flip Cards */}
      <InteractiveSection
        title={t('development.title')}
        subtitle={t('development.subtitle')}
        badge={{
          text: t('development.badge'),
          icon: "Globe"
        }}
        items={[
          {
            id: 'tech-foundation',
            title: t('development.items.tech.title'),
            description: t('development.items.tech.description'),
            image: '/service-electrical.jpg',
            icon: "Settings",
            details: {
              title: t('development.items.tech.detailsTitle'),
              content: [
                t('development.items.tech.details.0'),
                t('development.items.tech.details.1'),
                t('development.items.tech.details.2'),
                t('development.items.tech.details.3'),
                t('development.items.tech.details.4')
              ]
            }
          },
          {
            id: 'partnership-building',
            title: t('development.items.partnership.title'),
            description: t('development.items.partnership.description'),
            image: '/service-operation.jpg',
            icon: "Users",
            details: {
              title: t('development.items.partnership.detailsTitle'),
              content: [
                t('development.items.partnership.details.0'),
                t('development.items.partnership.details.1'),
                t('development.items.partnership.details.2'),
                t('development.items.partnership.details.3'),
                t('development.items.partnership.details.4')
              ]
            }
          },
          {
            id: 'innovation-focus',
            title: t('development.items.innovation.title'),
            description: t('development.items.innovation.description'),
            image: '/service-ro.jpg',
            icon: "Zap",
            details: {
              title: t('development.items.innovation.detailsTitle'),
              content: [
                t('development.items.innovation.details.0'),
                t('development.items.innovation.details.1'),
                t('development.items.innovation.details.2'),
                t('development.items.innovation.details.3'),
                t('development.items.innovation.details.4')
              ]
            }
          }
        ]}
        className="py-20 bg-white"
      />

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="mr-2 h-4 w-4" />
              {t('leadership.badge')}
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t('leadership.title')}
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">
              {t('leadership.subtitle')}
            </p>
          </div>
          <FocusCards className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member) => (
              <Card key={member.id} className="group h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm font-medium">{t('leadership.expertLabel')}</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {member.title}
                  </CardTitle>
                  <CardDescription className="text-base font-semibold text-blue-600">
                    {member.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  <div className="mt-4 flex justify-center">
                    <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </FocusCards>
        </div>
      </section>

      {/* Tầm Nhìn, Sứ Mệnh & Giá Trị */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
              <Heart className="mr-2 h-3 w-3" />
              {t('guidance.badge')}
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{t('guidance.title')}</h2>
            <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">{t('guidance.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tầm Nhìn - Xanh lá */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/about-company.jpg"
                  alt={t('guidance.cards.vision.title')}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Green Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-500/70 to-green-700/80 group-hover:from-green-600/70 group-hover:via-green-500/60 group-hover:to-green-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('guidance.cards.vision.title')}</h3>
                <p className="text-white/90 leading-relaxed text-sm">{t('guidance.cards.vision.desc')}</p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Sứ Mệnh - Đỏ */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-consulting.jpg"
                  alt={t('guidance.cards.mission.title')}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Red Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-red-500/70 to-red-700/80 group-hover:from-red-600/70 group-hover:via-red-500/60 group-hover:to-red-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('guidance.cards.mission.title')}</h3>
                <p className="text-white/90 leading-relaxed text-sm">{t('guidance.cards.mission.desc')}</p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Giá Trị - Xanh dương */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-operation.jpg"
                  alt={t('guidance.cards.values.title')}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-500/70 to-blue-700/80 group-hover:from-blue-600/70 group-hover:via-blue-500/60 group-hover:to-blue-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('guidance.cards.values.title')}</h3>
                <p className="text-white/90 leading-relaxed text-sm">{t('guidance.cards.values.desc')}</p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div className="relative mt-12">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-red-600/10 to-blue-600/10 rounded-2xl blur-xl"></div>
            <Card className="relative border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{t('guidance.legend.vision')}</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{t('guidance.legend.mission')}</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{t('guidance.legend.values')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Shield className="mr-2 h-4 w-4" />
              {t('certifications.badge')}
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{t('certifications.title')}</h2>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">{t('certifications.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.title} className="group h-full border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <CardTitle className="text-lg font-bold mb-2">
                      {cert.title}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      {cert.description}
                    </CardDescription>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
              <Building className="mr-2 h-3 w-3" />
              {t('facilities.badge')}
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{t('facilities.title')}</h2>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">{t('facilities.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <Card key={facility.title} className="group h-full border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <CardTitle className="text-xl font-bold mb-2">
                      {facility.title}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      {facility.description}
                    </CardDescription>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">
                  {t('cta.primary')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/dich-vu`} className="focus:outline-none focus:ring-0">
                  {t('cta.secondary')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


