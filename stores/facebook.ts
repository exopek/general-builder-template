import { defineStore } from 'pinia'
import { FACEBOOK_EVENTS, STORAGE_KEYS } from '~/utils/constants'
import type {
  FacebookPixelEvent,
  FacebookEventParams,
  TrackedEvent
} from '~/types/facebook'

export const useFacebookStore = defineStore('facebook', {
  state: () => ({
    hasConsent: false,
    isLoading: false,
    error: null as string | null,
    events: [] as TrackedEvent[],
    isPixelLoaded: false,
    pixelScriptCode: null as string | null,
    pixelNoScriptCode: null as string | null
  }),

  getters: {
    // Kann getrackt werden?
    canTrack: (state) => state.hasConsent && state.isPixelLoaded,

    // Events nach Typ filtern
    eventsByType: (state) => (eventType: FacebookPixelEvent) => {
      return state.events.filter(e => e.event === eventType)
    },

    // Letzte 10 Events
    recentEvents: (state) => {
      return state.events
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10)
    },

    // Anzahl erfolgreicher Events
    successfulEventsCount: (state) => {
      return state.events.filter(e => e.success).length
    }
  },

  actions: {
    // Pixel-Script Codes speichern (wird von Pages aufgerufen)
    setPixelScriptCodes(scriptCode: string | null, noScriptCode: string | null) {
      this.pixelScriptCode = scriptCode
      this.pixelNoScriptCode = noScriptCode
    },

    // Pixel-Script dynamisch laden (nur nach Consent!)
    loadPixelScript() {
      if (typeof window === 'undefined') return
      if (!this.pixelScriptCode) {
        console.warn('⚠ No Facebook Pixel script code configured')
        return
      }

      // Prüfen ob schon geladen
      if (window.fbq) {
        console.log('✓ Facebook Pixel already loaded')
        this.isPixelLoaded = true
        return
      }

      try {
        console.log('🚀 Loading Facebook Pixel dynamically...')

        // Script-Tag im <head> einfügen (Facebook Pixel Init Code)
        // Verwende textContent statt innerHTML damit der Code ausgeführt wird
        const scriptElement = document.createElement('script')
        scriptElement.type = 'text/javascript'
        scriptElement.textContent = this.pixelScriptCode
        document.head.appendChild(scriptElement)

        console.log('✓ Facebook Pixel script injected into <head>')

        // NoScript-Tag wenn vorhanden (für Image-Fallback)
        if (this.pixelNoScriptCode) {
          const noscriptElement = document.createElement('noscript')
          noscriptElement.innerHTML = this.pixelNoScriptCode
          document.head.appendChild(noscriptElement)
          console.log('✓ Facebook Pixel noscript fallback added to <head>')
        }

        // Kurze Verzögerung und dann prüfen ob fbq verfügbar ist
        setTimeout(() => {
          if (window.fbq) {
            this.isPixelLoaded = true
            console.log('✅ Facebook Pixel loaded successfully! fbq() is available')
            console.log('   → You can now track events with facebookStore.trackLead(), etc.')

            // Consent grant an fbq senden
            if (this.hasConsent) {
              window.fbq('consent', 'grant')
              console.log('✓ Consent granted to Facebook Pixel')
            }
          } else {
            console.error('❌ Facebook Pixel failed to load!')
            console.error('   → Make sure facebookPixelScript in Builder.io contains fbq initialization')
            console.error('   → Expected format: fbq(\'init\', \'YOUR_PIXEL_ID\'); fbq(\'track\', \'PageView\');')
          }
        }, 500)

      } catch (error) {
        console.error('❌ Error loading Facebook Pixel:', error)
      }
    },

    // Consent aus localStorage laden
    initConsent() {
      if (typeof localStorage === 'undefined') return

      const stored = localStorage.getItem(STORAGE_KEYS.FB_CONSENT)
      this.hasConsent = stored === 'true'

      // Wenn Consent bereits vorhanden, Pixel laden
      if (this.hasConsent) {
        this.loadPixelScript()
      }
    },

    // Consent gewähren
    grantConsent() {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('✅ grantConsent() called')
      this.hasConsent = true
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.FB_CONSENT, 'true')
        console.log('✓ Consent saved to localStorage')
      }

      // Pixel-Script jetzt laden (da Consent gegeben wurde)
      console.log('→ Calling loadPixelScript()...')
      this.loadPixelScript()
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    },

    // Consent widerrufen
    revokeConsent() {
      this.hasConsent = false
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.FB_CONSENT, 'false')
      }

      if (window.fbq) {
        window.fbq('consent', 'revoke', {})
      }
    },

    // Pixel Loaded Status setzen
    setPixelLoaded(loaded: boolean) {
      this.isPixelLoaded = loaded
    },

    // Event tracken (generische Methode)
    trackEvent(
      event: FacebookPixelEvent,
      params: FacebookEventParams = {}
    ): { success: boolean; error?: string } {

      // Consent Check
      if (!this.canTrack) {
        return { success: false, error: 'No consent or pixel not loaded' }
      }

      try {
        this.isLoading = true
        this.error = null

        // Facebook Pixel aufrufen
        if (window.fbq) {
          console.log('✅ Calling window.fbq(\'track\', \'' + event + '\', params)')
          window.fbq('track', event)
          console.log('✅ fbq() call completed successfully')
        } else {
          throw new Error('Facebook Pixel not loaded (window.fbq is undefined)')
        }

        // Event in History speichern
        const trackedEvent: TrackedEvent = {
          event,
          timestamp: new Date(),
          params,
          success: true
        }

        this.events.push(trackedEvent)

        // History auf 100 Items limitieren
        if (this.events.length > 100) {
          this.events = this.events.slice(-100)
        }

        return { success: true }
      } catch (error: any) {
        this.error = error?.message || 'Tracking failed'

        // Fehler in History
        const trackedEvent: TrackedEvent = {
          event,
          timestamp: new Date(),
          params,
          success: false,
          error: this.error
        }
        this.events.push(trackedEvent)

        return {
          success: false,
          error: this.error
        }
      } finally {
        this.isLoading = false
      }
    },

    // Lead Event
    trackLead(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.LEAD, params)
    },

    // Schedule Event
    trackSchedule(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SCHEDULE, params)
    },

    // Contact Event
    trackContact(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.CONTACT, params)
    },

    // Complete Registration Event
    trackCompleteRegistration(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.COMPLETE_REGISTRATION, params)
    },

    // Start Trial Event
    trackStartTrial(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.START_TRIAL, params)
    },

    // Submit Application Event
    trackSubmitApplication(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SUBMIT_APPLICATION, params)
    },

    // Subscribe Event
    trackSubscribe(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SUBSCRIBE, params)
    },

    // View Content Event
    trackViewContent(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.VIEW_CONTENT, params)
    },

    // Search Event
    trackSearch(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SEARCH, params)
    },

    // Error löschen
    clearError() {
      this.error = null
    },

    // Event History löschen
    clearEventHistory() {
      this.events = []
    }
  }
})
