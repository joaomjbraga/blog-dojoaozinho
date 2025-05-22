import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre | Blog do Joãozinho',
  description: 'Conheça mais sobre o Blog do Joãozinho e seu autor',
  icons: {
    icon: '/favicon.svg',
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8 sm:py-16 max-w-6xl">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 animate-fade-in">Sobre o Blog</h1>
          <div className="w-16 sm:w-24 h-1 bg-primary/50 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-6 sm:gap-8 md:gap-12">
          <section className="bg-card/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-primary/20 transition-all duration-500">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary/80 mb-4 sm:mb-6">Informações</h2>
            <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed">
                O Blog é um projeto pessoal com objetivo de compartilhar conhecimentos sobre tecnologia, desenvolvimento web, Linux e outros tópicos relacionados à área de TI.

                Com foco em criar conteúdos educativos e acessíveis, ajudando outros estudantes e profissionais a aprofundarem seus conhecimentos técnicos através de tutoriais práticos e artigos explicativos.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-card/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-primary/20 transition-all duration-500">
              <div className="flex flex-col items-center">
                <img 
                  src="https://avatars.githubusercontent.com/u/195451083?v=4"
                  alt="João Marcos"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-primary/30 shadow-xl mb-4 sm:mb-6 hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <h2 className="text-xl sm:text-2xl font-bold text-primary/80 mb-2 sm:mb-4">João Marcos</h2>
                <p className="text-sm sm:text-base text-muted-foreground text-center">
                  Desenvolvedor Web & Entusiasta Linux
                </p>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-primary/20 transition-all duration-500">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary/80 mb-4 sm:mb-6">Sobre o Autor</h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                 Graduando em Análise e Desenvolvimento de Sistemas na Estácio. Apaixonado por tecnologia, Linux e desenvolvimento web.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Entusiasta de sistemas operacionais e software livre, João compartilha seu conhecimento e experiências através deste blog, com foco especial em Linux e suas distribuições, como Arch Linux, Ubuntu e derivados.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-primary/20 transition-all duration-500">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary/80 mb-4 sm:mb-8 text-center">Conecte-se Comigo</h2>
            <p className="text-sm sm:text-base text-center mb-6">Tem sugestões, dúvidas ou gostaria de contribuir com o blog? Entre em contato através dos canais abaixo:</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <a 
                href="https://github.com/joaomjbraga"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 sm:gap-3 bg-card/50 hover:bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">GitHub</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/joaomjbraga"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 sm:gap-3 bg-card/50 hover:bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">LinkedIn</span>
              </a>
              
              <a 
                href="https://instagram.com/joaomjbraga"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 sm:gap-3 bg-card/50 hover:bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">Instagram</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}