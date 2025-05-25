'use client'

import { Calendar, Clock, User, Eye, EyeOff, Trophy, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import { Post } from '@/types'
import { motion } from 'framer-motion'
import { ReadIndicator } from './ReadIndicator'
import { useReadPosts } from '@/hooks/useReadPosts'

interface PostCardProps {
  post: Post
  isRead?: boolean
  className?: string
  showReadIndicator?: boolean
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  isRead: propIsRead,
  className,
  showReadIndicator = true
}) => {
  const { isRead, markAsRead, markAsUnread } = useReadPosts()
  const postIsRead = propIsRead ?? isRead(post.slug)

  const handleReadToggle = () => {
    if (postIsRead) {
      markAsUnread(post.slug)
    } else {
      markAsRead(post.slug)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200) // ~200 palavras por minuto

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border shadow-md transition-all duration-300",
        // Estados base
        "hover:-translate-y-1 hover:shadow-xl",
        // Post não lido - cores vibrantes e chamativas
        !postIsRead && [
          "bg-gradient-to-br from-card via-card to-card/95",
          "border-border/50 hover:border-primary/30",
          "shadow-md hover:shadow-xl hover:shadow-primary/5",
          "ring-0 hover:ring-2 hover:ring-primary/10"
        ],
        // Post lido - cores mais suaves e indicadores visuais
        postIsRead && [
          "bg-gradient-to-br from-muted/30 via-muted/20 to-card/80",
          "border-green-200/50 dark:border-green-800/30",
          "shadow-sm hover:shadow-lg",
          "opacity-85 hover:opacity-95",
          "ring-1 ring-green-100/50 dark:ring-green-900/20"
        ],
        className
      )}
    >
      {/* Indicador visual de post lido - faixa superior */}
      {postIsRead && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400" />
      )}

      {/* Badge de status no canto superior direito */}
      {showReadIndicator && (
        <div className="absolute top-3 right-3 z-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ReadIndicator
              isRead={postIsRead}
              onToggle={handleReadToggle}
              size="sm"
              className="backdrop-blur-md bg-background/80 hover:bg-background/90"
            />
          </motion.div>
        </div>
      )}

      {/* Ícone de troféu para posts lidos */}
      {postIsRead && (
        <div className="absolute top-3 left-3 z-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="p-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md"
          >
            <Trophy className="w-3 h-3" />
          </motion.div>
        </div>
      )}

      <Link href={`/blog/${post.slug}`} className="block">
        {/* Imagem de capa */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                "group-hover:scale-105",
                // Filtros diferentes para posts lidos/não lidos
                postIsRead 
                  ? "grayscale-[0.3] group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
                  : "grayscale-0 opacity-100"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay com gradiente */}
            <div className={cn(
              "absolute inset-0 transition-opacity duration-300",
              postIsRead 
                ? "bg-gradient-to-t from-green-900/20 via-transparent to-transparent" 
                : "bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:from-primary/10"
            )} />

            {/* Badge de categoria sobre a imagem */}
            {post.category && (
              <div className="absolute bottom-3 left-3">
                <Badge 
                  variant={postIsRead ? "secondary" : "default"} 
                  className={cn(
                    "text-xs backdrop-blur-md",
                    postIsRead 
                      ? "bg-green-100/90 text-green-800 dark:bg-green-900/90 dark:text-green-200" 
                      : "bg-primary/90 text-primary-foreground"
                  )}
                >
                  {post.category}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo do card */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Título */}
          <h3 className={cn(
            "text-lg sm:text-xl font-bold line-clamp-2 transition-colors duration-300",
            postIsRead 
              ? "text-muted-foreground group-hover:text-foreground" 
              : "text-foreground group-hover:text-primary"
          )}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={cn(
            "line-clamp-3 text-sm leading-relaxed transition-colors duration-300",
            postIsRead 
              ? "text-muted-foreground/80" 
              : "text-muted-foreground"
          )}>
            {post.excerpt}
          </p>

          {/* Meta informações */}
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {/* Data */}
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(post.date)}</span>
              </div>
              
              {/* Tempo de leitura estimado */}
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{estimatedReadTime} min</span>
              </div>
            </div>

            {/* Status de leitura */}
            <div className="flex items-center gap-2">
              {postIsRead ? (
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">Lido</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <EyeOff className="w-3 h-3" />
                  <span className="hidden sm:inline">Não lido</span>
                </div>
              )}
            </div>
          </div>

          {/* Autor (se disponível) */}
          {post.author && (
            <div className="flex items-center gap-2 pt-2 border-t border-border/20">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="w-3 h-3" />
                <span>{post.author.name}</span>
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className={cn(
                    "text-xs px-2 py-0.5",
                    postIsRead 
                      ? "border-muted text-muted-foreground/70" 
                      : "border-primary/20 text-primary/80 hover:bg-primary/5"
                  )}
                >
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 text-muted-foreground">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Efeitos visuais adicionais para posts lidos */}
      {postIsRead && (
        <>
          {/* Brilho sutil */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/10 to-transparent pointer-events-none"
            initial={{ x: '-100%', skewX: -15 }}
            animate={{ x: '200%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 8,
              ease: 'easeInOut'
            }}
          />
          
          {/* Estrelas decorativas */}
          <div className="absolute top-2 right-12 opacity-20">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
          </div>
        </>
      )}

      {/* Indicador de hover para posts não lidos */}
      {!postIsRead && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={false}
        />
      )}
    </motion.article>
  )
}