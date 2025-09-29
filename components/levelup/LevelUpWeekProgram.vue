<template>
  <section class="level-up-week-program py-16 md:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="featured"
          class="mb-6"
        />
        <h2
          class="text-3xl lg:text-4xl font-bold mb-6"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></h2>
        <p
          class="text-lg max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Program Overview Stats -->
      <div v-if="showOverviewStats" class="mb-16">
        <BaseStatisticGrid
          :statistics="overviewStats"
          grid-type="fixed-3"
          gap="md"
          max-width="lg"
          default-size="md"
          default-variant="minimal"
          :default-count-up="true"
          animation="stagger"
          container-class="mx-auto"
        />
      </div>

      <!-- Week Timeline -->
      <div class="mb-16">
        <BaseTimeline
          :items="programTimeline"
          :orientation="timelineOrientation"
          :variant="timelineVariant"
          :size="timelineSize"
          :show-progress="showTimelineProgress"
          :current-step="currentDay"
          :show-numbers="showDayNumbers"
          :interactive="interactiveTimeline"
          @item-click="handleDayClick"
        />
      </div>

      <!-- Daily Focus Areas -->
      <div v-if="showDailyFocus" class="mb-16">
        <h3 class="text-2xl font-bold text-center mb-8" :style="{ color: headlineColor }">
          {{ dailyFocusTitle }}
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BaseEventCard
            v-for="(focus, index) in dailyFocusAreas"
            :key="focus.key || index"
            :title="focus.title"
            :description="focus.description"
            :icon="focus.icon"
            :badge="focus.badge"
            :features="focus.features"
            :variant="focus.variant || 'elevated'"
            :size="focusCardSize"
            :hover-effect="true"
          />
        </div>
      </div>

      <!-- Workshop Highlights -->
      <div v-if="showWorkshops" class="mb-16">
        <h3 class="text-2xl font-bold text-center mb-8" :style="{ color: headlineColor }">
          {{ workshopsTitle }}
        </h3>
        <div class="grid lg:grid-cols-2 gap-8">
          <BaseEventCard
            v-for="(workshop, index) in workshopHighlights"
            :key="workshop.key || index"
            :title="workshop.title"
            :description="workshop.description"
            :icon="workshop.icon"
            :date="workshop.date"
            :features="workshop.features"
            :cta-text="workshop.ctaText"
            :cta-url="workshop.ctaUrl"
            :cta-variant="workshop.ctaVariant || 'outline'"
            variant="default"
            :size="workshopCardSize"
            :status="workshop.status"
            :status-variant="workshop.statusVariant"
          />
        </div>
      </div>

      <!-- Schedule Overview -->
      <div v-if="showSchedule" class="mb-16">
        <h3 class="text-2xl font-bold text-center mb-8" :style="{ color: headlineColor }">
          {{ scheduleTitle }}
        </h3>
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(day, index) in weekSchedule"
              :key="day.day"
              class="schedule-day"
              :class="{ 'active': index + 1 === currentDay }"
            >
              <div class="day-header">
                <span class="day-number">{{ index + 1 }}</span>
                <span class="day-name">{{ day.day }}</span>
              </div>
              <div class="day-content">
                <h4 class="font-semibold text-gray-900 mb-2">{{ day.focus }}</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li v-for="activity in day.activities" :key="activity">
                    {{ activity }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div v-if="showCta" class="text-center">
        <div class="bg-gradient-warm rounded-2xl p-8 md:p-12 text-white">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ ctaTitle }}</h3>
          <p class="text-lg mb-8 opacity-90">{{ ctaDescription }}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              v-if="primaryCtaText"
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="secondary"
              size="lg"
              :external="primaryCtaExternal"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TimelineItem {
  key?: string
  title: string
  description?: string
  date?: string
  step?: string
  icon?: string
  features?: string[]
  active?: boolean
  completed?: boolean
  status?: 'pending' | 'active' | 'completed'
  ctaText?: string
  ctaUrl?: string
  ctaVariant?: 'primary' | 'secondary' | 'ghost' | 'outline'
}

interface DailyFocus {
  key?: string
  title: string
  description: string
  icon?: string
  badge?: string
  features?: string[]
  variant?: 'default' | 'featured' | 'elevated' | 'glass' | 'gradient'
}

interface Workshop {
  key?: string
  title: string
  description: string
  icon?: string
  date?: string
  features?: string[]
  ctaText?: string
  ctaUrl?: string
  ctaVariant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  status?: string
  statusVariant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

interface ScheduleDay {
  day: string
  focus: string
  activities: string[]
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Overview Statistics
  showOverviewStats?: boolean
  totalDays?: number
  workshopsCount?: number
  participantCapacity?: number

  // Timeline
  timelineOrientation?: 'vertical' | 'horizontal'
  timelineVariant?: 'default' | 'minimal' | 'cards' | 'connected'
  timelineSize?: 'sm' | 'md' | 'lg'
  showTimelineProgress?: boolean
  currentDay?: number
  showDayNumbers?: boolean
  interactiveTimeline?: boolean

  // Daily Focus
  showDailyFocus?: boolean
  dailyFocusTitle?: string
  focusCardSize?: 'sm' | 'md' | 'lg'

  // Workshops
  showWorkshops?: boolean
  workshopsTitle?: string
  workshopCardSize?: 'sm' | 'md' | 'lg'

  // Schedule
  showSchedule?: boolean
  scheduleTitle?: string

  // CTA
  showCta?: boolean
  ctaTitle?: string
  ctaDescription?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Dein <span style="color: #ff6b35;">7-Tage Intensivprogramm</span>',
  subheadline: 'Jeder Tag der Level Up Week hat einen spezifischen Fokus. Von intensiven Workshops bis hin zu neuen Routinen – hier ist dein kompletter Überblick über die Woche.',
  badgeText: 'Programm-Überblick',
  showBadge: true,

  showOverviewStats: true,
  totalDays: 7,
  workshopsCount: 14,
  participantCapacity: 150,

  timelineOrientation: 'vertical',
  timelineVariant: 'cards',
  timelineSize: 'md',
  showTimelineProgress: true,
  currentDay: 1,
  showDayNumbers: true,
  interactiveTimeline: false,

  showDailyFocus: true,
  dailyFocusTitle: 'Tägliche Schwerpunkte',
  focusCardSize: 'md',

  showWorkshops: true,
  workshopsTitle: 'Workshop-Highlights',
  workshopCardSize: 'md',

  showSchedule: true,
  scheduleTitle: 'Wochenübersicht',

  showCta: true,
  ctaTitle: 'Bereit für deine intensive Woche?',
  ctaDescription: 'Sichere dir deinen Platz für die nächste Level Up Week und erlebe eine Woche voller Fortschritt.',
  primaryCtaText: 'Jetzt anmelden',
  primaryCtaUrl: '#anmeldung',
  primaryCtaExternal: false,
  secondaryCtaText: 'Fragen stellen',
  secondaryCtaUrl: '#kontakt',
  secondaryCtaExternal: false,

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

const emit = defineEmits<{
  dayClick: [day: TimelineItem, index: number]
}>()

// Computed Properties
const overviewStats = computed(() => [
  {
    key: 'days',
    value: props.totalDays,
    label: 'Intensive Tage',
    suffix: '',
    variant: 'primary',
    iconName: 'target',
    description: 'Strukturiertes Programm'
  },
  {
    key: 'workshops',
    value: props.workshopsCount,
    label: 'Workshops & Sessions',
    suffix: '',
    variant: 'primary',
    iconName: 'lightbulb',
    description: 'Praxisorientierte Inhalte'
  },
  {
    key: 'capacity',
    value: props.participantCapacity,
    label: 'Max. Teilnehmer',
    suffix: '',
    variant: 'primary',
    iconName: 'people',
    description: 'Kleine Gruppen'
  }
])

const programTimeline = computed((): TimelineItem[] => [
  {
    key: 'day1',
    title: 'Tag 1: Kickoff & Zielsetzung',
    description: 'Gemeinsamer Start, Ziele definieren, erste Routinen etablieren',
    step: 'Montag',
    icon: 'target',
    features: ['Begrüßungsworkshop', 'Zielsetzung', 'Community-Kennenlernen'],
    status: props.currentDay > 1 ? 'completed' : props.currentDay === 1 ? 'active' : 'pending'
  },
  {
    key: 'day2',
    title: 'Tag 2: Routine-Building',
    description: 'Neue Gewohnheiten aufbauen, Morgenroutine entwickeln',
    step: 'Dienstag',
    icon: 'heart',
    features: ['Morgenroutine', 'Habit-Stacking', 'Tracking-Setup'],
    status: props.currentDay > 2 ? 'completed' : props.currentDay === 2 ? 'active' : 'pending'
  },
  {
    key: 'day3',
    title: 'Tag 3: Wissenstransfer',
    description: 'Expertenwissen, Best Practices, Lernen von anderen',
    step: 'Mittwoch',
    icon: 'lightbulb',
    features: ['Expertentalks', 'Q&A Sessions', 'Wissensaustausch'],
    status: props.currentDay > 3 ? 'completed' : props.currentDay === 3 ? 'active' : 'pending'
  },
  {
    key: 'day4',
    title: 'Tag 4: Herausforderungen',
    description: 'Intensive Challenges, Grenzen überwinden, Wachstum',
    step: 'Donnerstag',
    icon: 'award',
    features: ['Challenge-Day', 'Grenzen testen', 'Erfolgserlebnisse'],
    status: props.currentDay > 4 ? 'completed' : props.currentDay === 4 ? 'active' : 'pending'
  },
  {
    key: 'day5',
    title: 'Tag 5: Community Power',
    description: 'Teamwork, gegenseitige Unterstützung, gemeinsame Erfolge',
    step: 'Freitag',
    icon: 'people',
    features: ['Team-Challenges', 'Buddy-System', 'Community-Building'],
    status: props.currentDay > 5 ? 'completed' : props.currentDay === 5 ? 'active' : 'pending'
  },
  {
    key: 'day6',
    title: 'Tag 6: Reflektion & Anpassung',
    description: 'Fortschritte bewerten, Strategien anpassen, optimieren',
    step: 'Samstag',
    icon: 'shield',
    features: ['Progress-Review', 'Strategien anpassen', 'Optimierung'],
    status: props.currentDay > 6 ? 'completed' : props.currentDay === 6 ? 'active' : 'pending'
  },
  {
    key: 'day7',
    title: 'Tag 7: Celebration & Ausblick',
    description: 'Erfolge feiern, Zukunft planen, nachhaltige Veränderung',
    step: 'Sonntag',
    icon: 'handshake',
    features: ['Erfolge feiern', 'Zukunftsplanung', 'Nachhaltigkeit'],
    status: props.currentDay > 7 ? 'completed' : props.currentDay === 7 ? 'active' : 'pending'
  }
])

const dailyFocusAreas = computed((): DailyFocus[] => [
  {
    key: 'workshops',
    title: 'Intensive Workshops',
    description: 'Praktische Sessions mit direkter Anwendung',
    icon: 'lightbulb',
    badge: 'Täglich',
    features: ['2-3 Sessions pro Tag', 'Praxisnahe Inhalte', 'Direkte Umsetzung'],
    variant: 'elevated'
  },
  {
    key: 'routines',
    title: 'Neue Routinen',
    description: 'Entwicklung nachhaltiger Gewohnheiten',
    icon: 'target',
    badge: 'Aufbau',
    features: ['Schritt-für-Schritt', 'Personalisiert', 'Nachhaltig'],
    variant: 'elevated'
  },
  {
    key: 'knowledge',
    title: 'Wertvolles Wissen',
    description: 'Expertenwissen für langfristigen Erfolg',
    icon: 'award',
    badge: 'Expert',
    features: ['Bewährte Methoden', 'Wissenschaftlich fundiert', 'Praxiserprobt'],
    variant: 'elevated'
  }
])

const workshopHighlights = computed((): Workshop[] => [
  {
    key: 'morning',
    title: 'Morgenroutine-Masterclass',
    description: 'Entwickle eine kraftvolle Morgenroutine, die dein Leben verändert',
    icon: 'heart',
    date: 'Tag 2',
    features: ['Personalisierte Routinen', 'Wissenschaftliche Basis', 'Sofortige Umsetzung'],
    ctaText: 'Mehr erfahren',
    ctaUrl: '#morgenroutine',
    status: 'Sehr beliebt',
    statusVariant: 'success'
  },
  {
    key: 'challenge',
    title: 'Ultimate Challenge Day',
    description: 'Überwinde deine Grenzen und entdecke neue Stärken',
    icon: 'award',
    date: 'Tag 4',
    features: ['Individuelle Challenges', 'Gemeinschaftserlebnis', 'Erfolgsmessung'],
    ctaText: 'Challenge annehmen',
    ctaUrl: '#challenge',
    status: 'Transformativ',
    statusVariant: 'warning'
  },
  {
    key: 'community',
    title: 'Community Power Workshop',
    description: 'Nutze die Kraft der Gemeinschaft für deinen Erfolg',
    icon: 'people',
    date: 'Tag 5',
    features: ['Netzwerk aufbauen', 'Accountability Partner', 'Langfristige Verbindungen'],
    ctaText: 'Community beitreten',
    ctaUrl: '#community',
    status: 'Gemeinschaft',
    statusVariant: 'info'
  },
  {
    key: 'future',
    title: 'Zukunftsplanung & Nachhaltigkeit',
    description: 'Sichere langfristige Erfolge und kontinuierlichen Fortschritt',
    icon: 'lightbulb',
    date: 'Tag 7',
    features: ['90-Tage-Plan', 'Langfristige Ziele', 'Erfolgs-Tracking'],
    ctaText: 'Zukunft planen',
    ctaUrl: '#zukunft',
    status: 'Nachhaltig',
    statusVariant: 'success'
  }
])

const weekSchedule = computed((): ScheduleDay[] => [
  {
    day: 'Montag',
    focus: 'Kickoff & Zielsetzung',
    activities: ['Begrüßung', 'Zielsetzung', 'Kennenlernen']
  },
  {
    day: 'Dienstag',
    focus: 'Routine-Building',
    activities: ['Morgenroutine', 'Habit-Stacking', 'Tracking']
  },
  {
    day: 'Mittwoch',
    focus: 'Wissenstransfer',
    activities: ['Expertentalks', 'Q&A', 'Best Practices']
  },
  {
    day: 'Donnerstag',
    focus: 'Herausforderungen',
    activities: ['Challenges', 'Grenzen testen', 'Erfolgserlebnisse']
  },
  {
    day: 'Freitag',
    focus: 'Community Power',
    activities: ['Teamwork', 'Buddy-System', 'Gemeinsame Erfolge']
  },
  {
    day: 'Samstag',
    focus: 'Reflektion',
    activities: ['Progress-Review', 'Anpassungen', 'Optimierung']
  },
  {
    day: 'Sonntag',
    focus: 'Celebration',
    activities: ['Erfolge feiern', 'Zukunftsplanung', 'Abschluss']
  }
])

// Methods
const handleDayClick = (day: TimelineItem, index: number) => {
  emit('dayClick', day, index)
}
</script>

<style scoped>
.level-up-week-program {
  position: relative;
}

/* Schedule Day Styling */
.schedule-day {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-normal);
}

.schedule-day:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.schedule-day.active {
  border-color: var(--color-primary);
  background-color: rgba(255, 107, 53, 0.05);
}

.day-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-gray-100);
}

.day-number {
  width: 2rem;
  height: 2rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.schedule-day.active .day-number {
  background-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.day-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

.day-content h4 {
  color: var(--color-primary);
}

/* Custom animations */
@keyframes programSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.program-item {
  animation: programSlideIn 0.6s ease-out forwards;
}

.program-item:nth-child(1) { animation-delay: 0.1s; }
.program-item:nth-child(2) { animation-delay: 0.2s; }
.program-item:nth-child(3) { animation-delay: 0.3s; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .schedule-day {
    text-align: center;
  }

  .day-header {
    justify-content: center;
  }

  .timeline-horizontal {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>