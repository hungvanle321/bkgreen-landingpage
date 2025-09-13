"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WobbleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  containerClassName?: string
  shouldTilt?: boolean
}

export function WobbleCard({ 
  children, 
  className, 
  containerClassName,
  shouldTilt = true,
  ...props 
}: WobbleCardProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div
      className={cn("group perspective-1000", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "relative transition-all duration-300 ease-out",
          "group-hover:scale-105",
          className
        )}
        style={{
          transform: shouldTilt && isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 100) / 20}deg) rotateY(${(mousePosition.x - 100) / 20}deg)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
