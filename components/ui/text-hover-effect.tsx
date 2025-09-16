"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface TextHoverEffectProps {
  children: React.ReactNode
  className?: string
}

export function TextHoverEffect({ children, className }: TextHoverEffectProps) {
  return (
    <div className={cn("group relative", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-green to-primary-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
      <div className="relative px-4 py-2 bg-white rounded-lg leading-none flex items-center justify-center space-x-2">
        {children}
      </div>
    </div>
  )
}
