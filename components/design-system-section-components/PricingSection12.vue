<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">

      <!-- Top Section: Header + Feature Box -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">

        <!-- Left: Header Content -->
        <div v-if="showHeaderBlock">
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

        <!-- Right: Feature Box -->
        <div
          v-if="showFeatureBox"
          class="p-6 md:p-8 rounded-2xl border-2"
          :style="{
            backgroundColor: featureBoxBackgroundColor,
            borderColor: featureBoxBorderColor
          }"
        >
          <!-- Feature Box Headline -->
          <div
            v-if="featureBoxHeadline"
            class="text-xl md:text-2xl font-bold mb-6"
            :style="{ color: featureBoxHeadlineColor }"
            v-html="featureBoxHeadline"
          ></div>

          <!-- Feature List -->
          <ul class="space-y-3">
            <li
              v-if="showFeature1 && feature1Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: featureCheckmarkColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: featureTextColor }"
                v-html="feature1Text"
              ></span>
            </li>

            <li
              v-if="showFeature2 && feature2Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: featureCheckmarkColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: featureTextColor }"
                v-html="feature2Text"
              ></span>
            </li>

            <li
              v-if="showFeature3 && feature3Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: featureCheckmarkColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: featureTextColor }"
                v-html="feature3Text"
              ></span>
            </li>

            <li
              v-if="showFeature4 && feature4Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: featureCheckmarkColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: featureTextColor }"
                v-html="feature4Text"
              ></span>
            </li>

            <li
              v-if="showFeature5 && feature5Text"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 flex-shrink-0 mt-0.5"
                :style="{ color: featureCheckmarkColor }"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span
                class="text-base"
                :style="{ color: featureTextColor }"
                v-html="feature5Text"
              ></span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Pricing Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

        <!-- Card 1 -->
        <div
          v-if="showCard1"
          class="p-6 md:p-8 rounded-2xl shadow-lg"
          :style="{ backgroundColor: card1BackgroundColor }"
        >
          <!-- Card Title -->
          <h3
            v-if="card1Title"
            class="text-2xl md:text-3xl font-bold mb-4"
            :style="{ color: card1TitleColor }"
          >
            {{ card1Title }}
          </h3>

          <!-- Card Description -->
          <div
            v-if="card1Description"
            class="text-sm md:text-base mb-8"
            :style="{ color: card1DescriptionColor }"
            v-html="card1Description"
          ></div>

          <!-- Price -->
          <div class="mb-2">
            <span
              class="text-4xl md:text-5xl font-black"
              :style="{ color: card1PriceColor }"
            >
              {{ card1Price }}
            </span>
            <span
              v-if="card1PriceInterval"
              class="text-base ml-2"
              :style="{ color: card1PriceIntervalColor }"
            >
              {{ card1PriceInterval }}
            </span>
          </div>

          <!-- Price Subtext -->
          <p
            v-if="card1PriceSubtext"
            class="text-sm mb-6"
            :style="{ color: card1PriceSubtextColor }"
          >
            {{ card1PriceSubtext }}
          </p>

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

        <!-- Card 2 -->
        <div
          v-if="showCard2"
          class="p-6 md:p-8 rounded-2xl shadow-lg"
          :style="{ backgroundColor: card2BackgroundColor }"
        >
          <!-- Card Title -->
          <h3
            v-if="card2Title"
            class="text-2xl md:text-3xl font-bold mb-4"
            :style="{ color: card2TitleColor }"
          >
            {{ card2Title }}
          </h3>

          <!-- Card Description -->
          <div
            v-if="card2Description"
            class="text-sm md:text-base mb-8"
            :style="{ color: card2DescriptionColor }"
            v-html="card2Description"
          ></div>

          <!-- Price -->
          <div class="mb-2">
            <span
              class="text-4xl md:text-5xl font-black"
              :style="{ color: card2PriceColor }"
            >
              {{ card2Price }}
            </span>
            <span
              v-if="card2PriceInterval"
              class="text-base ml-2"
              :style="{ color: card2PriceIntervalColor }"
            >
              {{ card2PriceInterval }}
            </span>
          </div>

          <!-- Price Subtext -->
          <p
            v-if="card2PriceSubtext"
            class="text-sm mb-6"
            :style="{ color: card2PriceSubtextColor }"
          >
            {{ card2PriceSubtext }}
          </p>

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

        <!-- Card 3 (Enterprise - Dark variant) -->
        <div
          v-if="showCard3"
          class="p-6 md:p-8 rounded-2xl shadow-lg"
          :style="{ backgroundColor: card3BackgroundColor }"
        >
          <!-- Card Title -->
          <h3
            v-if="card3Title"
            class="text-2xl md:text-3xl font-bold mb-4"
            :style="{ color: card3TitleColor }"
          >
            {{ card3Title }}
          </h3>

          <!-- Card Description -->
          <div
            v-if="card3Description"
            class="text-sm md:text-base mb-8"
            :style="{ color: card3DescriptionColor }"
            v-html="card3Description"
          ></div>

          <!-- Price -->
          <div class="mb-2">
            <span
              class="text-4xl md:text-5xl font-black"
              :style="{ color: card3PriceColor }"
            >
              {{ card3Price }}
            </span>
          </div>

          <!-- Price Subtext -->
          <p
            v-if="card3PriceSubtext"
            class="text-sm mb-6"
            :style="{ color: card3PriceSubtextColor }"
          >
            {{ card3PriceSubtext }}
          </p>

          <!-- CTA Button -->
          <a
            v-if="showCard3Cta && card3CtaText"
            :href="card3CtaUrl || '#'"
            class="inline-block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            :style="{
              backgroundColor: card3CtaBackgroundColor,
              color: card3CtaTextColor
            }"
          >
            {{ card3CtaText }}
          </a>
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
  showHeaderBlock?: boolean
  showFeatureBox?: boolean
  showFeature1?: boolean
  showFeature2?: boolean
  showFeature3?: boolean
  showFeature4?: boolean
  showFeature5?: boolean
  showCard1?: boolean
  showCard1Cta?: boolean
  showCard2?: boolean
  showCard2Cta?: boolean
  showCard3?: boolean
  showCard3Cta?: boolean

  // === HEADER CONTENT ===
  tagline?: string
  headline?: string
  description?: string

  // === FEATURE BOX ===
  featureBoxHeadline?: string
  feature1Text?: string
  feature2Text?: string
  feature3Text?: string
  feature4Text?: string
  feature5Text?: string

  // === COLORS ===
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string
  featureBoxBackgroundColor?: string
  featureBoxBorderColor?: string
  featureBoxHeadlineColor?: string
  featureCheckmarkColor?: string
  featureTextColor?: string

  // === CARD 1 (FREE) ===
  card1Title?: string
  card1Description?: string
  card1Price?: string
  card1PriceInterval?: string
  card1PriceSubtext?: string
  card1CtaText?: string
  card1CtaUrl?: string
  card1BackgroundColor?: string
  card1TitleColor?: string
  card1DescriptionColor?: string
  card1PriceColor?: string
  card1PriceIntervalColor?: string
  card1PriceSubtextColor?: string
  card1CtaBackgroundColor?: string
  card1CtaTextColor?: string

  // === CARD 2 (PRO) ===
  card2Title?: string
  card2Description?: string
  card2Price?: string
  card2PriceInterval?: string
  card2PriceSubtext?: string
  card2CtaText?: string
  card2CtaUrl?: string
  card2BackgroundColor?: string
  card2TitleColor?: string
  card2DescriptionColor?: string
  card2PriceColor?: string
  card2PriceIntervalColor?: string
  card2PriceSubtextColor?: string
  card2CtaBackgroundColor?: string
  card2CtaTextColor?: string

  // === CARD 3 (ENTERPRISE) ===
  card3Title?: string
  card3Description?: string
  card3Price?: string
  card3PriceSubtext?: string
  card3CtaText?: string
  card3CtaUrl?: string
  card3BackgroundColor?: string
  card3TitleColor?: string
  card3DescriptionColor?: string
  card3PriceColor?: string
  card3PriceSubtextColor?: string
  card3CtaBackgroundColor?: string
  card3CtaTextColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showHeaderBlock: true,
  showFeatureBox: true,
  showFeature1: true,
  showFeature2: true,
  showFeature3: true,
  showFeature4: true,
  showFeature5: true,
  showCard1: true,
  showCard1Cta: true,
  showCard2: true,
  showCard2Cta: true,
  showCard3: true,
  showCard3Cta: true,

  // Header Content
  tagline: 'Tagline',
  headline: 'Ut tempus dui non enim accumsan, eu rutrum',
  description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore minim.',

  // Feature Box
  featureBoxHeadline: 'Lorem ipsum dolor sit amet consect adipisicing elit.',
  feature1Text: 'Lorem ipsum dolor sit amet',
  feature2Text: 'Lorem ipsum dolor sit amet',
  feature3Text: 'Lorem ipsum dolor sit amet',
  feature4Text: 'Lorem ipsum dolor sit amet',
  feature5Text: 'Lorem ipsum dolor sit amet',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#6b7280',
  headlineColor: '#111827',
  descriptionColor: '#6b7280',
  featureBoxBackgroundColor: '#ffffff',
  featureBoxBorderColor: '#e5e7eb',
  featureBoxHeadlineColor: '#111827',
  featureCheckmarkColor: '#111827',
  featureTextColor: '#111827',

  // Card 1 (Free)
  card1Title: 'Free',
  card1Description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum.',
  card1Price: '$00',
  card1PriceInterval: '/month',
  card1PriceSubtext: 'Lorem ipsum dolor sit',
  card1CtaText: 'Buy now',
  card1CtaUrl: '',
  card1BackgroundColor: '#f3f4f6',
  card1TitleColor: '#111827',
  card1DescriptionColor: '#6b7280',
  card1PriceColor: '#111827',
  card1PriceIntervalColor: '#6b7280',
  card1PriceSubtextColor: '#6b7280',
  card1CtaBackgroundColor: '#111827',
  card1CtaTextColor: '#ffffff',

  // Card 2 (Pro)
  card2Title: 'Pro',
  card2Description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim elit aute irure tempor.',
  card2Price: '$29',
  card2PriceInterval: '/month',
  card2PriceSubtext: 'Lorem ipsum dolor sit',
  card2CtaText: 'Buy now',
  card2CtaUrl: '',
  card2BackgroundColor: '#f3f4f6',
  card2TitleColor: '#111827',
  card2DescriptionColor: '#6b7280',
  card2PriceColor: '#111827',
  card2PriceIntervalColor: '#6b7280',
  card2PriceSubtextColor: '#6b7280',
  card2CtaBackgroundColor: '#111827',
  card2CtaTextColor: '#ffffff',

  // Card 3 (Enterprise)
  card3Title: 'Enterprise',
  card3Description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum.',
  card3Price: 'Custom',
  card3PriceSubtext: 'Lorem ipsum dolor sit',
  card3CtaText: 'Contact Sales',
  card3CtaUrl: '',
  card3BackgroundColor: '#111827',
  card3TitleColor: '#ffffff',
  card3DescriptionColor: '#d1d5db',
  card3PriceColor: '#ffffff',
  card3PriceSubtextColor: '#d1d5db',
  card3CtaBackgroundColor: '#ffffff',
  card3CtaTextColor: '#111827'
})
</script>
