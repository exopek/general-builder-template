<template>
  <section
    class="py-16 md:py-20 overflow-hidden"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="container mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="info"
          class="mb-4"
        />

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          :style="{ color: headlineColor }"
          v-html="headline"
        />

        <p
          class="text-lg md:text-xl max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Contact Form -->
      <div class="max-w-2xl mx-auto">
        <div class="card-glass p-8 md:p-12 backdrop-blur-lg border border-white/20">
          <form @submit.prevent="handleSubmit" class="space-y-6">

            <!-- Name Field -->
            <div>
              <label
                for="name"
                class="block text-sm font-semibold mb-2"
                :style="{ color: labelColor }"
              >
                {{ nameLabel }} {{ nameRequired ? '*' : '' }}
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                :required="nameRequired"
                :placeholder="namePlaceholder"
                class="w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-500"
                :class="{ 'border-red-400 bg-red-50/80': errors.name }"
                :disabled="isLoading"
              >
              <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
            </div>

            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="block text-sm font-semibold mb-2"
                :style="{ color: labelColor }"
              >
                {{ emailLabel }} *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                :placeholder="emailPlaceholder"
                class="w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-500"
                :class="{ 'border-red-400 bg-red-50/80': errors.email }"
                :disabled="isLoading"
              >
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- Phone Field -->
            <div v-if="showPhoneField">
              <label
                for="phone"
                class="block text-sm font-semibold mb-2"
                :style="{ color: labelColor }"
              >
                {{ phoneLabel }} {{ phoneRequired ? '*' : '' }}
              </label>
              <input
                id="phone"
                v-model="form.phoneNumber"
                type="tel"
                :required="phoneRequired"
                :placeholder="phonePlaceholder"
                class="w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-500"
                :class="{ 'border-red-400 bg-red-50/80': errors.phoneNumber }"
                :disabled="isLoading"
              >
              <p v-if="errors.phoneNumber" class="mt-2 text-sm text-red-600">{{ errors.phoneNumber }}</p>
            </div>

            <!-- Subject Field -->
            <div v-if="showSubjectField">
              <label
                for="subject"
                class="block text-sm font-semibold mb-2"
                :style="{ color: labelColor }"
              >
                {{ subjectLabel }} {{ subjectRequired ? '*' : '' }}
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                :required="subjectRequired"
                :placeholder="subjectPlaceholder"
                class="w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-500"
                :class="{ 'border-red-400 bg-red-50/80': errors.subject }"
                :disabled="isLoading"
              >
              <p v-if="errors.subject" class="mt-2 text-sm text-red-600">{{ errors.subject }}</p>
            </div>

            <!-- Message Field -->
            <div>
              <label
                for="message"
                class="block text-sm font-semibold mb-2"
                :style="{ color: labelColor }"
              >
                {{ messageLabel }} *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                :placeholder="messagePlaceholder"
                class="w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500"
                :class="{ 'border-red-400 bg-red-50/80': errors.message }"
                :disabled="isLoading"
              ></textarea>
              <p v-if="errors.message" class="mt-2 text-sm text-red-600">{{ errors.message }}</p>
            </div>

            <!-- Marketing Consent -->
            <div v-if="showMarketingConsent" class="flex items-start space-x-3">
              <div class="flex-shrink-0 pt-1">
                <input
                  id="marketing-consent"
                  v-model="form.marketingConsent"
                  type="checkbox"
                  class="w-4 h-4 rounded border-2 border-gray-300 focus:ring-2 focus:ring-primary"
                  :disabled="isLoading"
                >
              </div>
              <label
                for="marketing-consent"
                class="text-sm cursor-pointer"
                :style="{ color: labelColor }"
              >
                {{ marketingConsentText }}
              </label>
            </div>

            <!-- Privacy Policy -->
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 pt-1">
                <input
                  id="privacy-policy"
                  v-model="form.privacyConsent"
                  type="checkbox"
                  required
                  class="w-4 h-4 rounded border-2 border-gray-300 focus:ring-2 focus:ring-primary"
                  :disabled="isLoading"
                >
              </div>
              <label
                for="privacy-policy"
                class="text-sm cursor-pointer"
                :style="{ color: labelColor }"
              >
                {{ privacyConsentText }} *
              </label>
              <p v-if="errors.privacyConsent" class="mt-2 text-sm text-red-600">{{ errors.privacyConsent }}</p>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="isLoading || !isFormValid"
                class="btn btn-primary w-full py-4 text-lg font-semibold relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
              >
                <span v-if="!isLoading" class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  {{ submitButtonText }}
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loadingText }}
                </span>
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-6 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl animate-fade-in">
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <h4 class="text-green-800 font-semibold">{{ successTitle }}</h4>
                  <p class="text-green-700 text-sm mt-1">{{ successMessage }}</p>
                </div>
              </div>
            </div>

            <!-- General Error Message -->
            <div v-if="generalError" class="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl">
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <h4 class="text-red-800 font-semibold">Fehler</h4>
                  <p class="text-red-700 text-sm mt-1">{{ generalError }}</p>
                </div>
              </div>
            </div>

            <!-- Route Tracking Info (Debug Mode) -->
            <div v-if="debugMode && routeInfo" class="mt-6 p-4 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl text-xs text-gray-600">
              <h5 class="font-semibold mb-2">Route Tracking Info (Debug Mode):</h5>
              <pre>{{ JSON.stringify(routeInfo, null, 2) }}</pre>
            </div>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { API_BASE_URL, API_ENDPOINTS } from '~/utils/constants'
interface ContactFormData {
  name: string
  email: string
  phoneNumber?: string
  subject?: string
  message: string
  marketingConsent: boolean
  privacyConsent: boolean
}

interface RouteInfo {
  currentRoute: string
  referrerRoute?: string
  fullPath: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  timestamp: string
}

interface Props {
  // Content
  headline?: string
  subheadline?: string

  // Badge
  showBadge?: boolean
  badgeText?: string

  // Form Labels
  nameLabel?: string
  emailLabel?: string
  phoneLabel?: string
  subjectLabel?: string
  messageLabel?: string

  // Form Placeholders
  namePlaceholder?: string
  emailPlaceholder?: string
  phonePlaceholder?: string
  subjectPlaceholder?: string
  messagePlaceholder?: string

  // Field Visibility
  showPhoneField?: boolean
  showSubjectField?: boolean
  showMarketingConsent?: boolean

  // Field Requirements
  nameRequired?: boolean
  phoneRequired?: boolean
  subjectRequired?: boolean

  // Consent Text
  marketingConsentText?: string
  privacyConsentText?: string

  // Button Text
  submitButtonText?: string
  loadingText?: string

  // Success/Error Messages
  successTitle?: string
  successMessage?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
  labelColor?: string

  // Functionality
  enableRouteTracking?: boolean
  debugMode?: boolean
  submitUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Kontaktiere uns',
  subheadline: 'Hast du Fragen zu unseren Kursen oder benötigst du persönliche Beratung? Wir sind für dich da!',

  showBadge: true,
  badgeText: 'Kontakt',

  nameLabel: 'Vollständiger Name',
  emailLabel: 'E-Mail-Adresse',
  phoneLabel: 'Telefonnummer',
  subjectLabel: 'Betreff',
  messageLabel: 'Nachricht',

  namePlaceholder: 'Dein vollständiger Name',
  emailPlaceholder: 'deine@email.de',
  phonePlaceholder: '+49 123 456 7890',
  subjectPlaceholder: 'Worum geht es?',
  messagePlaceholder: 'Teile uns mit, wie wir dir helfen können...',

  showPhoneField: true,
  showSubjectField: true,
  showMarketingConsent: true,

  nameRequired: true,
  phoneRequired: false,
  subjectRequired: false,

  marketingConsentText: 'Ja, ich möchte über neue Kurse und Angebote per E-Mail informiert werden.',
  privacyConsentText: 'Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu.',

  submitButtonText: 'Nachricht senden',
  loadingText: 'Wird gesendet...',

  successTitle: 'Nachricht erfolgreich gesendet!',
  successMessage: 'Vielen Dank für deine Nachricht. Wir melden uns so schnell wie möglich bei dir.',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280',
  labelColor: '#374151',

  enableRouteTracking: true,
  debugMode: false,
  submitUrl: '/api/contact'
})

// Composables
const route = useRoute()

// Reactive state
const form = ref<ContactFormData>({
  name: '',
  email: '',
  phoneNumber: '',
  subject: '',
  message: '',
  marketingConsent: false,
  privacyConsent: false
})

const errors = ref<Partial<Record<keyof ContactFormData, string>>>({})
const isLoading = ref(false)
const showSuccess = ref(false)
const generalError = ref('')

// Route tracking
const routeInfo = ref<RouteInfo | null>(null)

// Initialize route tracking
onMounted(() => {
  if (props.enableRouteTracking) {
    captureRouteInfo()
  }
})

function captureRouteInfo() {
  const urlParams = new URLSearchParams(window.location.search)

  routeInfo.value = {
    currentRoute: route.name as string || route.path,
    referrerRoute: document.referrer || undefined,
    fullPath: route.fullPath,
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
    timestamp: new Date().toISOString()
  }
}

// Form validation
const isFormValid = computed(() => {
  return !!(
    form.value.email &&
    form.value.message &&
    form.value.privacyConsent &&
    (!props.nameRequired || form.value.name) &&
    (!props.phoneRequired || form.value.phoneNumber) &&
    (!props.subjectRequired || form.value.subject)
  )
})

function validateForm(): boolean {
  errors.value = {}

  if (props.nameRequired && !form.value.name.trim()) {
    errors.value.name = 'Name ist erforderlich'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'E-Mail-Adresse ist erforderlich'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Bitte gib eine gültige E-Mail-Adresse ein'
  }

  if (props.phoneRequired && !form.value.phoneNumber?.trim()) {
    errors.value.phoneNumber = 'Telefonnummer ist erforderlich'
  }

  if (props.subjectRequired && !form.value.subject?.trim()) {
    errors.value.subject = 'Betreff ist erforderlich'
  }

  if (!form.value.message.trim()) {
    errors.value.message = 'Nachricht ist erforderlich'
  }

  if (!form.value.privacyConsent) {
    errors.value.privacyConsent = 'Datenschutzerklärung muss akzeptiert werden'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  isLoading.value = true
  generalError.value = ''

  try {
    // Prepare API payload matching ContactFormRequest structure
    const apiPayload = {
      email: form.value.email,
      name: form.value.name,
      subject: form.value.subject || 'Kontaktanfrage',
      message: form.value.message,
      phoneNumber: form.value.phoneNumber || null
    }

    // Add route tracking info to message if enabled
    if (props.enableRouteTracking && routeInfo.value) {
      apiPayload.message += `\n\n--- Tracking-Informationen ---\nSeite: ${routeInfo.value.currentRoute}\nReferrer: ${routeInfo.value.referrerRoute || 'Direkt'}\nUTM Source: ${routeInfo.value.utmSource || 'N/A'}\nZeitstempel: ${routeInfo.value.timestamp}`
    }

    // Call the API
    await $fetch(API_BASE_URL + '/v1/email/contact-form', {
      method: 'POST',
      body: apiPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Show success
    showSuccess.value = true

    // Reset form
    form.value = {
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
      marketingConsent: false,
      privacyConsent: false
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Contact form submission error:', error)
    generalError.value = 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.'
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Custom focus states for form fields */
input:focus, textarea:focus {
  background-color: rgba(255, 255, 255, 0.95);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

/* Checkbox styling */
input[type="checkbox"] {
  accent-color: var(--color-primary);
}

/* Button hover effects */
.btn-primary:hover:not(:disabled) {
  background: var(--gradient-warm);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
}

/* Glass morphism enhancements */
.card-glass {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>