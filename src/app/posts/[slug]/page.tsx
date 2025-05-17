import { getPostBySlug, getPostSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'

type Params = { slug: string }

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{post.date}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  )
}
