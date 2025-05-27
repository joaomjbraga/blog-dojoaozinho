'use client'

import { useReadPosts } from '@/hooks/useReadPosts'
import { Post } from '@/types'
import { motion } from 'framer-motion'
import { ArrowLeft, BarChart3, BookOpen, Calendar, Star, Tag, Trophy, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import FloatingActionButton from './post/FloatingActionButton'
import { PostReadButton } from './PostReadButton'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

interface PostLayoutProps {
  post: Post
  children: ReactNode
}

export const PostLayout: React.FC<PostLayoutProps> = ({ post, children }) => {
  // Hook para gerenciar posts lidos
  const { isRead } = useReadPosts()

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
              <span className="xs:hidden">Voltar</span>
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

        {/* Conteúdo do post com estilos de prosa melhorados */}
        <main className="w-full max-w-none">
          <article className="prose prose-lg dark:prose-invert max-w-none w-full prose-headings:scroll-mt-20 prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-2 prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6 prose-li:mb-1 prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden prose-thead:bg-muted/50 prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3 prose-td:text-muted-foreground prose-img:rounded-lg prose-img:shadow-lg prose-img:w-full prose-img:h-auto prose-hr:border-border prose-hr:my-8">
            <div className="markdown-content">
              {children}
            </div>
          </article>
        </main>

        {/* Seção de progresso de leitura */}
        <section id="reading-progress" className="mt-8 sm:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-border">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Progresso de Leitura
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Acompanhe seu progresso de leitura nos posts do blog
              </p>
              
              {/* Status de leitura atual */}
              {post.slug && (
                <motion.div
                  className="mb-4 p-3 rounded-lg bg-muted/30 border border-border/50"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isRead(post.slug) ? (
                      <>
                        <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          ✅ Post marcado como lido
                        </span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                          📖 Continue lendo para marcar como concluído
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Seção de celebração para leitura completa */}
              <motion.div
                className="mb-6 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">
                    Complete a leitura e ganhe uma surpresa!
                  </span>
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  Role até o final do post para ver uma animação especial de celebração e marcar automaticamente como lido
                </p>
              </motion.div>
              
              <Link href="/#reading-stats">
                <Button variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Ver Estatísticas Completas
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

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

          {/* Seção final de celebração */}
          <motion.div
            className="mt-6 pt-4 border-t border-border/50 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-muted-foreground">
              🎉 Parabéns por chegar até aqui! Você completou a leitura deste post.
            </p>
          </motion.div>
        </footer>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        postSlug={post.slug}
        showReadingProgress={true}
      />
    </div>
  )
}

// Componentes customizados para MDX - mantendo para compatibilidade
const ResponsiveIframe = ({ 
  src, 
  title,
  width = "560", 
  height = "315", 
  className = "",
  ...props 
}: any) => {
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

const ResponsiveTable = ({ children, ...props }: any) => (
  <div className="w-full max-w-full my-6 sm:my-8 overflow-hidden rounded-lg border border-border shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full w-full text-sm sm:text-base" {...props}>
        {children}
      </table>
    </div>
  </div>
)

const mdxComponents = {
  iframe: ResponsiveIframe,
  table: ResponsiveTable,
  
  thead: ({ children, ...props }: any) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  
  tbody: ({ children, ...props }: any) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  
  tr: ({ children, ...props }: any) => (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors" {...props}>
      {children}
    </tr>
  ),
  
  th: ({ children, ...props }: any) => (
    <th className="border-b-2 border-border px-3 sm:px-6 py-3 sm:py-4 bg-muted/70 font-semibold text-left text-foreground text-sm sm:text-base" {...props}>
      <div className="min-w-0 break-words">
        {children}
      </div>
    </th>
  ),
  
  td: ({ children, ...props }: any) => (
    <td className="border-b border-border/50 px-3 sm:px-6 py-3 sm:py-4 text-muted-foreground text-sm sm:text-base" {...props}>
      <div className="min-w-0 break-words">
        {children}
      </div>
    </td>
  ),
  
  img: ({ src, alt, ...props }: any) => (
    <div className="relative my-6 sm:my-8 w-full max-w-full">
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
        <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center italic px-2">
          {alt}
        </p>
      )}
    </div>
  ),
  
  h1: ({ children, ...props }: any) => (
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 sm:mt-12 mb-4 sm:mb-6 text-foreground scroll-mt-20 break-words leading-tight" {...props}>
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: any) => (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10 mb-4 sm:mb-5 text-foreground scroll-mt-20 break-words leading-tight border-b border-border/30 pb-2" {...props}>
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: any) => (
    <h3 className="text-lg sm:text-xl md:text-2xl font-medium mt-6 sm:mt-8 mb-3 sm:mb-4 text-foreground scroll-mt-20 break-words leading-tight" {...props}>
      {children}
    </h3>
  ),
  
  h4: ({ children, ...props }: any) => (
    <h4 className="text-base sm:text-lg md:text-xl font-medium mt-6 mb-3 text-foreground scroll-mt-20 break-words" {...props}>
      {children}
    </h4>
  ),
  
  h5: ({ children, ...props }: any) => (
    <h5 className="text-sm sm:text-base md:text-lg font-medium mt-4 mb-2 text-foreground scroll-mt-20 break-words" {...props}>
      {children}
    </h5>
  ),
  
  h6: ({ children, ...props }: any) => (
    <h6 className="text-sm sm:text-base font-medium mt-4 mb-2 text-foreground scroll-mt-20 break-words" {...props}>
      {children}
    </h6>
  ),
  
  p: ({ children, ...props }: any) => (
    <p className="mb-4 sm:mb-6 leading-relaxed text-muted-foreground text-base sm:text-lg break-words" {...props}>
      {children}
    </p>
  ),
  
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-outside mb-4 sm:mb-6 space-y-2 text-muted-foreground ml-6 sm:ml-8 text-base sm:text-lg" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-outside mb-4 sm:mb-6 space-y-2 text-muted-foreground ml-6 sm:ml-8 text-base sm:text-lg" {...props}>
      {children}
    </ol>
  ),
  
  li: ({ children, ...props }: any) => (
    <li className="mb-1 break-words leading-relaxed" {...props}>
      {children}
    </li>
  ),
  
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-primary pl-4 sm:pl-6 my-6 sm:my-8 italic text-muted-foreground bg-muted/30 py-4 sm:py-6 rounded-r-lg text-base sm:text-lg" {...props}>
      <div className="not-italic">
        {children}
      </div>
    </blockquote>
  ),
  
  code: ({ children, className, ...props }: any) => {
    if (className) {
      return (
        <code className={`${className} block`} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground break-all" {...props}>
        {children}
      </code>
    )
  },
  
  pre: ({ children, ...props }: any) => (
    <div className="w-full max-w-full my-6 sm:my-8 overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="overflow-x-auto">
        <pre className="bg-muted p-4 sm:p-6 text-sm sm:text-base font-mono whitespace-pre" {...props}>
          {children}
        </pre>
      </div>
    </div>
  ),
  
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href}
      className="text-primary hover:text-primary/80 hover:underline font-medium break-all transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  
  em: ({ children, ...props }: any) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  
  hr: ({ ...props }: any) => (
    <hr className="my-8 sm:my-12 border-border" {...props} />
  ),
}

// Exportar os componentes MDX para uso em outros lugares
export { mdxComponents }
