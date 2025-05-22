import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre o blog */}
          <div>
            <h3 className="text-xl font-bold mb-4">Blog do Joãozinho</h3>
            <p className="text-gray-300 mb-4">
              Um blog sobre tecnologia, desenvolvimento web, Linux e outros tópicos relacionados à área de TI.
            </p>
          </div>
          
          {/* Links rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-gray-300 hover:text-white transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-300 hover:text-white transition-colors">
                  Todos os Posts
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categorias populares */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categorias Populares</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/categorias/linux" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Linux
                </Link>
              </li>
              <li>
                <Link 
                  href="/categorias/sistemas-operacionais" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sistemas Operacionais
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Blog do Joãozinho. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}