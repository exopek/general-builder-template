export interface BlogArticleDto {
  id?: string
  title?: string
  excerpt?: string
  image?: string
  category?: string
  author?: string
  date?: string
  readTime?: number
  tags?: string[]
  content?: any
  blocks?: any[]
}

export interface BlogMetaDto {
  published?: boolean
  featured?: boolean
  priority?: number
  lastModified?: string
}

export interface BlogArticle {
  id: string
  title: string
  excerpt: string
  image: string | null
  category: string | null
  author: string | null
  publishedAt: Date | null
  readTime: number
  tags: readonly string[]
  content: any
  isPublished: boolean
}