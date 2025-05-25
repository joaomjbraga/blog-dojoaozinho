'use client'

import React, { useState, useEffect } from 'react'
import { ReadingStats } from '@/components/ReadingStats'
import { ReadingFilters, ReadingFilter } from '@/components/ReadingFilters'
import { PostsFeed } from '@/components/PostsFeed'
import { useReadPosts } from '@/hooks/useReadPosts'
import { Post } from '@/types/index'
import { getAllPosts } from '@/lib/mdx'
import { BookOpen, TrendingUp, Target } from 'lucide-react'

export default function LeituraPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentFilter, setCurrentFilter] = useState<ReadingFilter>('all')
  const [loading, setLoading] = useState(true)
  
  const readPosts = useReadPosts()

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

  const filteredPosts = posts.filter(post => {
    if (currentFilter === 'read') return readPosts.isRead(post.slug)
    if (currentFilter === 'unread') return !readPosts.isRead(post.slug)
    return true
  })

  const readCount = readPosts.getReadCount()
  const unreadCount = posts.length - readCount

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-16 bg-muted rounded-lg"></div>
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header da página */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Progresso de Leitura</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe seu progresso de leitura, organize seus posts e mantenha-se atualizado com o conteúdo do blog.
          </p>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{posts.length}</h3>
            <p className="text-muted-foreground">Total de Posts</p>
          </div>

          <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{readCount}</h3>
            <p className="text-muted-foreground">Posts Lidos</p>
          </div>

          <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg mx-auto mb-4">
              <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{unreadCount}</h3>
            <p className="text-muted-foreground">Ainda não lidos</p>
          </div>
        </div>

        {/* Estatísticas de leitura */}
        <ReadingStats totalPosts={posts.length} className="mb-6" />

        {/* Filtros */}
        <ReadingFilters
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          readCount={readCount}
          unreadCount={unreadCount}
          className="mb-8"
        />

        {/* Feed de posts filtrados */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {currentFilter === 'all' && 'Todos os Posts'}
                {currentFilter === 'read' && 'Posts Lidos'}
                {currentFilter === 'unread' && 'Posts não Lidos'}
              </h2>
              <span className="text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
            <PostsFeed posts={filteredPosts} />
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border/50 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {currentFilter === 'read' && 'Nenhum post lido ainda'}
                {currentFilter === 'unread' && 'Parabéns! Todos os posts foram lidos!'}
                {currentFilter === 'all' && 'Nenhum post encontrado'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {currentFilter === 'read' && 'Comece a ler alguns posts para vê-los aqui.'}
                {currentFilter === 'unread' && 'Você está em dia com todo o conteúdo do blog.'}
                {currentFilter === 'all' && 'Não há posts disponíveis no momento.'}
              </p>
              {currentFilter !== 'all' && (
                <button
                  onClick={() => setCurrentFilter('all')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Ver todos os posts
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}