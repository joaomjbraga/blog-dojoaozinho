import BlogForm from '@/components/BlogForm';
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
    <main className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 max-w-7xl">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-foreground tracking-tight">Sobre o Blog</h1>
      
      <div className="space-y-6 sm:space-y-8">
        <section className="bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border border-border/50">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Informações</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              O Blog é um projeto pessoal com objetivo de compartilhar conhecimentos sobre tecnologia, desenvolvimento web, Linux e outros tópicos 
              relacionados à área de TI.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
              Com foco em criar conteúdos educativos e acessíveis, ajudando outros estudantes e 
              profissionais a aprofundarem seus conhecimentos técnicos através de tutoriais práticos 
              e artigos explicativos.
            </p>
          </div>
        </section>
      
        <section className="bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border border-border/50">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Sobre o Autor</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            <div className="w-full md:w-1/4 flex justify-center md:justify-start">
              <img 
                src="https://avatars.githubusercontent.com/u/195451083?v=4" 
                alt="João Marcos" 
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-3/4">
              <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 text-foreground text-center md:text-left">João Marcos</h3>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Graduando em Análise e Desenvolvimento de Sistemas na Estácio. Apaixonado por 
                  tecnologia, Linux e desenvolvimento web.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                  Entusiasta de sistemas operacionais e software livre, João compartilha seu 
                  conhecimento e experiências através deste blog, com foco especial em Linux e 
                  suas distribuições, como Arch Linux e Ubuntu.
                </p>
              </div>
            </div>
          </div>
        </section>
      
        <section className="bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border border-border/50">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Contato</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
            Tem sugestões, dúvidas ou gostaria de contribuir com o blog? Entre em contato através 
            dos canais abaixo:
          </p>
          <BlogForm />
        </section>
      </div>
    </main>
  );
}