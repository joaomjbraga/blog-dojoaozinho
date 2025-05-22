import Link from 'next/link';
import { ChevronRight, Home, Folder } from 'lucide-react';

interface BreadcrumbProps {
  category?: string;
  title: string;
}

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
  const categorySlug = category ? category.toLowerCase().replace(/\s+/g, '-') : null;
  
  return (
    <nav 
      className="w-full py-3 px-4 bg-background/50 backdrop-blur-sm border-b mb-6" 
      aria-label="Navegação estrutural"
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm max-w-7xl mx-auto">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="Ir para página inicial"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Início</span>
          </Link>
        </li>
        
        {category && (
          <li className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 mx-1" aria-hidden="true" />
            <Link 
              href={`/categorias/${categorySlug}`}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
            >
              <Folder className="w-4 h-4" aria-hidden="true" />
              <span className="truncate max-w-[150px] sm:max-w-xs">{category}</span>
            </Link>
          </li>
        )}
        
        <li aria-current="page" className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 mx-1" aria-hidden="true" />
          <span className="text-muted-foreground/80 truncate max-w-[150px] sm:max-w-[200px] md:max-w-xs lg:max-w-md p-1">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}