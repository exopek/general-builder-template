<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">

      <!-- Two-column layout: Text + Image -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        :class="{ 'lg:flex-row-reverse': imagePosition === 'left' }"
      >

        <!-- Text Content Block -->
        <div
          v-if="showContentBlock"
          class="flex flex-col justify-center"
          :class="{ 'lg:order-2': imagePosition === 'left' }"
        >
          <!-- Tagline -->
          <p
            v-if="showTagline && tagline"
            class="text-sm md:text-base font-semibold mb-4"
            :style="{ color: taglineColor }"
            v-html="tagline"
          ></p>

          <!-- Headline -->
          <div
            v-if="showHeadline && headline"
            class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
            :style="{ color: headlineColor }"
            v-html="headline"
          ></div>

          <!-- Description -->
          <div
            v-if="showDescription && description"
            class="text-base md:text-lg"
            :style="{ color: descriptionColor }"
            v-html="description"
          ></div>
        </div>

        <!-- Image Block -->
        <div
          v-if="showImage"
          class="rounded-2xl overflow-hidden shadow-lg"
          :class="{ 'lg:order-1': imagePosition === 'left' }"
          :style="{ backgroundColor: imagePlaceholderColor }"
        >
          <img
            v-if="image"
            :src="image"
            :alt="imageAlt || 'Image'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: imageAspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: imageAspectRatio }"
          >
            <svg class="w-24 h-24 opacity-30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // === VISIBILITY TOGGLES ===
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showContentBlock?: boolean
  showImage?: boolean

  // === LAYOUT ===
  imagePosition?: 'left' | 'right'

  // === CONTENT ===
  tagline?: string
  headline?: string
  description?: string

  // === COLORS ===
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string

  // === IMAGE ===
  image?: string
  imageAlt?: string
  imageAspectRatio?: string
  imagePlaceholderColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showContentBlock: true,
  showImage: true,

  // Layout
  imagePosition: 'right',

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet consectetur',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#6b7280',
  headlineColor: '#111827',
  descriptionColor: '#6b7280',

  // Image
  image: '',
  imageAlt: 'Image',
  imageAspectRatio: '4/3',
  imagePlaceholderColor: '#d1d5db'
})
</script>
