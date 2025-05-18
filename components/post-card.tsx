import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types/index'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <div className="h-full rounded-lg border border-border bg-card p-2 sm:p-4 transition-colors hover:bg-accent/10">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 h-full">
          {post.coverImage && (
            <div className="relative h-32 w-full sm:h-48 sm:w-48 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0 mb-2">
              <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 dark:bg-lime-900 dark:text-lime-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h2 className="mb-2 text-base sm:text-lg lg:text-xl font-semibold line-clamp-2">{post.title}</h2>
            {post.excerpt && (
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-4">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-2 sm:gap-3 mt-auto">
              {post.author?.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name || 'Author'}
                  width={32}
                  height={32}
                  className="rounded-full sm:w-[40px] sm:h-[40px]"
                />
              )}
              <div>
                <p className="text-xs sm:text-sm font-medium">{post.author?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}