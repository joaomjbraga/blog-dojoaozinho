'use client'

import React from 'react'
import { BookOpen, Check, RotateCcw, TrendingUp } from 'lucide-react'
import { useReadPosts } from '@/hooks/useReadPosts'
import { cn } from '@/lib/utils'

interface ReadingStatsProps {
  totalPosts: number
  className?: string
}

export const ReadingStats: React.FC<ReadingStatsProps> = ({ 
  totalPosts, 
  className 
}) => {
  const { getReadCount, clearAllRead } = useReadPosts()
  const readCount = getReadCount()
  const unreadCount = totalPosts - readCount
  const readPercentage = totalPosts > 0 ? Math.round((readCount / totalPosts) * 100) : 0

  return (
    <div className={cn("bg-card border border-border/50 rounded-lg p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Progresso de Leitura
        </h3>
        {readCount > 0 && (
          <button
            onClick={clearAllRead}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors hover:bg-muted px-2 py-1 rounded-md"
            title="Limpar todos os posts lidos"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Barra de progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{readPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${readPercentage}%` }}
            />
          </div>
        </div>

        {/* Estatísticas em grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{readCount}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Check className="w-3 h-3" />
              Lidos
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">{unreadCount}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <BookOpen className="w-3 h-3" />
              Não lidos
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{totalPosts}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Total
            </div>
          </div>
        </div>

        {/* Mensagem motivacional */}
        {totalPosts > 0 && (
          <div className="text-center pt-2">
            {readPercentage === 100 ? (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                🎉 Parabéns! Você leu todos os posts!
              </p>
            ) : readPercentage >= 75 ? (
              <p className="text-sm text-primary font-medium">
                🔥 Quase lá! Continue lendo!
              </p>
            ) : readPercentage >= 50 ? (
              <p className="text-sm text-muted-foreground">
                📚 Você está no meio do caminho!
              </p>
            ) : readPercentage > 0 ? (
              <p className="text-sm text-muted-foreground">
                🚀 Ótimo começo! Continue explorando!
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                📖 Comece sua jornada de leitura!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}