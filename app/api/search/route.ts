import { NextRequest, NextResponse } from "next/server"
import { getAllPosts } from "@/lib/mdx"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category") || ""

    if (!query && !category) {
      return NextResponse.json([])
    }

    const posts = await getAllPosts()
    
    // Filtrar posts por query e categoria
    const filteredPosts = posts.filter(post => {
      // Verificar se o post corresponde à categoria (se especificada)
      const matchesCategory = !category || 
        post.category?.toLowerCase() === category.toLowerCase()
      
      // Se não há query, retorna apenas com base na categoria
      if (!query) return matchesCategory
      
      // Se há query, verifica se o post contém o termo de busca
      const matchesQuery = 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      
      // Retorna true se o post corresponde tanto à query quanto à categoria (se especificada)
      return matchesQuery && matchesCategory
    })

    return NextResponse.json(filteredPosts)
  } catch (error) {
    console.error("Erro ao processar busca:", error)
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
