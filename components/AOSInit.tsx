'use client'

import AOS from 'aos'
import { useEffect } from 'react'
import 'aos/dist/aos.css'

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    })
  }, [])

  return null
}
