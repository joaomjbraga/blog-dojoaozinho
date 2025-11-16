'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

interface SearchBarProps {
  posts: Post[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtra posts usando useMemo ao invés de useEffect + setState
  const filteredPosts = useMemo(() => {
    if (searchTerm.trim() === '') {
      return [];
    }

    const term = searchTerm.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term)
    );
  }, [searchTerm, posts]);

  // Fecha o modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Foca no input quando abre
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Atalho de teclado Ctrl+K ou Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {/* Botão de busca */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        aria-label="Buscar posts"
      >
        <Search size={18} />
        <span className="hidden sm:inline">Buscar</span>
        <kbd className="hidden sm:inline px-2 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Modal de busca */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-20 px-4">
          <div
            ref={searchRef}
            className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Input de busca */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
              <Search size={20} className="text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar posts por título, conteúdo ou categoria..."
                className="flex-1 text-lg outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Fechar busca"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Resultados */}
            <div className="max-h-[60vh] overflow-y-auto">
              {searchTerm.trim() === '' ? (
                <div className="p-8 text-center text-gray-500">
                  <Search size={48} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Digite para buscar posts</p>
                  <p className="text-xs mt-1 text-gray-400">
                    Busque por título, conteúdo ou categoria
                  </p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Search size={48} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Nenhum post encontrado</p>
                  <p className="text-xs mt-1 text-gray-400">
                    Tente buscar com outros termos
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {filteredPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        onClick={handleClose}
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                                {post.category}
                              </span>
                              <span>•</span>
                              <time>{formatDate(post.date)}</time>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer com dica */}
            {filteredPosts.length > 0 && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados'}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}