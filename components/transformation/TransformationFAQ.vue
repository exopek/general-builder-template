<template>
  <section class="py-16 md:py-20" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="info"
          class="mb-4"
        />

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          :style="{ color: headlineColor }"
        >
          {{ headline }}
        </h2>

        <p
          class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Search & Categories -->
      <div v-if="showSearch || showCategories" class="max-w-5xl mx-auto mb-16">

        <!-- Category Filter -->
        <div v-if="showCategories" class="flex flex-wrap gap-4 justify-center">
          <TransformationButton
            text="Alle"
            variant="ghost"
            size="sm"
            :class="[
              'transition-all duration-300',
              selectedCategory === 'all' ? 'bg-orange-500 text-white shadow-lg transform scale-105' : 'hover:bg-gray-100'
            ]"
            @click="selectCategory('all')"
            :aria-pressed="selectedCategory === 'all'"
          />
          <TransformationButton
            v-for="category in categories"
            :key="category.id"
            :text="category.name"
            variant="ghost"
            size="sm"
            :class="[
              'transition-all duration-300',
              selectedCategory === category.id ? 'bg-orange-500 text-white shadow-lg transform scale-105' : 'hover:bg-gray-100'
            ]"
            @click="selectCategory(category.id)"
            :aria-pressed="selectedCategory === category.id"
          />
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-5xl mx-auto">
        <div v-if="filteredFaqs.length === 0" class="text-center py-16">
          <TransformationIcon
            emoji="🔍"
            variant="neutral"
            size="xl"
            class="mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Keine Ergebnisse gefunden</h3>
          <p class="text-gray-600">Versuche andere Suchbegriffe oder kontaktiere uns direkt.</p>
        </div>

        <div v-else class="space-y-6" role="region" aria-label="Häufig gestellte Fragen">
          <TransformationCard
            v-for="(faq, index) in filteredFaqs"
            :key="index"
            variant="elevated"
            size="md"
            :hover-effect="false"
            class="cursor-pointer transition-all duration-500 hover:shadow-xl faq-item"
            :class="[
              openItems.includes(index) ? 'ring-2 ring-orange-500 shadow-xl' : 'hover:shadow-lg',
              'transform hover:-translate-y-1'
            ]"
            @click="toggleItem(index)"
            @keydown.enter="toggleItem(index)"
            @keydown.space.prevent="toggleItem(index)"
            :tabindex="0"
            role="button"
            :aria-expanded="openItems.includes(index)"
            :aria-controls="`faq-answer-${index}`"
          >
            <!-- Question Header -->
            <div class="flex items-start gap-4">
              <!-- Category Icon -->
              <div class="flex-shrink-0 mt-1">
                <TransformationIcon
                  :emoji="getCategoryEmoji(faq.category)"
                  :variant="getCategoryVariant(faq.category)"
                  size="sm"
                />
              </div>

              <!-- Question Content -->
              <div class="flex-1">
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-lg font-semibold text-gray-900 leading-tight">
                    {{ faq.question }}
                  </h3>

                  <!-- Toggle Button -->
                  <button
                    class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-500 hover:bg-gray-200 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                    :class="openItems.includes(index) ? 'bg-orange-500 text-white rotate-180 shadow-lg' : 'text-gray-600'"
                    :aria-label="openItems.includes(index) ? 'Antwort schließen' : 'Antwort anzeigen'"
                    tabindex="-1"
                  >
                    <svg class="w-5 h-5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                </div>

                <!-- Category Badge -->
                <TransformationBadge
                  :text="getCategoryName(faq.category)"
                  variant="neutral"
                  size="xs"
                  class="mt-2"
                />
              </div>
            </div>

            <!-- Answer Content (Collapsible) -->
            <div
              v-if="openItems.includes(index)"
              :id="`faq-answer-${index}`"
              class="mt-6 pt-6 border-t border-gray-200 animate-fadeIn"
              role="region"
              :aria-labelledby="`faq-question-${index}`"
            >
              <div class="prose prose-gray max-w-none">
                <p class="text-gray-700 text-base lg:text-lg leading-relaxed whitespace-pre-line">{{ faq.answer }}</p>

                <!-- Additional Links/Actions -->
                <div v-if="faq.links" class="mt-4 space-y-2">
                  <h4 class="font-medium text-gray-900">Hilfreiche Links:</h4>
                  <div class="space-y-1">
                    <a
                      v-for="link in faq.links"
                      :key="link.text"
                      :href="link.url"
                      class="block text-orange-600 hover:text-orange-700 text-sm underline"
                    >
                      {{ link.text }}
                    </a>
                  </div>
                </div>

                <!-- Contact CTA -->
                <div v-if="faq.showContactCta" class="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-3">
                    <TransformationIcon
                      emoji="💬"
                      variant="primary"
                      size="sm"
                    />
                    <div class="flex-1">
                      <p class="text-sm text-gray-600">{{ contactCtaText }}</p>
                    </div>
                    <TransformationButton
                      :text="contactButtonText"
                      :href="contactButtonUrl"
                      variant="primary"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TransformationCard>
        </div>
      </div>

      <!-- Still Have Questions Section -->
      <div v-if="showContactSection" class="max-w-4xl mx-auto mt-20 text-center">
        <div class="bg-gradient-warm rounded-2xl p-8 md:p-12 text-white shadow-2xl border border-orange-200">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ contactSectionHeadline }}</h3>
          <p class="text-lg opacity-90 mb-8">{{ contactSectionDescription }}</p>

          <div class="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <TransformationButton
              :text="primaryContactText"
              :href="primaryContactUrl"
              variant="secondary"
              size="lg"
            />
            <TransformationButton
              :text="secondaryContactText"
              :href="secondaryContactUrl"
              variant="secondaryFull"
              size="lg"
            />
          </div>

          <!-- Response Time Promise -->
          <div class="mt-6 flex items-center justify-center gap-2 text-sm opacity-80">
            <TransformationIcon
              emoji="⚡"
              variant="warning"
              size="xs"
            />
            <span>{{ responseTimeText }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
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
      answer: 'Unsere Preise sind transparent und es gibt keine versteckten Kosten:\n\n• Starter: 197€ (einmalig)\n• Premium: 297€ (einmalig, 25% Rabatt)\n• VIP: 497€ (einmalig)\n\nAlle Preise sind Endpreise inklusive MwSt. Es gibt keine monatlichen Gebühren oder Zusatzkosten.',
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
      answer: 'Nein! Unser Ansatz basiert auf flexibler Ernährung:\n\n• 80/20 Regel: 80% gesunde Nahrung, 20% Flexibilität\n• Mahlzeiten-Timing optimiert\n• Restaurant-Guide für auswärts essen\n• Gesunde Alternativen für Lieblingsspeisen\n\nDu lernst, wie du auch Pizza, Schokolade und Co. in deine Transformation integrieren kannst.',
      category: 'nutrition'
    },
    {
      question: 'Welche Unterstützung bekomme ich während des Programms?',
      answer: 'Du erhältst umfassende Betreuung:\n\n• Community-Chat mit 2.800+ Teilnehmern\n• Wöchentliche Coaching-Calls (Premium/VIP)\n• E-Mail Support (24h Antwort)\n• WhatsApp-Gruppe für Quick-Fragen\n• Persönlicher Ansprechpartner (VIP)\n\nDu bist nie allein auf deinem Weg!',
      category: 'support',
      links: [
        { text: 'Community-Regeln ansehen', url: '#community' },
        { text: 'Support-Team kontaktieren', url: '#support' }
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
  primaryContactUrl: '#beratung',
  secondaryContactText: 'WhatsApp Support',
  secondaryContactUrl: '#whatsapp',
  responseTimeText: 'Antwort binnen 2 Stunden',
  contactCtaText: 'Brauchst du weitere Hilfe zu diesem Thema?',
  contactButtonText: 'Fragen stellen',
  contactButtonUrl: '#kontakt',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

const searchQuery = ref('')
const selectedCategory = ref('all')
const openItems = ref<number[]>([])

const filteredFaqs = computed(() => {
  let filtered = props.faqs

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  searchQuery.value = ''
  openItems.value = []
}

const toggleItem = (index: number) => {
  const actualIndex = props.faqs.indexOf(filteredFaqs.value[index])

  if (openItems.value.includes(actualIndex)) {
    openItems.value = openItems.value.filter(i => i !== actualIndex)
  } else {
    openItems.value.push(actualIndex)
  }
}

const getCategoryEmoji = (categoryId: string) => {
  const category = props.categories.find(cat => cat.id === categoryId)
  return category?.emoji || '❓'
}

const getCategoryVariant = (categoryId: string) => {
  const category = props.categories.find(cat => cat.id === categoryId)
  return category?.variant || 'neutral'
}

const getCategoryName = (categoryId: string) => {
  const category = props.categories.find(cat => cat.id === categoryId)
  return category?.name || 'Allgemein'
}
</script>

<style scoped>
/* Fade-in animation for answers */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

/* FAQ item entrance animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-item {
  animation: slideInUp 0.6s ease-out;
}

.faq-item:nth-child(1) { animation-delay: 0.1s; }
.faq-item:nth-child(2) { animation-delay: 0.2s; }
.faq-item:nth-child(3) { animation-delay: 0.3s; }
.faq-item:nth-child(4) { animation-delay: 0.4s; }
.faq-item:nth-child(5) { animation-delay: 0.5s; }

/* Search input focus styles */
input:focus {
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
  transform: translateY(-1px);
}

input:hover {
  border-color: rgba(249, 115, 22, 0.3);
}

/* Category button active state */
.bg-orange-500 {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

/* Enhanced hover effects */
.hover\:bg-gray-100:hover {
  background-color: rgba(243, 244, 246, 0.8);
  transform: translateY(-1px);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-4px);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

/* Smooth accordion transitions */
.transition-all {
  transition: all 0.5s ease;
}

/* Focus styles for accessibility */
[tabindex="0"]:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

button:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

/* Search icon color change on focus */
input:focus + svg {
  color: #f97316;
}

/* Enhanced prose styling */
.prose p {
  margin-bottom: 1rem;
}

.prose ul {
  margin: 0.5rem 0;
}

.prose li {
  margin: 0.25rem 0;
}
</style>