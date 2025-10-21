export default defineNuxtPlugin(() => {
  const facebookStore = useFacebookStore()

  // Nur Consent initialisieren
  // Der Pixel-Script wird ERST geladen, wenn Consent gegeben wird (via grantConsent())
  if (typeof window !== 'undefined') {
    facebookStore.initConsent()
    console.log('✓ Facebook Pixel plugin initialized (waiting for consent)')
  }
})
