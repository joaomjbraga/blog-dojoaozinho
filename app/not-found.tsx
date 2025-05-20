import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-2 text-foreground">Página não encontrada</h2>
      <p className="text-muted-foreground mt-1">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        href="/" 
        className="mt-6 px-5 py-2 bg-primary text-primary-foreground rounded-xl shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
