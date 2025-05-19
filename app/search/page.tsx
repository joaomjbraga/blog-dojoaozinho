"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import SearchBar from "@/components/search-bar"
import type { Post } from "@/lib/mdx"
import { PostCard } from "@/components/post-card"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true)

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error("Erro ao buscar resultados:", error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchSearchResults()
    } else {
      setResults([])
      setLoading(false)
    }
  }, [query])

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-12 sm:py-16" role="main">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        <section 
          className="space-y-6 text-center md:hidden" 
          aria-label="Área de busca"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Resultados da Busca
          </h1>
          <div className="max-w-2xl mx-auto w-full">
            <SearchBar 
              defaultValue={query} 
              aria-label="Campo de busca"
            />
          </div>
        </section>

        <section 
          className="space-y-8" 
          aria-label="Resultados da busca"
        >
          {loading ? (
            <div 
              role="status" 
              aria-live="polite" 
              className="flex items-center justify-center p-6 animate-pulse"
            >
              <span className="sr-only">Carregando resultados</span>
              <div className="text-lg">Buscando...</div>
            </div>
          ) : results.length > 0 ? (
            <>
              <p 
                className="text-muted-foreground text-center text-lg" 
                aria-live="polite"
              >
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
          ) : query ? (
            <p 
              className="text-muted-foreground text-center text-lg" 
              role="status" 
              aria-live="polite"
            >
              Nenhum resultado encontrado para "{query}"
            </p>
          ) : (
            <p 
              className="text-muted-foreground text-center text-lg" 
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
