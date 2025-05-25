import React from 'react'
import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReadIndicatorProps {
  isRead: boolean
  onToggle: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ReadIndicator: React.FC<ReadIndicatorProps> = ({
  isRead,
  onToggle,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 p-1',
    md: 'w-6 h-6 p-1',
    lg: 'w-8 h-8 p-1.5'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-sm',
        'hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20',
        'border border-border/50',
        isRead 
          ? 'text-green-600 dark:text-green-400 bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
          : 'text-muted-foreground hover:text-foreground bg-background/60',
        sizeClasses[size],
        className
      )}
      title={isRead ? 'Marcar como não lido' : 'Marcar como lido'}
      aria-label={isRead ? 'Marcar como não lido' : 'Marcar como lido'}
    >
      {isRead ? (
        <Check className={iconSizes[size]} />
      ) : (
        <Circle className={iconSizes[size]} />
      )}
    </button>
  )
}