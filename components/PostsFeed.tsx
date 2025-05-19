"use client"

import { useEffect, useRef, useState } from "react"
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

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts()
        }
      },
      {
        rootMargin: "300px",
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [observerRef.current, hasMore, loading])

  async function loadPosts() {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/posts?page=${page}&limit=${limit}`)
      if (!res.ok) throw new Error(`Erro ao carregar posts: ${res.status}`)
      const data = (await res.json()) as PostsResponse
      setPosts(prev => [...prev, ...data.posts])
      setHasMore(data.hasMore)
      setPage(prev => prev + 1)
    } catch (err) {
      console.error("Erro ao buscar posts:", err)
      setError(err instanceof Error ? err.message : "Não foi possível carregar os posts. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-[2400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-10">

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 shadow-lg backdrop-blur-md mx-auto max-w-2xl text-center"
        >
          <p className="font-medium">{error}</p>
          <button
            onClick={() => loadPosts()}
            className="mt-2 text-sm underline hover:text-destructive/80 transition-colors"
          >
            Tentar novamente
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-background/50 backdrop-blur-sm border border-muted/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10 group-hover:via-background/10 group-hover:to-background/20 transition-all duration-300" />
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      <div ref={observerRef} className="h-12" />

      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-6 sm:pt-8"
        >
          <div className="flex items-center gap-3 text-primary bg-primary/5 px-6 py-3 rounded-full shadow-lg">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
            <span className="font-medium">Carregando mais posts...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
