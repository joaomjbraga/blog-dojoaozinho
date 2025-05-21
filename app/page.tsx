import { PostsFeed } from "@/components/PostsFeed"

export default function Home() {
  return (
    <main role="main" className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <header className="relative mb-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 blur-[120px] bg-gradient-to-br from-primary/30 via-muted to-primary/30 dark:from-primary/20 dark:via-muted/40 dark:to-primary/20 opacity-70 animate-pulse"></div>
          </div>
          <div className="relative space-y-6 lg:space-y-10 text-center px-2 sm:px-4 md:px-6">
            <h1
              className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                font-black
                text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent
                dark:from-primary dark:to-accent
                tracking-tight
                animate-shimmer
                "
              style={{ WebkitTextStroke: '0.5px transparent' }}
            >
              Blog do Joãozinho
            </h1>
            <p
              className="
                max-w-2xl mx-auto
                text-base sm:text-lg lg:text-xl
                text-foreground/80 dark:text-foreground/80
                leading-relaxed font-medium
                animate-fadeIn
              "
            >
              Bem-vindo ao meu blog! Aqui você encontra posts sobre tecnologia e design, 
              com insights e experiências que valem a pena compartilhar.
            </p>
          </div>
        </header>

        <section className="animate-fadeIn p-4 md:p-6 lg:p-8">
          <PostsFeed />
        </section>
      </div>
    </main>
  )
}
