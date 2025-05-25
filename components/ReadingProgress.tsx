'use client'

import { motion } from 'framer-motion'
import { Trophy, BookOpen, Target, TrendingUp } from 'lucide-react'
import { useReadPosts } from '@/hooks/useReadPosts'

interface ReadingProgressProps {
  totalPosts: number
  className?: string
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  totalPosts,
  className
}) => {
  const { getReadCount } = useReadPosts()
  const readCount = getReadCount()
  const unreadCount = totalPosts - readCount
  const progressPercentage = totalPosts > 0 ? Math.round((readCount / totalPosts) * 100) : 0

  const stats = [
    {
      icon: BookOpen,
      label: 'Total de Posts',
      value: totalPosts,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: Trophy,
      label: 'Posts Lidos',
      value: readCount,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Target,
      label: 'Não Lidos',
      value: unreadCount,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Progresso',
      value: `${progressPercentage}%`,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-card border border-border rounded-xl p-6 shadow-lg ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          📈 Estatísticas de Leitura
        </h3>
        <p className="text-muted-foreground text-sm">
          Acompanhe seu progresso no blog
        </p>
      </div>

      {/* Grid de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-lg p-4 text-center`}
          >
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${stat.color} mb-2`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Barra de progresso animada */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progresso Geral</span>
          <span className="font-semibold text-foreground">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-3 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Efeito de brilho na barra */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'linear'
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Mensagem motivacional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-4 text-center"
      >
        {progressPercentage === 100 ? (
          <div className="text-green-600 dark:text-green-400 font-semibold">
            🎉 Parabéns! Você leu todos os posts!
          </div>
        ) : progressPercentage >= 75 ? (
          <div className="text-blue-600 dark:text-blue-400">
            🚀 Quase lá! Continue assim!
          </div>
        ) : progressPercentage >= 50 ? (
          <div className="text-purple-600 dark:text-purple-400">
            💪 Você está no meio do caminho!
          </div>
        ) : progressPercentage >= 25 ? (
          <div className="text-orange-600 dark:text-orange-400">
            📚 Bom começo! Continue lendo!
          </div>
        ) : (
          <div className="text-gray-600 dark:text-gray-400">
            🌟 Comece sua jornada de leitura!
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}