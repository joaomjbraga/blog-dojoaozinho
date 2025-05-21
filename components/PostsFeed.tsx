"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { PostCard } from "@/components/post-card"
import { Post } from "@/types"
import { motion } from "framer-motion"

interface PostsResponse {
  posts: Post[]
  hasMore: boolean
}

export function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const limit = 8

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/posts?page=${page}&limit=${limit}`)
      if (!res.ok) throw new Error(`Erro ao carregar posts: ${res.status}`)
      const data = (await res.json()) as PostsResponse
      if (!Array.isArray(data.posts)) {
        throw new Error("Resposta inválida do servidor")
      }
      setPosts(prev => [...prev, ...data.posts])
      setHasMore(data.hasMore)
      setPage(prev => prev + 1)
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Erro ao buscar posts:", err)
      }
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page])

  useEffect(() => {
    const el = observerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts()
        }
      },
      { rootMargin: "300px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, loadPosts])

  return (
    <div
      className="container max-w-[2400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 md:py-10 space-y-6 md:space-y-8"
      aria-live="polite"
    >
      <div className="flex items-center justify-center space-x-3 xs:space-x-4 sm:space-x-6 lg:space-x-8">
        <span className="h-[2px] w-6 xs:w-8 sm:w-12 lg:w-20 bg-gradient-to-r from-primary/70 via-primary/70 to-transparent rounded-full"></span>
        <h2 className="text-sm xs:text-base sm:text-lg lg:text-2xl font-semibold text-foreground px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 backdrop-blur-sm bg-background/10 rounded-full border border-border/20 shadow-lg">
          Últimas Postagens
        </h2>
        <span className="h-[2px] w-6 xs:w-8 sm:w-12 lg:w-20 bg-gradient-to-l from-primary/70 via-primary/70 to-transparent rounded-full"></span>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 sm:p-4 bg-destructive/10 text-destructive rounded-lg sm:rounded-xl border border-destructive/20 shadow-lg backdrop-blur-md mx-auto max-w-2xl text-center"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm sm:text-base font-medium">{error}</p>
          <button
            onClick={() => loadPosts()}
            disabled={loading}
            aria-label="Tentar carregar posts novamente"
            className="mt-2 text-xs sm:text-sm underline hover:text-destructive/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Tentar novamente
          </button>
        </motion.div>
      )}

      {posts.length === 0 && !loading && !error && (
        <p className="text-center text-muted-foreground text-xs sm:text-sm">Nenhum post disponível no momento.</p>
      )}

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 lg:gap-5" aria-live="polite">
        {posts.map((post) => (
          <motion.div
            key={post.slug}
            className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-background/50 backdrop-blur-sm border border-muted/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10 group-hover:via-background/10 group-hover:to-background/20 transition-all duration-300" />
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      <div ref={observerRef} className="h-8 sm:h-12" />

      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-4 sm:pt-6"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex items-center gap-2 sm:gap-3 text-primary bg-primary/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
            <span className="sr-only">Carregando mais posts...</span>
            <span className="text-sm sm:text-base font-medium">Carregando mais posts...</span>
          </div>
        </motion.div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="text-center text-muted-foreground text-xs sm:text-sm">Você chegou ao fim!</p>
      )}
    </div>
  )
}
