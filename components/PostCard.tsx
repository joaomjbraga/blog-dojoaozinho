import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User } from 'lucide-react'
import { Post } from '@/types'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  isRead?: boolean
  className?: string
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  isRead = false,
  className
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className={cn(
      "group relative overflow-hidden rounded-xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      isRead && "opacity-75 ring-2 ring-green-500/20",
      className
    )}>
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Imagem de capa */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Conteúdo do card */}
        <div className="p-6 space-y-4">
          {/* Categoria */}
          {post.category && (
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          )}

          {/* Título */}
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta informações */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{post.author.name}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}