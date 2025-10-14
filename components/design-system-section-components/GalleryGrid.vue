<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Text Content -->
      <div class="text-center mb-8 md:mb-12">
        <p
          v-if="tagline"
          class="text-sm md:text-base font-semibold mb-3 uppercase tracking-wide"
          :style="{ color: taglineColor }"
        >
          {{ tagline }}
        </p>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{
            color: headlineColor,
            lineHeight: 'var(--line-height-tight)'
          }"
        >
          {{ headline }}
        </h2>
        <p
          v-if="description"
          class="text-base md:text-lg max-w-2xl mx-auto"
          :style="{
            color: descriptionColor,
            lineHeight: 'var(--line-height-relaxed)'
          }"
        >
          {{ description }}
        </p>
      </div>

      <!-- Gallery Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        :class="gapClass"
      >
        <!-- Top 3 Images (Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column) -->
        <div
          v-for="(image, index) in topImages"
          :key="`top-${index}`"
          class="gallery-item relative overflow-hidden rounded-xl cursor-pointer group"
          :style="{ aspectRatio: imageAspectRatio !== 'auto' ? imageAspectRatio : '4/3' }"
          @click="handleImageClick(index)"
        >
          <img
            v-if="image.src"
            :src="image.src"
            :alt="image.alt || `Gallery image ${index + 1}`"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center"
            :style="{ backgroundColor: 'var(--color-gray-200)' }"
          >
            <svg class="w-12 h-12" :style="{ color: 'var(--color-gray-400)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <!-- Overlay -->
          <div
            v-if="showOverlay"
            class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
          >
            <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        <!-- Large Bottom Image (Desktop: Spans 3 columns, Tablet: Spans 2 columns, Mobile: 1 column) -->
        <div
          v-if="bottomImage.src || displayImages.length === 4"
          class="gallery-item relative overflow-hidden rounded-xl cursor-pointer group md:col-span-2 lg:col-span-3"
          :style="{ aspectRatio: bottomImageAspectRatio !== 'auto' ? bottomImageAspectRatio : '16/9' }"
          @click="handleImageClick(3)"
        >
          <img
            v-if="bottomImage.src"
            :src="bottomImage.src"
            :alt="bottomImage.alt || 'Gallery image 4'"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center"
            :style="{ backgroundColor: 'var(--color-gray-200)' }"
          >
            <svg class="w-16 h-16" :style="{ color: 'var(--color-gray-400)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <!-- Overlay -->
          <div
            v-if="showOverlay"
            class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
          >
            <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ImageItem {
  src?: string
  alt?: string
}

interface Props {
  // Content
  tagline?: string
  headline?: string
  description?: string

  // Images
  images?: ImageItem[]

  // Layout
  gap?: 'sm' | 'md' | 'lg'
  imageAspectRatio?: 'auto' | '1/1' | '4/3' | '16/9' | '3/4'
  bottomImageAspectRatio?: 'auto' | '16/9' | '21/9' | '2/1'

  // Styling
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string
  showOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  images: () => [],
  gap: 'md',
  imageAspectRatio: 'auto',
  bottomImageAspectRatio: 'auto',
  backgroundColor: 'var(--color-gray-50)',
  taglineColor: 'var(--color-primary)',
  headlineColor: 'var(--color-gray-900)',
  descriptionColor: 'var(--color-gray-700)',
  showOverlay: true
})

const emit = defineEmits<{
  imageClick: [index: number]
}>()

// Computed: Display images with placeholders
const displayImages = computed(() => {
  if (props.images && props.images.length > 0) {
    return props.images
  }
  // Default 4 placeholder images
  return Array(4).fill({ src: '', alt: '' })
})

// Computed: Top 3 images
const topImages = computed(() => {
  return displayImages.value.slice(0, 3)
})

// Computed: Bottom large image
const bottomImage = computed(() => {
  return displayImages.value[3] || { src: '', alt: '' }
})

// Computed: Gap class (Tailwind)
const gapClass = computed(() => {
  const gaps = {
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6'
  }
  return gaps[props.gap]
})

// Methods
const handleImageClick = (index: number) => {
  emit('imageClick', index)
}
</script>

<style scoped>
/* Additional custom animations if needed */
.gallery-item {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
