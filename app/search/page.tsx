"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import SearchBar from "@/components/search-bar"
import type { Post } from "@/lib/mdx"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { X, Search, Tag, BookOpen, Code, Music, Camera, Film, Palette, Coffee, Gamepad } from "lucide-react"

interface Category {
  name: string
  slug: string
  count: number
  icon?: keyof typeof categoryIcons
}

const categoryIcons = {
  default: Tag,
  tech: Code,
  music: Music,
  photo: Camera,
  video: Film,
  art: Palette,
  lifestyle: Coffee,
  games: Gamepad,
  books: BookOpen
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const categoryParam = searchParams.get("category") || ""

  const [results, setResults] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam)

  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cacheRef = useRef<Map<string, Post[]>>(new Map())

  useEffect(() => {
    fetch('/api/categorias')
      .then(res => res.json())
      .then((data: Category[]) => {
        setCategories(data)
      })
      .catch(err => {
        console.error("Erro ao buscar categorias:", err)
      })
  }, [])

  useEffect(() => {
    if (!query.trim() && !selectedCategory) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const cacheKey = `${query}:${selectedCategory}`
      
      if (cacheRef.current.has(cacheKey)) {
        setResults(cacheRef.current.get(cacheKey) || [])
        setLoading(false)
        setError(null)
        return
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const controller = new AbortController()
      abortControllerRef.current = controller

      setLoading(true)
      setError(null)

      let url = `/api/search?q=${encodeURIComponent(query)}`
      if (selectedCategory) {
        url += `&category=${encodeURIComponent(selectedCategory)}`
      }

      fetch(url, { signal: controller.signal })
        .then(res => {
          if (!res.ok) throw new Error(`Erro na requisição: ${res.statusText}`)
          return res.json()
        })
        .then((data: Post[]) => {
          cacheRef.current.set(cacheKey, data)
          setResults(data)
          setLoading(false)
        })
        .catch(err => {
          if (err.name === "AbortError") return
          console.error("Erro ao buscar resultados:", err)
          setError("Erro ao buscar resultados. Tente novamente mais tarde.")
          setLoading(false)
        })
    }, 300)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [query, selectedCategory])

  const handleCategoryFilter = (categorySlug: string) => {
    if (categorySlug === selectedCategory) {
      setSelectedCategory("")
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`)
    } else {
      setSelectedCategory(categorySlug)
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(categorySlug)}`)
    }
  }

  const clearCategoryFilter = () => {
    setSelectedCategory("")
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-primary/5 to-muted/20 px-2 sm:px-4 py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <section className="relative space-y-6" aria-label="Área de busca">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                Explore o Conteúdo
              </span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Encontre artigos, tutoriais e recursos sobre seus temas favoritos
            </p>
          </div>
          <div className="max-w-2xl mx-auto w-full sm:hidden">
            <div className="backdrop-blur-md bg-background/90 rounded-2xl p-4 shadow-xl border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <SearchBar defaultValue={query} aria-label="Campo de busca" />
            </div>
          </div>
        </section>

        {categories.length > 0 && (
          <section className="space-y-6" aria-label="Filtro de categorias">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.icon || 'default']
                return (
                  <Button
                    key={category.slug}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryFilter(category.slug)}
                    className={`rounded-full transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category.slug 
                        ? 'shadow-lg shadow-primary/25 bg-primary/90'
                        : 'hover:shadow-md hover:bg-primary/10'
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5 mr-1.5" />
                    <span className="text-xs sm:text-sm">{category.name} ({category.count})</span>
                  </Button>
                )
              })}
            </div>
            
            {selectedCategory && (
              <div className="flex justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCategoryFilter}
                  className="text-muted-foreground flex items-center gap-2 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  <X className="h-3.5 w-3.5" /> Limpar filtro
                </Button>
              </div>
            )}
          </section>
        )}

        <section className="space-y-6" aria-label="Resultados da busca">
          {loading ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center p-6 sm:p-8 animate-pulse backdrop-blur-md bg-background/90 rounded-2xl shadow-lg"
            >
              <Search className="h-5 w-5 mr-2 animate-spin" />
              <span className="text-base sm:text-lg font-medium">Buscando...</span>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="text-center text-red-600 font-semibold bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl shadow-lg backdrop-blur-md"
            >
              {error}
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="text-muted-foreground text-center text-sm sm:text-base backdrop-blur-md bg-background/90 p-4 rounded-2xl shadow-md" aria-live="polite">
                Encontrado {results.length} resultado{results.length !== 1 ? "s" : ""} para "{query}"
                {selectedCategory && " na categoria selecionada"}
              </p>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {results.map((post) => (
                  <div key={post.slug} className="w-full flex justify-center transform hover:scale-[1.02] transition-transform duration-300">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p
              className="text-muted-foreground text-center text-sm sm:text-base italic backdrop-blur-md bg-background/90 p-6 sm:p-8 rounded-2xl shadow-lg"
              role="status"
              aria-live="polite"
            >
              {query.trim() || selectedCategory ? 
                "Nenhum resultado encontrado para os critérios de busca" : 
                "Digite algo para começar a busca"}
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
