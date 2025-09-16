"use client"

import { Target } from "lucide-react"
import {useTranslations} from 'next-intl'
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { SimpleFlipCard } from "@/components/ui/simple-flip-card"


interface SimpleFlipItem {
  id: string
  title: string
  content: string[]
}

interface SimpleFlipSectionProps {
  title: string
  subtitle?: string
  items: SimpleFlipItem[]
  className?: string
}

export function SimpleFlipSection({
  title,
  subtitle,
  items,
  className
}: SimpleFlipSectionProps) {
  const t = useTranslations('aboutPage')
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
            <Target className="mr-2 h-4 w-4" />
            {t('coreValues.badge')}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Grid Layout */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          {items.map((item) => (
            <SimpleFlipCard
              key={item.id}
              title={item.title}
              content={item.content}
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
