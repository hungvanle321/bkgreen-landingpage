"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface BackgroundBeamsProps {
  className?: string
  children?: React.ReactNode
}

export function BackgroundBeams({ className, children }: BackgroundBeamsProps) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867", 
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
  ]

  return (
    <div className={cn("relative h-full w-full bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50" />
      <div className="absolute inset-0">
        {paths.map((path, index) => (
          <svg
            key={index}
            className="absolute inset-0 h-full w-full"
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={`gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#007a3f" stopOpacity="0" />
                <stop offset="50%" stopColor="#007a3f" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1844a7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={path}
              stroke={`url(#gradient-${index})`}
              strokeWidth="0.5"
              fill="none"
              className="animate-pulse"
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: "3s"
              }}
            />
          </svg>
        ))}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
