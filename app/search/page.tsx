"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import SearchBar from "@/components/search-bar"
import type { Post } from "@/lib/mdx"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Category {
  name: string
  slug: string
  count: number
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

  // Cache simples: Map<query+category, results>
  const cacheRef = useRef<Map<string, Post[]>>(new Map())

  // Buscar categorias disponíveis
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
    // Se estiver vazio, limpar tudo e sair
    if (!query.trim() && !selectedCategory) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    // Debounce: cancela timeout anterior
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      // Construir a chave de cache
      const cacheKey = `${query}:${selectedCategory}`
      
      // Se já tem cache, usa direto
      if (cacheRef.current.has(cacheKey)) {
        setResults(cacheRef.current.get(cacheKey) || [])
        setLoading(false)
        setError(null)
        return
      }

      // Cancela fetch anterior se existir
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const controller = new AbortController()
      abortControllerRef.current = controller

      setLoading(true)
      setError(null)

      // Construir a URL com os parâmetros
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
          if (err.name === "AbortError") {
            // Fetch abortado, não faz nada
            return
          }
          console.error("Erro ao buscar resultados:", err)
          setError("Erro ao buscar resultados. Tente novamente mais tarde.")
          setLoading(false)
        })
    }, 300) // debounce de 300ms

    // Cleanup no useEffect para cancelar debounce e fetch no unmount/query change
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [query, selectedCategory])

  // Função para aplicar filtro de categoria
  const handleCategoryFilter = (categorySlug: string) => {
    // Se já está selecionada, remove o filtro
    if (categorySlug === selectedCategory) {
      setSelectedCategory("")
      // Atualiza a URL sem o parâmetro de categoria
      window.history.pushState(
        {}, 
        "", 
        `/search?q=${encodeURIComponent(query)}`
      )
    } else {
      setSelectedCategory(categorySlug)
      // Atualiza a URL com o novo parâmetro de categoria
      window.history.pushState(
        {}, 
        "", 
        `/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(categorySlug)}`
      )
    }
  }

  // Função para limpar o filtro de categoria
  const clearCategoryFilter = () => {
    setSelectedCategory("")
    window.history.pushState(
      {}, 
      "", 
      `/search?q=${encodeURIComponent(query)}`
    )
  }

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-4 py-12 sm:py-16"
      role="main"
    >
      <div className="w-full max-w-6xl mx-auto space-y-10">
        <section className="space-y-6 text-center md:hidden" aria-label="Área de busca">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Resultados da Busca
          </h1>
          <div className="max-w-2xl mx-auto w-full">
            <SearchBar defaultValue={query} aria-label="Campo de busca" />
          </div>
        </section>

        {/* Filtro de categorias */}
        {categories.length > 0 && (
          <section className="space-y-4" aria-label="Filtro de categorias">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category.slug)}
                  className="rounded-full"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
            
            {selectedCategory && (
              <div className="flex justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCategoryFilter}
                  className="text-muted-foreground flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Limpar filtro de categoria
                </Button>
              </div>
            )}
          </section>
        )}

        <section className="space-y-8" aria-label="Resultados da busca">
          {loading ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center p-6 animate-pulse"
            >
              <span className="sr-only">Carregando resultados</span>
              <div className="text-lg">Buscando...</div>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="text-center text-red-600 font-semibold bg-red-100 p-4 rounded-md"
            >
              {error}
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="text-muted-foreground text-center text-lg" aria-live="polite">
                Encontrado {results.length} resultado{results.length !== 1 ? "s" : ""} para "{query}"
                {selectedCategory && " na categoria selecionada"}
              </p>
              <div className="grid gap-6 grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {results.map((post) => (
                  <div key={post.slug} className="w-full flex justify-center">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p
              className="text-muted-foreground text-center text-lg italic text-gray-500 dark:text-gray-400"
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
