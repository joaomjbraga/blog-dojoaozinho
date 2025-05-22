import Link from 'next/link';
import { getCategories } from '@/lib/mdx';
import { Metadata } from 'next';
import { Tag } from 'lucide-react';
import { Suspense } from 'react';

// Mapa genérico de ícones para categorias (pode ser personalizado)
const categoryIcons: { [key: string]: React.ComponentType<any> } = {
  tecnologia: Tag,
  programação: Tag,
  design: Tag,
  default: Tag, // Ícone padrão para categorias não mapeadas
};

export const metadata: Metadata = {
  title: 'Categorias | Blog do Joãozinho',
  description: 'Explore todas as categorias de conteúdo do Blog do Joãozinho',
  icons: {
    icon: '/favicon.svg',
  }
};

// Componente de Skeleton Loader
function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="p-6 bg-card/50 border border-border/30 rounded-2xl animate-pulse"
        >
          <div className="h-6 w-3/4 bg-muted rounded mb-2" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 tracking-tight">
              Categorias
            </h1>
            <p className="mt-4 text-lg text-muted-foreground/90 max-w-2xl mx-auto">
              Carregando categorias...
            </p>
          </header>
          <CategorySkeleton />
        </main>
      }
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 tracking-tight">
            Categorias
          </h1>
          <p className="mt-4 text-lg text-muted-foreground/90 max-w-2xl mx-auto">
            Descubra os temas que você mais gosta no Blog do Joãozinho!
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            // Escolhe o ícone com base no slug da categoria ou usa o padrão
            const Icon = categoryIcons[category.slug.toLowerCase()] || categoryIcons.default;

            return (
              <Link
                key={category.slug}
                href={`/categorias/${category.slug}`}
                className="group relative p-6 bg-card/80 backdrop-blur-md border border-border/30 rounded-2xl hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label={`Ver posts da categoria ${category.name}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-start gap-3">
                  <Icon className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors duration-200" />
                  <div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {category.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {category.count}
                      </span>
                      {category.count === 1 ? 'post' : 'posts'}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </Suspense>
  );
}