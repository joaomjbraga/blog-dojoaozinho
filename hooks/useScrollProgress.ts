"use client"

import { useEffect, useState } from 'react'

interface UseScrollProgressReturn {
  scrollProgress: number
  isAtBottom: boolean
  isNearBottom: boolean
}

export function useScrollProgress(threshold: number = 95): UseScrollProgressReturn {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = Math.min((scrollTop / docHeight) * 100, 100)
          
          setScrollProgress(progress)
          setIsAtBottom(progress >= 99)
          setIsNearBottom(progress >= threshold)
          
          ticking = false
        })
        ticking = true
      }
    }

    // Verificar progresso inicial
    updateScrollProgress()

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [threshold])

  return {
    scrollProgress,
    isAtBottom,
    isNearBottom
  }
}