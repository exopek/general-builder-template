<template>
  <section
    class="min-h-screen flex items-center py-16 md:py-20 overflow-hidden relative"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- Content Side -->
        <div class="space-y-8 text-center lg:text-left relative z-10">

          <!-- Badge -->
          <TransformationBadge
            v-if="showBadge"
            :text="badgeText"
            :variant="badgeVariant"
            class="mx-auto lg:mx-0"
            animated
          />

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

          <!-- Counter Stats -->
          <BaseStatisticGrid
            v-if="showCounters"
            :statistics="countersData"
            grid-type="fixed-3"
            gap="sm"
            max-width="lg"
            default-size="sm"
            :default-animated="true"
            animation="stagger"
            container-class="mx-auto lg:mx-0"
          />

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <TransformationButton
              v-if="primaryCtaText"
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
              class="w-full sm:w-auto"
            />

            <TransformationButton
              v-if="secondaryCtaText"
              :text="secondaryCtaText"
              :href="secondaryCtaUrl"
              variant="outline"
              size="lg"
              class="w-full sm:w-auto"
            />
          </div>

          <!-- Trust Indicators -->
          <div v-if="showTrustIndicators" class="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ trustIndicator1 }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ trustIndicator2 }}
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ trustIndicator3 }}
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

            <!-- Floating Elements -->
            <div v-if="showFloatingElements" class="absolute -top-4 -left-4 lg:-left-8">
              <TransformationCard
                variant="glass"
                size="sm"
                class="backdrop-blur-lg"
              >
                <div class="flex items-center gap-3">
                  <TransformationIcon
                    emoji="💪"
                    variant="primary"
                    size="sm"
                  />
                  <div>
                    <div class="font-semibold text-white">{{ floatingCard1Title }}</div>
                    <div class="text-sm text-white/80">{{ floatingCard1Text }}</div>
                  </div>
                </div>
              </TransformationCard>
            </div>

            <div v-if="showFloatingElements" class="absolute -bottom-4 -right-4 lg:-right-8">
              <TransformationCard
                variant="glass"
                size="sm"
                class="backdrop-blur-lg"
              >
                <div class="flex items-center gap-3">
                  <TransformationIcon
                    emoji="🎯"
                    variant="success"
                    size="sm"
                  />
                  <div>
                    <div class="font-semibold text-white">{{ floatingCard2Title }}</div>
                    <div class="text-sm text-white/80">{{ floatingCard2Text }}</div>
                  </div>
                </div>
              </TransformationCard>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
  secondaryCtaText?: string
  secondaryCtaUrl?: string

  // Visual
  heroImage?: string
  heroImageAlt?: string
  showImageBadge?: boolean
  imageBadgeText?: string

  // Floating Elements
  showFloatingElements?: boolean
  floatingCard1Title?: string
  floatingCard1Text?: string
  floatingCard2Title?: string
  floatingCard2Text?: string

  // Counters
  showCounters?: boolean
  participantsCount?: number
  participantsLabel?: string
  successRate?: number
  successLabel?: string
  avgWeightLoss?: number
  weightLossLabel?: string

  // Trust Indicators
  showTrustIndicators?: boolean
  trustIndicator1?: string
  trustIndicator2?: string
  trustIndicator3?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Deine <span style="color: #f97316;">7-Wochen</span><br>Transformation beginnt jetzt',
  subheadline: 'Erreiche deine Fitnessziele mit unserem bewährten 7-Wochen-Programm. Professionelle Betreuung, maßgeschneiderte Trainingspläne und eine Gemeinschaft, die dich unterstützt.',
  badgeText: 'Limitiertes Angebot',
  badgeVariant: 'new',
  showBadge: true,

  primaryCtaText: 'Jetzt starten',
  primaryCtaUrl: '#anmeldung',
  secondaryCtaText: 'Mehr erfahren',
  secondaryCtaUrl: '#details',

  heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center',
  heroImageAlt: '7-Wochen Fitness Transformation',
  showImageBadge: true,
  imageBadgeText: '100% Erfolgsgarantie',

  showFloatingElements: true,
  floatingCard1Title: 'Persönlicher Trainer',
  floatingCard1Text: 'Individuelle Betreuung',
  floatingCard2Title: 'Erfolg messbar',
  floatingCard2Text: 'Wöchentliche Fortschritte',

  showCounters: true,
  participantsCount: 2847,
  participantsLabel: 'Erfolgreiche Teilnehmer',
  successRate: 94,
  successLabel: 'Erfolgsquote',
  avgWeightLoss: 8,
  weightLossLabel: 'Ø Gewichtsverlust',

  showTrustIndicators: true,
  trustIndicator1: 'Geld-zurück-Garantie',
  trustIndicator2: 'Zertifizierte Trainer',
  trustIndicator3: 'Kostenlose Probestunde',

  backgroundColor: '#0f0f0f',
  headlineColor: '#ffffff',
  subheadlineColor: '#d1d5db'
})

// Transform counters into array format
const countersData = computed(() => {
  const counters = [
    {
      key: 'participants',
      value: props.participantsCount,
      label: props.participantsLabel,
      suffix: '+',
      variant: 'highlight'
    },
    {
      key: 'successRate',
      value: props.successRate,
      label: props.successLabel,
      suffix: '%',
      variant: 'primary'
    }
  ]

  // Add weight loss counter if provided
  if (props.avgWeightLoss) {
    counters.push({
      key: 'weightLoss',
      value: props.avgWeightLoss,
      label: props.weightLossLabel,
      suffix: 'kg',
      variant: 'secondary'
    })
  }

  return counters
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

.absolute .card {
  animation: float 6s ease-in-out infinite;
}

.absolute:nth-child(2) .card {
  animation-delay: -3s;
}
</style>