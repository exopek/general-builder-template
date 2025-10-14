<template>
  <Hero
    :headline="headline"
    :subheadline="subheadline"
    :badge-text="badgeText"
    :badge-variant="badgeVariant"
    :show-badge="showBadge"
    :primary-cta-text="primaryCtaText"
    :primary-cta-url="primaryCtaUrl"
    :secondary-cta-text="secondaryCtaText"
    :secondary-cta-url="secondaryCtaUrl"
    :hero-image="heroImage"
    :hero-image-alt="heroImageAlt"
    :show-image-badge="showImageBadge"
    :image-badge-text="imageBadgeText"
    :show-stats="showCounters"
    :statistics="countersData"
    :default-count-up="true"
    :show-trust-indicators="showTrustIndicators"
    :trust-indicators="trustIndicatorsArray"
    :show-floating-cards="showFloatingElements"
    :floating-card1-title="floatingCard1Title"
    :floating-card1-text="floatingCard1Text"
    :floating-card1-emoji="'💪'"
    :floating-card2-title="floatingCard2Title"
    :floating-card2-text="floatingCard2Text"
    :floating-card2-emoji="'🎯'"
    :floating-card-component="'TransformationCard'"
    :floating-icon-component="'TransformationIcon'"
    :background-color="backgroundColor"
    :headline-color="headlineColor"
    :subheadline-color="subheadlineColor"
  />
</template>

<script setup lang="ts">
import Hero from '~/components/design-system-section-components/Hero.vue'
interface CounterData {
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

  // Counters - New dynamic structure
  showCounters?: boolean
  counters?: CounterData[]

  // Counters - Legacy support (will be deprecated)
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
  counters: () => [
    {
      key: 'participants',
      value: 2847,
      label: 'Erfolgreiche Teilnehmer',
      suffix: '+',
      variant: 'highlight'
    },
    {
      key: 'successRate',
      value: 94,
      label: 'Erfolgsquote',
      suffix: '%',
      variant: 'primary'
    },
    {
      key: 'weightLoss',
      value: 8,
      label: 'Ø Gewichtsverlust',
      suffix: 'kg',
      variant: 'secondary'
    }
  ],

  // Legacy defaults (for backward compatibility)
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

// Transform counters into array format - supports both dynamic and legacy structure
const countersData = computed(() => {
  // If dynamic counters array is provided, use it
  if (props.counters && props.counters.length > 0) {
    return props.counters.map((counter: CounterData) => ({
      key: counter.key,
      value: counter.value,
      label: counter.label,
      suffix: counter.suffix || '',
      variant: counter.variant || 'primary',
      description: counter.description,
      iconName: counter.iconName,
      size: counter.size,
      animated: counter.animated,
      countUp: counter.countUp,
      showTrend: counter.showTrend,
      trendValue: counter.trendValue,
      trendSuffix: counter.trendSuffix,
      showProgress: counter.showProgress,
      maxValue: counter.maxValue,
      progressLabel: counter.progressLabel
    }))
  }

  // Fallback to legacy individual props for backward compatibility
  const legacyCounters = []

  // Add participants counter if data exists
  if (props.participantsCount && props.participantsLabel) {
    legacyCounters.push({
      key: 'participants',
      value: props.participantsCount,
      label: props.participantsLabel,
      suffix: '+',
      variant: 'highlight' as const
    })
  }

  // Add success rate counter if data exists
  if (props.successRate && props.successLabel) {
    legacyCounters.push({
      key: 'successRate',
      value: props.successRate,
      label: props.successLabel,
      suffix: '%',
      variant: 'primary' as const
    })
  }

  // Add weight loss counter if provided
  if (props.avgWeightLoss && props.weightLossLabel) {
    legacyCounters.push({
      key: 'weightLoss',
      value: props.avgWeightLoss,
      label: props.weightLossLabel,
      suffix: 'kg',
      variant: 'secondary' as const
    })
  }

  return legacyCounters
})

// Transform trust indicators into array format
const trustIndicatorsArray = computed(() => {
  const indicators = []

  if (props.trustIndicator1) indicators.push(props.trustIndicator1)
  if (props.trustIndicator2) indicators.push(props.trustIndicator2)
  if (props.trustIndicator3) indicators.push(props.trustIndicator3)

  return indicators
})
</script>

