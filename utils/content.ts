export const calculateReadTime = (content: any): number => {
  const wordsPerMinute = 200
  const contentString = JSON.stringify(content)
  const wordCount = contentString.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export const hasImage = (image: string | null): boolean => {
  return image !== null && image !== ''
}

export const hasTags = (tags: readonly string[]): boolean => {
  return tags.length > 0
}