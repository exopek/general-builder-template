<template>
  <section
    class="py-16 md:py-20 relative"
    :style="sectionStyle"
  >
    <!-- Optional Background Image Overlay -->
    <div
      v-if="showBackgroundOverlay"
      class="absolute inset-0"
      :style="{ backgroundColor: backgroundOverlayColor, opacity: backgroundOverlayOpacity / 100 }"
    ></div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">

      <!-- Centered Content -->
      <div class="max-w-4xl mx-auto text-center">

        <!-- Tagline -->
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-4"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>

        <!-- Headline -->
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
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

        <!-- CTA Buttons -->
        <div v-if="showCtaButtons" class="flex flex-wrap justify-center gap-4">
          <!-- Primary CTA -->
          <a
            v-if="showPrimaryCta && primaryCtaText"
            :href="primaryCtaUrl || '#'"
            class="inline-block px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            :style="{
              backgroundColor: primaryCtaBackgroundColor,
              color: primaryCtaTextColor
            }"
          >
            {{ primaryCtaText }}
          </a>

          <!-- Secondary CTA -->
          <a
            v-if="showSecondaryCta && secondaryCtaText"
            :href="secondaryCtaUrl || '#'"
            class="inline-block px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:opacity-80"
            :style="{
              borderColor: secondaryCtaBorderColor,
              color: secondaryCtaTextColor,
              backgroundColor: 'transparent'
            }"
          >
            {{ secondaryCtaText }}
          </a>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // === VISIBILITY TOGGLES ===
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showCtaButtons?: boolean
  showPrimaryCta?: boolean
  showSecondaryCta?: boolean
  showBackgroundOverlay?: boolean

  // === CONTENT ===
  tagline?: string
  headline?: string
  description?: string

  // === COLORS ===
  backgroundColor?: string
  backgroundImage?: string
  backgroundOverlayColor?: string
  backgroundOverlayOpacity?: number
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string

  // === PRIMARY CTA ===
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaBackgroundColor?: string
  primaryCtaTextColor?: string

  // === SECONDARY CTA ===
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaBorderColor?: string
  secondaryCtaTextColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showCtaButtons: true,
  showPrimaryCta: true,
  showSecondaryCta: true,
  showBackgroundOverlay: false,

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet consectetur',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Colors
  backgroundColor: '#8b8b8b',
  backgroundImage: '',
  backgroundOverlayColor: '#000000',
  backgroundOverlayOpacity: 40,
  taglineColor: '#f3f4f6',
  headlineColor: '#ffffff',
  descriptionColor: '#d1d5db',

  // Primary CTA
  primaryCtaText: 'Contact now',
  primaryCtaUrl: '',
  primaryCtaBackgroundColor: '#ffffff',
  primaryCtaTextColor: '#111827',

  // Secondary CTA
  secondaryCtaText: 'See more',
  secondaryCtaUrl: '',
  secondaryCtaBorderColor: '#ffffff',
  secondaryCtaTextColor: '#ffffff'
})

const sectionStyle = computed(() => {
  const style: Record<string, string> = {
    backgroundColor: props.backgroundColor
  }

  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
    style.backgroundRepeat = 'no-repeat'
  }

  return style
})
</script>
