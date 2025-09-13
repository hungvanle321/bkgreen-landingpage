"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MovingBorderProps {
  children: React.ReactNode
  duration?: number
  rx?: number
  ry?: number
  className?: string
}

export function MovingBorder({ 
  children, 
  duration = 2000, 
  rx, 
  ry, 
  className 
}: MovingBorderProps) {
  return (
    <div
      className={cn(
        "relative flex h-20 w-40 items-center justify-center overflow-hidden rounded-lg border bg-background p-[1px]",
        className
      )}
      style={{
        background: `linear-gradient(-45deg, #007a3f, #1844a7, #007a3f, #1844a7)`,
        backgroundSize: "400% 400%",
        animation: `gradient ${duration}ms ease infinite`,
      }}
    >
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, #007a3f 0deg, #1844a7 60deg, #007a3f 120deg, #1844a7 180deg, #007a3f 240deg, #1844a7 300deg, #007a3f 360deg)`,
          animation: `spin ${duration}ms linear infinite`,
        }}
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center rounded-lg bg-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}
