<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: sectionBackgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header (Centered) -->
      <div class="text-center mb-8 md:mb-12 lg:mb-16">
        <p
          v-if="tagline"
          class="text-sm md:text-base font-semibold mb-3"
          :style="{ color: 'var(--color-gray-600)' }"
        >
          {{ tagline }}
        </p>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{
            color: 'var(--color-gray-900)',
            lineHeight: 'var(--line-height-tight)'
          }"
        >
          {{ headline }}
        </h2>
        <p
          v-if="description"
          class="text-base md:text-lg mx-auto"
          :style="{
            color: 'var(--color-gray-600)',
            maxWidth: '600px',
            lineHeight: 'var(--line-height-relaxed)'
          }"
        >
          {{ description }}
        </p>
      </div>

      <!-- Asymmetric Grid Layout -->
      <div class="flex flex-col gap-4 md:gap-6">
        <!-- Top Row: Content Card + Large Image -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          <!-- Content Card (Left - 2/5 on desktop) -->
          <div
            class="md:col-span-2 rounded-xl p-6 md:p-8 flex flex-col justify-between"
            :style="{
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-gray-200)',
              borderRadius: 'var(--border-radius-xl)'
            }"
          >
            <div>
              <!-- Heading -->
              <h3
                class="text-2xl md:text-3xl font-bold mb-4"
                :style="{
                  color: 'var(--color-gray-900)',
                  lineHeight: 'var(--line-height-tight)'
                }"
              >
                {{ contentHeading }}
              </h3>

              <!-- Description -->
              <p
                class="text-base mb-6"
                :style="{
                  color: 'var(--color-gray-700)',
                  lineHeight: 'var(--line-height-relaxed)'
                }"
              >
                {{ contentDescription }}
              </p>

              <!-- CTA Link -->
              <a
                v-if="ctaText"
                :href="ctaUrl"
                class="inline-flex items-center gap-2 font-semibold mb-8 transition-all"
                :style="{
                  color: 'var(--color-gray-900)',
                  fontSize: 'var(--font-size-base)'
                }"
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
                class="px-4 py-2 rounded-full text-sm font-medium"
                :style="{
                  backgroundColor: index === 2 ? 'var(--color-accent-purple)' : 'var(--color-gray-100)',
                  color: index === 2 ? 'var(--color-white)' : 'var(--color-gray-700)',
                  borderRadius: 'var(--border-radius-full)',
                  fontSize: 'var(--font-size-sm)'
                }"
              >
                {{ typeof feature === 'string' ? feature : feature.text }}
              </span>
            </div>
          </div>

          <!-- Large Image (Right - 3/5 on desktop) -->
          <div
            class="md:col-span-3 rounded-xl overflow-hidden"
            :style="{
              backgroundColor: 'var(--color-gray-200)',
              borderRadius: 'var(--border-radius-xl)',
              aspectRatio: imageAspectRatio
            }"
          >
            <img
              v-if="image1"
              :src="image1"
              :alt="image1Alt || 'Feature image 1'"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder icon if no image -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg
                class="w-16 h-16 md:w-24 md:h-24"
                :style="{ color: 'var(--color-gray-400)' }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Two Equal Images -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <!-- Image 2 -->
          <div
            class="rounded-xl overflow-hidden"
            :style="{
              backgroundColor: 'var(--color-gray-200)',
              borderRadius: 'var(--border-radius-xl)',
              aspectRatio: imageAspectRatio
            }"
          >
            <img
              v-if="image2"
              :src="image2"
              :alt="image2Alt || 'Feature image 2'"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder icon if no image -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg
                class="w-12 h-12 md:w-20 md:h-20"
                :style="{ color: 'var(--color-gray-400)' }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <!-- Image 3 -->
          <div
            class="rounded-xl overflow-hidden"
            :style="{
              backgroundColor: 'var(--color-gray-200)',
              borderRadius: 'var(--border-radius-xl)',
              aspectRatio: imageAspectRatio
            }"
          >
            <img
              v-if="image3"
              :src="image3"
              :alt="image3Alt || 'Feature image 3'"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder icon if no image -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg
                class="w-12 h-12 md:w-20 md:h-20"
                :style="{ color: 'var(--color-gray-400)' }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
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
  // Section Header
  tagline?: string
  headline?: string
  description?: string
  sectionBackgroundColor?: string

  // Content Card
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
  imageAspectRatio?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  sectionBackgroundColor: 'var(--color-gray-50)',

  contentHeading: 'Lorem ipsum dolor sit',
  contentDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim urna adipiscing praesent velit viverra sit semper lorem eu cursus vel hendrerit elementum morbi curabitur etiam nibh justo.',
  ctaText: 'Contact now',
  ctaUrl: '#',
  featurePills: () => ['Feature item', 'Feature item', 'Feature item', 'Feature item'],

  image1: '',
  image1Alt: 'Feature image 1',
  image2: '',
  image2Alt: 'Feature image 2',
  image3: '',
  image3Alt: 'Feature image 3',
  imageAspectRatio: '4/3'
})
</script>
