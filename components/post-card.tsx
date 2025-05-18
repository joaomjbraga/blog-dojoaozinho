import Link from "next/link"
import Image from "next/image"
import { Post } from "@/lib/mdx"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden w-full">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative w-full aspect-video sm:h-48 overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm sm:text-base">Sem imagem</span>
            </div>
          )}
        </div>
      </Link>
      
      <CardHeader className="p-3 sm:p-4">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{post.title}</h3>
        </Link>
      </CardHeader>
      
      <CardContent className="flex-grow p-3 sm:p-4 pt-0">
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0">
        {post.date && (
          <p className="text-xs sm:text-sm text-muted-foreground">
            {formatDate(post.date)}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}