import { getAllPosts } from "@/lib/mdx"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "6", 10)

    // Validação de parâmetros
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Parâmetro 'page' inválido" },
        { status: 400 }
      )
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Parâmetro 'limit' inválido" },
        { status: 400 }
      )
    }

    const allPosts = await getAllPosts()
    const start = (page - 1) * limit
    const end = start + limit
    const posts = allPosts.slice(start, end)

    return NextResponse.json({
      posts,
      hasMore: end < allPosts.length,
      total: allPosts.length
    })
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
