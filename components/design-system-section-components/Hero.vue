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
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
                <div class="card-glass p-4 rounded-xl max-w-48">
                  <div class="flex items-center gap-3">
                    <div v-if="floatingCard1Emoji" class="text-2xl flex-shrink-0">
                      {{ floatingCard1Emoji }}
                    </div>
                    <div v-else-if="floatingCard1Icon" class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold text-white">{{ floatingCard1Title }}</div>
                      <div class="text-sm text-white/80">{{ floatingCard1Text }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="showFloatingCards" class="absolute -bottom-4 -right-4 lg:-right-8">
                <div class="card-glass p-4 rounded-xl max-w-48">
                  <div class="flex items-center gap-3">
                    <div v-if="floatingCard2Emoji" class="text-2xl flex-shrink-0">
                      {{ floatingCard2Emoji }}
                    </div>
                    <div v-else-if="floatingCard2Icon" class="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold text-white">{{ floatingCard2Title }}</div>
                      <div class="text-sm text-white/80">{{ floatingCard2Text }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </slot>

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
  floatingCard1Icon?: boolean
  floatingCard1Emoji?: string
  floatingCard2Title?: string
  floatingCard2Text?: string
  floatingCard2Icon?: boolean
  floatingCard2Emoji?: string

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
  floatingCard1Icon: true,
  floatingCard1Emoji: '',
  floatingCard2Title: 'Card 2',
  floatingCard2Text: 'Description',
  floatingCard2Icon: true,
  floatingCard2Emoji: '',

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