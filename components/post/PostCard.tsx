import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types/index'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const contentText = post.content || post.excerpt || ''
  const readingTime = calculateReadingTime(contentText)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block max-w-2xl mx-auto w-full transform transition-all duration-500 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
      aria-label={`Leia mais sobre ${post.title}`}
    >
      <article
        role="article"
        className="relative overflow-hidden rounded-2xl bg-green-50 dark:bg-zinc-900/90 shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        {post.coverImage && (
          <div className="relative h-32 xs:h-36 sm:h-48 lg:h-56 xl:h-64 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={`Imagem de capa para: ${post.title}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 480px) 100vw, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}

        {/* Tags */}
        {post.tags && (
          <div className="absolute top-1.5 xs:top-2 sm:top-3 right-1.5 xs:right-2 sm:right-3 flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 z-10">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md px-1.5 xs:px-2 sm:px-3 py-0.5 text-[10px] xs:text-xs font-semibold text-zinc-900 dark:text-white shadow"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="p-2 xs:p-3 sm:p-4 lg:p-6 relative">

          {/* Autor e data */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
            {post.author?.image && (
              <div className="relative shrink-0">
                <Image
                  src={post.author.image}
                  alt={`Foto de ${post.author.name || 'autor'}`}
                  width={24}
                  height={24}
                  className="w-6 h-6 xs:w-8 xs:h-8 sm:w-8 sm:h-8 rounded-full ring-2 sm:ring-4 ring-primary/20"
                  loading="lazy"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
              </div>
            )}
            <div>
              <p className="text-[10px] xs:text-xs font-semibold text-foreground">{post.author?.name || 'Autor'}</p>
              <p className="text-[10px] xs:text-xs text-primary/80">{formatDate(post.date)}</p>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold mb-1.5 xs:mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>

          {/* Descrição */}
          {post.excerpt && (
            <p className="text-[11px] xs:text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-3 mb-2 xs:mb-3 sm:mb-4">
              {post.excerpt}
            </p>
          )}

          {/* Rodapé */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] xs:text-xs sm:text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-300">
              Continuar lendo
            </span>
            <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
              <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-[10px] xs:text-xs">{readingTime} min leitura</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}