"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import SearchBar from "@/components/search-bar"
import type { Post } from "@/lib/mdx"
import { PostCard } from "@/components/post-card"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [results, setResults] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cache simples: Map<query, results>
  const cacheRef = useRef<Map<string, Post[]>>(new Map())

  useEffect(() => {
    // Se estiver vazio, limpar tudo e sair
    if (!query.trim()) {
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
      // Se já tem cache, usa direto
      if (cacheRef.current.has(query)) {
        setResults(cacheRef.current.get(query) || [])
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

      fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then(res => {
          if (!res.ok) throw new Error(`Erro na requisição: ${res.statusText}`)
          return res.json()
        })
        .then((data: Post[]) => {
          cacheRef.current.set(query, data)
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
  }, [query])

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
              Digite algo para começar a busca
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
