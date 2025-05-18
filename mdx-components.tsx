import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use custom link component to handle internal links
    a: ({ href, children, ...props }) => {
      if (href && href.startsWith("/")) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        )
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    },
    // Use Next.js Image for optimized images
    img: ({ src, alt, ...props }) => {
      if (src) {
        return (
          <Image
            src={src || "/placeholder.svg"}
            alt={alt || ""}
            width={800}
            height={400}
            className="rounded-md"
            {...props}
          />
        )
      }
      return null
    },
    // Add any other custom components here
    ...components,
  }
}
