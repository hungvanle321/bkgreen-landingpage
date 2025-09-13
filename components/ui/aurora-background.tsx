"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps {
  className?: string
  children?: React.ReactNode
  showRadialGradient?: boolean
}

export function AuroraBackground({ 
  className, 
  children,
  showRadialGradient = true
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative flex flex-col h-full items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 text-gray-900 transition-bg", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-0 -z-10 h-full w-full rotate-180 transform bg-gradient-to-r from-blue-400/10 via-green-400/10 to-blue-400/10 blur-3xl" />
          <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-r from-green-400/10 via-blue-400/10 to-green-400/10 blur-3xl" />
          <div className="absolute top-0 -z-10 h-full w-full rotate-90 transform bg-gradient-to-r from-blue-400/10 via-green-400/10 to-blue-400/10 blur-3xl" />
        </div>
        {showRadialGradient && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-green-50/20 to-blue-50/20" />
        )}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
