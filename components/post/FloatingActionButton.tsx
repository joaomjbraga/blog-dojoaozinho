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

// Componente de animação de celebração centralizado na tela
const CelebrationAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center"
  >
    {/* Confetes grandes para telas grandes */}
    <div className="hidden lg:block absolute inset-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0.5, 0],
            x: [0, (Math.random() - 0.5) * 800],
            y: [0, (Math.random() - 0.5) * 600],
            rotate: [0, Math.random() * 720],
          }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>

    {/* Confetes médios para tablets */}
    <div className="hidden md:block lg:hidden absolute inset-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`medium-${i}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0.5, 0],
            x: [0, (Math.random() - 0.5) * 600],
            y: [0, (Math.random() - 0.5) * 400],
            rotate: [0, Math.random() * 720],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>

    {/* Confetes pequenos para mobile */}
    <div className="block md:hidden absolute inset-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0.5, 0],
            x: [0, (Math.random() - 0.5) * 300],
            y: [0, (Math.random() - 0.5) * 400],
            rotate: [0, Math.random() * 720],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>

    {/* Estrelas centrais */}
    <div className="absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.5, 1, 0],
            rotate: [0, 180, 360],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        >
          <Star 
            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-400" 
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>

    {/* Troféu central */}
    <motion.div
      className="relative z-10"
      initial={{ scale: 0, y: 50 }}
      animate={{ 
        scale: [0, 1.2, 1],
        y: [50, -10, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 1,
        ease: "easeOut"
      }}
    >
      <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-yellow-500" />
    </motion.div>
  </motion.div>
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
        
        // Parar a celebração após 4 segundos
        setTimeout(() => {
          setShowCelebration(false)
        }, 4000)
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
            icon: <ArrowUp className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />,
            label: 'Ir para o topo',
            onClick: scrollToTop,
          },
        ]
      : []),
    {
      icon: <Copy className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />,
      label: 'Copiar link',
      onClick: copyLink,
    },
    {
      icon: <BookOpen className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />,
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
      {/* Animação de celebração centralizada */}
      <AnimatePresence>
        {showCelebration && <CelebrationAnimation />}
      </AnimatePresence>

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
              fixed top-2 xs:top-3 sm:top-4 md:top-6 
              right-2 xs:right-3 sm:right-4 md:right-6 z-50
              rounded-md xs:rounded-lg bg-gradient-to-r from-green-500 to-green-600
              px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5
              text-white shadow-lg ring-1 ring-green-400/30
              backdrop-blur-md
              select-none font-medium text-xs xs:text-sm sm:text-base
              max-w-[calc(100vw-1rem)] xs:max-w-xs sm:max-w-sm
            "
          >
            <div className="flex items-center gap-1 xs:gap-2">
              <Copy className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">Link copiado!</span>
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
              fixed top-2 xs:top-3 sm:top-4 md:top-6 
              left-1/2 transform -translate-x-1/2 z-[60]
              rounded-md xs:rounded-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400
              px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4
              text-white shadow-2xl
              backdrop-blur-md
              select-none font-medium text-xs xs:text-sm sm:text-base
              max-w-[calc(100vw-1rem)] xs:max-w-xs sm:max-w-sm
              mx-2 xs:mx-4
            "
          >
            <div className="flex items-center gap-2 xs:gap-3">
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
                <Trophy className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs xs:text-sm">🎉 Parabéns!</div>
                <div className="text-xs opacity-90 truncate">Post marcado como lido!</div>
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
          className="fixed top-0 left-0 right-0 z-40 h-1 xs:h-1.5 sm:h-2 bg-muted"
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
      <div className="fixed bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 right-2 xs:right-3 sm:right-4 md:right-6 z-50 flex flex-col items-end space-y-1 xs:space-y-2 sm:space-y-3">
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
                      flex items-center gap-1 xs:gap-2
                      px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2
                      rounded-full
                      bg-background/90 text-foreground
                      shadow-md hover:shadow-lg
                      hover:bg-background/80
                      active:scale-95
                      dark:bg-gray-800/90 dark:hover:bg-gray-800/80
                      transition-all duration-200
                      select-none
                      whitespace-nowrap
                      text-xs xs:text-sm sm:text-base
                      font-medium
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      backdrop-blur-md
                      max-w-[calc(100vw-4rem)] xs:max-w-none
                    "
                    title={action.label}
                    aria-label={action.label}
                    onClick={() => setIsOpen(false)}
                  >
                    {action.icon}
                    <span className="hidden xs:inline truncate">{action.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={action.onClick}
                    className="
                      flex items-center gap-1 xs:gap-2
                      px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2
                      rounded-full
                      bg-background/90 text-foreground
                      shadow-md hover:shadow-lg
                      hover:bg-background/80
                      active:scale-95
                      dark:bg-gray-800/90 dark:hover:bg-gray-800/80
                      transition-all duration-200
                      select-none
                      whitespace-nowrap
                      text-xs xs:text-sm sm:text-base
                      font-medium
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      backdrop-blur-md
                      max-w-[calc(100vw-4rem)] xs:max-w-none
                    "
                    title={action.label}
                    aria-label={action.label}
                  >
                    {action.icon}
                    <span className="hidden xs:inline truncate">{action.label}</span>
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
            p-2 xs:p-2.5 sm:p-3 md:p-3.5
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
                <Trophy className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </motion.div>
            ) : isOpen ? (
              <X className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
            ) : (
              <Plus className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
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
              px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full
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
              <div className="flex items-center gap-0.5 xs:gap-1">
                <Trophy className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                <span className="text-xs">100%</span>
              </div>
            ) : (
              <span className="text-xs">{Math.round(readingProgress)}%</span>
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
              px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg
              text-xs sm:text-sm font-medium
              shadow-md border border-border/50
              backdrop-blur-md
              whitespace-nowrap
              mr-1 sm:mr-2
              max-w-[200px] lg:max-w-none
            "
          >
            {readingProgress >= 100 ? (
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Trophy className="w-3 h-3" />
                <span className="truncate">Post concluído!</span>
              </div>
            ) : (
              <span className="truncate">Quase lá! {Math.round(readingProgress)}%</span>
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}