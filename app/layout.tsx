import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog do Joãozinho - Tecnologia, Linux e Desenvolvimento',
  description: 'Um blog sobre tecnologia, desenvolvimento web, Linux e outros tópicos relacionados à área de TI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="pt-br" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}