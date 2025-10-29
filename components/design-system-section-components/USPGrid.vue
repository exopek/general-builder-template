<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div v-if="showTagline || showHeadline || showDescription" class="text-center mb-8 md:mb-12">
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3 uppercase tracking-wide"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>
        <div
          v-if="showDescription && description"
          class="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>
      </div>

      <!-- USP Cards Grid -->
      <div
        class="grid gap-4 md:gap-6"
        :class="gridColumnsClass"
      >
        <slot />
      </div>

      <!-- Optional CTA Button -->
      <div v-if="showCta && ctaText" class="text-center mt-8 md:mt-12">
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
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean

  // Content (richText)
  tagline?: string
  headline?: string
  description?: string

  // Layout
  columns?: '2' | '3' | '4'

  // CTA
  showCta?: boolean
  ctaText?: string
  ctaUrl?: string
  ctaVariant?: 'primary' | 'secondary' | 'gradient' | 'outline'
  ctaSize?: 'sm' | 'md' | 'lg' | 'xl'

  // Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: true,
  showHeadline: true,
  showDescription: false,

  // Content
  tagline: 'Tagline',
  headline: 'Unsere Vorteile',
  description: '',

  // Layout
  columns: '3',

  // CTA
  showCta: false,
  ctaText: '',
  ctaUrl: '#',
  ctaVariant: 'gradient',
  ctaSize: 'lg',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#ea580c',
  headlineColor: '#111827',
  descriptionColor: '#4b5563'
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
