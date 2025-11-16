import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          ← Voltar
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-900">
              {post.category}
            </span>
            <span>•</span>
            <time>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600">
            {post.excerpt}
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
}