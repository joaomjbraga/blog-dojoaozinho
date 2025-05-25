import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Progresso de Leitura | Blog do João',
  description: 'Acompanhe seu progresso de leitura e organize seus posts favoritos do Blog do João.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function LeituraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}