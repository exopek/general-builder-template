<template>
  <BaseComparisonTable v-bind="comparisonProps" />
</template>

<script setup lang="ts">
const comparisonProps = {
  tagline: 'Der Unterschied',
  headline: 'EXOPEK vs. Traditionelles Gym-Training',
  subheadline: 'Entdecke, warum EXOPEK das effizienteste Training für Berufstätige ist. Fitness Hannover Linden – maximale Ergebnisse in minimaler Zeit.',
  leftColumnTitle: 'Klassisches Fitnessstudio',
  rightColumnTitle: 'EXOPEK im Gym Linden',
  comparisonRows: [
    {
      feature: 'Trainingsdauer pro Session',
      traditional: '60-90 Minuten',
      exopek: 'Nur 45 Minuten – maximale Effizienz'
    },
    {
      feature: 'Trainingsintensität',
      traditional: 'Moderat bis hoch',
      exopek: 'Hochintensiv (HIIT) + Functional Training'
    },
    {
      feature: 'Zeitersparnis pro Woche',
      traditional: 'Keine',
      exopek: 'Bis zu 2 Stunden gespart'
    },
    {
      feature: 'Ganzkörper-Training',
      traditional: 'Split-Training über mehrere Tage',
      exopek: 'Komplettes Workout in 45 Minuten'
    },
    {
      feature: 'Konzentration & Fokus',
      traditional: 'Standard-Effekt',
      exopek: 'Maximaler Fokus-Boost für den Arbeitstag'
    },
    {
      feature: 'Trainingskonzept',
      traditional: 'Klassisches Gerätetraining',
      exopek: 'Innovatives EXOPEK-System aus der Schweiz'
    }
  ],
  showCta: true,
  ctaText: 'Jetzt EXOPEK ausprobieren',
  ctaUrl: '#kontakt'
}
</script>
