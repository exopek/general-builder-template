<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: sectionBackgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Centered Header Section -->
      <div class="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
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

      <!-- Bento Grid Layout (3 columns) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">

        <!-- Cell 1: Content Card (Top Left) -->
        <div
          class="rounded-xl p-6 md:p-8 flex flex-col justify-start"
          :style="{
            backgroundColor: cell1BackgroundColor,
            borderRadius: 'var(--border-radius-xl)',
            minHeight: cell1MinHeight
          }"
        >
          <!-- Icon/Emoji -->
          <div
            v-if="cell1Icon"
            class="mb-4"
            :style="{
              fontSize: iconSize,
              lineHeight: 'var(--line-height-none)'
            }"
          >
            {{ cell1Icon }}
          </div>

          <!-- Heading -->
          <h3
            class="text-xl md:text-2xl font-bold mb-3"
            :style="{
              color: 'var(--color-gray-900)',
              lineHeight: 'var(--line-height-tight)'
            }"
          >
            {{ cell1Heading }}
          </h3>

          <!-- Description -->
          <p
            class="text-sm md:text-base"
            :style="{
              color: 'var(--color-gray-700)',
              lineHeight: 'var(--line-height-relaxed)'
            }"
          >
            {{ cell1Description }}
          </p>
        </div>

        <!-- Cell 2: Image (Top Middle) -->
        <div
          class="rounded-xl overflow-hidden lg:row-span-2"
          :style="{
            backgroundColor: 'var(--color-gray-200)',
            borderRadius: 'var(--border-radius-xl)',
            minHeight: cell2MinHeight
          }"
        >
          <img
            v-if="cell2Image"
            :src="cell2Image"
            :alt="cell2ImageAlt || 'Image 2'"
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

        <!-- Cell 3: Image (Top Right) -->
        <div
          class="rounded-xl overflow-hidden"
          :style="{
            backgroundColor: 'var(--color-gray-200)',
            borderRadius: 'var(--border-radius-xl)',
            minHeight: cell3MinHeight
          }"
        >
          <img
            v-if="cell3Image"
            :src="cell3Image"
            :alt="cell3ImageAlt || 'Image 3'"
            class="w-full h-full object-cover"
          />
          <!-- Placeholder icon if no image -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg
              class="w-16 h-16 md:w-20 md:h-20"
              :style="{ color: 'var(--color-gray-400)' }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- Cell 4: Image (Bottom Left) -->
        <div
          class="rounded-xl overflow-hidden"
          :style="{
            backgroundColor: 'var(--color-gray-200)',
            borderRadius: 'var(--border-radius-xl)',
            minHeight: cell4MinHeight
          }"
        >
          <img
            v-if="cell4Image"
            :src="cell4Image"
            :alt="cell4ImageAlt || 'Image 4'"
            class="w-full h-full object-cover"
          />
          <!-- Placeholder icon if no image -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg
              class="w-16 h-16 md:w-20 md:h-20"
              :style="{ color: 'var(--color-gray-400)' }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- Cell 5: Content Card with CTA (Bottom Right) -->
        <div
          class="rounded-xl p-6 md:p-8 flex flex-col justify-between"
          :style="{
            backgroundColor: cell5BackgroundColor,
            borderRadius: 'var(--border-radius-xl)',
            minHeight: cell5MinHeight
          }"
        >
          <div>
            <!-- Heading -->
            <h3
              class="text-xl md:text-2xl font-bold mb-3"
              :style="{
                color: 'var(--color-gray-900)',
                lineHeight: 'var(--line-height-tight)'
              }"
            >
              {{ cell5Heading }}
            </h3>

            <!-- Description -->
            <p
              class="text-sm md:text-base mb-6"
              :style="{
                color: 'var(--color-gray-700)',
                lineHeight: 'var(--line-height-relaxed)'
              }"
            >
              {{ cell5Description }}
            </p>
          </div>

          <!-- CTA Button -->
          <a
            v-if="cell5CtaText"
            :href="cell5CtaUrl"
            class="btn btn-primary w-fit px-6 py-3 rounded-lg font-semibold transition-all"
            :style="{
              backgroundColor: 'var(--color-gray-900)',
              color: 'var(--color-white)',
              borderRadius: 'var(--border-radius-lg)'
            }"
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
  // Section Header
  tagline?: string
  headline?: string
  description?: string
  sectionBackgroundColor?: string

  // Cell 1 (Content Card - Top Left)
  cell1Icon?: string
  cell1Heading?: string
  cell1Description?: string
  cell1BackgroundColor?: string
  cell1MinHeight?: string

  // Cell 2 (Image - Top Middle, spans 2 rows)
  cell2Image?: string
  cell2ImageAlt?: string
  cell2MinHeight?: string

  // Cell 3 (Image - Top Right)
  cell3Image?: string
  cell3ImageAlt?: string
  cell3MinHeight?: string

  // Cell 4 (Image - Bottom Left)
  cell4Image?: string
  cell4ImageAlt?: string
  cell4MinHeight?: string

  // Cell 5 (Content Card with CTA - Bottom Right)
  cell5Heading?: string
  cell5Description?: string
  cell5CtaText?: string
  cell5CtaUrl?: string
  cell5BackgroundColor?: string
  cell5MinHeight?: string

  // Global Settings
  iconSize?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  sectionBackgroundColor: 'var(--color-white)',

  // Cell 1
  cell1Icon: '📦',
  cell1Heading: 'Lorem ipsum dolor sit amet',
  cell1Description: 'Lorem ipsum dolor sit amet consectetur adipiscin.',
  cell1BackgroundColor: 'var(--color-gray-100)',
  cell1MinHeight: '250px',

  // Cell 2
  cell2Image: '',
  cell2ImageAlt: 'Feature image 2',
  cell2MinHeight: '400px',

  // Cell 3
  cell3Image: '',
  cell3ImageAlt: 'Feature image 3',
  cell3MinHeight: '250px',

  // Cell 4
  cell4Image: '',
  cell4ImageAlt: 'Feature image 4',
  cell4MinHeight: '250px',

  // Cell 5
  cell5Heading: 'Lorem ipsum dolor sit amet',
  cell5Description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris sit elementum in lectus mauris sit eget.',
  cell5CtaText: 'Contact Us',
  cell5CtaUrl: '#',
  cell5BackgroundColor: 'var(--color-gray-100)',
  cell5MinHeight: '250px',

  iconSize: '2.5rem'
})
</script>
