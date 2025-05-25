"use client"

import { motion } from 'framer-motion'
import { Post } from '@/types'
import { PostCard } from './PostCard'
import { useReadPosts } from '@/hooks/useReadPosts'

interface PostsFeedProps {
  posts: Post[]
}

export const PostsFeed: React.FC<PostsFeedProps> = ({ posts }) => {
  const { isRead } = useReadPosts()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Últimas Postagens</h2>
      </div>

      {posts.length === 0 && (
        <p className="text-center text-muted-foreground">
          Nenhum post disponível no momento.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PostCard 
              post={post} 
              isRead={isRead(post.slug)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
