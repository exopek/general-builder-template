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

      <!-- Timeline Container -->
      <div ref="timelineContainer" class="relative max-w-7xl mx-auto">

        <!-- Timeline Items -->
        <div class="space-y-12">
          <div
            v-for="(week, index) in timelineWeeks"
            :key="index"
            class="relative flex items-start timeline-week"
          >

            <!-- Week Number Badge -->
            <div class="relative z-10 flex-shrink-0 -ml-2">
              <TransformationBadge
                :text="`Woche ${index + 1}`"
                size="sm"
                :variant="getBadgeVariant(index)"
                class="shadow-md"
              />
            </div>

            <!-- Week Content -->
            <div class="ml-6 flex-1">
              <TransformationCard
                variant="elevated"
                size="sm"
                class="transition-all duration-150 hover:shadow-xl timeline-item opacity-100 scale-100 shadow-lg"
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
                    <div class="w-2 h-2 rounded-full bg-gradient-warm flex-shrink-0 shadow-sm"></div>
                    <span>{{ goal }}</span>
                  </div>
                </div>

                <!-- Week Results -->
                <div v-if="week.results" class="mt-4 pt-3 border-t border-gray-200">
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
        <BaseStatisticGrid
          v-if="showOverallStats"
          :statistics="overallStatsData"
          grid-type="fixed-4"
          gap="lg"
          default-size="sm"
          default-variant="primary"
          :default-animated="true"
          animation="stagger"
          container-class="mt-16 lg:mt-20"
        />

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
  totalCoursesPerWeek?: number
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
      goals: ['Trainingsroutine entwickeln', 'Ernährungsplan einführen', 'Ziele definieren']
    },
    {
      title: 'Intensität steigern',
      description: 'Training intensivieren und erste Erfolge sehen',
      emoji: '💪',
      goals: ['Gewichte erhöhen', 'Cardio ausbauen', 'Motivation aufrechterhalten']
    },
    {
      title: 'Durchbruch erleben',
      description: 'Plateau überwinden und neue Kraftlevel erreichen',
      emoji: '🚀',
      goals: ['Neue Übungen integrieren', 'Ernährung optimieren', 'Erholung verbessern']
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
  totalCoursesPerWeek: 16,
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

// Transform overall stats into array format
const overallStatsData = computed(() => [
  {
    key: 'totalCourses',
    value: props.totalCoursesPerWeek,
    label: 'Kurse pro Woche',
    suffix: '+'
  },
  {
    key: 'averageWeightLoss',
    value: props.averageWeightLoss,
    label: 'Ø Gewichtsverlust',
    suffix: 'kg'
  },
  {
    key: 'completionRate',
    value: props.completionRate,
    label: 'Abschlussquote',
    suffix: '%'
  },
  {
    key: 'satisfactionRate',
    value: props.satisfactionRate,
    label: 'Zufriedenheit',
    suffix: '%'
  }
])

const getWeekVariant = (weekIndex: number) => {
  if (weekIndex < props.currentWeek) return 'success'
  if (weekIndex === props.currentWeek) return 'primary'
  return 'neutral'
}

const getBadgeVariant = (weekIndex: number) => {
  if (weekIndex < currentWeekDisplay.value) return 'featured'
  if (weekIndex === currentWeekDisplay.value) return 'featured'
  return 'neutral'
}


// Reactive scroll-based current week for badge colors only
const scrollCurrentWeek = ref(props.currentWeek)
const timelineContainer = ref<HTMLElement>()

// Calculate current week based on scroll position (for badge colors only)
const updateCurrentWeek = () => {
  if (!timelineContainer.value) return

  const windowHeight = window.innerHeight
  const centerY = windowHeight * 0.5 // Center of viewport

  // Find all week elements
  const weekCards = timelineContainer.value.querySelectorAll('.timeline-week')
  if (weekCards.length === 0) return

  let activeWeek = 0

  // Check each week's position relative to center of screen
  for (let i = 0; i < weekCards.length; i++) {
    const weekRect = weekCards[i].getBoundingClientRect()
    const weekCenter = weekRect.top + (weekRect.height * 0.3) // 30% down the card

    if (weekCenter <= centerY) {
      activeWeek = i
    } else {
      break
    }
  }

  scrollCurrentWeek.value = activeWeek
}

// Use scroll-based current week for badge colors
const currentWeekDisplay = computed(() => scrollCurrentWeek.value)

// Throttle scroll updates for better performance
let scrollTimeout: number | null = null
const throttledUpdateCurrentWeek = () => {
  if (scrollTimeout) return

  scrollTimeout = requestAnimationFrame(() => {
    updateCurrentWeek()
    scrollTimeout = null
  })
}

// Setup scroll listener
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', throttledUpdateCurrentWeek, { passive: true })
    window.addEventListener('resize', throttledUpdateCurrentWeek, { passive: true })
    // Initial calculation
    nextTick(() => {
      updateCurrentWeek()
    })
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', throttledUpdateCurrentWeek)
    window.removeEventListener('resize', throttledUpdateCurrentWeek)
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout)
    }
  }
})
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

.bg-gradient-warm {
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