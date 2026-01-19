"use client"

import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface FloatingActionButtonsProps {
  phone?: string
  email?: string
  zaloLink?: string
}

export default function FloatingActionButtons({
  phone = '+84-931-252-511',
  email = 'dien.tran@bkgreen.vn',
  zaloLink = 'https://zalo.me/84931252511'
}: FloatingActionButtonsProps) {
  const handlePhoneClick = () => {
    window.location.href = `tel:${phone.replace(/[-\s]/g, '')}`
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`
  }

  const handleZaloClick = () => {
    window.open(zaloLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-1px) rotate(-1deg); }
          20%, 40%, 60%, 80% { transform: translateX(1px) rotate(1deg); }
        }
        .shake-on-hover:hover {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
      <TooltipProvider>
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
          {/* Phone Button */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                onClick={handlePhoneClick}
                size="icon"
                className="shake-on-hover h-10 w-10 rounded-full bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all group"
              >
                <Phone className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gray-900 text-white border-gray-800">
              <p>Gọi ngay: {phone}</p>
            </TooltipContent>
          </Tooltip>

          {/* Zalo Button */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                onClick={handleZaloClick}
                size="icon"
                className="shake-on-hover h-9 w-9 rounded-full bg-transparent hover:bg-transparent border-0 transition-all group"
              >
                <Image 
                  src="/Logo-Zalo.svg" 
                  alt="Zalo" 
                  width={24} 
                  height={24} 
                  className="group-hover:scale-105 w-full h-full transition-transform"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gray-900 text-white border-gray-800">
              <p>Chat qua Zalo</p>
            </TooltipContent>
          </Tooltip>

          {/* Email Button */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                onClick={handleEmailClick}
                size="icon"
                className="shake-on-hover h-10 w-10 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all group"
              >
                <Mail className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gray-900 text-white border-gray-800">
              <p>Gửi email: {email}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </>
  )
}
