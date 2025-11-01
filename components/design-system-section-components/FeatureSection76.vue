<template>
  <section
    class="py-12 md:py-16 lg:py-20 relative"
    :style="sectionStyle"
  >
    <!-- Optional Background Image Overlay -->
    <div
      v-if="showBackgroundOverlay"
      class="absolute inset-0"
      :style="{ backgroundColor: backgroundOverlayColor, opacity: backgroundOverlayOpacity / 100 }"
    ></div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">

      <!-- Feature Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

        <!-- Feature Card 1 -->
        <div
          v-if="showCard1"
          class="p-6 md:p-8 rounded-2xl shadow-lg transition-all hover:shadow-xl"
          :style="{ backgroundColor: card1BackgroundColor }"
        >
          <!-- Icon/Image -->
          <div v-if="showCard1Icon" class="mb-6 flex justify-center">
            <div
              class="w-20 h-20 rounded-full flex items-center justify-center"
              :style="{ backgroundColor: card1IconBackgroundColor }"
            >
              <img
                v-if="card1Icon"
                :src="card1Icon"
                :alt="card1IconAlt || 'Feature icon'"
                class="w-12 h-12 object-contain"
              />
              <svg
                v-else
                class="w-12 h-12"
                :style="{ color: card1IconColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Headline -->
          <h3
            v-if="card1Headline"
            class="text-xl md:text-2xl font-bold mb-3"
            :style="{ color: card1HeadlineColor }"
            v-html="card1Headline"
          ></h3>

          <!-- Description -->
          <div
            v-if="card1Description"
            class="text-sm md:text-base mb-6"
            :style="{ color: card1DescriptionColor }"
            v-html="card1Description"
          ></div>

          <!-- CTA Link -->
          <a
            v-if="showCard1Cta && card1CtaText"
            :href="card1CtaUrl || '#'"
            class="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
            :style="{ color: card1CtaColor }"
          >
            {{ card1CtaText }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        <!-- Feature Card 2 (Center - Highlighted) -->
        <div
          v-if="showCard2"
          class="p-6 md:p-8 rounded-2xl shadow-xl transition-all hover:shadow-2xl"
          :style="{ backgroundColor: card2BackgroundColor }"
        >
          <!-- Icon/Image -->
          <div v-if="showCard2Icon" class="mb-6 flex justify-center">
            <div
              class="w-20 h-20 rounded-full flex items-center justify-center"
              :style="{ backgroundColor: card2IconBackgroundColor }"
            >
              <img
                v-if="card2Icon"
                :src="card2Icon"
                :alt="card2IconAlt || 'Feature icon'"
                class="w-12 h-12 object-contain"
              />
              <svg
                v-else
                class="w-12 h-12"
                :style="{ color: card2IconColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Headline -->
          <h3
            v-if="card2Headline"
            class="text-xl md:text-2xl font-bold mb-3"
            :style="{ color: card2HeadlineColor }"
            v-html="card2Headline"
          ></h3>

          <!-- Description -->
          <div
            v-if="card2Description"
            class="text-sm md:text-base mb-6"
            :style="{ color: card2DescriptionColor }"
            v-html="card2Description"
          ></div>

          <!-- CTA Link -->
          <a
            v-if="showCard2Cta && card2CtaText"
            :href="card2CtaUrl || '#'"
            class="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
            :style="{ color: card2CtaColor }"
          >
            {{ card2CtaText }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        <!-- Feature Card 3 -->
        <div
          v-if="showCard3"
          class="p-6 md:p-8 rounded-2xl shadow-lg transition-all hover:shadow-xl"
          :style="{ backgroundColor: card3BackgroundColor }"
        >
          <!-- Icon/Image -->
          <div v-if="showCard3Icon" class="mb-6 flex justify-center">
            <div
              class="w-20 h-20 rounded-full flex items-center justify-center"
              :style="{ backgroundColor: card3IconBackgroundColor }"
            >
              <img
                v-if="card3Icon"
                :src="card3Icon"
                :alt="card3IconAlt || 'Feature icon'"
                class="w-12 h-12 object-contain"
              />
              <svg
                v-else
                class="w-12 h-12"
                :style="{ color: card3IconColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Headline -->
          <h3
            v-if="card3Headline"
            class="text-xl md:text-2xl font-bold mb-3"
            :style="{ color: card3HeadlineColor }"
            v-html="card3Headline"
          ></h3>

          <!-- Description -->
          <div
            v-if="card3Description"
            class="text-sm md:text-base mb-6"
            :style="{ color: card3DescriptionColor }"
            v-html="card3Description"
          ></div>

          <!-- CTA Link -->
          <a
            v-if="showCard3Cta && card3CtaText"
            :href="card3CtaUrl || '#'"
            class="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
            :style="{ color: card3CtaColor }"
          >
            {{ card3CtaText }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // === VISIBILITY TOGGLES ===
  showCard1?: boolean
  showCard1Icon?: boolean
  showCard1Cta?: boolean
  showCard2?: boolean
  showCard2Icon?: boolean
  showCard2Cta?: boolean
  showCard3?: boolean
  showCard3Icon?: boolean
  showCard3Cta?: boolean
  showBackgroundOverlay?: boolean

  // === SECTION BACKGROUND ===
  backgroundColor?: string
  backgroundImage?: string
  backgroundOverlayColor?: string
  backgroundOverlayOpacity?: number

  // === CARD 1 ===
  card1BackgroundColor?: string
  card1Icon?: string
  card1IconAlt?: string
  card1IconBackgroundColor?: string
  card1IconColor?: string
  card1Headline?: string
  card1HeadlineColor?: string
  card1Description?: string
  card1DescriptionColor?: string
  card1CtaText?: string
  card1CtaUrl?: string
  card1CtaColor?: string

  // === CARD 2 (Center - Highlighted) ===
  card2BackgroundColor?: string
  card2Icon?: string
  card2IconAlt?: string
  card2IconBackgroundColor?: string
  card2IconColor?: string
  card2Headline?: string
  card2HeadlineColor?: string
  card2Description?: string
  card2DescriptionColor?: string
  card2CtaText?: string
  card2CtaUrl?: string
  card2CtaColor?: string

  // === CARD 3 ===
  card3BackgroundColor?: string
  card3Icon?: string
  card3IconAlt?: string
  card3IconBackgroundColor?: string
  card3IconColor?: string
  card3Headline?: string
  card3HeadlineColor?: string
  card3Description?: string
  card3DescriptionColor?: string
  card3CtaText?: string
  card3CtaUrl?: string
  card3CtaColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showCard1: true,
  showCard1Icon: true,
  showCard1Cta: true,
  showCard2: true,
  showCard2Icon: true,
  showCard2Cta: true,
  showCard3: true,
  showCard3Icon: true,
  showCard3Cta: true,
  showBackgroundOverlay: false,

  // Section Background
  backgroundColor: '#8b8b8b',
  backgroundImage: '',
  backgroundOverlayColor: '#000000',
  backgroundOverlayOpacity: 40,

  // Card 1
  card1BackgroundColor: 'rgba(139, 139, 139, 0.5)',
  card1Icon: '',
  card1IconAlt: 'Feature icon',
  card1IconBackgroundColor: 'rgba(255, 255, 255, 0.1)',
  card1IconColor: '#ffffff',
  card1Headline: 'Lorem ipsum dolor sit amet',
  card1HeadlineColor: '#ffffff',
  card1Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  card1DescriptionColor: '#f3f4f6',
  card1CtaText: 'See more',
  card1CtaUrl: '',
  card1CtaColor: '#ffffff',

  // Card 2 (Center - Highlighted)
  card2BackgroundColor: '#ffffff',
  card2Icon: '',
  card2IconAlt: 'Feature icon',
  card2IconBackgroundColor: '#f3f4f6',
  card2IconColor: '#6b7280',
  card2Headline: 'Lorem ipsum dolor sit amet',
  card2HeadlineColor: '#111827',
  card2Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  card2DescriptionColor: '#6b7280',
  card2CtaText: 'See more',
  card2CtaUrl: '',
  card2CtaColor: '#111827',

  // Card 3
  card3BackgroundColor: 'rgba(139, 139, 139, 0.5)',
  card3Icon: '',
  card3IconAlt: 'Feature icon',
  card3IconBackgroundColor: 'rgba(255, 255, 255, 0.1)',
  card3IconColor: '#ffffff',
  card3Headline: 'Lorem ipsum dolor sit amet',
  card3HeadlineColor: '#ffffff',
  card3Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  card3DescriptionColor: '#f3f4f6',
  card3CtaText: 'See more',
  card3CtaUrl: '',
  card3CtaColor: '#ffffff'
})

const sectionStyle = computed(() => {
  const style: Record<string, string> = {
    backgroundColor: props.backgroundColor
  }

  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
    style.backgroundRepeat = 'no-repeat'
  }

  return style
})
</script>
