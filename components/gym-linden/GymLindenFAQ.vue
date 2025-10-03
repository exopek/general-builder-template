<template>
  <BaseFAQ v-bind="faqProps" />
</template>

<script setup lang="ts">
const faqProps = {
  // Header
  badgeText: 'Häufige Fragen',
  badgeVariant: 'info' as const,
  showBadge: true,
  headline: 'Alles über unser Gym in Linden',
  subheadline: 'Häufige Fragen zu EXOPEK, Morgentraining und unserem Fitnessstudio Hannover Linden',

  // Settings
  showSearch: true,
  searchPlaceholder: 'Nach Thema suchen...',
  showCategories: true,
  showCategoryIcons: false,
  showCategoryBadges: true,

  // Categories
  categories: [
    { id: 'Allgemein', name: 'Allgemein', emoji: '💡' },
    { id: 'Training', name: 'Training', emoji: '💪' },
    { id: 'Mitgliedschaft', name: 'Mitgliedschaft', emoji: '📋' }
  ],

  // FAQ Data
  faqs: [
  {
    question: 'Was macht euer Gym in Linden besonders?',
    answer: 'Wir sind das einzige Fitnessstudio in Hannover Linden mit dem innovativen EXOPEK-Trainingssystem. Unsere Morgenkurse ab 6:30 Uhr sind perfekt für Berufstätige. Functional Training und HIIT in nur 45 Minuten – effizienter geht es nicht!',
    category: 'Allgemein'
  },
  {
    question: 'Was ist EXOPEK Training genau?',
    answer: 'EXOPEK ist ein revolutionäres Trainingssystem aus Hannover, das Functional Training und HIIT mit spezieller Ausrüstung (Weighted Vest) kombiniert. Du trainierst intensiver, effizienter und erreichst schneller deine Fitness-Ziele. Mehr Infos auf exopek.de',
    category: 'Training'
  },
  {
    question: 'Warum sollte ich morgens trainieren?',
    answer: 'Morgentraining vor der Arbeit steigert deinen Stoffwechsel, verbessert die Konzentration und gibt dir Energie für den ganzen Tag. Unsere Kurse ab 6:30 Uhr sind zeitlich perfekt abgestimmt – du bist pünktlich und energiegeladen im Büro!',
    category: 'Training'
  },
  {
    question: 'Wie lange dauert ein Training im Gym Linden?',
    answer: 'Nur 45 Minuten! EXOPEK Training ist hochintensiv und maximal effizient. Du sparst Zeit gegenüber traditionellem Gym-Training (60-90 Min.) und erreichst bessere Ergebnisse. Perfekt für Berufstätige in Hannover.',
    category: 'Training'
  },
  {
    question: 'Ist EXOPEK auch für Anfänger geeignet?',
    answer: 'Absolut! Unsere erfahrenen Trainer passen das Training individuell an dein Fitness-Level an. Egal ob Anfänger oder Fortgeschrittener – beim Functional Training im Gym Hannover Linden bist du richtig.',
    category: 'Training'
  },
  {
    question: 'Wo genau ist euer Fitnessstudio in Linden?',
    answer: 'Wir sind zentral in Hannover Linden gelegen und perfekt erreichbar – vor oder nach der Arbeit. Das Gym Linden für deine Nachbarschaft. Kontaktiere uns für die genaue Adresse und Wegbeschreibung!',
    category: 'Allgemein'
  },
  {
    question: 'Kann ich ein Probetraining machen?',
    answer: 'Ja! Buche jetzt dein kostenloses Probetraining und erlebe EXOPEK live. Teste Functional Training Hannover Linden und überzeuge dich selbst vom besten Fitnessstudio in der Region.',
    category: 'Mitgliedschaft'
  },
  {
    question: 'Was brauche ich für das Training?',
    answer: 'Nur Sportkleidung und Motivation! Die EXOPEK-Ausrüstung stellen wir. Für Functional Training und HIIT empfehlen wir feste Sportschuhe und ein Handtuch.',
    category: 'Training'
  }
  ]
}
</script>
