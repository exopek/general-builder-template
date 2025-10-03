<template>
  <BaseScheduleSection v-bind="scheduleProps" />
</template>

<script setup lang="ts">
const scheduleProps = {
  tagline: 'Dein Trainingsplan',
  headline: 'Morgens trainieren im Gym Linden',
  subheadline: 'Starte deinen Tag mit Energie! Unsere Morgenkurse bringen dich fit und konzentriert zur Arbeit. Functional Training Hannover Linden – perfekt vor dem Büro.',
  timeSlots: [
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
}
</script>
