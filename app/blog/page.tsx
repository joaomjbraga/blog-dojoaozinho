import { getAllPosts } from "@/lib/mdx"
import PostCard from "@/components/post-card"
import SearchBar from "@/components/search-bar"
import { Suspense } from "react"

export const metadata = {
  title: "Blog | João M J Braga",
  description: "Todos os posts do blog por João M J Braga",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground max-w-2xl">Navegue por todos os meus posts do blog</p>
      </section>

      <Suspense fallback={<div>Carregando busca...</div>}>
        <SearchBar />
      </Suspense>

      <section className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}