/**
 * Server-side utility to fetch all published Builder.io pages for sitemap generation
 *
 * This function queries the Builder.io API to get all published pages and blog posts,
 * then filters out internal app routes that shouldn't be included in the public sitemap.
 *
 * @param apiKey - Builder.io API key
 * @returns Array of public URL paths for the sitemap
 */
interface SitemapUrl {
  url: string
  lastUpdated?: number
}

export async function fetchBuilderIoSitemapUrls(apiKey: string): Promise<SitemapUrl[]> {
  const urls: SitemapUrl[] = []

  try {
    // Fetch all published pages from 'page' model using the correct v3 API
    const pagesResponse = await fetch(
      `https://cdn.builder.io/api/v3/content/page?apiKey=${apiKey}&limit=100&fields=id,name,data.url,published,lastUpdated`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (pagesResponse.ok) {
      const pagesData = await pagesResponse.json()

      for (const page of pagesData.results || []) {
        // Only include published pages
        if (page.published === 'published') {
          const urlPath = page.data?.url
          if (urlPath && typeof urlPath === 'string') {
            // Filter out app routes - only include public marketing pages
            if (!isAppRoute(urlPath)) {
              urls.push({
                url: urlPath,
                lastUpdated: page.lastUpdated
              })
            }
          }
        }
      }
    }

    // Fetch all published blog posts from 'blog' model
    const blogResponse = await fetch(
      `https://cdn.builder.io/api/v3/content/blog?apiKey=${apiKey}&limit=100&fields=id,name,data.slug,published,lastUpdated`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (blogResponse.ok) {
      const blogData = await blogResponse.json()

      for (const post of blogData.results || []) {
        // Only include published blog posts
        if (post.published === 'published') {
          const slug = post.data?.slug || post.id
          if (slug && typeof slug === 'string') {
            urls.push({
              url: `/blog/${slug}`,
              lastUpdated: post.lastUpdated
            })
          }
        }
      }
    }

  } catch (error) {
    console.error('Error fetching Builder.io sitemap URLs:', error)
  }

  return urls
}

// Helper function to determine if a URL is an app route that should be excluded from sitemap
function isAppRoute(urlPath: string): boolean {
  const appRoutes = [
    '/auth/',
    '/admin/',
    '/user/',
    '/courses/',
    '/api/'
  ]

  return appRoutes.some(route => urlPath.startsWith(route))
}