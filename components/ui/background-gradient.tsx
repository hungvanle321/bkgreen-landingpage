"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface BackgroundGradientProps {
  className?: string
  children?: React.ReactNode
  variant?: "default" | "aurora" | "dots" | "waves"
}

export function BackgroundGradient({ 
  className, 
  children,
  variant = "default"
}: BackgroundGradientProps) {
  const getBackgroundStyle = () => {
    switch (variant) {
      case "aurora":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-10 opacity-20">
              <div className="absolute top-0 -z-10 h-full w-full rotate-180 transform bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 blur-3xl" />
              <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-r from-blue-400/20 via-green-400/20 to-blue-400/20 blur-3xl" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-blue-50/80" />
          </div>
        )
      case "dots":
        return (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,122,63,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
          </div>
        )
      case "waves":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <path
                d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,1000 L0,1000 Z"
                fill="rgba(0,122,63,0.1)"
                className="animate-pulse"
              />
              <path
                d="M0,200 C150,100 350,300 500,200 C650,100 850,300 1000,200 L1000,1000 L0,1000 Z"
                fill="rgba(24,68,167,0.1)"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>
        )
      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-50" />
        )
    }
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      {getBackgroundStyle()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
