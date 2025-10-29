<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div v-if="showTagline || showHeadline || showDescription" class="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
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
          class="text-base md:text-lg"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>
      </div>

      <!-- Bento Grid Layout (3 columns) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">

        <!-- Cell 1: Content Card -->
        <div class="rounded-2xl p-6 md:p-8 flex flex-col justify-start bg-gray-100 min-h-[250px]">
          <!-- Icon/Emoji -->
          <div v-if="cell1Icon" class="mb-4 text-4xl">
            {{ cell1Icon }}
          </div>

          <!-- Heading -->
          <h3 class="text-xl md:text-2xl font-bold mb-3 text-gray-900" v-html="cell1Heading"></h3>

          <!-- Description -->
          <p class="text-sm md:text-base text-gray-700" v-html="cell1Description"></p>
        </div>

        <!-- Cell 2: Image (spans 2 rows on desktop) -->
        <div class="rounded-2xl overflow-hidden lg:row-span-2 bg-gray-200 min-h-[400px]">
          <img
            v-if="cell2Image"
            :src="cell2Image"
            :alt="cell2ImageAlt || 'Image 2'"
            class="w-full h-full object-cover"
          />
          <!-- Placeholder -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-16 h-16 md:w-24 md:h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- Cell 3: Image -->
        <div class="rounded-2xl overflow-hidden bg-gray-200 min-h-[250px]">
          <img
            v-if="cell3Image"
            :src="cell3Image"
            :alt="cell3ImageAlt || 'Image 3'"
            class="w-full h-full object-cover"
          />
          <!-- Placeholder -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-16 h-16 md:w-20 md:h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- Cell 4: Image -->
        <div class="rounded-2xl overflow-hidden bg-gray-200 min-h-[250px]">
          <img
            v-if="cell4Image"
            :src="cell4Image"
            :alt="cell4ImageAlt || 'Image 4'"
            class="w-full h-full object-cover"
          />
          <!-- Placeholder -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-16 h-16 md:w-20 md:h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- Cell 5: Content Card with CTA -->
        <div class="rounded-2xl p-6 md:p-8 flex flex-col justify-between bg-gray-100 min-h-[250px]">
          <div>
            <!-- Heading -->
            <h3 class="text-xl md:text-2xl font-bold mb-3 text-gray-900" v-html="cell5Heading"></h3>

            <!-- Description -->
            <p class="text-sm md:text-base mb-6 text-gray-700" v-html="cell5Description"></p>
          </div>

          <!-- CTA Button -->
          <a
            v-if="cell5CtaText"
            :href="cell5CtaUrl"
            class="inline-block w-fit px-6 py-3 rounded-lg font-semibold transition-all bg-gray-900 text-white hover:bg-gray-800"
          >
            {{ cell5CtaText }}
          </a>
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

  // Content (richText)
  tagline?: string
  headline?: string
  description?: string

  // Cell 1 (Content Card)
  cell1Icon?: string
  cell1Heading?: string
  cell1Description?: string

  // Cell 2 (Image - spans 2 rows)
  cell2Image?: string
  cell2ImageAlt?: string

  // Cell 3 (Image)
  cell3Image?: string
  cell3ImageAlt?: string

  // Cell 4 (Image)
  cell4Image?: string
  cell4ImageAlt?: string

  // Cell 5 (Content Card with CTA)
  cell5Heading?: string
  cell5Description?: string
  cell5CtaText?: string
  cell5CtaUrl?: string

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

  // Cell 1
  cell1Icon: '📦',
  cell1Heading: 'Lorem ipsum dolor sit amet',
  cell1Description: 'Lorem ipsum dolor sit amet consectetur adipiscin.',

  // Cell 2
  cell2Image: '',
  cell2ImageAlt: 'Feature image 2',

  // Cell 3
  cell3Image: '',
  cell3ImageAlt: 'Feature image 3',

  // Cell 4
  cell4Image: '',
  cell4ImageAlt: 'Feature image 4',

  // Cell 5
  cell5Heading: 'Lorem ipsum dolor sit amet',
  cell5Description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris sit elementum in lectus mauris sit eget.',
  cell5CtaText: 'Contact Us',
  cell5CtaUrl: '#',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#4b5563',
  headlineColor: '#111827',
  descriptionColor: '#4b5563'
})
</script>
