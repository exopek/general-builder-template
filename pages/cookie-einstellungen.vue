<template>
  <section class="py-12 md:py-14">
    <div class="container">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Cookie-Einstellungen
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Verwalten Sie Ihre Cookie-Präferenzen und erfahren Sie, welche Cookies
          wir verwenden und warum.
        </p>
      </div>

      <!-- Current Status -->
      <div class="card bg-gradient-cool text-white mb-8 p-6 md:p-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 class="text-2xl text-black font-bold mb-1">Ihre aktuellen Einstellungen</h2>
            <p class="text-black/80">
              Letzte Aktualisierung: {{ consentTimestamp || 'Noch keine Einstellungen gespeichert' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Cookie Categories -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-white mb-6">Cookie-Kategorien</h2>

        <div class="space-y-4">
          <div
            v-for="(category, key) in cookieCategories"
            :key="key"
            class="card p-6 hover:shadow-lg transition-all"
          >
            <div class="flex items-start justify-between gap-6">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {{ category.label }}
                </h3>
                <p class="text-gray-600 mb-4">{{ category.description }}</p>

                <!-- Cookie Details -->
                <div v-if="category.cookies" class="mt-4">
                  <details class="text-sm">
                    <summary class="cursor-pointer text-primary font-medium hover:underline">
                      Details anzeigen ({{ category.cookies.length }} Cookie{{ category.cookies.length > 1 ? 's' : '' }})
                    </summary>
                    <div class="mt-4 space-y-3">
                      <div
                        v-for="cookie in category.cookies"
                        :key="cookie.name"
                        class="bg-gray-50 p-4 rounded-lg"
                      >
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <span class="font-semibold text-gray-700">Name:</span>
                            <span class="text-gray-900 ml-2">{{ cookie.name }}</span>
                          </div>
                          <div>
                            <span class="font-semibold text-gray-700">Anbieter:</span>
                            <span class="text-gray-900 ml-2">{{ cookie.provider }}</span>
                          </div>
                          <div>
                            <span class="font-semibold text-gray-700">Zweck:</span>
                            <span class="text-gray-900 ml-2">{{ cookie.purpose }}</span>
                          </div>
                          <div>
                            <span class="font-semibold text-gray-700">Laufzeit:</span>
                            <span class="text-gray-900 ml-2">{{ cookie.expiry }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <!-- Toggle -->
              <div class="flex-shrink-0">
                <label class="relative inline-block w-14 h-7">
                  <input
                    type="checkbox"
                    :checked="category.required || consentState[key]"
                    :disabled="category.required"
                    @change="toggleCategory(key)"
                    class="sr-only peer"
                  />
                  <div
                    class="w-14 h-7 rounded-full cursor-pointer transition-colors"
                    :class="[
                      category.required || consentState[key] ? 'bg-primary' : 'bg-gray-300',
                      category.required ? 'opacity-50 cursor-not-allowed' : ''
                    ]"
                  >
                    <div
                      class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm"
                      :class="category.required || consentState[key] ? 'translate-x-7' : ''"
                    ></div>
                  </div>
                </label>
                <p v-if="category.required" class="text-xs text-gray-500 mt-2 text-right">
                  Erforderlich
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <BaseButton
          text="Nur essenzielle Cookies"
          variant="outline"
          size="lg"
          @click="acceptEssentialOnly"
        />
        <BaseButton
          text="Auswahl speichern"
          variant="primary"
          size="lg"
          @click="saveSelection"
        />
        <BaseButton
          text="Alle akzeptieren"
          variant="gradient"
          size="lg"
          @click="acceptAll"
        />
      </div>

      <!-- GDPR Info -->
      <div class="mt-12 p-6 bg-gray-50 rounded-xl">
        <h3 class="text-xl font-semibold text-white mb-4">
          Ihre Rechte nach DSGVO
        </h3>
        <div class="text-gray-700 space-y-2">
          <p>
            ✓ Sie können Ihre Einwilligung jederzeit widerrufen
          </p>
          <p>
            ✓ Die Nutzung unserer Website ist auch ohne Zustimmung zu nicht-essentiellen Cookies möglich
          </p>
          <p>
            ✓ Ihre Präferenzen werden für 12 Monate gespeichert
          </p>
          <p>
            ✓ Mehr Informationen finden Sie in unserer
            <NuxtLink to="/datenschutz" class="text-primary underline hover:no-underline">
              Datenschutzerklärung
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Cookie {
  name: string
  provider: string
  purpose: string
  expiry: string
}

interface CookieCategory {
  label: string
  description: string
  required: boolean
  cookies?: Cookie[]
}

// SEO Meta
useHead({
  title: 'Cookie-Einstellungen | Club Exopek',
  meta: [
    {
      name: 'description',
      content: 'Verwalten Sie Ihre Cookie-Präferenzen und Datenschutzeinstellungen für Club Exopek.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

const CONSENT_KEY = 'cookie-consent'

// Cookie Categories with detailed information
const cookieCategories: Record<string, CookieCategory> = {
  essential: {
    label: 'Essenzielle Cookies',
    description: 'Diese Cookies sind für die Grundfunktionen der Website unbedingt erforderlich und können nicht deaktiviert werden. Sie ermöglichen grundlegende Funktionen wie Navigation, Zugriff auf sichere Bereiche und die Speicherung Ihrer Cookie-Präferenzen.',
    required: true,
    cookies: [
      {
        name: 'cookie-consent',
        provider: 'Club Exopek (Erstanbieter)',
        purpose: 'Speichert Ihre Cookie-Präferenzen',
        expiry: '12 Monate'
      }
    ]
  },
  analytics: {
    label: 'Analyse & Statistik',
    description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden. Dies ermöglicht es uns, die Benutzererfahrung kontinuierlich zu verbessern.',
    required: false,
    cookies: [
      {
        name: '_ga',
        provider: 'Google Analytics',
        purpose: 'Unterscheidung von Benutzern',
        expiry: '2 Jahre'
      },
      {
        name: '_ga_*',
        provider: 'Google Analytics',
        purpose: 'Speicherung des Session-Status',
        expiry: '2 Jahre'
      }
    ]
  },
  marketing: {
    label: 'Marketing',
    description: 'Marketing-Cookies werden verwendet, um Besuchern auf Webseiten zu folgen und personalisierte Werbung anzuzeigen. Diese Cookies können Ihre Browsing-Aktivitäten über verschiedene Websites hinweg verfolgen.',
    required: false,
    cookies: []
  },
  functional: {
    label: 'Funktional',
    description: 'Funktionale Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung, wie z.B. die Speicherung Ihrer bevorzugten Einstellungen, Sprachpräferenzen oder Login-Informationen.',
    required: false,
    cookies: []
  }
}

const consentState = ref<Record<string, boolean>>({})
const consentTimestamp = ref<string>('')

// Initialize consent state
const initConsentState = () => {
  Object.keys(cookieCategories).forEach((key) => {
    consentState.value[key] = cookieCategories[key].required
  })
}

// Load existing consent
const loadConsent = () => {
  if (typeof window === 'undefined') return

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      consentState.value = data.consent

      // Format timestamp
      if (data.timestamp) {
        const date = new Date(data.timestamp)
        consentTimestamp.value = date.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    }
  } catch (error) {
    console.error('Error loading consent:', error)
  }
}

// Save consent
const saveConsent = (consent: Record<string, boolean>) => {
  if (typeof window === 'undefined') return

  try {
    const data = {
      version: '1.0',
      consent,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data))

    // Update timestamp display
    const date = new Date(data.timestamp)
    consentTimestamp.value = date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Emit event
    window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: consent }))
  } catch (error) {
    console.error('Error saving consent:', error)
  }
}

// Toggle category
const toggleCategory = (key: string) => {
  if (cookieCategories[key].required) return
  consentState.value[key] = !consentState.value[key]
}

// Accept all
const acceptAll = () => {
  Object.keys(cookieCategories).forEach((key) => {
    consentState.value[key] = true
  })
  saveConsent(consentState.value)
  alert('Alle Cookies wurden akzeptiert.')
}

// Accept essential only
const acceptEssentialOnly = () => {
  Object.keys(cookieCategories).forEach((key) => {
    consentState.value[key] = cookieCategories[key].required
  })
  saveConsent(consentState.value)
  alert('Nur essenzielle Cookies wurden akzeptiert.')
}

// Save selection
const saveSelection = () => {
  saveConsent(consentState.value)
  alert('Ihre Auswahl wurde gespeichert.')
}

onMounted(() => {
  initConsentState()
  loadConsent()
})
</script>

<style scoped>
/* Details/Summary custom styling (not available in Tailwind) */
details summary {
  list-style: none;
}

details summary::-webkit-details-marker {
  display: none;
}

details[open] summary {
  margin-bottom: 1rem;
}
</style>
