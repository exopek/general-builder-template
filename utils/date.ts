export const formatDate = (date: Date | null, locale: string = 'de-DE'): string => {
  if (!date) return ''

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (date: Date | null, locale: string = 'de-DE'): string => {
  if (!date) return ''

  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatDateTime = (date: Date | null, locale: string = 'de-DE'): string => {
  if (!date) return ''

  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}