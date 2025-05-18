import { getAllPosts } from "@/lib/mdx"

import SearchBar from "@/components/search-bar"
import { Suspense } from "react"
import { PostCard } from "@/components/post-card"

export const metadata = {
  title: "Blog | João M J Braga",
  description: "Todos os posts do blog por João M J Braga",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <section className="space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Blog
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed">
          Navegue por todos os posts do blog
        </p>
      </section>

      <Suspense 
        fallback={
          <div role="status" className="flex items-center justify-center p-4 rounded-lg bg-muted/50">
            <span className="sr-only">Carregando busca</span>
            <div className="animate-pulse flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted-foreground animate-spin"></div>
              <span className="text-muted-foreground">Carregando busca...</span>
            </div>
          </div>
        }
      >
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar />
        </div>
      </Suspense>

      <section aria-label="Lista de posts" className="space-y-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <article 
              key={post.slug}
              className="transition-transform hover:scale-[1.02] focus-within:scale-[1.02]"
            >
              <PostCard post={post} />
            </article>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Nenhum post encontrado
          </p>
        )}
      </section>
    </main>
  )
}