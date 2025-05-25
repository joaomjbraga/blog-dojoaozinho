import { getCategories, getPostsByCategorySlug } from '@/lib/mdx';
import { Folder, AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { Metadata } from 'next';
import { PostCard } from '@/components/PostCard';


interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Função que capitaliza só a primeira letra da frase
function capitalizeSentence(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;
  // Decodifica URL, troca "-" por espaço e capitaliza só a primeira letra da frase
  const categoryName = capitalizeSentence(decodeURIComponent(slug).replace(/-/g, ' '));

  return {
    title: `${categoryName} | Blog do Joãozinho`,
    description: `Artigos na categoria ${categoryName} do Blog do Joãozinho`,
    icons: {
      icon: '/favicon.svg',
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map(category => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  // Decodifica URL, troca "-" por espaço e capitaliza só a primeira letra da frase
  const categoryName = capitalizeSentence(decodeURIComponent(slug).replace(/-/g, ' '));
  const posts = await getPostsByCategorySlug(slug);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb title={categoryName} />

        <div className="flex items-center gap-3 mb-8">
          <Folder className="w-8 h-8 text-primary" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg text-center">
            <AlertCircle
              className="w-12 h-12 text-muted-foreground mb-4"
              aria-hidden="true"
            />
            <p className="text-lg text-muted-foreground" role="alert">
              Nenhum post encontrado nesta categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {posts.map(post => (
              <div
                key={post.slug}
                className="transition-transform hover:scale-[1.02] focus-within:scale-[1.02]"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
