import { PostsFeed } from "@/components/PostsFeed"

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8 md:py-12 lg:py-16">
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 blur-[120px] bg-gradient-to-br from-primary/30 via-muted to-primary/30 dark:from-primary/20 dark:via-muted/40 dark:to-primary/20 opacity-70 animate-pulse"></div>
          </div>
          <div className="relative space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent dark:from-primary dark:to-accent tracking-tight text-center animate-shimmer px-2">
              Blog do Joãozinho
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-foreground/80 dark:text-foreground/80 max-w-2xl mx-auto leading-relaxed font-medium text-center px-2 sm:px-3 md:px-4 animate-fadeIn">
              Bem-vindo ao meu blog! Aqui você encontra posts sobre tecnologia e design, 
              com insights e experiências que valem a pena compartilhar.
            </p>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12">
            <div className="animate-fadeIn p-2 sm:p-4 md:p-6 lg:p-8">
              <PostsFeed />
            </div>
        </div>
      </div>
    </main>
  )
}