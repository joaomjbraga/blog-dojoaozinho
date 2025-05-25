'use client'

import { useEffect, useState, useCallback } from 'react'
import { ArrowUp, Copy, X, Plus, BookOpen, Trophy, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useReadPosts } from '@/hooks/useReadPosts'

interface FloatingActionButtonProps {
  postSlug?: string
  showReadingProgress?: boolean
}

// Componente de animação de celebração
const CelebrationAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: `hsl(${Math.random() * 360}, 70%, 60%)`,
          left: '50%',
          top: '50%',
        }}
        initial={{ scale: 0, x: 0, y: 0 }}
        animate={{
          scale: [0, 1, 0],
          x: [0, (Math.random() - 0.5) * 100],
          y: [0, (Math.random() - 0.5) * 100],
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.1,
          ease: "easeOut"
        }}
      />
    ))}
  </div>
)

export default function FloatingActionButton({
  postSlug,
  showReadingProgress = true,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false)

  // Hook para gerenciar posts lidos
  const { isRead, markAsRead } = useReadPosts()
  const postIsRead = postSlug ? isRead(postSlug) : false

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

  // Marcar como lido automaticamente quando chegar a 100%
  useEffect(() => {
    if (
      postSlug && 
      readingProgress >= 100 && 
      !postIsRead && 
      !hasMarkedAsRead
    ) {
      // Pequeno delay para garantir que o usuário realmente chegou ao final
      const timer = setTimeout(() => {
        markAsRead(postSlug)
        setHasMarkedAsRead(true)
        setShowCelebration(true)
        
        // Parar a celebração após 3 segundos
        setTimeout(() => {
          setShowCelebration(false)
        }, 3000)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [readingProgress, postSlug, postIsRead, hasMarkedAsRead, markAsRead])

  // Reset hasMarkedAsRead quando o post muda
  useEffect(() => {
    setHasMarkedAsRead(false)
  }, [postSlug])

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

      {/* Notificação de post marcado como lido */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            key="read-notification"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
            role="alert"
            aria-live="assertive"
            className="
              fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50
              rounded-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400
              px-4 sm:px-6 py-3 sm:py-4
              text-white shadow-2xl
              backdrop-blur-md
              select-none font-medium text-sm sm:text-base
              max-w-sm w-full mx-4
            "
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 0.6,
                  repeat: 3,
                  ease: "easeInOut"
                }}
              >
                <Trophy className="w-6 h-6" />
              </motion.div>
              
              <div className="flex-1">
                <div className="font-bold">🎉 Parabéns!</div>
                <div className="text-sm opacity-90">Post marcado como lido!</div>
              </div>

              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 0.6,
                  repeat: 3,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                <Star className="w-6 h-6" />
              </motion.div>
            </div>

            {/* Confetes */}
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 360],
                    y: [0, -20, 20],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
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
            className={`h-full transition-all duration-300 ${
              readingProgress >= 100 || postIsRead
                ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400'
                : 'bg-gradient-to-r from-primary to-primary/70'
            }`}
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
          aria-label={isOpen ? "Fechar menu de ações" : "Abrir menu de ações"}
          className={`
            relative
            p-3 sm:p-3.5
            rounded-full
            shadow-lg hover:shadow-xl
            active:scale-95
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2
            select-none
            flex items-center justify-center
            backdrop-blur-md
            ${readingProgress >= 100 || postIsRead
              ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white'
              : 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground'
            }
          `}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animação de celebração no botão */}
          {showCelebration && <CelebrationAnimation />}

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
            {readingProgress >= 100 || postIsRead ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            ) : isOpen ? (
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
            className={`
              sm:hidden
              px-2 py-1 rounded-full
              text-xs font-medium
              shadow-sm
              backdrop-blur-md
              ${readingProgress >= 100 || postIsRead
                ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white'
                : 'bg-primary/90 text-primary-foreground'
              }
            `}
          >
            {readingProgress >= 100 || postIsRead ? (
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>100%</span>
              </div>
            ) : (
              `${Math.round(readingProgress)}%`
            )}
          </motion.div>
        )}

        {/* Mensagem de status para desktop */}
        {showReadingProgress && readingProgress >= 95 && !postIsRead && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="
              hidden sm:block
              bg-background/90 text-foreground
              px-3 py-2 rounded-lg
              text-xs font-medium
              shadow-md border border-border/50
              backdrop-blur-md
              whitespace-nowrap
              mr-2
            "
          >
            {readingProgress >= 100 ? (
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Trophy className="w-3 h-3" />
                Post concluído!
              </div>
            ) : (
              `Quase lá! ${Math.round(readingProgress)}%`
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}