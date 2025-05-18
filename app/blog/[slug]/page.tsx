import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // Ensure params is fully resolved before accessing slug
  const resolvedParams = await Promise.resolve(params)
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | João M J Braga`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Ensure params is fully resolved before accessing slug
  const resolvedParams = await Promise.resolve(params)
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.date && (
          <time className="text-sm text-muted-foreground">
            {format(new Date(post.date), "MMMM d, yyyy", { locale: ptBR })}
          </time>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}
