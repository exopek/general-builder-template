export const getAbsoluteUrl = (path: string): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path.startsWith('/') ? '' : '/'}${path}`
  }
  return path.startsWith('/') ? path : `/${path}`
}

export const getShareUrl = (path: string): string => {
  return getAbsoluteUrl(path)
}