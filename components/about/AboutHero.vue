<template>
  <BaseHero
    :headline="headline"
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
    :statistics="statsData"
    :default-count-up="true"
    :show-trust-indicators="showTrustIndicators"
    :trust-indicators="trustIndicators"
    :show-floating-cards="showFloatingCards"
    :floating-card1-title="floatingCard1Title"
    :floating-card1-text="floatingCard1Text"
    :floating-card1-icon="'award'"
    :floating-card2-title="floatingCard2Title"
    :floating-card2-text="floatingCard2Text"
    :floating-card2-icon="'people'"
    :floating-card-component="'AboutCard'"
    :floating-icon-component="'AboutIcon'"
    :background-color="backgroundColor"
    :headline-color="headlineColor"
    :subheadline-color="subheadlineColor"
  />
</template>

<script setup lang="ts">
interface Props {
  headline?: string
  subheadline?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited'
  showBadge?: boolean
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean
  heroImage?: string
  heroImageAlt?: string
  imageOverlay?: boolean
  showImageBadge?: boolean
  imageBadgeText?: string
  showFloatingCards?: boolean
  floatingCard1Title?: string
  floatingCard1Text?: string
  floatingCard2Title?: string
  floatingCard2Text?: string
  showStats?: boolean
  foundedYear?: number
  clientsServed?: number
  projectsCompleted?: number
  showTrustIndicators?: boolean
  trustIndicators?: string[]
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Hi, wir sind <span style="color: #f97316;">Tom & Lisa</span><br>und unser Trainer-Team',
  subheadline: 'Wir haben das Exopek Gym gegründet, weil wir an Training glauben, das wirklich etwas verändert. Persönlich, authentisch und immer mit dem Fokus darauf, dich stärker zu machen.',
  badgeText: 'Über uns',
  badgeVariant: 'featured',
  showBadge: true,
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#probetraining',
  primaryCtaExternal: false,
  secondaryCtaText: 'Kurse entdecken',
  secondaryCtaUrl: '#kurse',
  secondaryCtaExternal: false,
  heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center',
  heroImageAlt: 'Funktionelles Training im Exopek Gym',
  imageOverlay: false,
  showImageBadge: true,
  imageBadgeText: 'Functional Fitness',
  showFloatingCards: true,
  floatingCard1Title: 'Tom & Lisa',
  floatingCard1Text: 'Gründer & Head Trainer',
  floatingCard2Title: 'Unser Team',
  floatingCard2Text: '8 leidenschaftliche Trainer',
  showStats: true,
  foundedYear: 2018,
  clientsServed: 800,
  projectsCompleted: 5000,
  showTrustIndicators: true,
  trustIndicators: () => [
    'Persönliche Betreuung durch unser Team',
    'Wir kennen jeden beim Namen',
    'Familie statt anonymes Gym'
  ],
  backgroundColor: '#0f0f0f',
  headlineColor: '#ffffff',
  subheadlineColor: '#d1d5db'
})

const statsData = computed(() => {
  const stats = []
  if (props.foundedYear) {
    stats.push({
      key: 'experience',
      value: new Date().getFullYear() - props.foundedYear,
      label: 'Jahre Erfahrung',
      suffix: '+'
    })
  }
  if (props.clientsServed) {
    stats.push({
      key: 'clients',
      value: props.clientsServed,
      label: 'Aktive Mitglieder',
      suffix: '+'
    })
  }
  if (props.projectsCompleted) {
    stats.push({
      key: 'projects',
      value: props.projectsCompleted,
      label: 'Trainingsstunden',
      suffix: '+'
    })
  }
  return stats
})
</script>