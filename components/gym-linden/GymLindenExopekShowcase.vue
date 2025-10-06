<template>
  <BaseAlternatingFeatures v-bind="showcaseProps" />
</template>

<script setup lang="ts">
const showcaseProps = {
  tagline: 'Das EXOPEK System',
  headline: 'Trainiere mit dem innovativsten Fitness-Konzept',
  subheadline: 'EXOPEK revolutioniert Functional Training und HIIT. Erfahre mehr über das Schweizer Trainingssystem, das unser Gym in Linden so besonders macht.',
  features: [
    {
      number: '01',
      heading: 'Was ist EXOPEK Training?',
      description: 'EXOPEK ist ein revolutionäres Trainingssystem aus Hannover. Es kombiniert Functional Training und HIIT mit spezieller Ausrüstung für maximale Trainingseffizienz. Nur 30 Minuten pro Session – perfekt für Berufstätige.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=450&fit=crop',
      imageAlt: 'EXOPEK Functional Training im Gym Hannover Linden',
      primaryButtonText: 'Mehr über EXOPEK',
      primaryButtonUrl: 'https://exopek.de',
      secondaryButtonText: 'Jetzt testen',
      secondaryButtonUrl: '#kontakt'
    },
    {
      number: '02',
      heading: 'Morgentraining – Der Energie-Boost',
      description: 'Training am Morgen aktiviert deinen Stoffwechsel, steigert die Konzentration und gibt dir Energie für den ganzen Tag. Unsere Kurse ab 6:30 Uhr sind perfekt vor der Arbeit. Functional Training Hannover – starte stark in den Tag!',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=450&fit=crop',
      imageAlt: 'Morgentraining vor der Arbeit im Fitnessstudio Linden',
      primaryButtonText: 'Trainingszeiten',
      primaryButtonUrl: '#schedule'
    },
    {
      number: '03',
      heading: 'Functional Training + HIIT',
      description: 'Kombiniere dein gewohntes HIIT-Training mit dem EXOPEK-System. Ganzkörper-Workouts, die alle Muskelgruppen ansprechen. Effizienter trainieren, schneller Ergebnisse sehen – im besten Gym Hannover Linden.',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=450&fit=crop',
      imageAlt: 'HIIT und Functional Training im Gym Linden Hannover'
    }
  ],
  sectionBackgroundColor: 'var(--color-gray-300)'
}
</script>
