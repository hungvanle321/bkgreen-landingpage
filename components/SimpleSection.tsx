"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { 
  Star, Users, Award, Shield, Zap, Settings, TrendingUp, 
  Heart, Eye, GraduationCap, Briefcase, Globe, Leaf, 
  Droplets, Target, Lightbulb, Building, CheckCircle 
} from "lucide-react"

interface SimpleItem {
  id: string
  title: string
  subtitle?: string
  description: string
  image: string
  icon?: string
}

interface SimpleSectionProps {
  title: string
  subtitle?: string
  badge?: {
    text: string
    icon: string
  }
  items: SimpleItem[]
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

export function SimpleSection({
  title,
  subtitle,
  badge,
  items,
  className
}: SimpleSectionProps) {
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
            <Card key={item.id} className="h-full border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
