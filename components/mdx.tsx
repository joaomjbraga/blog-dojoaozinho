import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import MacOSWindow from './MacOSWindow'

interface MdxProps {
  code: string
}

function CustomPre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const childArray = React.Children.toArray(children)
  let language = ''
  
  // Extract language from className if it exists (e.g., "language-javascript")
  if (childArray.length > 0 && React.isValidElement(childArray[0])) {
    const codeElement = childArray[0]
    
    // Use type assertion to tell TypeScript that props has className
    const codeProps = codeElement.props as { className?: string }
    
    if (codeProps.className) {
      const match = codeProps.className.match(/language-(\w+)/)
      if (match && match[1]) {
        language = match[1]
      }
    }
  }

  return (
    <MacOSWindow language={language}>
      <pre {...props}>{children}</pre>
    </MacOSWindow>
  )
}

function CustomCode({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Garantir que children seja uma string antes de passar para highlight
  const content = typeof children === 'string' ? children : String(children || '')
  const codeHTML = highlight(content)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components = {
  pre: CustomPre,
  code: CustomCode,
}

export function Mdx({ code }: MdxProps) {
  return (
    <MDXRemote
      source={code}
      components={components}
    />
  )
}
