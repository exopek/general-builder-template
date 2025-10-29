<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div v-if="showTagline || showHeadline || showSubheadline" class="text-center mb-8 md:mb-12">
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>
        <div
          v-if="showSubheadline && subheadline"
          class="text-base md:text-lg mx-auto max-w-2xl"
          :style="{ color: subheadlineColor }"
          v-html="subheadline"
        ></div>
      </div>

      <!-- Features Grid -->
      <div class="flex flex-col gap-12 lg:gap-16">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center"
        >
          <!-- Image (Desktop: alternates position) -->
          <div
            class="relative rounded-2xl overflow-hidden"
            :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'"
            :style="{
              backgroundColor: '#f3f4f6',
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
              <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
            <!-- Number Badge -->
            <div
              class="text-5xl md:text-6xl font-black mb-4"
              :style="{ color: numberColor }"
              v-html="feature.number"
            ></div>

            <!-- Heading -->
            <h3
              class="text-2xl md:text-3xl font-bold mb-3"
              :style="{ color: featureHeadingColor }"
              v-html="feature.heading"
            ></h3>

            <!-- Description -->
            <div
              class="text-base mb-6"
              :style="{ color: featureDescriptionColor }"
              v-html="feature.description"
            ></div>

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
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showSubheadline?: boolean

  // Content (richText)
  tagline?: string
  headline?: string
  subheadline?: string

  // Features
  features?: Feature[]

  // Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  subheadlineColor?: string
  numberColor?: string
  featureHeadingColor?: string
  featureDescriptionColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility Toggles
  showTagline: true,
  showHeadline: true,
  showSubheadline: true,

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  subheadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Features
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

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#4b5563',
  headlineColor: '#111827',
  subheadlineColor: '#4b5563',
  numberColor: '#111827',
  featureHeadingColor: '#111827',
  featureDescriptionColor: '#4b5563'
})
</script>
