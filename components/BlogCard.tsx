import Link from 'next/link';
import { Post } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
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
    <Link href={`/blog/${post.slug}`}>
      <article className="group py-8 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-6 px-6 transition-colors">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-900">
            {post.category}
          </span>
          <span>•</span>
          <time>{formatDate(post.date)}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h2 className="text-2xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
          {post.title}
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-4 text-sm font-medium text-gray-900 group-hover:underline">
          Ler mais →
        </div>
      </article>
    </Link>
  );
}
