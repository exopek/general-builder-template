<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div class="text-center mb-8 md:mb-12">
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
          v-if="showDescription && description"
          class="text-base md:text-lg mx-auto max-w-2xl"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>
      </div>

      <!-- Asymmetric Grid Layout -->
      <div class="flex flex-col gap-4 md:gap-6">
        <!-- Top Row: Content Card + Large Image -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          <!-- Content Card (Left - 2/5 on desktop) -->
          <div class="md:col-span-2 rounded-2xl p-6 md:p-8 flex flex-col justify-between bg-white border border-gray-200">
            <div>
              <!-- Heading -->
              <h3 class="text-2xl md:text-3xl font-bold mb-4 text-gray-900" v-html="contentHeading"></h3>

              <!-- Description -->
              <p class="text-base mb-6 text-gray-700" v-html="contentDescription"></p>

              <!-- CTA Link -->
              <a
                v-if="ctaText"
                :href="ctaUrl"
                class="inline-flex items-center gap-2 font-semibold mb-8 transition-all text-gray-900"
              >
                {{ ctaText }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <!-- Feature Pills -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(feature, index) in featurePills"
                :key="index"
                class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
              >
                {{ typeof feature === 'string' ? feature : feature.text }}
              </span>
            </div>
          </div>

          <!-- Large Image (Right - 3/5 on desktop) -->
          <div class="md:col-span-3 rounded-2xl overflow-hidden bg-gray-200" style="aspect-ratio: 4/3;">
            <img
              v-if="image1"
              :src="image1"
              :alt="image1Alt || 'Feature image 1'"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-16 h-16 md:w-24 md:h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Two Equal Images -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <!-- Image 2 -->
          <div class="rounded-2xl overflow-hidden bg-gray-200" style="aspect-ratio: 4/3;">
            <img
              v-if="image2"
              :src="image2"
              :alt="image2Alt || 'Feature image 2'"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-12 h-12 md:w-20 md:h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <!-- Image 3 -->
          <div class="rounded-2xl overflow-hidden bg-gray-200" style="aspect-ratio: 4/3;">
            <img
              v-if="image3"
              :src="image3"
              :alt="image3Alt || 'Feature image 3'"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-12 h-12 md:w-20 md:h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FeaturePill {
  text: string
}

interface Props {
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean

  // Content (richText)
  tagline?: string
  headline?: string
  description?: string
  contentHeading?: string
  contentDescription?: string
  ctaText?: string
  ctaUrl?: string
  featurePills?: (string | FeaturePill)[]

  // Images
  image1?: string
  image1Alt?: string
  image2?: string
  image2Alt?: string
  image3?: string
  image3Alt?: string

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

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  contentHeading: 'Lorem ipsum dolor sit',
  contentDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim urna adipiscing praesent velit viverra sit semper lorem eu cursus vel hendrerit elementum morbi curabitur etiam nibh justo.',
  ctaText: 'Contact now',
  ctaUrl: '#',
  featurePills: () => ['Feature item', 'Feature item', 'Feature item', 'Feature item'],

  // Images
  image1: '',
  image1Alt: 'Feature image 1',
  image2: '',
  image2Alt: 'Feature image 2',
  image3: '',
  image3Alt: 'Feature image 3',

  // Colors
  backgroundColor: '#f9fafb',
  taglineColor: '#4b5563',
  headlineColor: '#111827',
  descriptionColor: '#4b5563'
})
</script>
