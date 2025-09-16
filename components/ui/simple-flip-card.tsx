"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Sparkles } from "./sparkles"

export interface SimpleFlipCardProps {
  title: string
  content: string[]
  className?: string
}

const SimpleFlipCard = React.forwardRef<HTMLDivElement, SimpleFlipCardProps>(
  ({ className, title, content, ...props }, ref) => {
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
        ref={ref}
        className={cn(
          "group h-64 w-64 perspective-1000 cursor-pointer relative",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Glare Effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-lg opacity-30 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4) 0%, transparent 50%)`,
            }}
          />
        )}
        
        {/* Sparkles Effect */}
        {isHovered && (
          <Sparkles 
            className="z-5" 
            count={15} 
            size={3} 
            duration={2}
            color="rgba(255, 255, 255, 0.6)"
          />
        )}
        
        <div
          className={cn(
            "relative h-full w-full transition-all duration-700 transform-style-preserve-3d",
            "group-hover:scale-105"
          )}
          style={{
            transform: isHovered 
              ? `perspective(1000px) rotateX(${(mousePosition.y - 128) / 20}deg) rotateY(${(mousePosition.x - 128) / 20 + 180}deg)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
          }}
        >
          {/* Front - Title only */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="h-full w-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center px-4">
                <h3 className="text-white font-semibold text-base leading-tight">
                  {title}
                </h3>
              </div>
            </div>
          </div>
          
          {/* Back - Content */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="h-full w-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center px-4">
                <div className="text-white text-sm leading-relaxed">
                  {content.map((item, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
SimpleFlipCard.displayName = "SimpleFlipCard"

export { SimpleFlipCard }
