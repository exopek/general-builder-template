<template>
  <Hero
    :headline="headline"
    :subheadline="subheadline"
    :hero-image="heroImage"
    :hero-image-alt="heroImageAlt"
    :badge-text="badgeText"
    :badge-variant="badgeVariant"
    :show-badge="showBadge"
    :primary-cta-text="primaryCtaText"
    :primary-cta-url="primaryCtaUrl"
    :secondary-cta-text="secondaryCtaText"
    :secondary-cta-url="secondaryCtaUrl"
    :show-stats="showStats"
    :statistics="statistics"
    :show-trust-indicators="showTrustIndicators"
    :trust-indicators="trustIndicators"
    :background-color="backgroundColor"
  />
</template>

<script setup lang="ts">
import Hero from '~/components/design-system-section-components/Hero.vue'

interface Statistic {
  value: number;
  label: string;
  suffix: string;
  variant: 'minimal' | 'default';
}

const props = withDefaults(defineProps<{
  headline?: string;
  subheadline?: string;
  heroImage?: string;
  heroImageAlt?: string;
  badgeText?: string;
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited';
  showBadge?: boolean;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  showStats?: boolean;
  statistics?: Statistic[];
  showTrustIndicators?: boolean;
  trustIndicators?: string[];
  backgroundColor?: string;
}>(), {
  headline: 'Dein <span class="text-gradient-warm">Gym in Linden</span> – Starte fit in den Tag',
  subheadline: 'Morgentraining vor der Arbeit mit dem innovativen EXOPEK-Konzept. Kürzer trainieren, mehr erreichen – das beste Fitnessstudio in Hannover Linden.',
  heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1000&fit=crop',
  heroImageAlt: 'Functional Training im Gym Linden Hannover mit EXOPEK',
  badgeText: 'Jetzt neu',
  badgeVariant: 'featured',
  showBadge: true,
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#kontakt',
  secondaryCtaText: 'Mehr erfahren',
  secondaryCtaUrl: '#vorteile',
  showStats: true,
  statistics: () => [
    {
      value: 45,
      label: 'Minuten Training',
      suffix: 'min',
      variant: 'minimal' as const
    },
    {
      value: 6,
      label: 'Uhr Kursbeginn',
      suffix: ':30',
      variant: 'minimal' as const
    },
    {
      value: 100,
      label: 'Zufriedenheit',
      suffix: '%',
      variant: 'minimal' as const
    }
  ],
  showTrustIndicators: true,
  trustIndicators: () => [
    'Exklusiv in Hannover Linden',
    'EXOPEK zertifiziert',
    'Profi Trainer-Team'
  ],
  backgroundColor: '#0f0f0f'
});
</script>
