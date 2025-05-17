import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Meu Blog</h1>
      <ul className="space-y-2">
        {posts.map(({ slug, title, date }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`} className="text-blue-600 hover:underline">
              {title}
            </Link>
            <p className="text-sm text-gray-500">{date}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
