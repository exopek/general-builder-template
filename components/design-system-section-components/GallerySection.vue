<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12">
        <!-- Badge -->
        <div v-if="tagline" class="mb-6">
          <TransformationBadge
            :text="tagline"
            :variant="badgeVariant"
            size="md"
            class="uppercase tracking-wide"
          />
        </div>

        <!-- Headline -->
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4"
          :style="{ color: headlineColor }"
        >
          {{ headline }}
        </h2>

        <!-- Description -->
        <p
          v-if="description"
          class="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          :style="{ color: descriptionColor }"
        >
          {{ description }}
        </p>
      </div>

      <!-- Gallery Grid -->
      <div
        class="gallery-grid"
        :class="gapClass"
      >
        <div
          v-for="(image, index) in displayImages"
          :key="index"
          class="gallery-item rounded-xl overflow-hidden relative cursor-pointer transition-all"
          @click="handleImageClick(index)"
        >
          <!-- Image -->
          <img
            v-if="image.src"
            :src="image.src"
            :alt="image.alt || `Gallery image ${index + 1}`"
            class="w-full h-full object-cover transition-transform duration-500"
          />

          <!-- Placeholder -->
          <div
            v-else
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <!-- Hover Overlay -->
          <div
            v-if="showOverlay"
            class="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity flex items-center justify-center"
          >
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  // Images (exactly 4 images)
  images?: ImageItem[]

  // Styling
  gap?: 'sm' | 'md' | 'lg'
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited' | 'success' | 'warning' | 'info' | 'neutral'
  backgroundColor?: string
  headlineColor?: string
  descriptionColor?: string
  showOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  images: () => [],
  gap: 'md',
  badgeVariant: 'featured',
  backgroundColor: 'var(--color-gray-50)',
  headlineColor: 'var(--color-gray-900)',
  descriptionColor: 'var(--color-gray-700)',
  showOverlay: true
})

const emit = defineEmits<{
  imageClick: [index: number]
}>()

// Always show 4 images (with placeholders if needed)
const displayImages = computed(() => {
  const images = props.images || []
  const result = [...images]

  // Fill with placeholders if less than 4 images
  while (result.length < 4) {
    result.push({ src: '', alt: '' })
  }

  // Limit to 4 images
  return result.slice(0, 4)
})

// Gap class
const gapClass = computed(() => {
  const gaps = {
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6'
  }
  return gaps[props.gap]
})

// Handle image click
const handleImageClick = (index: number) => {
  emit('imageClick', index)
}
</script>

<style scoped>
/* Gallery Grid - Asymmetric 2x2 Layout */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  width: 100%;
}

/* Item 1: Large (top-left) - spans 2 columns */
.gallery-item:nth-child(1) {
  grid-column: span 2;
  grid-row: 1;
  aspect-ratio: 16/9;
}

/* Item 2: Small (top-right) - spans 1 column */
.gallery-item:nth-child(2) {
  grid-column: span 1;
  grid-row: 1;
  aspect-ratio: 4/3;
}

/* Item 3: Small (bottom-left) - spans 1 column */
.gallery-item:nth-child(3) {
  grid-column: span 1;
  grid-row: 2;
  aspect-ratio: 4/3;
}

/* Item 4: Large (bottom-right) - spans 2 columns */
.gallery-item:nth-child(4) {
  grid-column: span 2;
  grid-row: 2;
  aspect-ratio: 16/9;
}

/* Gallery Item Styles */
.gallery-item {
  background-color: var(--color-gray-200);
  position: relative;
  width: 100%;
  height: 100%;
}

.gallery-item:hover {
  transform: translateY(-2px);
}

.gallery-item:hover img {
  transform: scale(1.05);
}

/* Responsive - Tablet */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr 1fr;
  }

  .gallery-item:nth-child(1),
  .gallery-item:nth-child(2),
  .gallery-item:nth-child(3),
  .gallery-item:nth-child(4) {
    aspect-ratio: 4/3;
  }
}

/* Responsive - Mobile */
@media (max-width: 640px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-item:nth-child(1),
  .gallery-item:nth-child(2),
  .gallery-item:nth-child(3),
  .gallery-item:nth-child(4) {
    aspect-ratio: 16/9;
  }
}
</style>
