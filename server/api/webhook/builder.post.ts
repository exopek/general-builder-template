export default defineEventHandler(async (event) => {
  // Builder.io Webhook Handler für Cache Invalidierung
  const body = await readBody(event)
  
  console.log('Builder.io webhook received:', { 
    method: event.node.req.method,
    contentType: body?.data?.type || 'unknown',
    timestamp: new Date().toISOString()
  })
  
  // Authentifizierung (optional - Builder.io Secret)
  const builderSecret = process.env.BUILDER_WEBHOOK_SECRET
  if (builderSecret && event.node.req.headers['x-builder-signature'] !== builderSecret) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // Cloudflare Cache Purge (optional)
  if (process.env.CLOUDFLARE_ZONE_ID && process.env.CLOUDFLARE_API_TOKEN) {
    try {
      await $fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/purge_cache`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: {
          purge_everything: true
        }
      })
      console.log('Cloudflare cache purged successfully')
    } catch (error) {
      console.error('Cache purge failed:', error)
    }
  }

  return { 
    success: true, 
    message: 'Builder.io content updated, cache invalidated',
    timestamp: new Date().toISOString()
  }
})