"use client"

import { 
  Star, Users, Award, Shield, Zap, Settings, TrendingUp, 
  Heart, Eye, GraduationCap, Briefcase, Globe, Leaf, 
  Droplets, Target, Lightbulb, Building, CheckCircle 
} from "lucide-react"
import Image from "next/image"
import {useTranslations} from 'next-intl'
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FlipCard } from "@/components/ui/flip-card"




interface InteractiveItem {
  id: string
  title: string
  subtitle?: string
  description: string
  image: string
  icon?: string
  details?: {
    title: string
    content: string[]
  }
}

interface InteractiveSectionProps {
  title: string
  subtitle?: string
  badge?: {
    text: string
    icon: string
  }
  items: InteractiveItem[]
  className?: string
}

// Icon mapping function
const getIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Star, Users, Award, Shield, Zap, Settings, TrendingUp, 
    Heart, Eye, GraduationCap, Briefcase, Globe, Leaf, 
    Droplets, Target, Lightbulb, Building, CheckCircle
  }
  return iconMap[iconName] || Star
}

export function InteractiveSection({
  title,
  subtitle,
  badge,
  items,
  className
}: InteractiveSectionProps) {
  const [flippedCards, setFlippedCards] = React.useState<Set<string>>(new Set())
  const t = useTranslations('aboutPage')

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          {badge && (
            <Badge variant="outline" className="mb-4">
              {React.createElement(getIcon(badge.icon), { className: "mr-2 h-4 w-4" })}
              {badge.text}
            </Badge>
          )}
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FlipCard
              key={item.id}
              isFlipped={flippedCards.has(item.id)}
              onFlip={() => toggleFlip(item.id)}
              className="h-96"
            >
              {/* Front */}
              <div className="absolute inset-0 w-full h-full backface-hidden">
                <Card className="h-full border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                    {item.icon && (
                      <div className="absolute top-4 right-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          {React.createElement(getIcon(item.icon), { className: "h-6 w-6 text-white" })}
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <CardTitle className="text-xl font-bold mb-2">
                        {item.title}
                      </CardTitle>
                      {item.subtitle && (
                        <CardDescription className="text-white/90">
                          {item.subtitle}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="text-sm text-blue-600 font-medium">
                        👆 {t('interactive.hint.front')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Back */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                <Card className="h-full border-0 bg-gradient-to-br from-blue-50 to-green-50 hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {item.title}
                    </CardTitle>
                    {item.subtitle && (
                      <CardDescription className="text-blue-600 font-semibold">
                        {item.subtitle}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    {item.details && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          {item.details.title}
                        </h4>
                        <ul className="space-y-2">
                          {item.details.content.map((detail, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-6 text-center">
                      <div className="text-xs text-gray-500">
                        👆 {t('interactive.hint.back')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FlipCard>
          ))}
        </div>
      </div>
    </section>
  )
}
