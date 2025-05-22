import { getCategories } from "@/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getCategories();
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Erro ao processar categorias:", error);
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}