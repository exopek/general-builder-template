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

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

        <!-- Top Left: Icon Card -->
        <div
          v-if="showIconCard"
          class="p-6 md:p-8 rounded-2xl shadow-lg flex flex-col justify-center"
          :style="{ backgroundColor: iconCardBackgroundColor }"
        >
          <div v-if="showIcon && icon" class="mb-4">
            <img :src="icon" :alt="iconAlt || 'Icon'" class="w-12 h-12 object-contain" />
          </div>

          <h3
            v-if="iconCardTitle"
            class="text-xl md:text-2xl font-bold mb-2"
            :style="{ color: iconCardTitleColor }"
            v-html="iconCardTitle"
          ></h3>

          <div
            v-if="iconCardDescription"
            class="text-sm md:text-base"
            :style="{ color: iconCardDescriptionColor }"
            v-html="iconCardDescription"
          ></div>
        </div>

        <!-- Top Center: Image 1 -->
        <div
          v-if="showImage1"
          class="rounded-2xl overflow-hidden shadow-md"
          :style="{ backgroundColor: image1PlaceholderColor }"
        >
          <img
            v-if="image1"
            :src="image1"
            :alt="image1Alt || 'Image 1'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: image1AspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: image1AspectRatio }"
          >
            <svg class="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- Top Right: Image 2 -->
        <div
          v-if="showImage2"
          class="rounded-2xl overflow-hidden shadow-md"
          :style="{ backgroundColor: image2PlaceholderColor }"
        >
          <img
            v-if="image2"
            :src="image2"
            :alt="image2Alt || 'Image 2'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: image2AspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: image2AspectRatio }"
          >
            <svg class="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- Bottom Left: Image 3 -->
        <div
          v-if="showImage3"
          class="rounded-2xl overflow-hidden shadow-md"
          :style="{ backgroundColor: image3PlaceholderColor }"
        >
          <img
            v-if="image3"
            :src="image3"
            :alt="image3Alt || 'Image 3'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: image3AspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: image3AspectRatio }"
          >
            <svg class="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- Bottom Center: Image 4 -->
        <div
          v-if="showImage4"
          class="rounded-2xl overflow-hidden shadow-md"
          :style="{ backgroundColor: image4PlaceholderColor }"
        >
          <img
            v-if="image4"
            :src="image4"
            :alt="image4Alt || 'Image 4'"
            class="w-full h-full object-cover"
            :style="{ aspectRatio: image4AspectRatio }"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            :style="{ aspectRatio: image4AspectRatio }"
          >
            <svg class="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- Bottom Right: Text Card with CTA -->
        <div
          v-if="showTextCard"
          class="p-6 md:p-8 rounded-2xl shadow-lg flex flex-col justify-between"
          :style="{ backgroundColor: textCardBackgroundColor }"
        >
          <div>
            <h3
              v-if="textCardTitle"
              class="text-xl md:text-2xl font-bold mb-3"
              :style="{ color: textCardTitleColor }"
              v-html="textCardTitle"
            ></h3>

            <div
              v-if="textCardDescription"
              class="text-sm md:text-base mb-6"
              :style="{ color: textCardDescriptionColor }"
              v-html="textCardDescription"
            ></div>
          </div>

          <div v-if="showCta && ctaText">
            <a
              v-if="ctaUrl"
              :href="ctaUrl"
              class="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              :style="{ backgroundColor: ctaBackgroundColor }"
            >
              {{ ctaText }}
            </a>
            <button
              v-else
              class="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              :style="{ backgroundColor: ctaBackgroundColor }"
            >
              {{ ctaText }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showIconCard?: boolean
  showIcon?: boolean
  showImage1?: boolean
  showImage2?: boolean
  showImage3?: boolean
  showImage4?: boolean
  showTextCard?: boolean
  showCta?: boolean

  // Section Header Content (richText)
  tagline?: string
  headline?: string
  description?: string

  // Section Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string

  // Icon Card
  icon?: string
  iconAlt?: string
  iconCardTitle?: string
  iconCardDescription?: string
  iconCardBackgroundColor?: string
  iconCardTitleColor?: string
  iconCardDescriptionColor?: string

  // Images
  image1?: string
  image1Alt?: string
  image1AspectRatio?: string
  image1PlaceholderColor?: string

  image2?: string
  image2Alt?: string
  image2AspectRatio?: string
  image2PlaceholderColor?: string

  image3?: string
  image3Alt?: string
  image3AspectRatio?: string
  image3PlaceholderColor?: string

  image4?: string
  image4Alt?: string
  image4AspectRatio?: string
  image4PlaceholderColor?: string

  // Text Card
  textCardTitle?: string
  textCardDescription?: string
  textCardBackgroundColor?: string
  textCardTitleColor?: string
  textCardDescriptionColor?: string

  // CTA
  ctaText?: string
  ctaUrl?: string
  ctaBackgroundColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showIconCard: true,
  showIcon: true,
  showImage1: true,
  showImage2: true,
  showImage3: true,
  showImage4: true,
  showTextCard: true,
  showCta: true,

  // Section Header
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Section Colors
  backgroundColor: '#ffffff',
  taglineColor: '#6366f1',
  headlineColor: '#111827',
  descriptionColor: '#6b7280',

  // Icon Card
  icon: '',
  iconAlt: 'Icon',
  iconCardTitle: 'Lorem ipsum dolor sit amet',
  iconCardDescription: 'Lorem ipsum dolor sit amet consectetur adipiscin.',
  iconCardBackgroundColor: '#f9fafb',
  iconCardTitleColor: '#111827',
  iconCardDescriptionColor: '#6b7280',

  // Images
  image1: '',
  image1Alt: 'Image 1',
  image1AspectRatio: '4/3',
  image1PlaceholderColor: '#d1d5db',

  image2: '',
  image2Alt: 'Image 2',
  image2AspectRatio: '4/3',
  image2PlaceholderColor: '#d1d5db',

  image3: '',
  image3Alt: 'Image 3',
  image3AspectRatio: '4/3',
  image3PlaceholderColor: '#d1d5db',

  image4: '',
  image4Alt: 'Image 4',
  image4AspectRatio: '4/3',
  image4PlaceholderColor: '#d1d5db',

  // Text Card
  textCardTitle: 'Lorem ipsum dolor sit amet',
  textCardDescription: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris est elementum in lectus curabitur vivamus sit eget.',
  textCardBackgroundColor: '#f9fafb',
  textCardTitleColor: '#111827',
  textCardDescriptionColor: '#6b7280',

  // CTA
  ctaText: 'Contact Us',
  ctaUrl: '',
  ctaBackgroundColor: '#000000'
})
</script>
