<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: sectionBackgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Top Section: Content + Statistics -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 mb-8 md:mb-12">
        <!-- Left: Content (2/5 on desktop) -->
        <div class="lg:col-span-2">
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
            class="text-base md:text-lg"
            :style="{
              color: 'var(--color-gray-600)',
              lineHeight: 'var(--line-height-relaxed)'
            }"
          >
            {{ description }}
          </p>
        </div>

        <!-- Right: Statistics Grid (3/5 on desktop) -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-2 gap-6 md:gap-8">
            <div
              v-for="(stat, index) in statistics"
              :key="index"
              class="stat-item"
            >
              <!-- Large Number -->
              <div
                class="text-4xl md:text-5xl lg:text-6xl font-black mb-2"
                :style="{
                  color: 'var(--color-gray-900)',
                  lineHeight: 'var(--line-height-none)'
                }"
              >
                {{ formatStatValue(stat.value, stat.suffix) }}
              </div>
              <!-- Label -->
              <p
                class="text-sm md:text-base"
                :style="{
                  color: 'var(--color-gray-600)',
                  lineHeight: 'var(--line-height-normal)'
                }"
              >
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Image Gallery -->
      <div
        v-if="galleryLayout === 'scroll'"
        class="overflow-x-auto -mx-4 px-4 md:-mx-6 md:px-6"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div class="flex gap-4 md:gap-6" style="min-width: min-content;">
          <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="flex-shrink-0 rounded-xl overflow-hidden"
            :style="{
              width: getImageWidth(),
              aspectRatio: imageAspectRatio,
              backgroundColor: 'var(--color-gray-200)',
              borderRadius: 'var(--border-radius-xl)'
            }"
          >
            <img
              v-if="image.src"
              :src="image.src"
              :alt="image.alt || `Gallery image ${index + 1}`"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <!-- Placeholder icon if no image -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg
                class="w-12 h-12 md:w-16 md:h-16"
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

      <!-- Grid Gallery Layout (Alternative) -->
      <div
        v-else-if="galleryLayout === 'grid'"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
      >
        <div
          v-for="(image, index) in galleryImages"
          :key="index"
          class="rounded-xl overflow-hidden"
          :style="{
            aspectRatio: imageAspectRatio,
            backgroundColor: 'var(--color-gray-200)',
            borderRadius: 'var(--border-radius-xl)'
          }"
        >
          <img
            v-if="image.src"
            :src="image.src"
            :alt="image.alt || `Gallery image ${index + 1}`"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <!-- Placeholder icon if no image -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg
              class="w-12 h-12 md:w-16 md:h-16"
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
  </section>
</template>

<script setup lang="ts">
interface Statistic {
  value: number | string
  suffix?: string
  label: string
}

interface GalleryImage {
  src?: string
  alt?: string
}

interface Props {
  // Section Header
  tagline?: string
  headline?: string
  description?: string
  sectionBackgroundColor?: string

  // Statistics
  statistics?: Statistic[]

  // Gallery
  galleryImages?: GalleryImage[]
  galleryLayout?: 'scroll' | 'grid'
  imageAspectRatio?: string
  imageWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  sectionBackgroundColor: 'var(--color-white)',

  statistics: () => [
    { value: 100, suffix: '+', label: 'Lorem ipsum' },
    { value: 50, suffix: 'k', label: 'Class aptent' },
    { value: 23, suffix: '+', label: 'Aliquam in' },
    { value: 10, suffix: 'M+', label: 'Vestibulum' }
  ],

  galleryImages: () => [
    { src: '', alt: 'Gallery image 1' },
    { src: '', alt: 'Gallery image 2' },
    { src: '', alt: 'Gallery image 3' },
    { src: '', alt: 'Gallery image 4' },
    { src: '', alt: 'Gallery image 5' }
  ],

  galleryLayout: 'scroll',
  imageAspectRatio: '4/3',
  imageWidth: '280px'
})

// Format statistic value with suffix
const formatStatValue = (value: number | string, suffix?: string): string => {
  return `${value}${suffix || ''}`
}

// Get image width for scroll layout
const getImageWidth = (): string => {
  return props.imageWidth
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling */
.overflow-x-auto {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
