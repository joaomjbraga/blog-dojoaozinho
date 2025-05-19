"use client"

import { PostCard } from "@/components/post-card"
import { getAllPosts } from "@/lib/mdx"
import { Post } from "@/types"
import { useState, useEffect } from "react"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [postsPerPage] = useState(6)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const allPosts = await getAllPosts()
        setPosts(allPosts)
        setVisiblePosts(allPosts.slice(0, postsPerPage))
      } catch (error) {
        console.error("Erro ao carregar posts:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [postsPerPage])

  const loadMorePosts = () => {
    const currentLength = visiblePosts.length
    const newPosts = posts.slice(currentLength, currentLength + postsPerPage)
    setVisiblePosts([...visiblePosts, ...newPosts])
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-6 sm:p-6 md:p-8 lg:p-12 max-w-[1440px] mx-auto w-full">
      <section className="text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in w-full max-w-4xl mb-8 sm:mb-12">
        <div className="relative px-2 sm:px-4">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary via-emerald-500 to-lime-600 bg-clip-text text-transparent leading-tight">
            Blog do Joãozinho
          </h1>
          <div className="absolute -z-10 w-full h-full blur-3xl opacity-20 bg-gradient-to-r from-primary via-emerald-500 to-lime-600 transform -translate-y-1/2"></div>
        </div>
        <p className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
          Bem-vindo ao meu blog! Aqui você encontra posts sobre tecnologia e design.
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-12 xs:w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
          <div className="w-6 xs:w-8 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-emerald-500 to-lime-600 rounded-full"></div>
        </div>
      </section>

      <section 
        className="w-full max-w-4xl px-2 sm:px-4" 
        aria-labelledby="latest-posts"
        role="region"
      >
        <div className="flex items-center justify-center mb-6 sm:mb-8 border-b pb-4">
          <h2 
            id="latest-posts" 
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-emerald-500 to-lime-600 bg-clip-text text-transparent"
          >
            Últimas Postagens
          </h2>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Carregando postagens...</p>
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-6"
            role="list"
            aria-label="Lista de postagens"
          >
            {visiblePosts.map((post) => (
              <div 
                key={post.slug}
                className="group relative transition-all duration-300 ease-out hover:scale-[1.02] focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-primary/60 rounded-xl shadow-sm hover:shadow-xl bg-card/50 backdrop-blur-sm"
                role="listitem"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-lime-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </section>

      {posts.length > visiblePosts.length && (
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 px-2 sm:px-4 w-full">
          <button 
            className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base font-semibold text-white bg-gradient-to-r from-primary via-emerald-500 to-lime-600 rounded-full hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed max-w-[300px]"
            aria-label="Carregar mais postagens"
            onClick={loadMorePosts}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Carregar mais</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 rounded-full bg-white mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </div>
      )}
    </main>
  )
}