<template>
  <section
    class="py-16 md:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">

      <!-- Content Section -->
      <div class="max-w-3xl mx-auto text-center mb-8 md:mb-12">

        <!-- Headline -->
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>

        <!-- Description -->
        <div
          v-if="showDescription && description"
          class="text-base md:text-lg mb-8"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>

        <!-- Email Capture Form -->
        <div v-if="showEmailForm" class="max-w-md mx-auto mb-4">
          <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3">
            <!-- Email Input -->
            <input
              v-model="email"
              type="email"
              :placeholder="emailPlaceholder"
              required
              class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-200 placeholder-gray-500"
              :style="{ borderColor: inputBorderColor }"
            />

            <!-- Submit Button -->
            <Button
              :text="buttonText"
              variant="primary"
              size="md"
              type="submit"
              :loading="isSubmitting"
              class="sm:w-auto w-full"
            />
          </form>
        </div>

        <!-- Terms & Conditions -->
        <p
          v-if="showTerms && termsText"
          class="text-xs md:text-sm"
          :style="{ color: termsColor }"
          v-html="termsText"
        ></p>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
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

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <h4 class="text-red-800 font-semibold">Error</h4>
              <p class="text-red-700 text-sm mt-1">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Image Section -->
      <div v-if="showImage && image" class="max-w-4xl mx-auto">
        <div
          class="rounded-2xl overflow-hidden"
          :class="{ 'shadow-2xl': showImageShadow }"
        >
          <img
            :src="image"
            :alt="imageAlt"
            class="w-full h-auto object-cover"
            :style="imageAspectRatio ? `aspect-ratio: ${imageAspectRatio}` : 'aspect-ratio: 16/9'"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/design-system-ui-components/Button.vue'

interface Props {
  // Visibility Toggles
  showHeadline?: boolean
  showDescription?: boolean
  showEmailForm?: boolean
  showTerms?: boolean
  showImage?: boolean

  // Content (richText)
  headline?: string
  description?: string
  termsText?: string

  // Form Configuration
  emailPlaceholder?: string
  buttonText?: string
  submitUrl?: string

  // Image Configuration
  image?: string
  imageAlt?: string
  imageAspectRatio?: string
  showImageShadow?: boolean

  // Success/Error Messages
  successTitle?: string
  successMessage?: string

  // Facebook Tracking
  leadValue?: number

  // Colors
  backgroundColor?: string
  headlineColor?: string
  descriptionColor?: string
  termsColor?: string
  inputBorderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showHeadline: true,
  showDescription: true,
  showEmailForm: true,
  showTerms: true,
  showImage: true,

  // Content
  headline: 'Lorem ipsum dolor sit amet <strong>consectetur adipiscing</strong>',
  description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolor.',
  termsText: 'By clicking Register, you acknowledge that you have read and accepted our <a href="#" class="underline hover:no-underline">Terms and Conditions</a>.',

  // Form
  emailPlaceholder: 'Your email',
  buttonText: 'Register',
  submitUrl: '',

  // Image
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=675&fit=crop',
  imageAlt: 'Hero Image',
  imageAspectRatio: '16/9',
  showImageShadow: true,

  // Success/Error
  successTitle: 'Success!',
  successMessage: 'Thank you! We will contact you shortly.',

  // Facebook Tracking
  leadValue: 179,

  // Colors
  backgroundColor: '#ffffff',
  headlineColor: '#111827',
  descriptionColor: '#4b5563',
  termsColor: '#6b7280',
  inputBorderColor: '#d1d5db'
})

const emit = defineEmits<{
  submit: [email: string]
  success: []
  error: [error: string]
}>()

// Facebook Store
const facebookStore = useFacebookStore()

const email = ref('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!email.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Facebook Lead Event tracking
    const trackingResult = facebookStore.trackLead({
      value: props.leadValue,
      currency: 'EUR'
    })

    if (!trackingResult.success) {
      console.warn('Facebook Lead tracking failed:', trackingResult.error)
    }

    // Emit event for parent component handling
    emit('submit', email.value)

    // API Call to backend
    const apiPayload = {
      email: email.value,
      name: 'Hero Email Capture Lead',
      subject: 'New Lead from Hero Email Capture with Image',
      message: 'Please contact this lead as soon as possible.',
      phoneNumber: null
    }

    await $fetch(API_BASE_URL + '/v1/email/contact-form', {
      method: 'POST',
      body: apiPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Show success
    showSuccess.value = true
    emit('success')

    // Reset form
    email.value = ''

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Form submission error:', error)
    errorMessage.value = 'An error occurred. Please try again later.'
    emit('error', errorMessage.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Focus ring for accessibility */
input:focus {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

/* Ensure links in terms text are styled */
:deep(a) {
  color: inherit;
  transition: all 0.2s ease;
}

:deep(a:hover) {
  color: var(--color-primary);
}

/* Fade-in animation */
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
</style>
