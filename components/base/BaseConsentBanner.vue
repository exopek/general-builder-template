<template>
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 backdrop-blur-md"
    >
      <div class="container">
        <div class="card-glass p-6 md:p-8 max-w-4xl mx-auto shadow-2xl">
          <!-- Header -->
          <div class="mb-6">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              🍪 Cookie-Einstellungen
            </h3>
            <p class="text-base md:text-lg text-gray-700 leading-relaxed">
              Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.
              Sie können selbst entscheiden, welche Cookie-Kategorien Sie zulassen möchten.
            </p>
          </div>

          <!-- Cookie Categories (when settings are expanded) -->
          <div v-if="showSettings" class="mb-6 space-y-4">
            <div
              v-for="(category, key) in cookieCategories"
              :key="key"
              class="p-4 bg-white rounded-lg border border-gray-200 transition-all hover:border-primary"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 mb-1">{{ category.label }}</h4>
                  <p class="text-sm text-gray-600">{{ category.description }}</p>
                </div>
                <label class="relative inline-block w-12 h-6 flex-shrink-0">
                  <input
                    type="checkbox"
                    :checked="category.required || consentState[key]"
                    :disabled="category.required"
                    @change="toggleCategory(key)"
                    class="sr-only peer"
                  />
                  <div
                    class="w-12 h-6 rounded-full cursor-pointer transition-colors"
                    :class="[
                      category.required || consentState[key] ? 'bg-primary' : 'bg-gray-300',
                      category.required ? 'opacity-50 cursor-not-allowed' : ''
                    ]"
                  >
                    <div
                      class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm"
                      :class="category.required || consentState[key] ? 'translate-x-6' : ''"
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col md:flex-row gap-3">
            <!-- GDPR compliant: Equal weight buttons -->
            <BaseButton
              v-if="!showSettings"
              text="Alle ablehnen"
              variant="outline"
              size="lg"
              class="flex-1"
              @click="declineAll"
            />
            <BaseButton
              v-if="!showSettings"
              text="Einstellungen"
              variant="secondary"
              size="lg"
              class="flex-1"
              @click="showSettings = true"
            />
            <BaseButton
              v-if="!showSettings"
              text="Alle akzeptieren"
              variant="primary"
              size="lg"
              class="flex-1"
              @click="acceptAll"
            />

            <!-- Settings view buttons -->
            <BaseButton
              v-if="showSettings"
              text="Nur essenzielle"
              variant="outline"
              size="lg"
              class="flex-1"
              @click="acceptEssentialOnly"
            />
            <BaseButton
              v-if="showSettings"
              text="Auswahl speichern"
              variant="primary"
              size="lg"
              class="flex-1"
              @click="saveSelection"
            />
          </div>

          <!-- Privacy Policy Link -->
          <div class="mt-4 text-center">
            <a
              href="/datenschutz"
              class="text-sm text-gray-600 hover:text-primary transition-colors underline"
            >
              Mehr in unserer Datenschutzerklärung
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CookieCategory {
  label: string
  description: string
  required: boolean
}

// Props
interface Props {
  cookieCategories?: Record<string, CookieCategory>
}

const props = withDefaults(defineProps<Props>(), {
  cookieCategories: () => ({
    essential: {
      label: 'Essenzielle Cookies',
      description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich.',
      required: true
    },
    analytics: {
      label: 'Analyse & Statistik',
      description: 'Helfen uns, die Nutzung unserer Website zu verstehen.',
      required: false
    },
    marketing: {
      label: 'Marketing',
      description: 'Für personalisierte Werbung.',
      required: false
    },
    functional: {
      label: 'Funktional',
      description: 'Erweiterte Funktionalitäten und Präferenzen.',
      required: false
    }
  })
})

const showBanner = ref(false)
const showSettings = ref(false)
const consentState = ref<Record<string, boolean>>({})

// Cookie consent storage key
const CONSENT_KEY = 'cookie-consent'
const CONSENT_VERSION = '1.0'

// Initialize consent state
const initConsentState = () => {
  Object.keys(props.cookieCategories).forEach((key) => {
    consentState.value[key] = props.cookieCategories[key].required
  })
}

// Check if consent has been given
const checkConsentStatus = () => {
  if (typeof window === 'undefined') return

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      const data = JSON.parse(stored)

      // Check if version matches
      if (data.version === CONSENT_VERSION) {
        consentState.value = data.consent
        applyConsent(data.consent)
        return true
      }
    }
  } catch (error) {
    console.error('Error reading consent:', error)
  }

  return false
}

// Save consent to localStorage
const saveConsent = (consent: Record<string, boolean>) => {
  if (typeof window === 'undefined') return

  try {
    const data = {
      version: CONSENT_VERSION,
      consent,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data))
    applyConsent(consent)
  } catch (error) {
    console.error('Error saving consent:', error)
  }
}

// Apply consent (trigger callbacks, load scripts, etc.)
const applyConsent = (consent: Record<string, boolean>) => {
  // Emit event for other parts of the app
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: consent }))
  }

  // Update Google Consent Mode if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      functionality_storage: consent.functional ? 'granted' : 'denied',
      personalization_storage: consent.marketing ? 'granted' : 'denied'
    })
  }
}

// Toggle category
const toggleCategory = (key: string) => {
  if (props.cookieCategories[key].required) return
  consentState.value[key] = !consentState.value[key]
}

// Accept all cookies
const acceptAll = () => {
  Object.keys(props.cookieCategories).forEach((key) => {
    consentState.value[key] = true
  })
  saveConsent(consentState.value)
  showBanner.value = false
}

// Decline all non-essential cookies
const declineAll = () => {
  Object.keys(props.cookieCategories).forEach((key) => {
    consentState.value[key] = props.cookieCategories[key].required
  })
  saveConsent(consentState.value)
  showBanner.value = false
}

// Accept only essential cookies
const acceptEssentialOnly = () => {
  declineAll()
}

// Save current selection
const saveSelection = () => {
  saveConsent(consentState.value)
  showBanner.value = false
  showSettings.value = false
}

// Lifecycle
onMounted(() => {
  initConsentState()

  // Check if consent has already been given
  const hasConsent = checkConsentStatus()

  // Show banner if no consent stored
  if (!hasConsent) {
    showBanner.value = true
  }
})
</script>

<style scoped>
/* Vue Transition Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 300ms ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
