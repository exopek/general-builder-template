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
    isPixelLoaded: false
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
    // Consent aus localStorage laden
    initConsent() {
      if (typeof localStorage === 'undefined') return

      const stored = localStorage.getItem(STORAGE_KEYS.FB_CONSENT)
      this.hasConsent = stored === 'true'

      if (this.hasConsent && window.fbq) {
        window.fbq('consent', 'grant', {})
      }
    },

    // Consent gewähren
    grantConsent() {
      this.hasConsent = true
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.FB_CONSENT, 'true')
      }

      if (window.fbq) {
        window.fbq('consent', 'grant', {})
      }
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
        console.warn('Facebook tracking blocked: No consent or pixel not loaded')
        return { success: false, error: 'No consent' }
      }

      try {
        this.isLoading = true
        this.error = null

        // Facebook Pixel aufrufen
        if (window.fbq) {
          window.fbq('track', event, params)
        } else {
          throw new Error('Facebook Pixel not loaded')
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
        console.error('Facebook tracking error:', error)
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
