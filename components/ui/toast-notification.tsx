"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Trophy, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ToastNotificationProps {
  show: boolean
  type: 'success' | 'celebration' | 'info'
  title: string
  description?: string
  duration?: number
  onClose?: () => void
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  show,
  type,
  title,
  description,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)
    
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  const getToastStyles = () => {
    switch (type) {
      case 'celebration':
        return 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      default:
        return 'bg-background border border-border text-foreground'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'celebration':
        return <Trophy className="w-5 h-5" />
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20 
          }}
          className={`
            fixed top-4 left-1/2 transform -translate-x-1/2 z-50
            max-w-sm w-full mx-4
            rounded-xl shadow-2xl
            px-4 py-3
            ${getToastStyles()}
          `}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center gap-3">
            {getIcon()}
            
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">
                {title}
              </div>
              {description && (
                <div className="text-xs opacity-90 mt-1">
                  {description}
                </div>
              )}
            </div>

            {type === 'celebration' && (
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 0.6,
                  repeat: 2,
                  ease: "easeInOut"
                }}
              >
                <Star className="w-5 h-5" />
              </motion.div>
            )}

            <button
              onClick={() => {
                setIsVisible(false)
                onClose?.()
              }}
              className="ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Confetes para celebração */}
          {type === 'celebration' && (
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 360],
                    y: [0, -15, 15],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}