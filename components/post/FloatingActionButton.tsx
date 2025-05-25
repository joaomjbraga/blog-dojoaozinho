'use client'

import { useEffect, useState, useCallback } from 'react'
import { ArrowUp, Copy, X, Plus, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface FloatingActionButtonProps {
  postSlug?: string
  showReadingProgress?: boolean
}

export default function FloatingActionButton({
  postSlug,
  showReadingProgress = true,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  // Handle scroll com debounce via requestAnimationFrame
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = Math.min((scrollTop / docHeight) * 100, 100)

          setShowScrollButton(scrollTop > 200)
          setReadingProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }, [])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setIsOpen(false)
    } catch (error) {
      console.error('Falha ao copiar link:', error)
    }
  }, [])

  const sharePost = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
          url: window.location.href,
        })
      } else {
        await copyLink()
      }
      setIsOpen(false)
    } catch (error) {
      console.error('Falha ao compartilhar:', error)
    }
  }, [copyLink])

  const actions = [
    ...(showScrollButton
      ? [
          {
            icon: <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />,
            label: 'Ir para o topo',
            onClick: scrollToTop,
          },
        ]
      : []),
    {
      icon: <Copy className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: 'Copiar link',
      onClick: copyLink,
    },
    {
      icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: 'Progresso de leitura',
      onClick: () => {
        const progressSection = document.getElementById('reading-progress')
        if (progressSection) {
          progressSection.scrollIntoView({ behavior: 'smooth' })
        }
        setIsOpen(false)
      },
      href: '/#reading-stats',
    },
  ]

  return (
    <>
      {/* Notificação de link copiado */}
      <AnimatePresence>
        {copied && (
          <motion.div
            key="copy-notification"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
            role="alert"
            aria-live="assertive"
            className="
              fixed top-4 sm:top-6 right-4 sm:right-6 z-50
              rounded-lg bg-gradient-to-r from-green-500 to-green-600
              px-3 sm:px-4 py-2 sm:py-2.5
              text-white shadow-lg ring-1 ring-green-400/30
              backdrop-blur-md
              select-none font-medium text-sm sm:text-base
            "
          >
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              Link copiado com sucesso!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de progresso de leitura */}
      {showReadingProgress && readingProgress > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-40 h-1.5 bg-muted"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/70"
            style={{ width: `${readingProgress}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end space-y-2 sm:space-y-3">
        <AnimatePresence>
          {isOpen &&
            actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2, delay: i * 0.08, type: 'spring', stiffness: 120 }}
              >
                {action.href ? (
                  <Link
                    href={action.href}
                    className="
                      flex items-center gap-2
                      px-3 sm:px-4 py-1.5 sm:py-2
                      rounded-full
                      bg-background/90 text-foreground
                      shadow-md hover:shadow-lg
                      hover:bg-background/80
                      active:scale-95
                      dark:bg-gray-800/90 dark:hover:bg-gray-800/80
                      transition-all duration-200
                      select-none
                      whitespace-nowrap
                      text-sm sm:text-base
                      font-medium
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      backdrop-blur-md
                    "
                    title={action.label}
                    aria-label={action.label}
                    onClick={() => setIsOpen(false)}
                  >
                    {action.icon}
                    <span className="hidden sm:inline">{action.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={action.onClick}
                    className="
                      flex items-center gap-2
                      px-3 sm:px-4 py-1.5 sm:py-2
                      rounded-full
                      bg-background/90 text-foreground
                      shadow-md hover:shadow-lg
                      hover:bg-background/80
                      active:scale-95
                      dark:bg-gray-800/90 dark:hover:bg-gray-800/80
                      transition-all duration-200
                      select-none
                      whitespace-nowrap
                      text-sm sm:text-base
                      font-medium
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      backdrop-blur-md
                    "
                    title={action.label}
                    aria-label={action.label}
                  >
                    {action.icon}
                    <span className="hidden sm:inline">{action.label}</span>
                  </button>
                )}
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Botão principal com indicador de progresso */}
        <motion.button
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar menu de ações' : 'Abrir menu de ações'}
          className="
            relative
            p-3 sm:p-3.5
            rounded-full
            bg-gradient-to-r from-primary to-primary/90
            text-primary-foreground
            shadow-lg hover:shadow-xl
            active:scale-95
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2
            select-none
            flex items-center justify-center
            backdrop-blur-md
          "
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Círculo de progresso */}
          {showReadingProgress && readingProgress > 0 && (
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                opacity="0.2"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={`${2 * Math.PI * 46}`}
                strokeDashoffset={`${2 * Math.PI * 46 * (1 - readingProgress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
          )}

          {/* Ícone */}
          <div className="relative z-10">
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </div>
        </motion.button>

        {/* Indicador de progresso em texto (mobile) */}
        {showReadingProgress && readingProgress > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="
              sm:hidden
              bg-primary/90 text-primary-foreground
              px-2 py-1 rounded-full
              text-xs font-medium
              shadow-sm
              backdrop-blur-md
            "
          >
            {Math.round(readingProgress)}%
          </motion.div>
        )}
      </div>
    </>
  )
}