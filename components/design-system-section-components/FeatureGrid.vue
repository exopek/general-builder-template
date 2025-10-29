<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div class="mb-8 md:mb-12">
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3 uppercase tracking-wide"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
          <div
            v-if="showDescription && description"
            class="text-base md:text-lg md:max-w-2xl"
            :style="{ color: descriptionColor }"
            v-html="description"
          ></div>
          <Button
            v-if="showButton && buttonText"
            :text="buttonText"
            :href="buttonUrl"
            variant="primary"
            size="md"
            class="flex-shrink-0"
          />
        </div>
      </div>

      <!-- Feature Grid (Asymmetric on large screens) -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="rounded-2xl p-6 md:p-8 transition-all"
          :class="{
            'lg:col-span-2': index === 0 || index === 2,
            'lg:col-start-2': index === 2
          }"
          :style="{
            backgroundColor: feature.backgroundColor || '#f3f4f6'
          }"
        >
          <!-- Number -->
          <div
            class="text-5xl md:text-6xl font-black mb-4 md:mb-6"
            :style="{ color: feature.numberColor || '#9ca3af' }"
            v-html="feature.number"
          ></div>

          <!-- Heading -->
          <h3
            class="text-xl md:text-2xl font-bold mb-3"
            :style="{ color: feature.headingColor || '#111827' }"
            v-html="feature.heading"
          ></h3>

          <!-- Description -->
          <div
            class="text-sm md:text-base"
            :style="{ color: feature.descriptionColor || '#4b5563' }"
            v-html="feature.description"
          ></div>
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
  backgroundColor?: string
  numberColor?: string
  headingColor?: string
  descriptionColor?: string
}

interface Props {
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showButton?: boolean

  // Content (richText)
  tagline?: string
  headline?: string
  description?: string
  buttonText?: string
  buttonUrl?: string

  // Features
  features?: Feature[]

  // Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility Toggles
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showButton: true,

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  buttonText: 'View all',
  buttonUrl: '#',

  // Features
  features: () => [
    {
      number: '01',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim and more lorem.',
      backgroundColor: '#111827',
      numberColor: '#374151',
      headingColor: '#ffffff',
      descriptionColor: '#d1d5db'
    },
    {
      number: '02',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
      backgroundColor: '#f3f4f6',
      numberColor: '#9ca3af',
      headingColor: '#111827',
      descriptionColor: '#4b5563'
    },
    {
      number: '03',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
      backgroundColor: '#f3f4f6',
      numberColor: '#9ca3af',
      headingColor: '#111827',
      descriptionColor: '#4b5563'
    },
    {
      number: '04',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
      backgroundColor: '#f3f4f6',
      numberColor: '#9ca3af',
      headingColor: '#111827',
      descriptionColor: '#4b5563'
    }
  ],

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#4b5563',
  headlineColor: '#111827',
  descriptionColor: '#4b5563'
})
</script>
