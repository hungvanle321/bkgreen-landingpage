"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FocusCardsProps {
  children: React.ReactNode
  className?: string
}

export function FocusCards({ children, className }: FocusCardsProps) {
  const [focusedCard, setFocusedCard] = React.useState<number | null>(null)

  return (
    <div className={cn("grid gap-4", className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            className: cn(
              child.props.className,
              "transition-all duration-300",
              focusedCard === null 
                ? "opacity-100 blur-0" 
                : focusedCard === index 
                  ? "opacity-100 blur-0 scale-105" 
                  : "opacity-60 blur-sm scale-95"
            ),
            onMouseEnter: () => setFocusedCard(index),
            onMouseLeave: () => setFocusedCard(null),
          })
        }
        return child
      })}
    </div>
  )
}
