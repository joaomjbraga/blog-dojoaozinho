"use client"

import { motion } from 'framer-motion'
import { Post } from '@/types'
import { PostCard } from './PostCard'
import { useReadPosts } from '@/hooks/useReadPosts'

interface PostsFeedProps {
  posts: Post[]
  showReadIndicator?: boolean
}

export const PostsFeed: React.FC<PostsFeedProps> = ({ 
  posts, 
  showReadIndicator = true 
}) => {
  const { isRead } = useReadPosts()

  // Separar posts lidos e não lidos
  const unreadPosts = posts.filter(post => !isRead(post.slug))
  const readPosts = posts.filter(post => isRead(post.slug))

  return (
    <div
      className="container w-full max-w-[2400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 space-y-6 sm:space-y-8 md:space-y-10"
      aria-live="polite"
    >
      {/* Header */}
      <div className="flex items-center justify-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
        <span className="h-[1px] sm:h-[2px] w-4 xs:w-6 sm:w-8 md:w-12 lg:w-20 bg-gradient-to-r from-primary/70 via-primary/70 to-transparent rounded-full"></span>
        <h2 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-2xl font-semibold text-foreground px-1.5 xs:px-2 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 backdrop-blur-sm bg-background/10 rounded-full border border-border/20 shadow-lg">
          Últimas Postagens
        </h2>
        <span className="h-[1px] sm:h-[2px] w-4 xs:w-6 sm:w-8 md:w-12 lg:w-20 bg-gradient-to-l from-primary/70 via-primary/70 to-transparent rounded-full"></span>
      </div>

      {posts.length === 0 && (
        <p className="text-center text-muted-foreground text-[10px] xs:text-xs sm:text-sm">
          Nenhum post disponível no momento.
        </p>
      )}

      {/* Posts não lidos */}
      {unreadPosts.length > 0 && (
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              📚 Novos para você
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
            <span className="text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
              {unreadPosts.length} {unreadPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {unreadPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <PostCard 
                  post={post} 
                  isRead={false}
                  showReadIndicator={showReadIndicator}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Posts lidos */}
      {readPosts.length > 0 && (
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground">
              ✅ Já lidos
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-green-300/30 to-transparent"></div>
            <span className="text-sm text-muted-foreground bg-green-100/50 dark:bg-green-900/20 px-3 py-1 rounded-full">
              {readPosts.length} {readPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {readPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: (unreadPosts.length * 0.1) + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <PostCard 
                  post={post} 
                  isRead={true}
                  showReadIndicator={showReadIndicator}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Estatísticas de leitura */}
      {readPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 rounded-xl border border-border/50"
        >
          <div className="text-center space-y-2">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">
              📊 Seu Progresso de Leitura
            </h4>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>{unreadPosts.length} não lidos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>{readPosts.length} lidos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                <span>{Math.round((readPosts.length / posts.length) * 100)}% concluído</span>
              </div>
            </div>
            
            {/* Barra de progresso */}
            <div className="w-full max-w-md mx-auto mt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(readPosts.length / posts.length) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}    </div>
  )
}
