import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Artigos Recentes
          </h2>
        </div>

        <div className="space-y-0">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}