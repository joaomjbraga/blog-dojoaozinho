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
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Seu Progresso de Leitura</h3>
                <p className="text-muted-foreground text-sm">
                  {readCount} de {posts.length} posts lidos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{Math.round((readCount / posts.length) * 100) || 0}%</div>
                <div className="text-xs text-muted-foreground">Completo</div>
              </div>
              <Link 
                href="/leitura"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Ver Detalhes
              </Link>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
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
