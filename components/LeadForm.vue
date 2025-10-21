<template>
  <section
    id="lead-form-section"
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

      <!-- Lead Form -->
      <div class="max-w-2xl mx-auto">
        <div class="card-glass p-8 md:p-12 backdrop-blur-lg border border-white/20">
          <form @submit.prevent="handleSubmit" class="space-y-6">

            <!-- Vorname Field -->
            <div>
              <label
                for="firstName"
                class="block text-sm font-semibold mb-2"
                :style="{ color: labelColor }"
              >
                {{ firstNameLabel }} *
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                :placeholder="firstNamePlaceholder"
                class="w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-500"
                :class="{ 'border-red-400 bg-red-50/80': errors.firstName }"
                :disabled="isLoading"
              >
              <p v-if="errors.firstName" class="mt-2 text-sm text-red-600">{{ errors.firstName }}</p>
            </div>

            <!-- Nachname Field -->
            <div>
              <label
                for="lastName"
                class="block text-sm font-semibold mb-2"
                :style="{ color: labelColor }"
              >
                {{ lastNameLabel }} *
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                :placeholder="lastNamePlaceholder"
                class="w-full px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-500"
                :class="{ 'border-red-400 bg-red-50/80': errors.lastName }"
                :disabled="isLoading"
              >
              <p v-if="errors.lastName" class="mt-2 text-sm text-red-600">{{ errors.lastName }}</p>
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

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LEAD_VALUES } from '~/utils/constants'

interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  privacyConsent: boolean
}

interface Props {
  // Content
  headline?: string
  subheadline?: string

  // Badge
  showBadge?: boolean
  badgeText?: string

  // Form Labels
  firstNameLabel?: string
  lastNameLabel?: string
  emailLabel?: string

  // Form Placeholders
  firstNamePlaceholder?: string
  lastNamePlaceholder?: string
  emailPlaceholder?: string

  // Consent Text
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

  // Facebook Tracking
  leadValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Jetzt informieren',
  subheadline: 'Hinterlasse uns deine Kontaktdaten und wir melden uns bei dir!',

  showBadge: true,
  badgeText: 'Kostenlose Beratung',

  firstNameLabel: 'Vorname',
  lastNameLabel: 'Nachname',
  emailLabel: 'E-Mail-Adresse',

  firstNamePlaceholder: 'Dein Vorname',
  lastNamePlaceholder: 'Dein Nachname',
  emailPlaceholder: 'deine@email.de',

  privacyConsentText: 'Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu.',

  submitButtonText: 'Jetzt anfragen',
  loadingText: 'Wird gesendet...',

  successTitle: 'Anfrage erfolgreich!',
  successMessage: 'Vielen Dank! Wir melden uns in Kürze bei dir.',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280',
  labelColor: '#374151',

  leadValue: 179// LEAD_VALUES.CONTACT_FORM could be set with builder.io
})

// Facebook Store
const facebookStore = useFacebookStore()

// Reactive state
const form = ref<LeadFormData>({
  firstName: '',
  lastName: '',
  email: '',
  privacyConsent: false
})

const errors = ref<Partial<Record<keyof LeadFormData, string>>>({})
const isLoading = ref(false)
const showSuccess = ref(false)
const generalError = ref('')

// Form validation
const isFormValid = computed(() => {
  return !!(
    form.value.firstName &&
    form.value.lastName &&
    form.value.email &&
    form.value.privacyConsent
  )
})

function validateForm(): boolean {
  errors.value = {}

  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'Vorname ist erforderlich'
  }

  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Nachname ist erforderlich'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'E-Mail-Adresse ist erforderlich'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Bitte gib eine gültige E-Mail-Adresse ein'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  isLoading.value = true
  generalError.value = ''

  try {
    // Facebook Lead Event tracken
    const trackingResult = facebookStore.trackLead({
      value: props.leadValue,
      currency: 'EUR'
    })

    if (!trackingResult.success) {
      console.warn('Facebook Lead tracking failed:', trackingResult.error)
    }

    // TODO: Hier kannst du das Formular an deine API senden
    // Beispiel:
    // await $fetch('/api/leads', {
    //   method: 'POST',
    //   body: {
    //     firstName: form.value.firstName,
    //     lastName: form.value.lastName,
    //     email: form.value.email
    //   }
    // })

    // Simuliere API Call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Show success
    showSuccess.value = true

    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      privacyConsent: false
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Lead form submission error:', error)
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
input:focus {
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
