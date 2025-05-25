'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import SearchBar from "./search-bar"
import { Suspense, useState, useEffect } from "react"
import { BookOpen, Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isActive = (path: string): boolean => {
    return pathname === path
  }

  // Detectar rolagem para ajustar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menu mobile ao navegar
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header 
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-background via-background/90 to-background/80 backdrop-blur-md shadow-lg' 
          : 'bg-background'
      }`} 
      role="banner"
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="group font-bold tracking-tight hover:text-primary transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md flex items-center gap-2"
            aria-label="Ir para página inicial"
          >
            <span className="text-primary group-hover:scale-105 transition-transform text-base sm:text-lg lg:text-xl">Blog</span>
            <span className="text-foreground/80 group-hover:text-primary text-sm sm:text-base lg:text-lg whitespace-nowrap"> do Joãozinho</span>
          </Link>

          {/* Navegação Desktop */}
          <div className="hidden md:flex flex-1 items-center justify-between gap-6">
            {/* Barra de Busca Desktop */}
            <div className="w-full max-w-sm mx-6">
              <Suspense fallback={
                <div className="min-h-[38px] flex items-center text-sm text-muted-foreground animate-pulse" role="status">
                  Carregando busca...
                </div>
              }>
                <SearchBar />
              </Suspense>
            </div>

            {/* Menu Desktop */}
            <nav 
              className="flex items-center gap-6"
              role="navigation"
              aria-label="Menu principal"
            >
              <Link 
                href="/" 
                className={`relative px-3 py-1 text-sm font-medium transition-all duration-200 rounded-md hover:bg-secondary/50 hover:scale-105
                  ${isActive('/') ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-100 after:transition-transform after:duration-300' : 'hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 after:transition-transform after:duration-300'}`}
                aria-current={isActive('/') ? "page" : undefined}
              >
                Início
              </Link>
              <Link 
                href="/categorias" 
                className={`relative px-3 py-1 text-sm font-medium transition-all duration-200 rounded-md hover:bg-secondary/50 hover:scale-105
                  ${isActive('/categorias') ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-100 after:transition-transform after:duration-300' : 'hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 after:transition-transform after:duration-300'}`}
                aria-current={isActive('/categorias') ? "page" : undefined}
              >
                Categorias
              </Link>
              <Link 
                href="/sobre" 
                className={`relative px-3 py-1 text-sm font-medium transition-all duration-200 rounded-md hover:bg-secondary/50 hover:scale-105
                  ${isActive('/sobre') ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-100 after:transition-transform after:duration-300' : 'hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 after:transition-transform after:duration-300'}`}
                aria-current={isActive('/sobre') ? "page" : undefined}
              >
                Sobre
              </Link>
              <Link 
                href="/leitura" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Progresso de Leitura
              </Link>
              <ThemeToggle />
            </nav>
          </div>

          {/* Controles Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <Link 
              href="/leitura" 
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label="Progresso de Leitura"
            >
              <BookOpen className="w-4 h-4" />
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground rounded-full hover:bg-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X size={24} className="rotate-0 transition-transform duration-300" aria-hidden="true" />
              ) : (
                <Menu size={24} className="rotate-0 transition-transform duration-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <nav className="flex flex-col space-y-4" role="navigation" aria-label="Menu mobile">
            {/* Barra de Busca Mobile */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <Suspense fallback={
                  <div className="min-h-[38px] flex items-center text-sm text-muted-foreground animate-pulse" role="status">
                    Carregando busca...
                  </div>
                }>
                  <SearchBar />
                </Suspense>
              </div>
            </div>

            {/* Links do Menu Mobile */}
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/"
                  className={`block w-full p-3 rounded-lg transition-all duration-200 hover:bg-secondary/50 hover:scale-[1.02] ${
                    isActive('/') 
                      ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary' 
                      : 'text-foreground'
                  }`}
                  aria-current={isActive('/') ? "page" : undefined}
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className={`block w-full p-3 rounded-lg transition-all duration-200 hover:bg-secondary/50 hover:scale-[1.02] ${
                    isActive('/categorias') 
                      ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary' 
                      : 'text-foreground'
                  }`}
                  aria-current={isActive('/categorias') ? "page" : undefined}
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className={`block w-full p-3 rounded-lg transition-all duration-200 hover:bg-secondary/50 hover:scale-[1.02] ${
                    isActive('/sobre') 
                      ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary' 
                      : 'text-foreground'
                  }`}
                  aria-current={isActive('/sobre') ? "page" : undefined}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/leitura"
                  className={`flex items-center gap-2 w-full p-3 rounded-lg transition-all duration-200 hover:bg-secondary/50 hover:scale-[1.02] ${
                    isActive('/leitura') 
                      ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary' 
                      : 'text-foreground'
                  }`}
                  aria-current={isActive('/leitura') ? "page" : undefined}
                >
                  <BookOpen className="w-4 h-4" />
                  Progresso de Leitura
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}