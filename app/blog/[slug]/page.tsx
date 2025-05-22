import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPostBySlug } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { Mdx } from "@/components/mdx"
import { ArrowLeft, Calendar, User, Clock, ChevronRight, HomeIcon, BookOpen } from "lucide-react"
import FloatingActionButton from "@/components/FloatingActionButton"

type Params = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const slug = params.slug
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Não Encontrado",
    }
  }

  return {
    title: `${post.title} | João M J Braga`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Params) {
  const slug = params.slug
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200) // Assumindo 200 palavras por minuto

  return (
    <article className="min-h-screen w-full bg-background">
      {/* Decorative header gradient */}
      <div className="h-24 xs:h-32 sm:h-40 md:h-48 w-full bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/10 dark:from-primary/10 dark:via-secondary/5 dark:to-accent/5"></div>
      
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 -mt-16 xs:-mt-20 sm:-mt-24 md:-mt-28">
        <div className="mx-auto max-w-4xl bg-card dark:bg-card shadow-sm dark:shadow-md rounded-xl border border-border dark:border-border/50 overflow-hidden">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="px-4 xs:px-6 pt-4 xs:pt-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li className="flex items-center">
                <Link 
                  href="/" 
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <HomeIcon className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">Home</span>
                </Link>
              </li>
              <li className="flex items-center text-muted-foreground">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              </li>
              <li className="flex items-center">
                <Link 
                  href="/categorias" 
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">Blog</span>
                </Link>
              </li>
              <li className="flex items-center text-muted-foreground">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              </li>
              <li className="flex items-center">
                <span className="text-foreground line-clamp-1" title={post.title}>
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>
          
          {/* Article content */}
          <div className="px-4 xs:px-6 sm:px-8 md:px-10 py-4 xs:py-6 sm:py-8">
            {/* Title */}
            <h1 className="mb-4 xs:mb-6 text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {post.title}
            </h1>
            
            {/* Author and metadata */}
            <div className="mb-6 xs:mb-8 flex items-center gap-3 xs:gap-4 pb-4 xs:pb-6 border-b border-border/50">
              {post.author && post.author.image && (
                <div className="relative h-10 w-10 xs:h-12 xs:w-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={post.author.image}
                    alt={post.author.name || "Foto do autor"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 40px, 48px"
                    priority
                  />
                </div>
              )}
              
              <div className="flex flex-col">
                {post.author && (
                  <p className="text-sm font-medium text-foreground">
                    {post.author.name}
                  </p>
                )}
                
                <div className="flex items-center gap-3 xs:gap-4 text-xs text-muted-foreground mt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{readingTime} min leitura</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6 xs:mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-primary hover:bg-muted/80 transition-colors duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Content */}
            <div className="prose prose-xs xs:prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:text-foreground prose-headings:leading-tight
              prose-p:text-foreground/90 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline prose-a:transition-colors hover:prose-a:text-primary/80
              prose-img:rounded-md prose-img:shadow-sm prose-img:w-full prose-img:max-w-full
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5
              prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-muted/50 prose-blockquote:rounded-sm
              [&_table]:border-collapse [&_table]:w-full [&_table]:overflow-x-auto [&_table]:block [&_table]:max-w-full
              [&_th]:p-2 [&_th]:text-left [&_th]:text-xs [&_th]:xs:text-sm [&_th]:font-medium [&_th]:text-foreground [&_th]:bg-muted/50 [&_th]:whitespace-nowrap
              [&_td]:p-2 [&_td]:text-xs [&_td]:xs:text-sm [&_td]:text-foreground/80 [&_td]:border-t [&_td]:border-border/30 [&_td]:whitespace-nowrap
              [&_.mac-window]:my-6 [&_.mac-window]:shadow-lg">
              <Mdx code={post.content} />
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-4 xs:px-6 sm:px-8 md:px-10 py-4 xs:py-6 bg-muted/30 dark:bg-muted/10 border-t border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 xs:gap-4">
              <p className="text-xs xs:text-sm text-muted-foreground">
                Obrigado por ler este artigo!
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs xs:text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <span>Ver mais artigos</span>
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FloatingActionButton />
    </article>
  )
}