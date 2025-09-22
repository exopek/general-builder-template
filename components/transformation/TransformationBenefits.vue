<template>
  <section class="py-16 md:py-20" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="featured"
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

      <!-- Benefits Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
        <TransformationCard
          v-for="(benefit, index) in benefits"
          :key="index"
          variant="elevated"
          size="md"
          :hover-effect="true"
          class="group cursor-pointer benefit-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Icon -->
          <div class="flex justify-center mb-8">
            <TransformationIcon
              :emoji="benefit.emoji"
              :variant="benefit.iconVariant || 'primary'"
              size="xl"
              :animated="true"
              class="group-hover:scale-125 transition-all duration-500 group-hover:rotate-6"
            />
          </div>

          <!-- Content -->
          <div class="text-center space-y-5">
            <h3 class="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{{ benefit.title }}</h3>
            <p class="text-gray-600 text-base lg:text-lg leading-relaxed">{{ benefit.description }}</p>

            <!-- Feature List -->
            <div v-if="benefit.features" class="space-y-3 pt-6">
              <div
                v-for="(feature, featureIndex) in benefit.features"
                :key="feature"
                class="flex items-center gap-3 text-sm lg:text-base text-gray-700 transition-all duration-300 hover:translate-x-2 group/feature"
                :style="{ animationDelay: `${(index * 0.1) + (featureIndex * 0.05)}s` }"
              >
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 transition-all duration-300 group-hover/feature:text-green-600 group-hover/feature:scale-110" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>

            <!-- Highlight Badge -->
            <TransformationBadge
              v-if="benefit.highlight"
              :text="benefit.highlight"
              variant="new"
              size="sm"
              class="mt-6 transition-all duration-300 group-hover:scale-110"
              animated
            />
          </div>
        </TransformationCard>
      </div>

      <!-- Comparison Section -->
      <div v-if="showComparison" class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 mb-16 shadow-xl border border-gray-100">
        <div class="text-center mb-8">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{{ comparisonHeadline }}</h3>
          <p class="text-gray-600">{{ comparisonSubheadline }}</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 lg:gap-12">

          <!-- Without Program -->
          <div class="space-y-4">
            <div class="flex items-center gap-3 mb-6">
              <TransformationIcon
                emoji="😟"
                variant="warning"
                size="md"
              />
              <h4 class="text-xl font-bold text-gray-900">{{ withoutProgramTitle }}</h4>
            </div>

            <div class="space-y-3">
              <div
                v-for="item in withoutProgramItems"
                :key="item"
                class="flex items-start gap-3 text-gray-700"
              >
                <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                <span class="text-base lg:text-lg">{{ item }}</span>
              </div>
            </div>
          </div>

          <!-- With Program -->
          <div class="space-y-4">
            <div class="flex items-center gap-3 mb-6">
              <TransformationIcon
                emoji="🚀"
                variant="success"
                size="md"
              />
              <h4 class="text-xl font-bold text-gray-900">{{ withProgramTitle }}</h4>
            </div>

            <div class="space-y-3">
              <div
                v-for="item in withProgramItems"
                :key="item"
                class="flex items-start gap-3 text-gray-700"
              >
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-base lg:text-lg">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Metrics -->
      <div v-if="showMetrics" class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">{{ metricsHeadline }}</h3>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <TransformationCounter
            :value="successMetrics.averageWeightLoss"
            label="Ø Gewichtsverlust"
            suffix="kg"
            variant="highlight"
            size="md"
            :animated="true"
          />
          <TransformationCounter
            :value="successMetrics.muscleGain"
            label="Muskelzuwachs"
            suffix="%"
            variant="primary"
            size="md"
            :animated="true"
          />
          <TransformationCounter
            :value="successMetrics.energyIncrease"
            label="Mehr Energie"
            suffix="%"
            variant="secondary"
            size="md"
            :animated="true"
          />
          <TransformationCounter
            :value="successMetrics.satisfactionRate"
            label="Zufriedenheit"
            suffix="%"
            variant="success"
            size="md"
            :animated="true"
          />
        </div>
      </div>

      <!-- CTA Section -->
      <div v-if="showCta" class="text-center mt-12 lg:mt-16">
        <div class="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ ctaHeadline }}</h3>
          <p class="text-lg opacity-90 max-w-2xl mx-auto mb-8">{{ ctaDescription }}</p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <TransformationButton
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="secondary"
              size="lg"
            />
            <TransformationButton
              :text="secondaryCtaText"
              :href="secondaryCtaUrl"
              variant="ghost"
              size="lg"
              class="text-white border-white hover:bg-white hover:text-gray-900"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
interface Benefit {
  title: string
  description: string
  emoji: string
  iconVariant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'neutral'
  features?: string[]
  highlight?: string
}

interface SuccessMetrics {
  averageWeightLoss: number
  muscleGain: number
  energyIncrease: number
  satisfactionRate: number
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Benefits
  benefits?: Benefit[]

  // Comparison
  showComparison?: boolean
  comparisonHeadline?: string
  comparisonSubheadline?: string
  withoutProgramTitle?: string
  withoutProgramItems?: string[]
  withProgramTitle?: string
  withProgramItems?: string[]

  // Metrics
  showMetrics?: boolean
  metricsHeadline?: string
  successMetrics?: SuccessMetrics

  // CTA
  showCta?: boolean
  ctaHeadline?: string
  ctaDescription?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Warum unser 7-Wochen Programm funktioniert',
  subheadline: 'Entdecke die wissenschaftlich fundierten Vorteile unseres Transformationsprogramms und erlebe selbst, warum über 94% unserer Teilnehmer ihre Ziele erreichen.',
  badgeText: 'Bewiesene Erfolge',
  showBadge: true,

  benefits: () => [
    {
      title: 'Personalisierte Trainingspläne',
      description: 'Maßgeschneiderte Workouts basierend auf deinem Fitnesslevel, deinen Zielen und verfügbarer Zeit.',
      emoji: '🎯',
      iconVariant: 'primary',
      features: ['Individueller Trainingsplan', 'Wöchentliche Anpassungen', 'Progressionstracking', 'Technik-Coaching'],
      highlight: 'Bestseller'
    },
    {
      title: 'Ernährungsberatung',
      description: 'Professionelle Ernährungsstrategien für optimale Ergebnisse ohne Verzicht auf Lieblingsspeisen.',
      emoji: '🥗',
      iconVariant: 'success',
      features: ['Flexible Meal Plans', 'Makro-Berechnung', 'Restaurant-Guide', 'Rezept-Sammlung']
    },
    {
      title: 'Community & Support',
      description: 'Eine motivierende Gemeinschaft und persönliche Betreuung durch zertifizierte Trainer.',
      emoji: '👥',
      iconVariant: 'secondary',
      features: ['24/7 Support Chat', 'Wöchentliche Check-ins', 'Motivationsgruppen', 'Erfolgs-Tracking']
    },
    {
      title: 'Mentale Stärke',
      description: 'Entwickle die richtige Mindset und überwinde mentale Barrieren für langanhaltenden Erfolg.',
      emoji: '🧠',
      iconVariant: 'accent',
      features: ['Mindset-Training', 'Stress-Management', 'Gewohnheits-Coaching', 'Selbstvertrauen']
    },
    {
      title: 'Flexibilität',
      description: 'Trainiere wann und wo du willst - im Studio, zu Hause oder unterwegs.',
      emoji: '⏰',
      iconVariant: 'warning',
      features: ['Home Workouts', 'Studio Sessions', 'Reise-Routinen', 'Zeitsparende Optionen']
    },
    {
      title: 'Messbare Ergebnisse',
      description: 'Verfolge deinen Fortschritt mit detaillierten Metriken und regelmäßigen Erfolgskontrollen.',
      emoji: '📊',
      iconVariant: 'neutral',
      features: ['Body Composition', 'Kraftmessungen', 'Foto-Vergleiche', 'Leistungsanalyse'],
      highlight: 'Datenbasiert'
    }
  ],

  showComparison: true,
  comparisonHeadline: 'Der Unterschied ist deutlich sichtbar',
  comparisonSubheadline: 'Vergleiche selbst: Mit und ohne professionelle Begleitung',
  withoutProgramTitle: 'Alleine versuchen',
  withoutProgramItems: () => [
    'Unstrukturiertes Training ohne Plan',
    'Verwirrende und widersprüchliche Informationen',
    'Mangelnde Motivation und Durchhaltevermögen',
    'Plateaus ohne Lösungsansätze',
    'Verletzungsrisiko durch falsche Technik',
    'Langsamere oder ausbleibende Ergebnisse'
  ],
  withProgramTitle: 'Mit unserem Programm',
  withProgramItems: () => [
    'Strukturierter 7-Wochen Trainingsplan',
    'Wissenschaftlich fundierte Methoden',
    'Tägliche Motivation und Community-Support',
    'Professionelle Lösungen für alle Herausforderungen',
    'Sichere Übungsausführung durch Expertenbetreuung',
    'Garantierte Ergebnisse in nur 7 Wochen'
  ],

  showMetrics: true,
  metricsHeadline: 'Unsere Teilnehmer erreichen durchschnittlich',
  successMetrics: () => ({
    averageWeightLoss: 8.2,
    muscleGain: 15,
    energyIncrease: 40,
    satisfactionRate: 94
  }),

  showCta: true,
  ctaHeadline: 'Bereit für deine Transformation?',
  ctaDescription: 'Schließe dich über 2.800 erfolgreichen Teilnehmern an und erlebe selbst die Vorteile unseres bewährten Systems.',
  primaryCtaText: 'Programm starten',
  primaryCtaUrl: '#anmeldung',
  secondaryCtaText: 'Kostenlose Beratung',
  secondaryCtaUrl: '#beratung',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})
</script>

<style scoped>
/* Hover effects for benefit cards */
.group:hover .stat-card {
  transform: translateY(-12px);
}

/* Benefit card entrance animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.benefit-card {
  animation: slideInUp 0.8s ease-out;
}

/* Comparison section animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.comparison-without {
  animation: fadeInLeft 0.8s ease-out;
}

.comparison-with {
  animation: fadeInRight 0.8s ease-out;
}

/* Enhanced hover effects */
.hover\:-translate-y-2:hover {
  transform: translateY(-8px);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Icon rotation and scaling */
.group-hover\:rotate-6:hover {
  transform: rotate(6deg) scale(1.25);
}

.group-hover\:scale-125:hover {
  transform: scale(1.25);
}

/* Text color transitions */
.group-hover\:text-orange-600:hover {
  color: #ea580c;
}

/* Feature list animations */
.hover\:translate-x-2:hover {
  transform: translateX(8px);
}

.group\/feature:hover .group-hover\/feature\:scale-110 {
  transform: scale(1.1);
}

.group\/feature:hover .group-hover\/feature\:text-green-600 {
  color: #059669;
}

/* Staggered animation for benefits grid */
.benefit-card:nth-child(1) { animation-delay: 0.1s; }
.benefit-card:nth-child(2) { animation-delay: 0.2s; }
.benefit-card:nth-child(3) { animation-delay: 0.3s; }
.benefit-card:nth-child(4) { animation-delay: 0.4s; }
.benefit-card:nth-child(5) { animation-delay: 0.5s; }
.benefit-card:nth-child(6) { animation-delay: 0.6s; }

/* Gradient background enhancement */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #f9fafb, #ffffff, #f3f4f6);
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .benefit-card {
    margin-bottom: 1rem;
  }

  .comparison-without,
  .comparison-with {
    animation-delay: 0.2s;
  }
}

/* Custom gradient button styling */
.text-white.border-white:hover {
  color: #1f2937 !important;
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>