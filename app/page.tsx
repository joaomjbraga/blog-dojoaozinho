import { getAllPosts } from "@/lib/mdx"
import PostCard from "@/components/post-card"

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <section className="space-y-4">
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Bem-vindo ao meu blog pessoal onde compartilho meus pensamentos sobre tecnologia, design e vida.
        </p>
      </section>

      <section className="space-y-6" aria-labelledby="latest-posts">
        <h2 id="latest-posts" className="text-xl md:text-2xl font-semibold tracking-tight">
          Últimas Postagens
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}