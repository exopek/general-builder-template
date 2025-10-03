<template>
  <BaseHero v-bind="heroProps" />
</template>

<script setup lang="ts">
const heroProps = {
  headline: 'Dein <span class="text-gradient-warm">Gym in Linden</span> – Starte fit in den Tag',
  subheadline: 'Morgentraining vor der Arbeit mit dem innovativen EXOPEK-Konzept. Kürzer trainieren, mehr erreichen – das beste Fitnessstudio in Hannover Linden.',
  heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1000&fit=crop',
  heroImageAlt: 'Functional Training im Gym Linden Hannover mit EXOPEK',
  badgeText: 'Jetzt neu',
  badgeVariant: 'featured' as const,
  showBadge: true,
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#kontakt',
  secondaryCtaText: 'Mehr erfahren',
  secondaryCtaUrl: '#vorteile',
  showStats: true,
  statistics: [
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
  trustIndicators: [
    'Exklusiv in Hannover Linden',
    'EXOPEK zertifiziert',
    'Profi Trainer-Team'
  ],
  backgroundColor: '#0f0f0f'
}
</script>
