import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

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

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navegação */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>

        {/* Header do artigo */}
        <header className="mb-12 pb-8 border-b border-gray-200">
          {/* Categoria */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Metadados */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <time className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </time>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Conteúdo do artigo */}
        <div className="prose prose-lg prose-gray max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
          prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8
          prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-code:text-red-600 prose-code:bg-gray-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-gray-900 prose-pre:text-gray-100
          prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-gray-700 prose-li:mb-2
          prose-img:rounded-lg prose-img:shadow-md
        ">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Navegação inferior */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-red-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Ver todos os artigos
          </Link>
        </div>
      </article>
    </div>
  );
}