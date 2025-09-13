"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isFlipped?: boolean
  onFlip?: () => void
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({ className, children, isFlipped = false, onFlip, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group h-full w-full perspective-1000 cursor-pointer",
          className
        )}
        onClick={onFlip}
        {...props}
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-700 transform-style-preserve-3d",
            isFlipped && "rotate-y-180"
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
FlipCard.displayName = "FlipCard"

export { FlipCard }
