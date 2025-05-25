'use client'

import { Check, BookOpen } from 'lucide-react'
import { Button } from './ui/button'
import { useReadPosts } from '@/hooks/useReadPosts'
import { cn } from '@/lib/utils'

interface PostReadButtonProps {
  postSlug: string
  className?: string
}

export const PostReadButton: React.FC<PostReadButtonProps> = ({
  postSlug,
  className
}) => {
  const { isRead, markAsRead, markAsUnread } = useReadPosts()
  const postIsRead = isRead(postSlug)

  const handleToggle = () => {
    if (postIsRead) {
      markAsUnread(postSlug)
    } else {
      markAsRead(postSlug)
    }
  }

  return (
    <Button
      onClick={handleToggle}
      variant={postIsRead ? "default" : "outline"}
      className={cn(
        "gap-2 transition-all duration-300",
        postIsRead && "bg-green-600 hover:bg-green-700 text-white",
        className
      )}
    >
      {postIsRead ? (
        <Check className="w-4 h-4" />
      ) : (
        <BookOpen className="w-4 h-4" />
      )}
      {postIsRead ? 'Marcar como não lido' : 'Marcar como lido'}
    </Button>
  )
}