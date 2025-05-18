"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import PostCard from "@/components/post-card"
import SearchBar from "@/components/search-bar"
import type { Post } from "@/lib/mdx"

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
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Resultados da Busca</h1>
        <SearchBar defaultValue={query} />
      </section>

      <section className="space-y-6">
        {loading ? (
          <div>Buscando...</div>
        ) : results.length > 0 ? (
          <>
            <p className="text-muted-foreground">
              Encontrado {results.length} resultado{results.length !== 1 ? "s" : ""} para "{query}"
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">Nenhum resultado encontrado para "{query}"</p>
        )}
      </section>
    </div>
  )
}
