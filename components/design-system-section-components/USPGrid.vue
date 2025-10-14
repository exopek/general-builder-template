<template>
  <section
    class="py-16 md:py-20 lg:py-24"
    :class="backgroundClass"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div v-if="showHeader" class="text-center mb-12 md:mb-16">
        <p
          v-if="tagline"
          class="text-sm md:text-base font-semibold mb-3 uppercase tracking-wide"
          :class="taglineColorClass"
        >
          {{ tagline }}
        </p>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight"
          :class="headlineColorClass"
        >
          {{ headline }}
        </h2>
        <p
          v-if="description"
          class="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          :class="descriptionColorClass"
        >
          {{ description }}
        </p>
      </div>

      <!-- USP Cards Grid -->
      <div
        class="grid gap-6 lg:gap-8"
        :class="gridColumnsClass"
      >
        <slot />
      </div>

      <!-- Optional CTA Button -->
      <div v-if="showCta && ctaText" class="text-center mt-12 md:mt-16">
        <Button
          :text="ctaText"
          :href="ctaUrl"
          :variant="ctaVariant"
          :size="ctaSize"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'
interface Props {
  // Header
  showHeader?: boolean
  tagline?: string
  headline?: string
  description?: string

  // Layout
  columns?: '2' | '3' | '4'
  backgroundColor?: 'white' | 'gray' | 'dark'

  // CTA
  showCta?: boolean
  ctaText?: string
  ctaUrl?: string
  ctaVariant?: 'primary' | 'secondary' | 'gradient' | 'outline'
  ctaSize?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: true,
  tagline: '',
  headline: 'Unsere Vorteile',
  description: '',
  columns: '3',
  backgroundColor: 'white',
  showCta: false,
  ctaText: '',
  ctaUrl: '#',
  ctaVariant: 'gradient',
  ctaSize: 'lg'
})

const backgroundClass = computed(() => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900'
  }
  return backgrounds[props.backgroundColor]
})

const taglineColorClass = computed(() => {
  return props.backgroundColor === 'dark' ? 'text-orange-400' : 'text-orange-600'
})

const headlineColorClass = computed(() => {
  return props.backgroundColor === 'dark' ? 'text-white' : 'text-gray-900'
})

const descriptionColorClass = computed(() => {
  return props.backgroundColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
})

const gridColumnsClass = computed(() => {
  const columns = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4'
  }
  return columns[props.columns]
})
</script>
