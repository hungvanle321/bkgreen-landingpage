"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TextGenerateEffectProps {
  words: string
  className?: string
  duration?: number
}

export function TextGenerateEffect({ 
  words, 
  className,
  duration = 0.5
}: TextGenerateEffectProps) {
  const [displayedText, setDisplayedText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + words[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, duration * 1000)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, words, duration])

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
