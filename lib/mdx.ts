import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface Post {
  slug: string
  title: string
  date?: string
  excerpt?: string
  content: string
}

export async function getAllPosts(): Promise<Post[]> {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })

    // Create sample posts if directory was just created
    createSamplePosts()
  }

  const filenames = fs.readdirSync(postsDirectory)

  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
      .map(async (filename) => {
        const slug = filename.replace(/\.mdx?$/, "")
        const post = await getPostBySlug(slug)
        return post
      }),
  )

  // Sort posts by date in descending order
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`)

      if (!fs.existsSync(fullPath)) {
        return null
      }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true },
    })

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString() : undefined,
      excerpt: data.excerpt || content.substring(0, 150) + "...",
      content: content,
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

function createSamplePosts() {
  const samplePosts = [
    {
      filename: "hello-world.md",
      content: `---
title: Hello World
date: 2023-01-01
excerpt: My first blog post
---

# Hello World

This is my first blog post. Welcome to my blog!

## What to expect

In this blog, I'll be sharing my thoughts on:

- Technology
- Design
- Life

Stay tuned for more content coming soon.
`,
    },
    {
      filename: "getting-started-with-nextjs.md",
      content: `---
title: Getting Started with Next.js
date: 2023-01-15
excerpt: Learn how to build modern web applications with Next.js
---

# Getting Started with Next.js

Next.js is a React framework that enables functionality such as server-side rendering and static site generation.

## Why Next.js?

- **Server-side Rendering**: Improves performance and SEO
- **Static Site Generation**: Pre-renders pages at build time
- **API Routes**: Build API endpoints as part of your Next.js app
- **File-system Routing**: Create routes based on your file structure

## Installation

\`\`\`bash
npx create-next-app@latest my-next-app
\`\`\`

Stay tuned for more Next.js tutorials!
`,
    },
    {
      filename: "the-power-of-mdx.md",
      content: `---
title: The Power of MDX
date: 2023-02-01
excerpt: Combining Markdown and JSX for powerful content creation
---

# The Power of MDX

MDX allows you to use JSX in your markdown content. This means you can import and use React components directly in your content.

## Benefits of MDX

- Write content in markdown
- Import and use React components
- Create interactive blog posts
- Style your content with your design system

## Example

You can import components and use them in your MDX:

\`\`\`jsx
import { Button } from '../components/ui/button'

# My MDX Page

Click the button below:

<Button>Click me!</Button>
\`\`\`

MDX is a powerful tool for content creators and developers alike.
`,
    },
  ]

  // Create the content/posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  // Write sample posts
  samplePosts.forEach(({ filename, content }) => {
    fs.writeFileSync(path.join(postsDirectory, filename), content)
  })
}
