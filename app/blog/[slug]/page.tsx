import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPostBySlug } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { Mdx } from "@/components/mdx"
import { ArrowLeft, Calendar, User } from "lucide-react"

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
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <Link 
          href="/" 
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-lime-600 hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md px-3 py-1.5"
          aria-label="Voltar para a página do blog"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Voltar</span>
        </Link>
        
        <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 font-sans">
          {post.title}
        </h1>
        
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-3">
            {post.author && post.author.image && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-gray-200 dark:ring-gray-700">
                <Image
                  src={post.author.image}
                  alt={post.author.name || "Foto do autor"}
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
            )}
            <div className="flex flex-col">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {post.author.name}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <time 
                  dateTime={post.date}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {formatDate(post.date)}
                </time>
              </div>
            </div>
          </div>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1.5 rounded-full bg-lime-50 px-3 py-1 text-xs font-medium text-lime-700 hover:bg-lime-100 dark:bg-lime-950 dark:text-lime-300 dark:hover:bg-lime-900 transition-colors"
                role="tag"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {post.coverImage && (
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-sm">
            <Image
              src={post.coverImage}
              alt={`Imagem de capa do post: ${post.title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}
        
        <div className="prose prose-base sm:prose-lg max-w-none dark:prose-invert font-sans 
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-50
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-lime-600 prose-a:no-underline prose-a:transition-colors hover:prose-a:text-lime-700 
          dark:prose-a:text-lime-400 dark:hover:prose-a:text-lime-300 
          prose-a:focus:outline-none prose-a:focus:ring-2 prose-a:focus:ring-lime-500 prose-a:focus:ring-offset-2 
          dark:prose-a:focus:ring-offset-gray-900
          prose-img:rounded-xl prose-img:shadow-sm">
          <Mdx code={post.content} />
        </div>
      </div>
    </article>
  )
}