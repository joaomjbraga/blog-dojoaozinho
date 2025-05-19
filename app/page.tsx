import { PostsFeed } from "@/components/PostsFeed"

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 md:py-16">
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 blur-[120px] bg-gradient-to-br from-green-300 via-lime-200 to-green-300 dark:from-green-900/40 dark:via-lime-900/40 dark:to-green-900/40 opacity-70 animate-pulse"></div>
          </div>
          <div className="relative space-y-6 xs:space-y-8 sm:space-y-10 md:space-y-12">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-green-500 dark:from-green-400 dark:via-lime-300 dark:to-green-300 tracking-tight text-center animate-shimmer px-2">
              Blog do Joãozinho
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium text-center px-3 xs:px-4 animate-fadeIn">
              Bem-vindo ao meu blog! Aqui você encontra posts sobre tecnologia e design, 
              com insights e experiências que valem a pena compartilhar.
            </p>
          </div>
        </div>
        
        <div className="mt-6 xs:mt-8 sm:mt-12 md:mt-16">
            <div className="animate-fadeIn p-3 xs:p-4 sm:p-8 md:p-10">
              <PostsFeed />
            </div>
        </div>
      </div>
    </main>
  )
}