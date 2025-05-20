import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPostBySlug } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { Mdx } from "@/components/mdx"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"

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

  return (
    <article className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-50 via-white to-gray-50 dark:from-lime-950 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="mx-auto max-w-4xl xl:max-w-5xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/50 rounded-xl xs:rounded-2xl lg:rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 border border-lime-200/60 dark:border-lime-900/60">
          <Link 
            href="/" 
            className="group mb-4 sm:mb-6 inline-flex items-center gap-1 xs:gap-1.5 text-[0.7rem] xs:text-sm sm:text-base font-medium text-lime-600 hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-full px-3 xs:px-4 py-1.5 xs:py-2 hover:bg-lime-50/70 dark:hover:bg-lime-950/70 backdrop-blur-sm hover:backdrop-blur-lg shadow-lg hover:shadow-xl border border-lime-200/60 dark:border-lime-800/60"
            aria-label="Voltar para a página do blog"
          >
            <ArrowLeft className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-2" />
            <span>Voltar</span>
          </Link>
          
          <h1 className="mb-4 sm:mb-6 text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight font-sans leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-lime-600 via-green-500 to-emerald-600 dark:from-lime-400 dark:via-green-300 dark:to-emerald-400 drop-shadow-lg">
            {post.title}
          </h1>
          
          <div className="mb-6 sm:mb-8">
            <div className="relative overflow-hidden p-2 xs:p-3 sm:p-4 md:p-6 bg-gradient-to-br from-white/90 to-lime-50/90 dark:from-gray-800/90 dark:to-lime-950/90 rounded-xl xs:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-xl border border-lime-200/60 dark:border-lime-800/60 group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-green-400/10 dark:from-lime-500/20 dark:to-green-500/20 transform rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 md:gap-6">
                {post.author && post.author.image && (
                  <div className="relative h-14 w-14 xs:h-16 xs:w-16 sm:h-20 sm:w-20 group/image transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-400 to-green-400 dark:from-lime-500 dark:to-green-500 rounded-lg xs:rounded-xl rotate-6 group-hover/image:rotate-12 transition-transform duration-500 animate-pulse"></div>
                    <div className="relative h-14 w-14 xs:h-16 xs:w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg xs:rounded-xl ring-4 ring-white/90 dark:ring-gray-800/80 shadow-2xl">
                      <Image
                        src={post.author.image}
                        alt={post.author.name || "Foto do autor"}
                        fill
                        className="object-cover transform hover:scale-110 transition-transform duration-500 filter saturate-110"
                        sizes="(max-width: 480px) 56px, (max-width: 768px) 64px, 80px"
                        priority
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-2 sm:gap-3 flex-grow">
                  {post.author && (
                    <div className="flex items-center gap-1.5 xs:gap-2 bg-white/70 dark:bg-gray-800/50 rounded-full px-3 xs:px-4 py-1 xs:py-1.5 backdrop-blur-sm shadow-lg inline-flex self-start">
                      <User className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-lime-600 dark:text-lime-400 animate-pulse" />
                      <p className="text-xs xs:text-sm sm:text-base font-bold bg-gradient-to-r from-lime-600 to-green-600 dark:from-lime-400 dark:to-green-400 bg-clip-text text-transparent">
                        {post.author.name}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
                    <div className="flex items-center gap-1 xs:gap-1.5 bg-white/50 dark:bg-gray-800/30 rounded-full px-2 xs:px-3 py-1 xs:py-1.5 backdrop-blur-sm">
                      <Calendar className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-lime-600/80 dark:text-lime-400/80" />
                      <time 
                        dateTime={post.date}
                        className="text-[0.65rem] xs:text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <div className="flex items-center gap-1 xs:gap-1.5 bg-white/50 dark:bg-gray-800/30 rounded-full px-2 xs:px-3 py-1 xs:py-1.5 backdrop-blur-sm">
                      <Clock className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-lime-600/80 dark:text-lime-400/80" />
                      <span className="text-[0.65rem] xs:text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        5 min leitura
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 sm:mb-8 flex flex-wrap gap-1.5 xs:gap-2">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 xs:gap-1.5 rounded-full bg-gradient-to-br from-white/90 to-lime-50/90 dark:from-gray-800/80 dark:to-lime-950/80 px-2 xs:px-3 py-1 xs:py-1.5 text-[0.65rem] xs:text-xs sm:text-sm font-semibold text-lime-700 dark:text-lime-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-lime-200/60 dark:border-lime-900/60 hover:bg-white/70 dark:hover:bg-gray-800/50"
                  role="tag"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="prose prose-xs xs:prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert font-sans overflow-x-auto
            prose-headings:font-black prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-lime-600 prose-headings:via-green-500 prose-headings:to-emerald-600 dark:prose-headings:from-lime-400 dark:prose-headings:via-green-300 dark:prose-headings:to-emerald-400 prose-headings:leading-tight
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-lime-600 prose-a:no-underline prose-a:transition-all hover:prose-a:text-lime-700 
            dark:prose-a:text-lime-400 dark:hover:prose-a:text-lime-300 
            prose-a:focus:outline-none prose-a:focus:ring-2 prose-a:focus:ring-lime-500 prose-a:focus:ring-offset-2 
            dark:prose-a:focus:ring-offset-gray-900
            prose-img:rounded-xl xs:prose-img:rounded-2xl prose-img:shadow-2xl prose-img:ring-4 prose-img:ring-white/90 dark:prose-img:ring-gray-800 prose-img:transition-all prose-img:duration-500 hover:prose-img:transform hover:prose-img:scale-[1.02]
            prose-strong:text-lime-700 dark:prose-strong:text-lime-300 prose-strong:font-bold
            prose-code:text-lime-600 dark:prose-code:text-lime-400 prose-code:bg-black/70 dark:prose-code:bg-gray-800/50 prose-code:rounded-lg prose-code:px-2 prose-code:py-0.5 prose-code:backdrop-blur-sm
            prose-blockquote:border-l-4 prose-blockquote:border-lime-500 prose-blockquote:bg-gradient-to-br prose-blockquote:from-white/70 prose-blockquote:to-lime-50/70 dark:prose-blockquote:from-gray-800/50 dark:prose-blockquote:to-lime-950/50 prose-blockquote:rounded-lg prose-blockquote:px-3 xs:prose-blockquote:px-4 prose-blockquote:py-2 xs:prose-blockquote:py-3 prose-blockquote:shadow-xl prose-blockquote:backdrop-blur-sm
            [&_table]:w-full [&_table]:min-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:divide-y [&_table]:divide-gray-200 dark:[&_table]:divide-gray-700
            [&_th]:p-2 xs:[&_th]:p-3 [&_th]:text-left [&_th]:text-xs xs:[&_th]:text-sm [&_th]:font-semibold [&_th]:text-gray-900 dark:[&_th]:text-gray-100 [&_th]:bg-gray-50 dark:[&_th]:bg-gray-800
            [&_td]:p-2 xs:[&_td]:p-3 [&_td]:text-xs xs:[&_td]:text-sm [&_td]:text-gray-700 dark:[&_td]:text-gray-300 [&_td]:align-middle
            [&_tr]:border-b [&_tr]:border-gray-100 dark:[&_tr]:border-gray-800
            [&_tbody_tr]:hover:bg-gray-50/50 dark:[&_tbody_tr]:hover:bg-gray-800/50">
            <Mdx code={post.content} />
          </div>
        </div>
      </div>
    </article>
  )
}