"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  defaultValue?: string
}

export default function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(defaultValue || searchParams.get("q") || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex w-full min-w-[150px] max-w-lg gap-1.5 px-2 sm:px-4 md:gap-2"
      role="search"
      aria-label="Buscar posts"
    >
      <Input
        type="search"
        placeholder="Pesquisar posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 min-w-0 text-sm sm:text-base dark:bg-background dark:text-foreground dark:placeholder-muted-foreground focus:ring-2 focus:ring-primary"
        aria-label="Campo de busca"
        id="search-input"
        name="q"
        autoComplete="off"
        required
      />
      <Button 
        type="submit" 
        size="icon" 
        className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 dark:focus:ring-primary"
        aria-label="Pesquisar"
      >
        <Search className="h-4 w-4 text-primary-foreground dark:text-primary-foreground" />
      </Button>
    </form>
  )
}
