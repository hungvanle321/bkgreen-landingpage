"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SparklesProps {
  className?: string
  count?: number
  size?: number
  duration?: number
  color?: string
}

export function Sparkles({ 
  className, 
  count = 20, 
  size = 4, 
  duration = 3,
  color = "rgba(255, 255, 255, 0.8)"
}: SparklesProps) {
  const sparkles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * duration,
      duration: duration + Math.random() * 2,
    }))
  }, [count, duration])

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            boxShadow: `0 0 ${size * 2}px ${color}`,
          }}
        />
      ))}
    </div>
  )
}
