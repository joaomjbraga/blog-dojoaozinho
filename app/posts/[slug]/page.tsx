'use client'

import React, { useEffect } from 'react'
import { useReadPosts } from '@/hooks/useReadPosts'
import { useParams } from 'next/navigation'

export default function PostPage() {
  const params = useParams()
  const { markAsRead } = useReadPosts()
  const slug = params.slug as string

  useEffect(() => {
    // Marca como lido após 30 segundos na página
    const timer = setTimeout(() => {
      markAsRead(slug)
    }, 30000)

    return () => clearTimeout(timer)
  }, [slug, markAsRead])

  // Resto do componente da página do post...
  return (
    <div>
      {/* Conteúdo do post */}
    </div>
  )
}