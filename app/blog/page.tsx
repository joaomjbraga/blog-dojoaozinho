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
    <main className="container mx-auto px-4 py-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">Navegue por todos os meus posts do blog</p>
      </section>

      <Suspense 
        fallback={
          <div role="status" className="flex items-center justify-center">
            <span className="sr-only">Carregando busca</span>
            <div className="animate-pulse">Carregando busca...</div>
          </div>
        }
      >
        <SearchBar />
      </Suspense>

      <section className="space-y-6">
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug}>
              <PostCard post={post} />
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}