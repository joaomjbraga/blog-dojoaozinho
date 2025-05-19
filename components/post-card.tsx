import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types/index'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="group block h-full transform transition-all duration-500 hover:-translate-y-2"
      aria-label={`Read more about ${post.title}`}
    >
      <article className="h-full relative overflow-hidden rounded-xl bg-green-50 dark:bg-zinc-900/90 shadow-xl hover:shadow-2xl transition-all duration-500">
        {post.coverImage && (
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={95}
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex gap-2">
          {post.tags && post.tags.slice(0, 2).map(tag => (
            <span 
              key={tag} 
              className="rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md px-4 py-1 text-xs font-semibold text-zinc-900 dark:text-white shadow-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="p-8 relative">
          <div className="flex items-center gap-4 mb-6">
            {post.author?.image && (
              <div className="relative">
                <Image
                  src={post.author.image}
                  alt={post.author.name || 'Author'}
                  width={48}
                  height={48}
                  className="rounded-full ring-4 ring-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author?.name || 'Autor'}</p>
              <p className="text-xs text-primary/80">{formatDate(post.date)}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-base text-muted-foreground line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-medium">
              <span className="text-primary group-hover:text-primary/80 transition-colors duration-300">Continuar lendo</span>
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm">5 min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}