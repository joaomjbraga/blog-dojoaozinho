'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import SearchBar from "./search-bar"
import { Suspense, useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const isActive = (path: string): boolean => {
    return pathname === path
  }
  
  // Detectar rolagem para ajustar visual do header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Fechar o menu ao navegar para uma nova página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])
  
  return (
    <header 
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm' : 'bg-background'
      }`} 
      role="banner"
    >
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between gap-3">
          {/* Logo/Nome do site */}
          <Link 
            href="/" 
            className="font-medium text-lg hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm flex items-center gap-2 min-w-max"
            aria-label="Ir para página inicial"
          >
            <span className="text-primary font-bold">João</span> | <span>Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            {/* Barra de busca (Desktop) */}
            <div className="w-full max-w-md mx-0 ml-4">
              <Suspense fallback={
                <div className="min-h-[40px] flex items-center text-sm text-muted-foreground animate-pulse" role="status">
                  Carregando busca...
                </div>
              }>
                <SearchBar />
              </Suspense>
            </div>

            {/* Navegação e Toggle de tema (Desktop) */}
            <nav 
              className="hidden md:flex items-center gap-4"
              role="navigation"
              aria-label="Menu principal"
            >
              <div className="flex items-center gap-5">
                <Link 
                  href="/" 
                  className={`relative px-2 py-1 text-sm transition-colors rounded-md hover:bg-secondary
                    ${isActive('/') ? 'text-primary font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary' : 'hover:text-primary'}`}
                  aria-current={isActive('/') ? "page" : undefined}
                >
                  Início
                </Link>
                <Link 
                  href="/blog" 
                  className={`relative px-2 py-1 text-sm transition-colors rounded-md hover:bg-secondary
                    ${isActive('/blog') ? 'text-primary font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary' : 'hover:text-primary'}`}
                  aria-current={isActive('/blog') ? "page" : undefined}
                >
                  Blog
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </div>
          
          {/* Mobile Controls (Theme Toggle + Menu Button) */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-4">
            <div className="pb-4">
              <Suspense fallback={
                <div className="min-h-[40px] flex items-center text-sm text-muted-foreground animate-pulse" role="status">
                  Carregando busca...
                </div>
              }>
                <SearchBar />
              </Suspense>
            </div>
            
            <ul className="flex flex-col space-y-2">
              <li className="w-full">
                <Link
                  href="/"
                  className={`block w-full p-3 rounded-lg transition-colors ${
                    isActive('/') 
                      ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary pl-2' 
                      : 'hover:bg-secondary'
                  }`}
                  aria-current={isActive('/') ? "page" : undefined}
                >
                  Início
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/blog"
                  className={`block w-full p-3 rounded-lg transition-colors ${
                    isActive('/blog') 
                      ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary pl-2' 
                      : 'hover:bg-secondary'
                  }`}
                  aria-current={isActive('/blog') ? "page" : undefined}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}