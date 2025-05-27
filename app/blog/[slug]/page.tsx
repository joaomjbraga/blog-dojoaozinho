import { PostLayout, mdxComponents } from '@/components/PostLayout'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 👇 Ajuste aqui
export async function generateMetadata(props: PostPageProps) {
  const { params } = await props
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return {
    title: `${post.title} | Blog do Joãozinho`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.date,
      authors: post.author?.name ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
    keywords: post.tags?.join(', '),
    authors: post.author?.name ? [{ name: post.author.name }] : [],
  }
}

// 👇 Ajuste aqui também
export default async function PostPage(props: PostPageProps) {
  const { params } = await props
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <PostLayout post={post}>
      <MDXRemote 
        source={post.content} 
        components={mdxComponents}
      />
    </PostLayout>
  )
}
