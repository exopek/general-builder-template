<template>
  <section
    class="flex items-center py-16 md:py-20 overflow-hidden relative"
    :style="{ backgroundColor }"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

    <div class="container mx-auto px-4 md:px-6">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- Content Side -->
        <div class="space-y-8 text-center relative z-10">

          <!-- Badge Slot / Default Badge -->
          <slot name="badge">
            <TransformationBadge
              v-if="showBadge"
              :text="badgeText"
              :variant="badgeVariant"
              class="mx-auto lg:mx-0"
              animated
            />
          </slot>

          <!-- Main Headline -->
          <div class="space-y-4">
            <div
              v-if="showHeadline && headline"
              class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
              :style="{ color: headlineColor }"
              v-html="headline"
            ></div>

            <p
              v-if="showSubheadline && subheadline"
              class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
              :style="{ color: subheadlineColor }"
              v-html="subheadline"
            ></p>
          </div>

          <!-- Mobile Image (shown only on mobile between subheadline and stats) -->
          <div v-if="showImage" class="block lg:hidden relative max-w-md mx-auto w-full">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                :src="heroImage"
                :alt="heroImageAlt"
                class="w-full h-auto object-cover"
                style="aspect-ratio: 4/5;"
              />

              <!-- Image overlay for better text contrast -->
              <div v-if="imageOverlay" class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <!-- Overlay Badge -->
              <TransformationBadge
                v-if="showImageBadge"
                :text="imageBadgeText"
                variant="new"
                size="lg"
                position="top-right"
                animated
              />
            </div>
          </div>

          <!-- Statistics Grid -->
          <StatisticGrid
            v-if="showStats && statisticsData.length > 0"
            :statistics="statisticsData"
            grid-type="fixed-3"
            gap="sm"
            max-width="lg"
            default-size="sm"
            default-variant="minimal"
            :default-count-up="defaultCountUp"
            animation="stagger"
            container-class="mx-auto lg:mx-0"
          />

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              v-if="primaryCtaText"
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
              class="w-full sm:w-auto"
              :external="primaryCtaExternal"
            />

            <Button
              v-if="secondaryCtaText"
              :text="secondaryCtaText"
              :href="secondaryCtaUrl"
              variant="outline"
              size="lg"
              class="w-full sm:w-auto"
              :external="secondaryCtaExternal"
            />
          </div>

          <!-- Trust Indicators -->
          <div v-if="showTrustIndicators && trustIndicators.length > 0" class="flex flex-wrap items-center justify-center  gap-6 pt-4">
            <div v-for="(indicator, index) in trustIndicators" :key="index" class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ indicator }}
            </div>
          </div>
        </div>

        <!-- Visual Side (hidden on mobile, shown on desktop) -->
        <div v-if="showImage" class="relative hidden lg:flex items-center justify-center">
          <div class="relative max-w-md lg:max-w-lg w-full">

            <!-- Main Hero Image -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                :src="heroImage"
                :alt="heroImageAlt"
                class="w-full h-auto object-cover"
                style="aspect-ratio: 4/5;"
              />

              <!-- Image overlay for better text contrast -->
              <div v-if="imageOverlay" class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <!-- Overlay Badge -->
              <TransformationBadge
                v-if="showImageBadge"
                :text="imageBadgeText"
                variant="new"
                size="lg"
                position="top-right"
                animated
              />
            </div>

            <!-- Floating Elements Slots -->
            <slot name="floating-elements"></slot>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'
import StatisticGrid from '~/components/design-system-section-components/StatisticGrid.vue'

interface StatisticData {
  key?: string
  value: number
  label: string
  suffix?: string
  variant?: 'default' | 'primary' | 'secondary' | 'gradient' | 'glass' | 'minimal' | 'highlight'
  description?: string
  iconName?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  countUp?: boolean
  showTrend?: boolean
  trendValue?: number
  trendSuffix?: string
  showProgress?: boolean
  maxValue?: number
  progressLabel?: string
}

interface Props {
  // Visibility Toggles
  showBadge?: boolean
  showHeadline?: boolean
  showSubheadline?: boolean
  showImage?: boolean
  showImageBadge?: boolean
  showStats?: boolean
  showTrustIndicators?: boolean

  // Content (richText)
  headline?: string
  subheadline?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited'

  // CTAs
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean

  // Visual
  heroImage?: string
  heroImageAlt?: string
  imageOverlay?: boolean
  imageBadgeText?: string

  // Statistics
  statistics?: StatisticData[]
  defaultCountUp?: boolean

  // Trust Indicators
  trustIndicators?: string[]

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showBadge: true,
  showHeadline: true,
  showSubheadline: true,
  showImage: true,
  showImageBadge: true,
  showStats: false,
  showTrustIndicators: false,

  // Content
  headline: 'Your Hero Headline',
  subheadline: 'Your hero subheadline text goes here.',
  badgeText: 'New',
  badgeVariant: 'featured',

  // CTAs
  primaryCtaText: 'Get Started',
  primaryCtaUrl: '#',
  primaryCtaExternal: false,
  secondaryCtaText: 'Learn More',
  secondaryCtaUrl: '#',
  secondaryCtaExternal: false,

  // Visual
  heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center',
  heroImageAlt: 'Hero Image',
  imageOverlay: false,
  imageBadgeText: 'Featured',

  // Statistics
  statistics: () => [],
  defaultCountUp: true,

  // Trust
  trustIndicators: () => [],

  // Colors
  backgroundColor: '#0f0f0f',
  headlineColor: '#ffffff',
  subheadlineColor: '#d1d5db'
})

const statisticsData = computed(() => {
  return props.statistics || []
})
</script>
