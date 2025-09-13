"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HeroHighlightProps {
  children: React.ReactNode
  className?: string
  showGradient?: boolean
}

export function HeroHighlight({ 
  children, 
  className,
  showGradient = true 
}: HeroHighlightProps) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-blue-50 to-green-50" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
