import React from 'react'
import { Filter, Eye, EyeOff, List } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ReadingFilter = 'all' | 'read' | 'unread'

interface ReadingFiltersProps {
  currentFilter: ReadingFilter
  onFilterChange: (filter: ReadingFilter) => void
  readCount: number
  unreadCount: number
  className?: string
}

export const ReadingFilters: React.FC<ReadingFiltersProps> = ({
  currentFilter,
  onFilterChange,
  readCount,
  unreadCount,
  className
}) => {
  const filters = [
    { key: 'all' as const, label: 'Todos', icon: List, count: readCount + unreadCount },
    { key: 'unread' as const, label: 'Não lidos', icon: EyeOff, count: unreadCount },
    { key: 'read' as const, label: 'Lidos', icon: Eye, count: readCount }
  ]

  return (
    <div className={cn("bg-card border border-border/50 rounded-lg p-4", className)}>
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4" />
        <span className="font-medium text-sm">Filtrar posts</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
              'border border-border/50 hover:border-border',
              currentFilter === key
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-muted'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
            <span className={cn(
              'px-2 py-0.5 rounded-full text-xs',
              currentFilter === key
                ? 'bg-primary-foreground/20'
                : 'bg-muted'
            )}>
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}