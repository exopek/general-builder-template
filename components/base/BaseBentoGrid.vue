<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: sectionBackgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div v-if="tagline || headline || subheadline" class="text-center mb-8 md:mb-12">
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
          v-if="subheadline"
          class="text-base md:text-lg max-w-2xl mx-auto"
          :style="{
            color: 'var(--color-gray-600)',
            lineHeight: 'var(--line-height-relaxed)'
          }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid md:grid-cols-2 gap-4 md:gap-6">
        <!-- Featured Card (Left Side) -->
        <div
          class="relative rounded-xl overflow-hidden"
          :style="{
            backgroundColor: featuredCard.backgroundColor || 'var(--color-gray-200)',
            aspectRatio: '4/5'
          }"
        >
          <!-- Image Card -->
          <img
            v-if="featuredCard.type === 'image' && featuredCard.image"
            :src="featuredCard.image"
            :alt="featuredCard.imageAlt || featuredCard.heading || 'Featured image'"
            class="w-full h-full object-cover"
          />
          <!-- Image Placeholder -->
          <div
            v-else-if="featuredCard.type === 'image'"
            class="w-full h-full flex items-center justify-center"
          >
            <svg class="w-16 h-16" :style="{ color: 'var(--color-gray-400)' }" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <!-- Content Card -->
          <div
            v-else-if="featuredCard.type === 'content'"
            class="p-6 md:p-8 flex flex-col justify-end h-full"
          >
            <h3
              v-if="featuredCard.heading"
              class="text-xl md:text-2xl font-bold mb-3"
              :style="{ color: featuredCard.textColor || 'var(--color-white)' }"
            >
              {{ featuredCard.heading }}
            </h3>
            <p
              v-if="featuredCard.description"
              class="text-sm md:text-base mb-4"
              :style="{ color: featuredCard.textColor || 'var(--color-white)' }"
            >
              {{ featuredCard.description }}
            </p>
            <BaseButton
              v-if="featuredCard.buttonText"
              :text="featuredCard.buttonText"
              :href="featuredCard.buttonUrl"
              variant="secondary"
              size="md"
              class="w-fit"
            />
          </div>
        </div>

        <!-- Right Grid (Smaller Cards) -->
        <div class="grid grid-cols-2 gap-4 md:gap-6 auto-rows-fr">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="relative rounded-xl overflow-hidden"
            :class="card.spanFull ? 'col-span-2' : ''"
            :style="{
              backgroundColor: card.backgroundColor || 'var(--color-gray-200)',
              minHeight: '200px'
            }"
          >
            <!-- Image Card -->
            <img
              v-if="card.type === 'image' && card.image"
              :src="card.image"
              :alt="card.imageAlt || card.heading || `Card ${index + 1}`"
              class="w-full h-full object-cover"
            />
            <!-- Image Placeholder -->
            <div
              v-else-if="card.type === 'image'"
              class="w-full h-full flex items-center justify-center"
            >
              <svg class="w-12 h-12" :style="{ color: 'var(--color-gray-400)' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <!-- Content Card -->
            <div
              v-else-if="card.type === 'content'"
              class="p-6 flex flex-col justify-between h-full"
            >
              <div>
                <h3
                  v-if="card.heading"
                  class="text-lg md:text-xl font-bold mb-2"
                  :style="{ color: card.textColor || 'var(--color-white)' }"
                >
                  {{ card.heading }}
                </h3>
                <p
                  v-if="card.description"
                  class="text-sm"
                  :style="{ color: card.textColor || 'var(--color-white)' }"
                >
                  {{ card.description }}
                </p>
              </div>
              <BaseButton
                v-if="card.buttonText"
                :text="card.buttonText"
                :href="card.buttonUrl"
                variant="secondary"
                size="sm"
                class="w-fit mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Card {
  type: 'image' | 'content'
  heading?: string
  description?: string
  image?: string
  imageAlt?: string
  buttonText?: string
  buttonUrl?: string
  backgroundColor?: string
  textColor?: string
  spanFull?: boolean
}

interface Props {
  tagline?: string
  headline?: string
  subheadline?: string
  featuredCard?: Card
  cards?: Card[]
  sectionBackgroundColor?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  subheadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  featuredCard: () => ({
    type: 'image'
  }),
  cards: () => [
    {
      type: 'content',
      heading: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.',
      buttonText: 'Learn more',
      buttonUrl: '#',
      backgroundColor: 'var(--color-gray-900)'
    },
    {
      type: 'image'
    },
    {
      type: 'image',
      spanFull: true
    }
  ],
  sectionBackgroundColor: 'var(--color-white)'
})
</script>
