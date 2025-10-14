<template>
  <Hero
    :headline="processedHeadline"
    :subheadline="subheadline"
    :badge-text="badgeText"
    :badge-variant="badgeVariant"
    :show-badge="showBadge"
    :primary-cta-text="primaryCtaText"
    :primary-cta-url="primaryCtaUrl"
    :primary-cta-external="primaryCtaExternal"
    :secondary-cta-text="secondaryCtaText"
    :secondary-cta-url="secondaryCtaUrl"
    :secondary-cta-external="secondaryCtaExternal"
    :hero-image="heroImage"
    :hero-image-alt="heroImageAlt"
    :image-overlay="imageOverlay"
    :show-image-badge="showImageBadge"
    :image-badge-text="imageBadgeText"
    :show-stats="showStats"
    :statistics="statisticsData"
    :default-count-up="defaultCountUp"
    :show-trust-indicators="showTrustIndicators"
    :trust-indicators="trustIndicatorsData"
    :show-floating-cards="showFloatingCards"
    :floating-card1-title="floatingCard1Title"
    :floating-card1-text="floatingCard1Text"
    :floating-card1-icon="floatingCard1Icon"
    :floating-card2-title="floatingCard2Title"
    :floating-card2-text="floatingCard2Text"
    :floating-card2-icon="floatingCard2Icon"
    :floating-card-component="floatingCardComponent"
    :floating-icon-component="floatingIconComponent"
    :background-color="backgroundColor"
    :headline-color="headlineColor"
    :subheadline-color="subheadlineColor"
  >
    <!-- Custom Badge Slot for Event-specific content -->
    <template #badge>
      <TransformationBadge
        v-if="showEventCountdown && nextEventDate"
        :text="countdownText"
        variant="featured"
        class="mx-auto lg:mx-0 mb-4"
        animated
      />
      <TransformationBadge
        v-if="showBadge"
        :text="badgeText"
        :variant="badgeVariant"
        class="mx-auto lg:mx-0"
        animated
      />
    </template>

    <!-- Custom Floating Elements for Level Up Week -->
    <template #floating-elements>
      <!-- Floating Registration Card -->
      <div v-if="showFloatingCards" class="absolute -top-4 -left-4 lg:-left-8">
        <BaseEventCard
          variant="glass"
          size="sm"
          :title="floatingCard1Title"
          :description="floatingCard1Text"
          :icon="floatingCard1Icon"
          class="backdrop-blur-lg max-w-48"
          :badge="registrationStatus"
        />
      </div>

      <!-- Floating Community Card -->
      <div v-if="showFloatingCards" class="absolute -bottom-4 -right-4 lg:-right-8">
        <BaseEventCard
          variant="glass"
          size="sm"
          :title="floatingCard2Title"
          :description="floatingCard2Text"
          :icon="floatingCard2Icon"
          class="backdrop-blur-lg max-w-48"
          :features="communityFeatures"
        />
      </div>
    </template>
  </Hero>
</template>

<script setup lang="ts">
import Hero from '~/components/design-system-section-components/Hero.vue'
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

  // Event-specific content
  nextEventDate?: string
  registrationDeadline?: string
  eventDuration?: string
  showEventCountdown?: boolean
  registrationStatus?: string

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
  floatingCard2Title?: string
  floatingCard2Text?: string
  floatingCard2Icon?: string
  floatingCardComponent?: string
  floatingIconComponent?: string

  // Level Up Week specific
  participantCount?: number
  completionRate?: number
  averageProgress?: number
  communitySize?: number

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Level Up Week: Deine intensive <span style="color: #ff6b35;">Community-Woche</span>',
  subheadline: 'Die Level Up Weeks sind unser halbjährliches Community-Event, bei dem sich alles um deinen persönlichen Fortschritt dreht. Eine Woche voller intensiver Workshops, neuer Routinen und wertvollen Wissens – gemeinsam mit Gleichgesinnten.',
  badgeText: 'Halbjährliches Event',
  badgeVariant: 'featured',
  showBadge: true,

  primaryCtaText: 'Zur nächsten Level Up Week anmelden',
  primaryCtaUrl: '#anmeldung',
  primaryCtaExternal: false,
  secondaryCtaText: 'Mehr über das Event erfahren',
  secondaryCtaUrl: '#details',
  secondaryCtaExternal: false,

  heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center',
  heroImageAlt: 'Level Up Week Community Training',
  imageOverlay: false,
  showImageBadge: true,
  imageBadgeText: 'Community Event',

  showStats: true,
  statistics: () => [],
  defaultCountUp: true,

  showTrustIndicators: true,
  trustIndicators: () => ['Halbjährliches Community-Event', 'Intensive Workshops & Routinen', 'Wertvolles Wissen & Fortschritt'],

  showFloatingCards: true,
  floatingCard1Title: 'Nächstes Event',
  floatingCard1Text: 'Jetzt anmelden',
  floatingCard1Icon: 'target',
  floatingCard2Title: 'Community',
  floatingCard2Text: 'Gleichgesinnte',
  floatingCard2Icon: 'people',
  floatingCardComponent: 'BaseEventCard',
  floatingIconComponent: 'Icon',

  nextEventDate: '',
  registrationDeadline: '',
  eventDuration: '7 Tage',
  showEventCountdown: false,
  registrationStatus: 'Anmeldung offen',

  participantCount: 150,
  completionRate: 94,
  averageProgress: 85,
  communitySize: 500,

  backgroundColor: '#0f0f0f',
  headlineColor: '#ffffff',
  subheadlineColor: '#d1d5db'
})

// Computed properties
const processedHeadline = computed(() => {
  return props.headline
})

const countdownText = computed(() => {
  if (!props.nextEventDate) return 'Nächstes Event'

  const nextEvent = new Date(props.nextEventDate)
  const now = new Date()
  const diffTime = nextEvent.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `Noch ${diffDays} Tage`
  } else if (diffDays === 0) {
    return 'Heute startet es!'
  } else {
    return 'Event läuft'
  }
})

const statisticsData = computed(() => {
  const defaultStats: StatisticData[] = [
    {
      key: 'participants',
      value: props.participantCount || 150,
      label: 'Teilnehmer pro Event',
      suffix: '+',
      variant: 'highlight',
      iconName: 'people',
      description: 'Aktive Community-Mitglieder'
    },
    {
      key: 'completion',
      value: props.completionRate || 94,
      label: 'Abschlussquote',
      suffix: '%',
      variant: 'primary',
      iconName: 'target',
      description: 'Erfolgreiche Teilnahme'
    },
    {
      key: 'progress',
      value: props.averageProgress || 85,
      label: 'Durchschnittlicher Fortschritt',
      suffix: '%',
      variant: 'secondary',
      iconName: 'award',
      description: 'Verbesserung der Teilnehmer'
    }
  ]

  return props.statistics?.length ? props.statistics : defaultStats
})

const trustIndicatorsData = computed(() => {
  return props.trustIndicators?.map(indicator => ({ indicator })) || []
})

const communityFeatures = computed(() => {
  return ['Gleichgesinnte', 'Workshops', 'Gemeinsamer Fortschritt']
})
</script>

<style scoped>
/* Additional Level Up Week specific styling */
.level-up-badge {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-blue) 100%);
}

/* Event countdown styling */
.event-countdown {
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.3);
  backdrop-filter: blur(10px);
}

/* Enhanced floating card animations for event theme */
.floating-event-card {
  animation: eventPulse 4s ease-in-out infinite;
}

@keyframes eventPulse {
  0%, 100% {
    transform: translateY(0) scale(1);
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(255, 107, 53, 0.3);
  }
}

/* Community theme accents */
.community-accent {
  border-left: 4px solid var(--color-accent-blue);
}

/* Responsive adjustments for event content */
@media (max-width: 768px) {
  .event-meta {
    text-align: center;
  }

  .floating-event-card {
    max-width: 10rem;
  }
}
</style>