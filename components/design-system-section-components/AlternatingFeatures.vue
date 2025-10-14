<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor: sectionBackgroundColor }">
    <div class="container">
      <!-- Section Header -->
      <div v-if="tagline || headline || subheadline" class="text-center mb-12 md:mb-16">
        <p v-if="tagline" class="text-sm font-semibold mb-2" :style="{ color: 'var(--color-gray-600)' }">
          {{ tagline }}
        </p>
        <h2 v-if="headline" class="text-3xl md:text-4xl lg:text-5xl font-black mb-4" :style="{ color: 'var(--color-gray-900)' }">
          {{ headline }}
        </h2>
        <p v-if="subheadline" class="text-base md:text-lg mx-auto" :style="{ color: 'var(--color-gray-600)', maxWidth: '600px' }">
          {{ subheadline }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="flex flex-col gap-12 md:gap-16 lg:gap-20">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center"
        >
          <!-- Image (Desktop: alternates position) -->
          <div
            class="relative rounded-xl overflow-hidden"
            :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'"
            :style="{
              backgroundColor: 'var(--color-gray-200)',
              aspectRatio: '4/3'
            }"
          >
            <img
              v-if="feature.image"
              :src="feature.image"
              :alt="feature.imageAlt || feature.heading"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder icon if no image -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-16 h-16" :style="{ color: 'var(--color-gray-400)' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
            <!-- Number Badge -->
            <div class="text-5xl md:text-6xl font-black mb-4" :style="{ color: 'var(--color-gray-900)' }">
              {{ feature.number }}
            </div>

            <!-- Heading -->
            <h3 class="text-2xl md:text-3xl font-bold mb-3" :style="{ color: 'var(--color-gray-900)' }">
              {{ feature.heading }}
            </h3>

            <!-- Description -->
            <p class="text-base mb-6" :style="{ color: 'var(--color-gray-600)' }">
              {{ feature.description }}
            </p>

            <!-- Buttons -->
            <div class="flex flex-wrap gap-3">
              <Button
                v-if="feature.primaryButtonText"
                :text="feature.primaryButtonText"
                :href="feature.primaryButtonUrl"
                variant="primary"
                size="md"
              />
              <Button
                v-if="feature.secondaryButtonText"
                :text="feature.secondaryButtonText + ' →'"
                :href="feature.secondaryButtonUrl"
                variant="ghost"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'
interface Feature {
  number: string
  heading: string
  description: string
  image?: string
  imageAlt?: string
  primaryButtonText?: string
  primaryButtonUrl?: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
}

interface Props {
  tagline?: string
  headline?: string
  subheadline?: string
  features?: Feature[]
  sectionBackgroundColor?: string
}

withDefaults(defineProps<Props>(), {
  tagline: '',
  headline: 'Lorem ipsum dolor sit amet',
  subheadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  features: () => [
    {
      number: '01',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.',
      primaryButtonText: 'Contact',
      primaryButtonUrl: '#',
      secondaryButtonText: 'See more',
      secondaryButtonUrl: '#'
    }
  ],
  sectionBackgroundColor: 'var(--color-white)'
})
</script>
