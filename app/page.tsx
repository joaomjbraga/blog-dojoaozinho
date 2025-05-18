import { PostCard } from "@/components/post-card"
import { getAllPosts } from "@/lib/mdx"


export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <section className="text-center space-y-6 sm:space-y-8 animate-fade-in w-full max-w-4xl mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-lime-600 bg-clip-text text-transparent px-4">
          Blog do Joãozinho
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
          Bem-vindo ao meu blog! Aqui você encontra posts sobre tecnologia e design.
        </p>
        <div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-primary to-lime-600 rounded-full mx-auto"></div>
      </section>

      <section 
        className="w-full max-w-3xl px-4" 
        aria-labelledby="latest-posts"
        role="region"
      >
        <div className="flex items-center justify-center mb-8 sm:mb-10 border-b pb-4 sm:pb-6">
          <h2 
            id="latest-posts" 
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary/80 to-lime-600/80 bg-clip-text text-transparent"
          >
            Últimas Postagens
          </h2>
        </div>
        <div 
          className="flex flex-col gap-6 sm:gap-8"
          role="list"
          aria-label="Lista de postagens"
        >
          {posts.map((post) => (
            <div 
              key={post.slug}
              className="group transition-all duration-300 ease-in-out hover:scale-[1.02] focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-primary rounded-xl shadow-md hover:shadow-lg w-full"
              role="listitem"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {posts.length > 6 && (
        <div className="flex justify-center mt-10 sm:mt-12 px-4">
          <button 
            className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-primary to-lime-600 rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md"
            aria-label="Carregar mais postagens"
          >
            Carregar mais
          </button>
        </div>
      )}
    </main>
  )
}