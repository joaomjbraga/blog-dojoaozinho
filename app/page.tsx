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
      <div className="flex flex-col items-center justify-center space-y-6 mb-12">
        {/* Author Image */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-primary/30 overflow-hidden shadow-xl">
            <img
              src="https://avatars.githubusercontent.com/u/195451083?v=4"
              alt="Joãozinho"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="absolute -bottom-2 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="animate-pulse w-4 h-4 bg-primary-foreground rounded-full"></span>
          </div>
        </div>

        {/* Title with decorative elements */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl"></div>
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-8 py-4 backdrop-blur-sm bg-background/30 rounded-2xl border border-primary/30 shadow-2xl">
            Blog do Joãozinho
          </h2>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-center text-sm sm:text-base md:text-lg max-w-2xl px-4 py-3 bg-gradient-to-r from-background/50 via-background/80 to-background/50 rounded-xl backdrop-blur-sm">
          Bem-vindo ao meu espaço digital onde compartilho conhecimentos, experiências e reflexões sobre tecnologia, programação e desenvolvimento web.
        </p>

        {/* Animated decorative elements */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-pulse"></div>
          <div className="w-3 h-3 rotate-45 bg-primary/30 animate-bounce delay-100"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-pulse"></div>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center space-x-4 mt-2">
          <a href="https://github.com/joaomjbraga" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/joaomjbraga" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://instagram.com/joaomjbraga" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>      </div>
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
