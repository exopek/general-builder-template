<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Header Section -->
      <div class="text-center mb-8 md:mb-12">
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>
        <p
          v-if="showDescription && description"
          class="text-base md:text-lg max-w-3xl mx-auto"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></p>
      </div>

      <!-- Content + Media Section -->
      <div class="max-w-6xl mx-auto">
        <!-- Mobile: Stacked Layout -->
        <div class="block sm:hidden">
          <!-- Media -->
          <div class="relative rounded-2xl overflow-hidden shadow-lg mb-4">
            <div class="relative w-full" style="padding-bottom: 56.25%;">
              <img
                v-if="mediaType === 'image' && mediaUrl"
                :src="mediaUrl"
                :alt="mediaAlt"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div v-else-if="mediaType === 'video'" class="absolute inset-0 w-full h-full bg-gray-400">
                <img
                  v-if="videoThumbnail"
                  :src="videoThumbnail"
                  :alt="mediaAlt"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <!-- Play Button -->
              <button
                v-if="mediaType === 'video' && showPlayButton"
                class="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer transition-all hover:bg-black hover:bg-opacity-10"
                :aria-label="playButtonLabel"
                @click="handlePlayVideo"
              >
                <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <svg class="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- Card Below Media on Mobile -->
          <div class="bg-white rounded-2xl shadow-xl p-5">
            <h3 class="text-lg font-bold text-gray-900 mb-2" v-html="cardHeading"></h3>
            <p class="text-sm text-gray-500 mb-4" v-html="cardDescription"></p>
            <Button
              :text="buttonText"
              :variant="buttonVariant"
              size="md"
              @click="handleButtonClick"
            />
          </div>
        </div>

        <!-- Tablet & Desktop: Overlay Layout -->
        <div class="hidden sm:block relative">
          <div class="relative rounded-2xl overflow-hidden shadow-xl">
            <div class="relative w-full" style="padding-bottom: 56.25%;">
              <img
                v-if="mediaType === 'image' && mediaUrl"
                :src="mediaUrl"
                :alt="mediaAlt"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div v-else-if="mediaType === 'video'" class="absolute inset-0 w-full h-full bg-gray-400">
                <img
                  v-if="videoThumbnail"
                  :src="videoThumbnail"
                  :alt="mediaAlt"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <!-- Play Button -->
              <button
                v-if="mediaType === 'video' && showPlayButton"
                class="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer transition-all hover:bg-black hover:bg-opacity-10"
                :aria-label="playButtonLabel"
                @click="handlePlayVideo"
              >
                <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <svg class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>

            <!-- Card Overlay on Tablet & Desktop -->
            <div class="absolute bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 w-[calc(100%-3rem)] md:w-[480px] lg:w-[520px]">
              <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10">
                <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4" v-html="cardHeading"></h3>
                <p class="text-sm md:text-base text-gray-500 mb-6 md:mb-8" v-html="cardDescription"></p>
                <Button
                  :text="buttonText"
                  :variant="buttonVariant"
                  size="md"
                  @click="handleButtonClick"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'

interface Props {
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean

  // Content (richText)
  tagline?: string
  headline?: string
  description?: string
  cardHeading?: string
  cardDescription?: string

  // Button
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'secondaryFull' | 'ghost' | 'gradient' | 'outline'

  // Media
  mediaType?: 'image' | 'video'
  mediaUrl?: string
  videoThumbnail?: string
  mediaAlt?: string
  showPlayButton?: boolean
  playButtonLabel?: string

  // Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility Toggles
  showTagline: true,
  showHeadline: true,
  showDescription: true,

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  cardHeading: 'Ut tempus dui non enim accumsan, eu rutrum',
  cardDescription: 'Cras in nibh lacus. Sed in congue sapien. Vestibulum euismod, orci quis vehicula consectetur, lacus magna fringilla lectus, et commodo orci tellus egestas dui.',
  buttonText: 'Contact Us',
  buttonVariant: 'primary',

  // Media
  mediaType: 'video',
  mediaUrl: '',
  videoThumbnail: '',
  mediaAlt: 'Media content',
  showPlayButton: true,
  playButtonLabel: 'Play video',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#4b5563',
  headlineColor: '#111827',
  descriptionColor: '#4b5563'
})

const emit = defineEmits<{
  buttonClick: []
  playVideo: []
}>()

const handleButtonClick = () => {
  emit('buttonClick')
}

const handlePlayVideo = () => {
  emit('playVideo')
}
</script>
