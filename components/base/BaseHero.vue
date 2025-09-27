<template>
  <section
    class="flex items-center py-16 md:py-20 overflow-hidden relative"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- Content Side -->
        <div class="space-y-8 text-center lg:text-left relative z-10">

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
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
              :style="{ color: headlineColor }"
              v-html="headline"
            ></h1>

            <p
              class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
              :style="{ color: subheadlineColor }"
            >
              {{ subheadline }}
            </p>
          </div>

          <!-- Statistics Grid -->
          <BaseStatisticGrid
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
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <BaseButton
              v-if="primaryCtaText"
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
              class="w-full sm:w-auto"
              :external="primaryCtaExternal"
            />

            <BaseButton
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
          <div v-if="showTrustIndicators && trustIndicators.length > 0" class="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
            <div v-for="(indicator, index) in trustIndicators" :key="index" class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ indicator }}
            </div>
          </div>
        </div>

        <!-- Visual Side -->
        <div class="relative flex items-center justify-center">
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
            <slot name="floating-elements">
              <!-- Floating Cards (Default Implementation) -->
              <div v-if="showFloatingCards" class="absolute -top-4 -left-4 lg:-left-8">
                <component
                  :is="floatingCardComponent"
                  variant="glass"
                  size="sm"
                  class="backdrop-blur-lg max-w-48"
                >
                  <div class="flex items-center gap-3">
                    <component
                      :is="floatingIconComponent"
                      :name="floatingCard1Icon"
                      :emoji="floatingCard1Emoji"
                      variant="primary"
                      size="sm"
                    />
                    <div>
                      <div class="font-semibold text-white">{{ floatingCard1Title }}</div>
                      <div class="text-sm text-white/80">{{ floatingCard1Text }}</div>
                    </div>
                  </div>
                </component>
              </div>

              <div v-if="showFloatingCards" class="absolute -bottom-4 -right-4 lg:-right-8">
                <component
                  :is="floatingCardComponent"
                  variant="glass"
                  size="sm"
                  class="backdrop-blur-lg max-w-48"
                >
                  <div class="flex items-center gap-3">
                    <component
                      :is="floatingIconComponent"
                      :name="floatingCard2Icon"
                      :emoji="floatingCard2Emoji"
                      variant="success"
                      size="sm"
                    />
                    <div>
                      <div class="font-semibold text-white">{{ floatingCard2Title }}</div>
                      <div class="text-sm text-white/80">{{ floatingCard2Text }}</div>
                    </div>
                  </div>
                </component>
              </div>
            </slot>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited'
  showBadge?: boolean

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
  showImageBadge?: boolean
  imageBadgeText?: string

  // Statistics
  showStats?: boolean
  statistics?: StatisticData[]
  defaultCountUp?: boolean

  // Trust Indicators
  showTrustIndicators?: boolean
  trustIndicators?: string[]

  // Floating Cards/Elements
  showFloatingCards?: boolean
  floatingCard1Title?: string
  floatingCard1Text?: string
  floatingCard1Icon?: string
  floatingCard1Emoji?: string
  floatingCard2Title?: string
  floatingCard2Text?: string
  floatingCard2Icon?: string
  floatingCard2Emoji?: string
  floatingCardComponent?: string
  floatingIconComponent?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Your Hero Headline',
  subheadline: 'Your hero subheadline text goes here.',
  badgeText: 'New',
  badgeVariant: 'featured',
  showBadge: true,

  primaryCtaText: 'Get Started',
  primaryCtaUrl: '#',
  primaryCtaExternal: false,
  secondaryCtaText: 'Learn More',
  secondaryCtaUrl: '#',
  secondaryCtaExternal: false,

  heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center',
  heroImageAlt: 'Hero Image',
  imageOverlay: false,
  showImageBadge: true,
  imageBadgeText: 'Featured',

  showStats: false,
  statistics: () => [],
  defaultCountUp: true,

  showTrustIndicators: false,
  trustIndicators: () => [],

  showFloatingCards: false,
  floatingCard1Title: 'Card 1',
  floatingCard1Text: 'Description',
  floatingCard1Icon: 'award',
  floatingCard1Emoji: '',
  floatingCard2Title: 'Card 2',
  floatingCard2Text: 'Description',
  floatingCard2Icon: 'people',
  floatingCard2Emoji: '',
  floatingCardComponent: 'AboutCard',
  floatingIconComponent: 'AboutIcon',

  backgroundColor: '#0f0f0f',
  headlineColor: '#ffffff',
  subheadlineColor: '#d1d5db'
})

// Transform statistics data for BaseStatisticGrid
const statisticsData = computed(() => {
  return props.statistics || []
})
</script>

<style scoped>
/* Custom gradient animations */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Floating animation for cards */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.absolute .backdrop-blur-lg {
  animation: float 6s ease-in-out infinite;
}

.absolute:nth-child(2) .backdrop-blur-lg {
  animation-delay: -3s;
}

/* Enhanced hero image hover effect */
.shadow-2xl:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

/* Trust indicator animations */
.flex.items-center.gap-2 {
  animation: fadeInUp 0.6s ease-out;
}

.flex.items-center.gap-2:nth-child(1) { animation-delay: 0.1s; }
.flex.items-center.gap-2:nth-child(2) { animation-delay: 0.2s; }
.flex.items-center.gap-2:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .max-w-48 {
    max-width: 10rem;
  }

  .text-6xl {
    font-size: 3rem;
  }

  .text-5xl {
    font-size: 2.5rem;
  }
}
</style>