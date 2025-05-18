export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t w-full" role="contentinfo">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground text-center md:text-left break-words max-w-full min-w-[200px] overflow-hidden text-wrap">
          <p className="text-balance">
            © {year} João M J Braga. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}