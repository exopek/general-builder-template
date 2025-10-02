<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: sectionBackgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div v-if="tagline || headline || description" class="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
        <p
          v-if="tagline"
          class="text-sm md:text-base font-semibold mb-3 uppercase tracking-wide"
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
          class="text-base md:text-lg"
          :style="{
            color: 'var(--color-gray-600)',
            lineHeight: 'var(--line-height-relaxed)'
          }"
        >
          {{ description }}
        </p>
      </div>

      <!-- Feature Slider -->
      <div class="max-w-5xl mx-auto">
        <!-- Slider Container -->
        <div class="relative">
          <!-- Slider Image -->
          <div
            class="relative rounded-xl overflow-hidden mb-6"
            :style="{
              backgroundColor: 'var(--color-gray-200)',
              aspectRatio: '16/9'
            }"
          >
            <img
              v-if="featuredItems[activeSlide]?.image"
              :src="featuredItems[activeSlide].image"
              :alt="featuredItems[activeSlide].imageAlt || featuredItems[activeSlide].heading || 'Feature image'"
              class="w-full h-full object-cover"
            />
            <!-- Image Placeholder -->
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
            >
              <svg class="w-16 h-16" :style="{ color: 'var(--color-gray-400)' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>

            <!-- Navigation Arrows -->
            <button
              v-if="featuredItems.length > 1"
              @click="prevSlide"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              :style="{
                backgroundColor: 'var(--color-white)',
                boxShadow: 'var(--shadow-md)'
              }"
              aria-label="Previous slide"
            >
              <svg class="w-6 h-6" :style="{ color: 'var(--color-gray-900)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              v-if="featuredItems.length > 1"
              @click="nextSlide"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              :style="{
                backgroundColor: 'var(--color-white)',
                boxShadow: 'var(--shadow-md)'
              }"
              aria-label="Next slide"
            >
              <svg class="w-6 h-6" :style="{ color: 'var(--color-gray-900)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Slider Content -->
          <div class="mb-6 text-center">
            <h3
              class="text-xl md:text-2xl font-bold mb-3"
              :style="{ color: 'var(--color-gray-900)' }"
            >
              {{ featuredItems[activeSlide]?.heading || 'Lorem ipsum' }}
            </h3>
            <p
              class="text-base max-w-2xl mx-auto"
              :style="{ color: 'var(--color-gray-600)' }"
            >
              {{ featuredItems[activeSlide]?.description || 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.' }}
            </p>
          </div>

          <!-- Slider Dots -->
          <div class="flex items-center justify-center gap-2">
            <button
              v-for="(item, index) in featuredItems"
              :key="index"
              @click="activeSlide = index"
              class="rounded-full transition-all"
              :style="{
                backgroundColor: index === activeSlide ? 'var(--color-gray-900)' : 'var(--color-gray-300)',
                width: index === activeSlide ? '2rem' : '0.5rem',
                height: '0.5rem'
              }"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FeaturedItem {
  image?: string
  imageAlt?: string
  heading: string
  description: string
}

interface Props {
  tagline?: string
  headline?: string
  description?: string
  featuredItems?: FeaturedItem[]
  sectionBackgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet consectetur adipiscing',
  description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim tempor sunt.',
  featuredItems: () => [
    {
      heading: 'Lorem ipsum',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.'
    },
    {
      heading: 'Lorem ipsum 2',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.'
    }
  ],
  sectionBackgroundColor: 'var(--color-white)'
})

const activeSlide = ref(0)

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % props.featuredItems.length
}

const prevSlide = () => {
  activeSlide.value = activeSlide.value === 0 ? props.featuredItems.length - 1 : activeSlide.value - 1
}
</script>
