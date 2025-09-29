// Server route to provide Builder.io URLs for sitemap generation
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.public.builderApiKey || process.env.BUILDER_API_KEY

  if (!apiKey) {
    console.warn('Builder.io API key not found - returning demo sitemap URLs')
    // Return demo URLs for testing
    return [
      { loc: '/about', lastmod: new Date().toISOString() },
      { loc: '/contact', lastmod: new Date().toISOString() }
    ]
  }

  try {
    const { fetchBuilderIoSitemapUrls } = await import('~/server/utils/builderIoSitemap')
    const urlData = await fetchBuilderIoSitemapUrls(apiKey)
    console.log(`Fetched ${urlData.length} URLs from Builder.io for sitemap`)

    // Return URLs in the format expected by @nuxtjs/sitemap
    const sitemapUrls = urlData.map(item => ({
      loc: item.url,
      lastmod: item.lastUpdated ? new Date(item.lastUpdated).toISOString() : new Date().toISOString()
    }))

    // If no URLs found from Builder.io, add some demo URLs for testing
    if (sitemapUrls.length === 0) {
      console.log('No Builder.io pages found, adding demo URLs for testing')
      return [
        { loc: '/about', lastmod: new Date().toISOString() },
        { loc: '/contact', lastmod: new Date().toISOString() }
      ]
    }

    return sitemapUrls
  } catch (error) {
    console.error('Error generating sitemap routes:', error)
    // Return demo URLs in case of error
    return [
      { loc: '/about', lastmod: new Date().toISOString() },
      { loc: '/contact', lastmod: new Date().toISOString() }
    ]
  }
})