"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlowingEffectProps {
  className?: string
  children?: React.ReactNode
  color?: string
  intensity?: number
}

export function GlowingEffect({ 
  className, 
  children,
  color = "rgba(59, 130, 246, 0.5)",
  intensity = 0.5
}: GlowingEffectProps) {
  return (
    <div className={cn("relative", className)}>
      <div 
        className="absolute inset-0 rounded-lg blur-xl opacity-50"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${intensity * 20}px)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
