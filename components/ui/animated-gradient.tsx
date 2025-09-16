"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface AnimatedGradientProps {
  className?: string
  children?: React.ReactNode
  colors?: string[]
  duration?: number
}

export function AnimatedGradient({ 
  className, 
  children,
  colors = [
    "from-blue-50",
    "from-green-50", 
    "from-blue-100",
    "from-green-100"
  ],
  duration = 8
}: AnimatedGradientProps) {
  const [currentColorIndex, setCurrentColorIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length)
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [colors.length, duration])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-1000 ease-in-out",
          `bg-gradient-to-br ${colors[currentColorIndex]} to-white`
        )}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
