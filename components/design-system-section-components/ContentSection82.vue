<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
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
          class="text-base md:text-lg max-w-3xl mx-auto"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>
      </div>

      <!-- Main Content: Text + Featured Image -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12"
        :class="{ 'lg:flex-row-reverse': contentPosition === 'right' }"
      >

        <!-- Text Content Block -->
        <div
          v-if="showContentBlock"
          class="flex flex-col justify-center"
          :class="{ 'lg:order-2': contentPosition === 'right' }"
        >
          <h2
            v-if="contentBlockHeadline"
            class="text-2xl md:text-3xl font-bold mb-4"
            :style="{ color: contentBlockHeadlineColor }"
            v-html="contentBlockHeadline"
          ></h2>

          <div
            v-if="contentBlockDescription"
            class="text-base md:text-lg mb-6"
            :style="{ color: contentBlockDescriptionColor }"
            v-html="contentBlockDescription"
          ></div>

          <!-- CTA Link -->
          <div v-if="showCta && ctaText" class="mb-6">
            <a
              v-if="ctaUrl"
              :href="ctaUrl"
              class="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
              :style="{ color: ctaColor }"
            >
              {{ ctaText }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <span
              v-else
              class="inline-flex items-center gap-2 font-semibold"
              :style="{ color: ctaColor }"
            >
              {{ ctaText }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>

          <!-- Feature Items -->
          <div v-if="showFeatureItems && featureItems && featureItems.length > 0" class="flex flex-wrap gap-4">
            <div
              v-for="(item, index) in featureItems"
              :key="index"
              class="px-4 py-2 rounded-lg"
              :style="{
                backgroundColor: featureItemBackgroundColor,
                color: featureItemTextColor
              }"
            >
              <span class="text-sm md:text-base" v-html="item.text"></span>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div
          v-if="showFeaturedImage"
          class="rounded-2xl overflow-hidden shadow-lg"
          :class="{ 'lg:order-1': contentPosition === 'right' }"
          :style="{ backgroundColor: featuredImagePlaceholderColor }"
        >
          <img
            v-if="featuredImage"
            :src="featuredImage"
            :alt="featuredImageAlt || 'Featured Image'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: featuredImageAspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: featuredImageAspectRatio }"
          >
            <svg class="w-24 h-24 opacity-30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

      </div>

      <!-- Bottom Images Row -->
      <div
        v-if="showBottomImages"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >

        <!-- Bottom Image 1 -->
        <div
          v-if="showBottomImage1"
          class="rounded-2xl overflow-hidden shadow-lg"
          :style="{ backgroundColor: bottomImage1PlaceholderColor }"
        >
          <img
            v-if="bottomImage1"
            :src="bottomImage1"
            :alt="bottomImage1Alt || 'Bottom Image 1'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: bottomImage1AspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: bottomImage1AspectRatio }"
          >
            <svg class="w-24 h-24 opacity-30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- Bottom Image 2 -->
        <div
          v-if="showBottomImage2"
          class="rounded-2xl overflow-hidden shadow-lg"
          :style="{ backgroundColor: bottomImage2PlaceholderColor }"
        >
          <img
            v-if="bottomImage2"
            :src="bottomImage2"
            :alt="bottomImage2Alt || 'Bottom Image 2'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: bottomImage2AspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: bottomImage2AspectRatio }"
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
interface FeatureItem {
  text: string
}

interface Props {
  // === VISIBILITY TOGGLES ===
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showContentBlock?: boolean
  showCta?: boolean
  showFeatureItems?: boolean
  showFeaturedImage?: boolean
  showBottomImages?: boolean
  showBottomImage1?: boolean
  showBottomImage2?: boolean

  // === LAYOUT ===
  contentPosition?: 'left' | 'right'

  // === SECTION HEADER ===
  tagline?: string
  headline?: string
  description?: string

  // === SECTION COLORS ===
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string

  // === CONTENT BLOCK ===
  contentBlockHeadline?: string
  contentBlockDescription?: string
  contentBlockHeadlineColor?: string
  contentBlockDescriptionColor?: string

  // === CTA ===
  ctaText?: string
  ctaUrl?: string
  ctaColor?: string

  // === FEATURE ITEMS ===
  featureItems?: FeatureItem[]
  featureItemBackgroundColor?: string
  featureItemTextColor?: string

  // === FEATURED IMAGE ===
  featuredImage?: string
  featuredImageAlt?: string
  featuredImageAspectRatio?: string
  featuredImagePlaceholderColor?: string

  // === BOTTOM IMAGE 1 ===
  bottomImage1?: string
  bottomImage1Alt?: string
  bottomImage1AspectRatio?: string
  bottomImage1PlaceholderColor?: string

  // === BOTTOM IMAGE 2 ===
  bottomImage2?: string
  bottomImage2Alt?: string
  bottomImage2AspectRatio?: string
  bottomImage2PlaceholderColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showContentBlock: true,
  showCta: true,
  showFeatureItems: true,
  showFeaturedImage: true,
  showBottomImages: true,
  showBottomImage1: true,
  showBottomImage2: true,

  // Layout
  contentPosition: 'left',

  // Section Header
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Section Colors
  backgroundColor: '#ffffff',
  taglineColor: '#6b7280',
  headlineColor: '#111827',
  descriptionColor: '#6b7280',

  // Content Block
  contentBlockHeadline: 'Lorem ipsum dolor sit',
  contentBlockDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim urna adipiscing praesent velit viverra sit semper lorem eu cursus vel hendrerit elementum morbi curabitur etiam nibh justo.',
  contentBlockHeadlineColor: '#111827',
  contentBlockDescriptionColor: '#6b7280',

  // CTA
  ctaText: 'Contact now',
  ctaUrl: '',
  ctaColor: '#111827',

  // Feature Items
  featureItems: () => [
    { text: 'Feature item' },
    { text: 'Feature item' },
    { text: 'Feature item' },
    { text: 'Feature item' }
  ],
  featureItemBackgroundColor: '#f3f4f6',
  featureItemTextColor: '#111827',

  // Featured Image
  featuredImage: '',
  featuredImageAlt: 'Featured Image',
  featuredImageAspectRatio: '4/3',
  featuredImagePlaceholderColor: '#d1d5db',

  // Bottom Image 1
  bottomImage1: '',
  bottomImage1Alt: 'Bottom Image 1',
  bottomImage1AspectRatio: '16/9',
  bottomImage1PlaceholderColor: '#d1d5db',

  // Bottom Image 2
  bottomImage2: '',
  bottomImage2Alt: 'Bottom Image 2',
  bottomImage2AspectRatio: '16/9',
  bottomImage2PlaceholderColor: '#d1d5db'
})
</script>
