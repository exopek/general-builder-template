import type { BlogArticleDto, BlogArticle } from '~/types/article.types'
import { calculateReadTime } from '~/utils/content'

export const articleMapper = {
  fromDto(dto: BlogArticleDto): BlogArticle {
    if (!dto.id || !dto.title) {
      throw new Error('DTO must have id and title')
    }

    return {
      id: dto.id,
      title: dto.title,
      excerpt: dto.excerpt || '',
      content: dto.content || dto,
      image: dto.image || null,
      category: dto.category || null,
      author: dto.author || null,
      publishedAt: dto.date ? new Date(dto.date) : null,
      readTime: dto.readTime || calculateReadTime(dto.content || dto),
      tags: Object.freeze(dto.tags || []),
      isPublished: true
    }
  },

  fromBuilderIoEntry(entry: any): BlogArticle {
    const data = entry?.data || entry

    if (!entry.id && !data.id) {
      throw new Error('Entry must have an id')
    }

    return {
      id: entry.id || data.id || '',
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      content: data.content,
      image: data.image || null,
      category: data.category || null,
      author: data.author || null,
      publishedAt: data.date ? new Date(data.date) : null,
      readTime: data.readTime || calculateReadTime(data),
      tags: Object.freeze(data.tags || []),
      isPublished: true
    }
  }
}