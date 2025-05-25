"use client"

import { useEffect, useState } from 'react'

interface UseScrollToBottomOptions {
  threshold?: number // Porcentagem para considerar "chegou ao final"
  offset?: number // Pixels de offset do final
}

interface UseScrollToBottomReturn {
  hasReachedBottom: boolean
  scrollProgress: number
  isNearBottom: boolean
}

export function useScrollToBottom(
  options: UseScrollToBottomOptions = {}
): UseScrollToBottomReturn {
  const { threshold = 95, offset = 100 } = options
  
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isNearBottom, setIsNearBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight
          const windowHeight = window.innerHeight
          const scrollableHeight = docHeight - windowHeight
          
          if (scrollableHeight <= 0) {
            setScrollProgress(100)
            setHasReachedBottom(true)
            setIsNearBottom(true)
            ticking = false
            return
          }

          const progress = Math.min((scrollTop / scrollableHeight) * 100, 100)
          
          setScrollProgress(progress)
          setIsNearBottom(progress >= threshold)
          
          // Considera que chegou ao final se:
          // 1. Progresso >= 100% OU
          // 2. Está a menos de 'offset' pixels do final
          const distanceFromBottom = docHeight - (scrollTop + windowHeight)
          const reachedBottom = progress >= 100 || distanceFromBottom <= offset
          
          if (reachedBottom && !hasReachedBottom) {
            setHasReachedBottom(true)
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    // Verificar estado inicial
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [threshold, offset, hasReachedBottom])

  return {
    hasReachedBottom,
    scrollProgress,
    isNearBottom
  }
}