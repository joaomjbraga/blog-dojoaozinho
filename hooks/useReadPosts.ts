'use client'

import { useState, useEffect } from 'react'

export const useReadPosts = () => {
  const [readPosts, setReadPosts] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const stored = localStorage.getItem('readPosts')
    if (stored) {
      try {
        setReadPosts(JSON.parse(stored))
      } catch (error) {
        console.error('Erro ao carregar posts lidos:', error)
        setReadPosts([])
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('readPosts', JSON.stringify(readPosts))
    }
  }, [readPosts, isClient])

  const markAsRead = (postSlug: string) => {
    setReadPosts(prev => {
      if (!prev.includes(postSlug)) {
        return [...prev, postSlug]
      }
      return prev
    })
  }

  const markAsUnread = (postSlug: string) => {
    setReadPosts(prev => prev.filter(slug => slug !== postSlug))
  }

  const isRead = (postSlug: string) => {
    return readPosts.includes(postSlug)
  }

  const getReadCount = () => {
    return readPosts.length
  }

  const clearAllRead = () => {
    setReadPosts([])
  }

  return {
    markAsRead,
    markAsUnread,
    isRead,
    getReadCount,
    clearAllRead
  }
}
