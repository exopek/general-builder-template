<template>
  <BaseFAQ
    :headline="headline"
    :subheadline="subheadline"
    :badge-text="badgeText"
    :show-badge="showBadge"
    :show-search="showSearch"
    :search-placeholder="searchPlaceholder"
    :show-categories="showCategories"
    :categories="categories"
    :faqs="faqs"
    :show-contact-section="showContactSection"
    :contact-section-headline="contactSectionHeadline"
    :contact-section-description="contactSectionDescription"
    :primary-contact-text="primaryContactText"
    :primary-contact-url="primaryContactUrl"
    :secondary-contact-text="secondaryContactText"
    :secondary-contact-url="secondaryContactUrl"
    :response-time-text="responseTimeText"
    :contact-cta-text="contactCtaText"
    :contact-button-text="contactButtonText"
    :contact-button-url="contactButtonUrl"
    :background-color="backgroundColor"
    :headline-color="headlineColor"
    :subheadline-color="subheadlineColor"
    card-component="TransformationCard"
    badge-variant="info"
  >
    <template #category-icon="{ category }">
      <img
        :src="getCategoryIcon(category)"
        :alt="getCategoryName(category)"
        class="w-5 h-5 filter brightness-0 invert"
      />
    </template>

    <template #no-results-icon>
      <img
        src="/icons/bullseye-arrow.svg"
        alt="Suche"
        class="w-8 h-8 filter grayscale opacity-60"
      />
    </template>

    <template #contact-icon>
      <img
        src="/icons/users-medical.svg"
        alt="Kontakt"
        class="w-4 h-4 filter brightness-0 invert"
      />
    </template>

    <template #response-time-icon>
      <img
        src="/icons/brain-lightning.svg"
        alt="Schnell"
        class="w-3 h-3 filter brightness-0 invert"
      />
    </template>
  </BaseFAQ>
</template>

<script setup lang="ts">
interface FaqItem {
  question: string
  answer: string
  category: string
  links?: Array<{ text: string; url: string }>
  showContactCta?: boolean
}

interface Category {
  id: string
  name: string
  emoji: string
  variant: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'neutral'
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Search & Filter
  showSearch?: boolean
  searchPlaceholder?: string
  showCategories?: boolean
  categories?: Category[]

  // FAQ Data
  faqs?: FaqItem[]

  // Contact Section
  showContactSection?: boolean
  contactSectionHeadline?: string
  contactSectionDescription?: string
  primaryContactText?: string
  primaryContactUrl?: string
  secondaryContactText?: string
  secondaryContactUrl?: string
  responseTimeText?: string
  contactCtaText?: string
  contactButtonText?: string
  contactButtonUrl?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Häufig gestellte Fragen',
  subheadline: 'Finde schnell Antworten auf die wichtigsten Fragen zu unserem 7-Wochen Transformationsprogramm. Falls du weitere Fragen hast, kontaktiere uns gerne direkt.',
  badgeText: 'Alles erklärt',
  showBadge: true,

  showSearch: true,
  searchPlaceholder: 'Suche nach Stichworten...',
  showCategories: true,

  categories: () => [
    { id: 'program', name: 'Programm', emoji: '🎯', variant: 'primary' },
    { id: 'pricing', name: 'Preise', emoji: '💰', variant: 'success' },
    { id: 'training', name: 'Training', emoji: '💪', variant: 'secondary' },
    { id: 'nutrition', name: 'Ernährung', emoji: '🥗', variant: 'accent' },
    { id: 'support', name: 'Support', emoji: '👥', variant: 'warning' },
    { id: 'results', name: 'Ergebnisse', emoji: '📊', variant: 'neutral' }
  ],

  faqs: () => [
    {
      question: 'Für wen ist das 7-Wochen Programm geeignet?',
      answer: 'Unser Programm ist für alle Fitnesslevel geeignet - vom absoluten Anfänger bis zum fortgeschrittenen Sportler. Wir passen die Übungen und Intensität individuell an dein Level an.\n\nBesonders profitieren:\n• Berufstätige mit wenig Zeit\n• Anfänger ohne Vorerfahrung\n• Personen mit 5-20kg Abnehmziel\n• Menschen, die nachhaltige Gewohnheiten entwickeln möchten',
      category: 'program'
    },
    {
      question: 'Was kostet das Programm und gibt es versteckte Kosten?',
      answer: 'Unsere Preise sind transparent und es gibt keine versteckten Kosten:\n\n• Starter: 197€ (einmalig)\n• Premium: 297€ (einmalig)\n• VIP: 497€ (einmalig)\n\nAlle Preise sind Endpreise inklusive MwSt. Es gibt keine monatlichen Gebühren oder Zusatzkosten.',
      category: 'pricing',
      showContactCta: true
    },
    {
      question: 'Wie viel Zeit muss ich täglich investieren?',
      answer: 'Das Programm ist für vielbeschäftigte Menschen entwickelt:\n\n• Training: 30-45 Minuten, 4-5x pro Woche\n• Meal Prep: 1-2 Stunden am Wochenende\n• App Check-in: 5 Minuten täglich\n\nInsgesamt benötigst du etwa 4-6 Stunden pro Woche für deine Transformation.',
      category: 'training'
    },
    {
      question: 'Muss ich auf meine Lieblingsspeisen verzichten?',
      answer: 'Nein! Unser Ansatz basiert auf flexibler Ernährung:\n\n• 80/20 Regel: 80% gesunde Nahrung, 20% Flexibilität\n• Mahlzeiten-Timing optimiert\n• Gesunde Alternativen für Lieblingsspeisen\n\nDu lernst, wie du auch Pizza, Schokolade und Co. in deine Transformation integrieren kannst.',
      category: 'nutrition'
    },
    {
      question: 'Welche Unterstützung bekomme ich während des Programms?',
      answer: 'Du erhältst umfassende Betreuung:\n\n• Wöchentliche Coaching-Calls (Premium/VIP)\n• E-Mail Support (24h Antwort)\n• WhatsApp-Gruppe für Quick-Fragen\n• Persönlicher Ansprechpartner (VIP)\n\nDu bist nie allein auf deinem Weg!',
      category: 'support',
      links: [
        { text: 'Support-Team kontaktieren', url: '/kontakt' }
      ]
    },
    {
      question: 'Welche Ergebnisse kann ich realistisch erwarten?',
      answer: 'Unsere Teilnehmer erreichen durchschnittlich:\n\n• 6-12kg Gewichtsverlust\n• 15-25% Muskelzuwachs\n• 40% mehr Energie\n• Deutlich bessere Körperhaltung\n• Erhöhtes Selbstvertrauen\n\nWichtig: Individuelle Ergebnisse variieren je nach Ausgangssituation, Engagement und genetischen Faktoren.',
      category: 'results'
    },
    {
      question: 'Gibt es eine Geld-zurück-Garantie?',
      answer: 'Ja, wir bieten gestaffelte Geld-zurück-Garantien:\n\n• Starter: 30 Tage\n• Premium: 60 Tage\n• VIP: 90 Tage\n\nWenn du nicht zufrieden bist oder keine Ergebnisse siehst, erstatten wir dir den vollen Betrag zurück. Keine Fragen, keine Diskussionen.',
      category: 'pricing'
    },
    {
      question: 'Kann ich das Programm auch zu Hause machen?',
      answer: 'Absolut! Das Programm ist hybrid aufgebaut:\n\n• Home Workouts ohne Equipment\n• Home Workouts mit Grundausstattung\n• Studio-Varianten\n• Outdoor-Optionen\n\nDu wählst täglich, was zu deiner Situation passt. Über 70% unserer Teilnehmer trainieren hauptsächlich zu Hause.',
      category: 'training'
    },
    {
      question: 'Wie funktioniert der Cashback bei Premium/VIP?',
      answer: 'Unser Cashback-System ist einfach und fair:\n\n1. Absolviere das 7-Wochen Programm vollständig\n2. Reiche deine Fortschrittsdokumentation ein\n3. Erhalte 100€ auf dein Konto zurück\n\nVoraussetzungen:\n• Tägliche App-Nutzung\n• Wöchentliche Check-ins\n• Vor/Nach-Fotos\n• Mindestens 80% der Trainings absolviert',
      category: 'pricing',
      showContactCta: true
    },
    {
      question: 'Was unterscheidet euch von anderen Fitness-Programmen?',
      answer: 'Unser Alleinstellungsmerkmal:\n\n• Wissenschaftlich fundiert (keine Crash-Diäten)\n• Nachhaltige Gewohnheiten statt Quick-Fixes\n• Echte Community (nicht nur Marketing)\n• Transparente Erfolgsstatistiken\n• Deutsche Inhalte von deutschen Experten\n• Cashback bei Erfolg (andere nehmen nur Geld)\n\nWir setzen auf langfristige Transformation, nicht auf kurzfristige Effekte.',
      category: 'program'
    }
  ],

  showContactSection: true,
  contactSectionHeadline: 'Noch Fragen? Wir sind für dich da!',
  contactSectionDescription: 'Unser Expertenteam beantwortet gerne alle deine Fragen persönlich und unverbindlich.',
  primaryContactText: 'Kostenloses Beratungsgespräch',
  primaryContactUrl: '/kontakt',
  secondaryContactText: 'WhatsApp Support',
  secondaryContactUrl: '#whatsapp',
  responseTimeText: 'Antwort binnen 2 Stunden',
  contactCtaText: 'Brauchst du weitere Hilfe zu diesem Thema?',
  contactButtonText: 'Fragen stellen',
  contactButtonUrl: '#still-have-questions',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

const getCategoryName = (categoryId: string) => {
  const category = props.categories.find(cat => cat.id === categoryId)
  return category?.name || 'Allgemein'
}

const getCategoryIcon = (categoryId: string) => {
  const iconMap: Record<string, string> = {
    program: '/icons/bullseye-arrow.svg',
    pricing: '/icons/coins.svg',
    training: '/icons/trophy.svg',
    nutrition: '/icons/recipe.svg',
    support: '/icons/users-medical.svg',
    results: '/icons/chart-pie-alt.svg'
  }
  return iconMap[categoryId] || '/icons/bullseye-arrow.svg'
}
</script>

