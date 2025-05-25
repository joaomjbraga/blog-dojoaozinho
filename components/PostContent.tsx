'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { ComponentProps } from 'react'

interface PostContentProps {
  content: string
}

// Componentes customizados para o MDX
const components = {
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-medium mt-4 mb-2 text-foreground" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="mb-1" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-border rounded-lg" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
  a: (props: ComponentProps<'a'>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  img: (props: ComponentProps<'img'>) => (
    <img className="rounded-lg my-4 max-w-full h-auto" {...props} />
  ),
}

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  )
}