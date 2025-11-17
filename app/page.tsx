import Header from '@/components/Header';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { Clock, TrendingUp, ChevronRight } from 'lucide-react';

export default function Home() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, 4);
  const otherPosts = posts.slice(4);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho minimalista */}
        <div className="border-b border-gray-200 py-6 mb-8">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="hidden sm:block">Edição #{posts.length}</span>
          </div>
        </div>
        {/* Layout principal */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Coluna principal - 2 colunas */}
          <div className="lg:col-span-2 space-y-12">
            {/* Manchete principal */}
            {featuredPost && (
              <article className="group">
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <div className="mb-3">
                    <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-600 transition-colors">
                    {featuredPost.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <time>
                      {new Date(featuredPost.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </Link>
              </article>
            )}

            {/* Divisor */}
            <div className="border-t border-gray-200"></div>

            {/* Posts secundários */}
            {secondaryPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-8">
                {secondaryPosts.map(post => (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="mb-2">
                        <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-gray-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <time>
                          {new Date(post.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {/* Divisor */}
            {otherPosts.length > 0 && (
              <div className="border-t border-gray-200"></div>
            )}

            {/* Lista de outros artigos */}
            {otherPosts.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                  Mais artigos
                </h2>
                <div className="space-y-6">
                  {otherPosts.map(post => (
                    <article key={post.slug} className="group pb-6 border-b border-gray-100 last:border-0">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-1">
                              <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {post.category}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <time>
                                {new Date(post.date).toLocaleDateString('pt-BR', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </time>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Box de destaque */}
            <div className="border-t-4 border-red-600 bg-gray-50 p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Sobre
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Blog sobre tecnologia, programação, Linux e desenvolvimento web.
                Tutoriais e guias práticos atualizados regularmente.
              </p>
              <div className="text-center pt-4 border-t border-gray-200">
                <div className="text-3xl font-bold text-gray-900">
                  {posts.length}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Artigos
                </div>
              </div>
            </div>

            {/* Categorias */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-3 border-b border-gray-200">
                Categorias
              </h3>
              <div className="space-y-2">
                {Array.from(new Set(posts.map(p => p.category))).map(category => {
                  const count = posts.filter(p => p.category === category).length;
                  return (
                    <div
                      key={category}
                      className="flex items-center justify-between py-2 text-sm hover:text-red-600 cursor-pointer transition-colors group"
                    >
                      <span className="font-medium flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {category}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trending */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Populares
                </h3>
              </div>
              <div className="space-y-4">
                {posts.slice(0, 3).map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <div className="flex gap-3">
                      <span className="text-2xl font-bold text-gray-200 group-hover:text-red-600 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(post.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Espaçamento final */}
        <div className="py-12"></div>
      </main>
    </div>
  );
}