<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto px-4 md:px-6">

      <!-- Centered Content -->
      <div class="max-w-4xl mx-auto text-center">

        <!-- Headline -->
        <h2
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></h2>

        <!-- Description -->
        <div
          v-if="showDescription && description"
          class="text-base md:text-lg mb-8"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>

        <!-- Email Form -->
        <form
          v-if="showForm"
          @submit.prevent="handleSubmit"
          class="max-w-2xl mx-auto mb-4"
        >
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- Email Input -->
            <input
              v-model="emailInput"
              type="email"
              :placeholder="inputPlaceholder"
              required
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
              :style="{
                backgroundColor: inputBackgroundColor,
                color: inputTextColor,
                '--tw-ring-color': buttonBackgroundColor
              }"
            />

            <!-- Submit Button -->
            <button
              type="submit"
              class="px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90 whitespace-nowrap"
              :style="{
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor
              }"
            >
              {{ buttonText }}
            </button>
          </div>
        </form>

        <!-- Terms & Conditions Disclaimer -->
        <p
          v-if="showDisclaimer && disclaimerText"
          class="text-xs md:text-sm"
          :style="{ color: disclaimerColor }"
        >
          {{ disclaimerPrefix }}
          <a
            v-if="termsUrl"
            :href="termsUrl"
            class="font-semibold hover:underline transition-all"
            :style="{ color: disclaimerLinkColor }"
          >
            {{ termsLinkText }}
          </a>
          <span
            v-else
            class="font-semibold"
            :style="{ color: disclaimerLinkColor }"
          >
            {{ termsLinkText }}
          </span>
        </p>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  // === VISIBILITY TOGGLES ===
  showHeadline?: boolean
  showDescription?: boolean
  showForm?: boolean
  showDisclaimer?: boolean

  // === CONTENT ===
  headline?: string
  description?: string

  // === FORM ===
  inputPlaceholder?: string
  buttonText?: string
  formAction?: string

  // === DISCLAIMER ===
  disclaimerText?: string
  disclaimerPrefix?: string
  termsLinkText?: string
  termsUrl?: string

  // === COLORS ===
  backgroundColor?: string
  headlineColor?: string
  descriptionColor?: string
  inputBackgroundColor?: string
  inputTextColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  disclaimerColor?: string
  disclaimerLinkColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showHeadline: true,
  showDescription: true,
  showForm: true,
  showDisclaimer: true,

  // Content
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

  // Form
  inputPlaceholder: 'Your email',
  buttonText: 'Register',
  formAction: '',

  // Disclaimer
  disclaimerText: '',
  disclaimerPrefix: 'By clicking Register, you acknowledge that you have read and accepted our ',
  termsLinkText: 'Terms and Conditions',
  termsUrl: '',

  // Colors
  backgroundColor: '#6b7280',
  headlineColor: '#ffffff',
  descriptionColor: '#f3f4f6',
  inputBackgroundColor: '#ffffff',
  inputTextColor: '#111827',
  buttonBackgroundColor: '#111827',
  buttonTextColor: '#ffffff',
  disclaimerColor: '#d1d5db',
  disclaimerLinkColor: '#ffffff'
})

const emailInput = ref('')

const handleSubmit = () => {
  if (props.formAction) {
    // If formAction is provided, submit to that URL
    window.location.href = `${props.formAction}?email=${encodeURIComponent(emailInput.value)}`
  } else {
    // Otherwise, just log (can be customized by parent)
    console.log('Email submitted:', emailInput.value)
    // Emit event for parent component to handle
    // emit('submit', emailInput.value)
  }
}
</script>
