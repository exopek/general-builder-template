export default defineNuxtPlugin(() => {
  const facebookStore = useFacebookStore()

  // Check if fbq is loaded (nur im Browser)
  if (typeof window !== 'undefined') {
    // Wait for fbq to be available
    const checkFbq = setInterval(() => {
      if (window.fbq) {
        facebookStore.setPixelLoaded(true)
        facebookStore.initConsent()
        clearInterval(checkFbq)
        console.log('✓ Facebook Pixel loaded and ready')
      }
    }, 100)

    // Timeout after 5 seconds
    setTimeout(() => {
      clearInterval(checkFbq)
      if (!window.fbq) {
        console.warn('⚠ Facebook Pixel not loaded after 5 seconds. Make sure the pixel script is configured in Builder.io')
      }
    }, 5000)
  }
})
