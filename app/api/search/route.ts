import { getAllPosts } from "@/lib/mdx"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""

  if (!query) {
    return NextResponse.json([])
  }

  const posts = await getAllPosts()

  const results = posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(query)
    const excerptMatch = post.excerpt?.toLowerCase().includes(query)
    const contentMatch = post.content.toLowerCase().includes(query)

    return titleMatch || excerptMatch || contentMatch
  })

  return NextResponse.json(results)
}
