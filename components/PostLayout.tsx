'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { Calendar, ArrowLeft, Tag, User } from 'lucide-react'
import Link from 'next/link'
import { Post } from '@/types'
import { PostReadButton } from './PostReadButton'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface PostLayoutProps {
  post: Post
  children: ReactNode
}

// Componente customizado para iframes responsivos
const ResponsiveIframe = ({ 
  src, 
  title, 
  width = "560", 
  height = "315", 
  className = "",
  ...props 
}: any) => {
  // Lista de domínios permitidos para iframes
  const allowedDomains = [
    'youtube.com',
    'www.youtube.com',
    'youtu.be',
    'vimeo.com',
    'player.vimeo.com',
    'codepen.io',
    'codesandbox.io',
    'stackblitz.com',
    'github.com',
    'gist.github.com',
    'docs.google.com',
    'drive.google.com'
  ]

  // Verifica se o src é de um domínio permitido
  const isAllowedDomain = (url: string) => {
    try {
      const urlObj = new URL(url)
      return allowedDomains.some(domain => 
        urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
      )
    } catch {
      return false
    }
  }

  if (!src || !isAllowedDomain(src)) {
    return (
      <div className="w-full max-w-full bg-muted border border-border rounded-lg p-3 sm:p-4 my-4 mx-auto">
        <p className="text-muted-foreground text-xs sm:text-sm break-all">
          ⚠️ Iframe não permitido ou URL inválida: {src}
        </p>
      </div>
    )
  }

  // Calcula aspect ratio baseado nas dimensões
  const aspectRatio = (parseInt(height) / parseInt(width)) * 100

  return (
    <div className="w-full max-w-full my-4 sm:my-6">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-muted mx-auto max-w-full">
        <div 
          className="relative w-full"
          style={{ 
            paddingBottom: `${Math.min(aspectRatio, 75)}%`,
            minHeight: '200px'
          }}
        >
          <iframe
            src={src}
            title={title || "Embedded content"}
            className={`absolute top-0 left-0 w-full h-full border-0 ${className}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
            {...props}
          />
        </div>
      </div>
      {title && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center italic px-2">
          {title}
        </p>
      )}
    </div>
  )
}

// Componente para tabelas responsivas
const ResponsiveTable = ({ children, ...props }: any) => (
  <div className="w-full max-w-full my-4 sm:my-6 overflow-hidden rounded-lg border border-border shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full w-full text-xs sm:text-sm" {...props}>
        {children}
      </table>
    </div>
  </div>
)

// Componentes customizados para MDX com responsividade completa
const mdxComponents = {
  iframe: ResponsiveIframe,
  
  table: ResponsiveTable,
  
  th: ({ children, ...props }: any) => (
    <th className="border-b border-border px-2 sm:px-4 py-2 sm:py-3 bg-muted font-semibold text-left text-foreground text-xs sm:text-sm whitespace-nowrap" {...props}>
      {children}
    </th>
  ),
  
  td: ({ children, ...props }: any) => (
    <td className="border-b border-border px-2 sm:px-4 py-2 sm:py-3 text-muted-foreground text-xs sm:text-sm" {...props}>
      <div className="break-words max-w-[150px] sm:max-w-none">
        {children}
      </div>
    </td>
  ),
  
  img: ({ src, alt, ...props }: any) => (
    <div className="relative my-4 sm:my-6 w-full max-w-full">
      <div className="relative w-full max-w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className="w-full h-auto object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
          {...props}
        />
      </div>
      {alt && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center italic px-2">
          {alt}
        </p>
      )}
    </div>
  ),
  
  h1: ({ children, ...props }: any) => (
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-foreground scroll-mt-20 break-words" {...props}>
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: any) => (
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3 text-foreground scroll-mt-20 break-words" {...props}>
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: any) => (
    <h3 className="text-base sm:text-lg md:text-xl font-medium mt-4 mb-2 text-foreground scroll-mt-20 break-words" {...props}>
      {children}
    </h3>
  ),
  
  p: ({ children, ...props }: any) => (
    <p className="mb-3 sm:mb-4 leading-relaxed text-muted-foreground text-sm sm:text-base break-words" {...props}>
      {children}
    </p>
  ),
  
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 text-muted-foreground ml-2 sm:ml-4 text-sm sm:text-base" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 text-muted-foreground ml-2 sm:ml-4 text-sm sm:text-base" {...props}>
      {children}
    </ol>
  ),
  
  li: ({ children, ...props }: any) => (
    <li className="mb-1 break-words" {...props}>
      {children}
    </li>
  ),
  
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-2 sm:border-l-4 border-primary pl-3 sm:pl-4 my-3 sm:my-4 italic text-muted-foreground bg-muted/30 py-2 sm:py-3 rounded-r-lg text-sm sm:text-base" {...props}>
      {children}
    </blockquote>
  ),
  
  code: ({ children, ...props }: any) => (
    <code className="bg-muted px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono text-foreground break-all" {...props}>
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }: any) => (
    <div className="w-full max-w-full my-3 sm:my-4 overflow-hidden rounded-lg border border-border">
      <div className="overflow-x-auto">
        <pre className="bg-muted p-3 sm:p-4 text-xs sm:text-sm font-mono whitespace-pre" {...props}>
          {children}
        </pre>
      </div>
    </div>
  ),
  
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href}
      className="text-primary hover:underline font-medium break-all"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
}

export const PostLayout: React.FC<PostLayoutProps> = ({ post, children }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="w-full max-w-none">
      {/* Container principal com responsividade */}
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* Navegação */}
        <nav className="mb-4 sm:mb-6 md:mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-1 sm:gap-2 hover:bg-muted text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Voltar</span>
              <span className="inline xs:hidden">Voltar</span>
            </Button>
          </Link>
        </nav>

        {/* Header do post */}
        <header className="mb-6 sm:mb-8 md:mb-12 space-y-3 sm:space-y-4 md:space-y-6">
          
          {/* Imagem de capa */}
          {post.coverImage && (
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Meta informações */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">{formatDate(post.date)}</span>
            </div>
            
            {post.category && (
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {post.category}
                </Badge>
              </div>
            )}
            
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate max-w-[120px] sm:max-w-none">{post.author.name}</span>
              </div>
            )}
          </div>

          {/* Título */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-foreground break-words">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="border-l-2 sm:border-l-4 border-primary pl-3 sm:pl-4 py-2 sm:py-3 bg-muted/20 rounded-r-lg">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed italic break-words">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Botão de leitura */}
          <div className="flex justify-center pt-3 sm:pt-4 border-t border-border">
            <PostReadButton postSlug={post.slug} className="text-xs sm:text-sm" />
          </div>
        </header>

        {/* Conteúdo do post */}
        <main className="w-full max-w-none">
          <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none w-full overflow-hidden">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              {post.author && (
                <p>
                  Escrito por <span className="font-medium text-foreground">{post.author.name}</span>
                </p>
              )}
              <p className="mt-1">
                Publicado em {formatDate(post.date)}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <PostReadButton postSlug={post.slug} className="text-xs sm:text-sm" />
              
              {/* Botão de compartilhar */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="text-xs sm:text-sm"
              >
                Compartilhar
              </Button>
            </div>
          </div>
          
          {/* Tags no footer */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">Tags:</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </footer>
      </div>
    </div>
  )
}

// Exportar os componentes MDX para uso em outros lugares
export { mdxComponents }
