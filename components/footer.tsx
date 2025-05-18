import { Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 w-full bg-background" role="contentinfo">
      <div className="container mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-6 lg:py-8 flex flex-col md:flex-row justify-between items-center gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
        <div className="flex flex-col items-center md:items-start space-y-1 xs:space-y-2 sm:space-y-3 w-full md:w-auto">
          <p className="text-[10px] xs:text-[11px] sm:text-sm lg:text-base text-gray-500 dark:text-gray-400 text-center md:text-left font-sans max-w-[240px] xs:max-w-[280px] sm:max-w-none">
            © {year} João M J Braga. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 lg:gap-5">
          <a 
            target="_blank" 
            href="https://instagram.com/joaomjbraga" 
            className="text-gray-500 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50/50 dark:hover:bg-lime-950/50 p-0.5 xs:p-1 sm:p-1.5 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-110" 
            aria-label="Visitar perfil do Instagram de João M J Braga"
          >
            <Instagram className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </a>
          <a 
            target="_blank" 
            href="https://linkedin.com/in/joaomjbraga" 
            className="text-gray-500 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50/50 dark:hover:bg-lime-950/50 p-0.5 xs:p-1 sm:p-1.5 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-110" 
            aria-label="Visitar perfil do LinkedIn de João M J Braga"
          >
            <Linkedin className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </a>
          <a 
            target="_blank" 
            href="https://github.com/joaomjbraga" 
            className="text-gray-500 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50/50 dark:hover:bg-lime-950/50 p-0.5 xs:p-1 sm:p-1.5 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-110" 
            aria-label="Visitar perfil do GitHub de João M J Braga"
          >
            <Github className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}