<template>
  <ScheduleSection
    :tagline="tagline"
    :headline="headline"
    :subheadline="subheadline"
    :time-slots="timeSlots"
    :show-cta="showCta"
    :cta-text="ctaText"
    :cta-url="ctaUrl"
  />
</template>

<script setup lang="ts">
import ScheduleSection from '~/components/design-system-section-components/ScheduleSection.vue'

interface TimeSlot {
  day: string;
  time: string;
  duration: string;
  courseName: string;
  benefit: string;
  featured?: boolean;
  spotsAvailable: number;
}

const props = withDefaults(defineProps<{
  tagline?: string;
  headline?: string;
  subheadline?: string;
  timeSlots?: TimeSlot[];
  showCta?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}>(), {
  tagline: 'Dein Trainingsplan',
  headline: 'Morgens trainieren im Gym Linden',
  subheadline: 'Starte deinen Tag mit Energie! Unsere Morgenkurse bringen dich fit und konzentriert zur Arbeit. Functional Training Hannover Linden – perfekt vor dem Büro.',
  timeSlots: () => [
    {
      day: 'Montag',
      time: '06:30',
      duration: '45 Minuten',
      courseName: 'EXOPEK Morning Power',
      benefit: 'Perfekt vor der Arbeit',
      featured: true,
      spotsAvailable: 8
    },
    {
      day: 'Mittwoch',
      time: '06:30',
      duration: '45 Minuten',
      courseName: 'Functional HIIT Intensive',
      benefit: 'Ganzkörper-Workout',
      spotsAvailable: 12
    },
    {
      day: 'Freitag',
      time: '06:30',
      duration: '45 Minuten',
      courseName: 'EXOPEK Weekend Starter',
      benefit: 'Energie fürs Wochenende',
      spotsAvailable: 6
    }
  ],
  showCta: true,
  ctaText: 'Jetzt zum Probetraining anmelden',
  ctaUrl: '#kontakt'
});
</script>
