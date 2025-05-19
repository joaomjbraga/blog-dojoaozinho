import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <h1 className="text-6xl font-extrabold text-green-600">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Página não encontrada</h2>
      <p className="text-zinc-500 mt-1">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        href="/" 
        className="mt-6 px-5 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
