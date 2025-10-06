<template>
  <section class="py-16 md:py-20 lg:py-24 bg-gray-900">
    <div class="container mx-auto px-4 md:px-6">
      <BaseCTA
        :title="title"
        :description="description"
        :primary-text="primaryText"
        :primary-url="primaryUrl"
        :secondary-text="secondaryText"
        :secondary-url="secondaryUrl"
        :variant="variant"
        :size="size"
        :trust-indicators="trustIndicators"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
  primaryText?: string;
  primaryUrl?: string;
  secondaryText?: string;
  secondaryUrl?: string;
  variant?: 'default' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  trustIndicators?: string[];
}>(), {
  title: 'Bereit für dein bestes Training im <span class="text-gradient-warm">Gym Linden</span>?',
  description: 'Erlebe EXOPEK Training live! Buche jetzt dein kostenloses Probetraining und starte mit mehr Energie in den Tag. Das beste Fitnessstudio Hannover Linden wartet auf dich.',
  primaryText: 'Kostenloses Probetraining',
  primaryUrl: '/kontakt',
  secondaryText: 'Kurse ansehen',
  secondaryUrl: '/kurse',
  variant: 'gradient',
  size: 'lg',
  trustIndicators: () => [
    'Keine Anmeldegebühr',
    'Flexible Verträge',
    'Profi-Trainer'
  ]
});
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
