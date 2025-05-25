'use client'

import { Check, BookOpen, Trophy } from 'lucide-react'
import { Button } from './ui/button'
import { useReadPosts } from '@/hooks/useReadPosts'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface PostReadButtonProps {
  postSlug: string
  className?: string
  showAutoReadIndicator?: boolean
}

export const PostReadButton: React.FC<PostReadButtonProps> = ({
  postSlug,
  className,
  showAutoReadIndicator = true
}) => {
  const { isRead, markAsRead, markAsUnread } = useReadPosts()
  const postIsRead = isRead(postSlug)

  const handleToggle = () => {
    if (postIsRead) {
      markAsUnread(postSlug)
    } else {
      markAsRead(postSlug)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={handleToggle}
        variant={postIsRead ? "default" : "outline"}
        className={cn(
          "gap-2 transition-all duration-300 relative overflow-hidden",
          postIsRead && "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-green-500",
          !postIsRead && "hover:border-primary/50 hover:bg-primary/5",
          className
        )}
      >
        {/* Animação de fundo para quando está lido */}
        {postIsRead && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear'
            }}
          />
        )}

        {/* Ícone com animação */}
        <motion.div
          key={postIsRead ? 'read' : 'unread'}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {postIsRead ? (
            <Check className="w-4 h-4" />
          ) : (
            <BookOpen className="w-4 h-4" />
          )}
        </motion.div>

        {/* Texto com indicador de leitura automática */}
        <span className="relative z-10">
          {postIsRead ? (
            <span className="flex items-center gap-1">
              Leitura concluida
              {showAutoReadIndicator && (
                <Trophy className="w-3 h-3 text-yellow-300" />
              )}
            </span>
          ) : (
            'Marcar como lido'
          )}
        </span>

        {/* Efeito de brilho quando está lido */}
        {postIsRead && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%', skewX: -15 }}
            animate={{ x: '200%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut'
            }}
          />
        )}
      </Button>
    </motion.div>
  )
}