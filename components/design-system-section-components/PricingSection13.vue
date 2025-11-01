<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">

      <!-- Header Section (Centered) -->
      <div v-if="showHeader" class="text-center mb-12 md:mb-16">
        <!-- Tagline -->
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3"
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

      <!-- Pricing Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">

        <!-- Card 1 (Basic) -->
        <div
          v-if="showCard1"
          class="p-6 md:p-8 rounded-2xl shadow-lg"
          :style="{ backgroundColor: card1BackgroundColor }"
        >
          <!-- Icon -->
          <div v-if="showCard1Icon" class="mb-6">
            <svg
              class="w-12 h-12"
              :style="{ color: card1IconColor }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3.5L2 6v4c0 5 2.5 8.5 8 10 5.5-1.5 8-5 8-10V6l-8-2.5z" />
            </svg>
          </div>

          <!-- Price Section -->
          <div class="flex items-start gap-3 mb-4">
            <span
              class="text-4xl md:text-5xl font-black"
              :style="{ color: card1PriceColor }"
            >
              {{ card1Price }}
            </span>
            <span
              v-if="card1PriceInterval"
              class="text-base mt-2"
              :style="{ color: card1PriceIntervalColor }"
            >
              {{ card1PriceInterval }}
            </span>
          </div>

          <!-- Title -->
          <h3
            v-if="card1Title"
            class="text-2xl md:text-3xl font-bold mb-4"
            :style="{ color: card1TitleColor }"
          >
            {{ card1Title }}
          </h3>

          <!-- Description -->
          <div
            v-if="card1Description"
            class="text-sm md:text-base mb-8"
            :style="{ color: card1DescriptionColor }"
            v-html="card1Description"
          ></div>

          <!-- Features List -->
          <ul class="space-y-3 mb-8">
            <li
              v-if="showCard1Feature1 && card1Feature1Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card1Feature1Active ? card1FeatureActiveColor : card1FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: card1Feature1Active ? card1FeatureTextActiveColor : card1FeatureTextInactiveColor }"
              >
                {{ card1Feature1Text }}
              </span>
            </li>

            <li
              v-if="showCard1Feature2 && card1Feature2Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card1Feature2Active ? card1FeatureActiveColor : card1FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: card1Feature2Active ? card1FeatureTextActiveColor : card1FeatureTextInactiveColor }"
              >
                {{ card1Feature2Text }}
              </span>
            </li>

            <li
              v-if="showCard1Feature3 && card1Feature3Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card1Feature3Active ? card1FeatureActiveColor : card1FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: card1Feature3Active ? card1FeatureTextActiveColor : card1FeatureTextInactiveColor }"
              >
                {{ card1Feature3Text }}
              </span>
            </li>
          </ul>

          <!-- CTA Button -->
          <a
            v-if="showCard1Cta && card1CtaText"
            :href="card1CtaUrl || '#'"
            class="inline-block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            :style="{
              backgroundColor: card1CtaBackgroundColor,
              color: card1CtaTextColor
            }"
          >
            {{ card1CtaText }}
          </a>
        </div>

        <!-- Card 2 (Professional - Dark) -->
        <div
          v-if="showCard2"
          class="p-6 md:p-8 rounded-2xl shadow-lg"
          :style="{ backgroundColor: card2BackgroundColor }"
        >
          <!-- Icon -->
          <div v-if="showCard2Icon" class="mb-6">
            <svg
              class="w-12 h-12"
              :style="{ color: card2IconColor }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3.5L2 6v4c0 5 2.5 8.5 8 10 5.5-1.5 8-5 8-10V6l-8-2.5z" />
            </svg>
          </div>

          <!-- Price Section -->
          <div class="flex items-start gap-3 mb-4">
            <span
              class="text-4xl md:text-5xl font-black"
              :style="{ color: card2PriceColor }"
            >
              {{ card2Price }}
            </span>
            <span
              v-if="card2PriceInterval"
              class="text-base mt-2"
              :style="{ color: card2PriceIntervalColor }"
            >
              {{ card2PriceInterval }}
            </span>
          </div>

          <!-- Title -->
          <h3
            v-if="card2Title"
            class="text-2xl md:text-3xl font-bold mb-4"
            :style="{ color: card2TitleColor }"
          >
            {{ card2Title }}
          </h3>

          <!-- Description -->
          <div
            v-if="card2Description"
            class="text-sm md:text-base mb-8"
            :style="{ color: card2DescriptionColor }"
            v-html="card2Description"
          ></div>

          <!-- Features List (2 columns) -->
          <div class="grid grid-cols-2 gap-x-4 gap-y-3 mb-8">
            <div
              v-if="showCard2Feature1 && card2Feature1Text"
              class="flex items-start gap-2"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card2Feature1Active ? card2FeatureActiveColor : card2FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-sm"
                :style="{ color: card2Feature1Active ? card2FeatureTextActiveColor : card2FeatureTextInactiveColor }"
              >
                {{ card2Feature1Text }}
              </span>
            </div>

            <div
              v-if="showCard2Feature2 && card2Feature2Text"
              class="flex items-start gap-2"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card2Feature2Active ? card2FeatureActiveColor : card2FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-sm"
                :style="{ color: card2Feature2Active ? card2FeatureTextActiveColor : card2FeatureTextInactiveColor }"
              >
                {{ card2Feature2Text }}
              </span>
            </div>

            <div
              v-if="showCard2Feature3 && card2Feature3Text"
              class="flex items-start gap-2"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card2Feature3Active ? card2FeatureActiveColor : card2FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-sm"
                :style="{ color: card2Feature3Active ? card2FeatureTextActiveColor : card2FeatureTextInactiveColor }"
              >
                {{ card2Feature3Text }}
              </span>
            </div>

            <div
              v-if="showCard2Feature4 && card2Feature4Text"
              class="flex items-start gap-2"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card2Feature4Active ? card2FeatureActiveColor : card2FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-sm"
                :style="{ color: card2Feature4Active ? card2FeatureTextActiveColor : card2FeatureTextInactiveColor }"
              >
                {{ card2Feature4Text }}
              </span>
            </div>

            <div
              v-if="showCard2Feature5 && card2Feature5Text"
              class="flex items-start gap-2"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card2Feature5Active ? card2FeatureActiveColor : card2FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-sm"
                :style="{ color: card2Feature5Active ? card2FeatureTextActiveColor : card2FeatureTextInactiveColor }"
              >
                {{ card2Feature5Text }}
              </span>
            </div>

            <div
              v-if="showCard2Feature6 && card2Feature6Text"
              class="flex items-start gap-2"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: card2Feature6Active ? card2FeatureActiveColor : card2FeatureInactiveColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-sm"
                :style="{ color: card2Feature6Active ? card2FeatureTextActiveColor : card2FeatureTextInactiveColor }"
              >
                {{ card2Feature6Text }}
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <a
            v-if="showCard2Cta && card2CtaText"
            :href="card2CtaUrl || '#'"
            class="inline-block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            :style="{
              backgroundColor: card2CtaBackgroundColor,
              color: card2CtaTextColor
            }"
          >
            {{ card2CtaText }}
          </a>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // === VISIBILITY TOGGLES ===
  showHeader?: boolean
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showCard1?: boolean
  showCard1Icon?: boolean
  showCard1Feature1?: boolean
  showCard1Feature2?: boolean
  showCard1Feature3?: boolean
  showCard1Cta?: boolean
  showCard2?: boolean
  showCard2Icon?: boolean
  showCard2Feature1?: boolean
  showCard2Feature2?: boolean
  showCard2Feature3?: boolean
  showCard2Feature4?: boolean
  showCard2Feature5?: boolean
  showCard2Feature6?: boolean
  showCard2Cta?: boolean

  // === HEADER CONTENT ===
  tagline?: string
  headline?: string
  description?: string

  // === COLORS ===
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string

  // === CARD 1 (BASIC) ===
  card1Title?: string
  card1Description?: string
  card1Price?: string
  card1PriceInterval?: string
  card1Feature1Text?: string
  card1Feature1Active?: boolean
  card1Feature2Text?: string
  card1Feature2Active?: boolean
  card1Feature3Text?: string
  card1Feature3Active?: boolean
  card1CtaText?: string
  card1CtaUrl?: string
  card1BackgroundColor?: string
  card1IconColor?: string
  card1TitleColor?: string
  card1DescriptionColor?: string
  card1PriceColor?: string
  card1PriceIntervalColor?: string
  card1FeatureActiveColor?: string
  card1FeatureInactiveColor?: string
  card1FeatureTextActiveColor?: string
  card1FeatureTextInactiveColor?: string
  card1CtaBackgroundColor?: string
  card1CtaTextColor?: string

  // === CARD 2 (PROFESSIONAL) ===
  card2Title?: string
  card2Description?: string
  card2Price?: string
  card2PriceInterval?: string
  card2Feature1Text?: string
  card2Feature1Active?: boolean
  card2Feature2Text?: string
  card2Feature2Active?: boolean
  card2Feature3Text?: string
  card2Feature3Active?: boolean
  card2Feature4Text?: string
  card2Feature4Active?: boolean
  card2Feature5Text?: string
  card2Feature5Active?: boolean
  card2Feature6Text?: string
  card2Feature6Active?: boolean
  card2CtaText?: string
  card2CtaUrl?: string
  card2BackgroundColor?: string
  card2IconColor?: string
  card2TitleColor?: string
  card2DescriptionColor?: string
  card2PriceColor?: string
  card2PriceIntervalColor?: string
  card2FeatureActiveColor?: string
  card2FeatureInactiveColor?: string
  card2FeatureTextActiveColor?: string
  card2FeatureTextInactiveColor?: string
  card2CtaBackgroundColor?: string
  card2CtaTextColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility
  showHeader: true,
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showCard1: true,
  showCard1Icon: true,
  showCard1Feature1: true,
  showCard1Feature2: true,
  showCard1Feature3: true,
  showCard1Cta: true,
  showCard2: true,
  showCard2Icon: true,
  showCard2Feature1: true,
  showCard2Feature2: true,
  showCard2Feature3: true,
  showCard2Feature4: true,
  showCard2Feature5: true,
  showCard2Feature6: true,
  showCard2Cta: true,

  // Header Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor',
  description: 'Lorem ipsum dolor sit amet consect adipisicing elit.',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#6b7280',
  headlineColor: '#111827',
  descriptionColor: '#6b7280',

  // Card 1 (Basic)
  card1Title: 'Basic',
  card1Description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim elit aute irure tempor.',
  card1Price: '$29',
  card1PriceInterval: '/month',
  card1Feature1Text: 'Lorem ipsum dolor sit amet',
  card1Feature1Active: true,
  card1Feature2Text: 'Lorem ipsum dolor sit amet',
  card1Feature2Active: true,
  card1Feature3Text: 'Lorem ipsum dolor sit amet',
  card1Feature3Active: false,
  card1CtaText: 'Buy now',
  card1CtaUrl: '',
  card1BackgroundColor: '#f3f4f6',
  card1IconColor: '#111827',
  card1TitleColor: '#111827',
  card1DescriptionColor: '#6b7280',
  card1PriceColor: '#111827',
  card1PriceIntervalColor: '#6b7280',
  card1FeatureActiveColor: '#111827',
  card1FeatureInactiveColor: '#9ca3af',
  card1FeatureTextActiveColor: '#111827',
  card1FeatureTextInactiveColor: '#9ca3af',
  card1CtaBackgroundColor: '#111827',
  card1CtaTextColor: '#ffffff',

  // Card 2 (Professional)
  card2Title: 'Professional',
  card2Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  card2Price: '$199',
  card2PriceInterval: '/month',
  card2Feature1Text: 'Lorem ipsum dolor sit',
  card2Feature1Active: true,
  card2Feature2Text: 'Lorem ipsum dolor sit',
  card2Feature2Active: false,
  card2Feature3Text: 'Lorem ipsum dolor sit',
  card2Feature3Active: true,
  card2Feature4Text: 'Lorem ipsum dolor sit',
  card2Feature4Active: false,
  card2Feature5Text: 'Lorem ipsum dolor sit',
  card2Feature5Active: true,
  card2Feature6Text: 'Lorem ipsum dolor sit',
  card2Feature6Active: false,
  card2CtaText: 'Buy now',
  card2CtaUrl: '',
  card2BackgroundColor: '#111827',
  card2IconColor: '#ffffff',
  card2TitleColor: '#ffffff',
  card2DescriptionColor: '#d1d5db',
  card2PriceColor: '#ffffff',
  card2PriceIntervalColor: '#d1d5db',
  card2FeatureActiveColor: '#ffffff',
  card2FeatureInactiveColor: '#6b7280',
  card2FeatureTextActiveColor: '#ffffff',
  card2FeatureTextInactiveColor: '#6b7280',
  card2CtaBackgroundColor: '#ffffff',
  card2CtaTextColor: '#111827'
})
</script>
