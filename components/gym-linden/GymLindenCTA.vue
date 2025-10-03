<template>
  <section class="py-16 md:py-20 lg:py-24 bg-gray-900">
    <div class="container mx-auto px-4 md:px-6">
      <BaseCTA v-bind="ctaProps" />
    </div>
  </section>
</template>

<script setup lang="ts">
const ctaProps = {
  title: 'Bereit für dein bestes Training im <span class="text-gradient-warm">Gym Linden</span>?',
  description: 'Erlebe EXOPEK Training live! Buche jetzt dein kostenloses Probetraining und starte mit mehr Energie in den Tag. Das beste Fitnessstudio Hannover Linden wartet auf dich.',
  primaryText: 'Kostenloses Probetraining',
  primaryUrl: '/auth/register',
  secondaryText: 'Kurse ansehen',
  secondaryUrl: '/courses',
  variant: 'gradient' as const,
  size: 'lg' as const,
  trustIndicators: [
    'Keine Anmeldegebühr',
    'Flexible Verträge',
    'Profi-Trainer'
  ]
}
</script>

<style scoped>
/* Text gradient for title */
:deep(.text-gradient-warm) {
  background: linear-gradient(135deg, #E55A2B 0%, #FF6B35 40%, #F1C40F 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
