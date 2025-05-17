import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map(file => file.replace(/\.md$/, ''))
}

export function getAllPosts() {
  return getPostSlugs().map(slug => {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const { data } = matter(fileContents)
    return {
      slug,
      ...(data as { title: string; date: string })
    }
  })
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(fileContents)
  const processed = await remark().use(html).process(content)
  return {
    title: data.title,
    date: data.date,
    contentHtml: processed.toString()
  }
}
