import { PostsFeed } from "@/components/PostsFeed"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 blur-[100px] bg-gradient-to-tr from-lime-100 via-gray-50 to-green-100 dark:from-lime-900/30 dark:via-gray-900/30 dark:to-green-900/30 opacity-60"></div>
          </div>
          <div className="relative space-y-6 sm:space-y-8 md:space-y-10">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-500 dark:from-lime-400 dark:to-green-300 tracking-tight text-center">
              Blog do Joãozinho
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal text-center px-4">
              Bem-vindo ao meu blog! Aqui você encontra posts sobre tecnologia e design, 
              com insights e experiências que valem a pena compartilhar.
            </p>
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-lime-500/50 to-transparent"></span>
              <h2 className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200">Últimas Postagens</h2>
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-lime-500/50 to-transparent"></span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 md:mt-16">
            <div className="animate-fadeIn p-4 sm:p-8 md:p-10">
              <PostsFeed />
            </div>
        </div>
      </div>
    </main>
  )
}