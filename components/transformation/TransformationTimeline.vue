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

      <!-- Timeline Container -->
      <div class="relative max-w-7xl mx-auto">

        <!-- Progress Line (Desktop) -->
        <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2 shadow-inner">
          <div
            class="h-full bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 transition-all duration-1000 ease-out rounded-full shadow-lg"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>

        <!-- Progress Line (Mobile) -->
        <div class="lg:hidden absolute left-8 top-0 bottom-0 w-2 bg-gray-200 rounded-full shadow-inner">
          <div
            class="w-full bg-gradient-to-b from-orange-500 via-red-500 to-blue-600 transition-all duration-1000 ease-out rounded-full shadow-lg"
            :style="{ height: progressPercentage + '%' }"
          ></div>
        </div>

        <!-- Timeline Items -->
        <div class="lg:grid lg:grid-cols-7 lg:gap-6 xl:gap-8 space-y-12 lg:space-y-0">
          <div
            v-for="(week, index) in timelineWeeks"
            :key="index"
            class="relative flex lg:flex-col items-start lg:items-center"
            :class="{ 'lg:col-span-1': true }"
          >

            <!-- Week Number Circle -->
            <div class="relative z-10 flex-shrink-0 lg:mb-6">
              <TransformationIcon
                :emoji="week.emoji"
                :variant="getWeekVariant(index)"
                size="lg"
                :animated="index <= currentWeek"
                class="lg:mx-auto"
              />

              <!-- Week Number Badge -->
              <TransformationBadge
                :text="`Woche ${index + 1}`"
                size="xs"
                variant="neutral"
                position="bottom-right"
                class="absolute -bottom-1 -right-1"
              />
            </div>

            <!-- Week Content -->
            <div class="ml-6 lg:ml-0 flex-1 lg:text-center">
              <TransformationCard
                variant="elevated"
                size="sm"
                :class="[
                  'transition-all duration-500 hover:shadow-xl timeline-item',
                  index <= currentWeek ? 'opacity-100 scale-100 shadow-lg' : 'opacity-80 scale-95'
                ]"
              >
                <h3 class="font-bold text-lg lg:text-xl mb-3 text-gray-900 leading-tight">{{ week.title }}</h3>
                <p class="text-sm lg:text-base text-gray-600 mb-4 leading-relaxed">{{ week.description }}</p>

                <!-- Week Goals -->
                <div class="space-y-3">
                  <div
                    v-for="goal in week.goals"
                    :key="goal"
                    class="flex items-center gap-3 text-xs lg:text-sm text-gray-700"
                  >
                    <div class="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0 shadow-sm"></div>
                    <span>{{ goal }}</span>
                  </div>
                </div>

                <!-- Week Results (if completed) -->
                <div v-if="week.results && index <= currentWeek" class="mt-4 pt-3 border-t border-gray-200">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-600">Durchschnittlicher Fortschritt:</span>
                    <TransformationBadge
                      :text="week.results"
                      variant="success"
                      size="xs"
                    />
                  </div>
                </div>
              </TransformationCard>
            </div>
          </div>
        </div>

        <!-- Overall Progress Stats -->
        <div v-if="showOverallStats" class="mt-16 lg:mt-20">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <TransformationCounter
              :value="totalParticipants"
              label="Gesamte Teilnehmer"
              suffix="+"
              variant="primary"
              size="sm"
              :animated="true"
            />
            <TransformationCounter
              :value="averageWeightLoss"
              label="Ø Gewichtsverlust"
              suffix="kg"
              variant="highlight"
              size="sm"
              :animated="true"
            />
            <TransformationCounter
              :value="completionRate"
              label="Abschlussquote"
              suffix="%"
              variant="secondary"
              size="sm"
              :animated="true"
            />
            <TransformationCounter
              :value="satisfactionRate"
              label="Zufriedenheit"
              suffix="%"
              variant="success"
              size="sm"
              :animated="true"
            />
          </div>
        </div>

        <!-- CTA Section -->
        <div v-if="showCta" class="mt-16 lg:mt-20 text-center">
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-gray-900">{{ ctaHeadline }}</h3>
            <p class="text-gray-600 max-w-2xl mx-auto">{{ ctaDescription }}</p>

            <div class="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mt-8">
              <TransformationButton
                :text="primaryCtaText"
                :href="primaryCtaUrl"
                variant="gradient"
                size="lg"
              />
              <TransformationButton
                :text="secondaryCtaText"
                :href="secondaryCtaUrl"
                variant="outline"
                size="lg"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface WeekData {
  title: string
  description: string
  emoji: string
  goals: string[]
  results?: string
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Timeline Data
  timelineWeeks?: WeekData[]
  currentWeek?: number

  // Progress
  progressPercentage?: number

  // Stats
  showOverallStats?: boolean
  totalParticipants?: number
  averageWeightLoss?: number
  completionRate?: number
  satisfactionRate?: number

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
  headline: 'Dein 7-Wochen Transformations-Plan',
  subheadline: 'Jede Woche bringt dich deinem Ziel näher. Unser strukturierter Plan führt dich Schritt für Schritt zu deiner besten Version.',
  badgeText: 'Bewährtes System',
  showBadge: true,
  currentWeek: 3,
  progressPercentage: 45,

  timelineWeeks: () => [
    {
      title: 'Fundament schaffen',
      description: 'Grundlagen des Trainings erlernen und Gewohnheiten etablieren',
      emoji: '🏗️',
      goals: ['Trainingsroutine entwickeln', 'Ernährungsplan einführen', 'Ziele definieren'],
      results: '2.1kg Ø'
    },
    {
      title: 'Intensität steigern',
      description: 'Training intensivieren und erste Erfolge sehen',
      emoji: '💪',
      goals: ['Gewichte erhöhen', 'Cardio ausbauen', 'Motivation aufrechterhalten'],
      results: '1.8kg Ø'
    },
    {
      title: 'Durchbruch erleben',
      description: 'Plateau überwinden und neue Kraftlevel erreichen',
      emoji: '🚀',
      goals: ['Neue Übungen integrieren', 'Ernährung optimieren', 'Erholung verbessern'],
      results: '2.3kg Ø'
    },
    {
      title: 'Stabilität finden',
      description: 'Fortschritte konsolidieren und Technik verfeinern',
      emoji: '⚖️',
      goals: ['Technik perfektionieren', 'Routine festigen', 'Kraftzuwachs messen']
    },
    {
      title: 'Grenzen überwinden',
      description: 'Persönliche Bestleistungen erreichen und neue Ziele setzen',
      emoji: '🎯',
      goals: ['Neue Rekorde aufstellen', 'Schwächen ausmerzen', 'Mentale Stärke']
    },
    {
      title: 'Vollgas geben',
      description: 'Maximale Intensität für die letzten großen Fortschritte',
      emoji: '🔥',
      goals: ['Alles geben', 'Kondition maximieren', 'Letzter Schliff']
    },
    {
      title: 'Erfolg feiern',
      description: 'Transformation abschließen und Erfolg würdigen',
      emoji: '🏆',
      goals: ['Erfolg messen', 'Fotos vergleichen', 'Zukunft planen']
    }
  ],

  showOverallStats: true,
  totalParticipants: 2847,
  averageWeightLoss: 8.2,
  completionRate: 94,
  satisfactionRate: 98,

  showCta: true,
  ctaHeadline: 'Starte deine eigene 7-Wochen Transformation',
  ctaDescription: 'Schließe dich über 2.800 erfolgreichen Teilnehmern an und verwandle deinen Körper in nur 7 Wochen.',
  primaryCtaText: 'Jetzt anmelden',
  primaryCtaUrl: '#anmeldung',
  secondaryCtaText: 'Kostenloses Beratungsgespräch',
  secondaryCtaUrl: '#beratung',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

const getWeekVariant = (weekIndex: number) => {
  if (weekIndex < props.currentWeek) return 'success'
  if (weekIndex === props.currentWeek) return 'primary'
  return 'neutral'
}
</script>

<style scoped>
/* Timeline specific animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-item {
  animation: fadeInUp 0.8s ease-out;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }
.timeline-item:nth-child(7) { animation-delay: 0.7s; }

/* Progress line pulse effect */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.bg-gradient-to-r,
.bg-gradient-to-b {
  animation: pulse 3s ease-in-out infinite;
}

/* Enhanced hover effects */
.timeline-item:hover {
  transform: translateY(-4px);
}

/* Responsive improvements */
@media (max-width: 1023px) {
  .timeline-item {
    margin-bottom: 2rem;
  }
}

/* Better shadow transitions */
.shadow-lg {
  transition: box-shadow 0.3s ease;
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}
</style>