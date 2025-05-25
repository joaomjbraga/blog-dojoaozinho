'use client'

import React, { useState, useEffect } from 'react'
import { PostsFeed } from '@/components/PostsFeed'
import { useReadPosts } from '@/hooks/useReadPosts'
import { Post } from '@/types/index'
import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import { BookOpen, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  
  const readPosts = useReadPosts()
  const readCount = readPosts.getReadCount()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts()
        setPosts(allPosts)
      } catch (error) {
        console.error('Erro ao carregar posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container w-full max-w-[2400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
        <span className="h-[1px] sm:h-[2px] w-4 xs:w-6 sm:w-8 md:w-12 lg:w-20 bg-gradient-to-r from-primary/70 via-primary/70 to-transparent rounded-full"></span>
        <h2 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-2xl font-semibold text-foreground px-1.5 xs:px-2 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 backdrop-blur-sm bg-background/10 rounded-full border border-border/20 shadow-lg">
          Blog do João
        </h2>
        <span className="h-[1px] sm:h-[2px] w-4 xs:w-6 sm:w-8 md:w-12 lg:w-20 bg-gradient-to-l from-primary/70 via-primary/70 to-transparent rounded-full"></span>
      </div>

      {/* Banner de progresso de leitura */}
      {readCount > 0 && (
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">Seu Progresso de Leitura</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {readCount} de {posts.length} posts lidos
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 sm:gap-4">
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold text-primary">{Math.round((readCount / posts.length) * 100) || 0}%</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Completo</div>
              </div>
              <Link 
                href="/leitura"
                className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                Ver Detalhes
              </Link>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mt-3 sm:mt-4">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-1.5 sm:h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((readCount / posts.length) * 100) || 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Feed de posts */}
      <PostsFeed posts={posts} />
    </div>
  )
}
