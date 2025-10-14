<template>
  <section class="level-up-week-testimonials py-16 md:py-20" :style="{ backgroundColor }">
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

      <!-- Summary Statistics -->
      <div v-if="showSummaryStats" class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold" :style="{ color: headlineColor }">
            {{ summaryStatsTitle }}
          </h3>
          <p class="text-gray-600 mt-2">{{ summaryStatsSubtitle }}</p>
        </div>
        <StatisticGrid
          :statistics="summaryStats"
          grid-type="fixed-4"
          gap="lg"
          max-width="xl"
          default-size="lg"
          default-variant="highlight"
          :default-count-up="true"
          animation="stagger"
          container-class="mx-auto"
        />
      </div>

      <!-- Featured Testimonials -->
      <div v-if="showFeaturedTestimonials" class="mb-16">
        <div class="grid lg:grid-cols-2 gap-8 mb-12">
          <BaseEventCard
            v-for="(testimonial, index) in featuredTestimonials"
            :key="testimonial.key || index"
            :title="testimonial.name"
            :description="testimonial.quote"
            :badge="testimonial.badge"
            :features="testimonial.achievements"
            variant="elevated"
            size="lg"
            class="testimonial-card featured"
          >
            <template #footer>
              <div class="flex items-center gap-4 mt-4">
                <img
                  v-if="testimonial.photo"
                  :src="testimonial.photo"
                  :alt="testimonial.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                  <div class="text-sm text-gray-600">{{ testimonial.title }}</div>
                  <div class="text-xs text-primary">{{ testimonial.event }}</div>
                </div>
              </div>
            </template>
          </BaseEventCard>
        </div>
      </div>

      <!-- Community Testimonials Grid -->
      <div v-if="showCommunityTestimonials" class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold" :style="{ color: headlineColor }">
            {{ communityTestimonialsTitle }}
          </h3>
          <p class="text-gray-600 mt-2">{{ communityTestimonialsSubtitle }}</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BaseEventCard
            v-for="(testimonial, index) in communityTestimonials"
            :key="testimonial.key || index"
            :title="testimonial.name"
            :description="testimonial.quote"
            :badge="testimonial.badge"
            :features="testimonial.highlights"
            variant="glass"
            size="md"
            class="testimonial-card community"
          >
            <template #footer>
              <div class="flex items-center gap-3 mt-4">
                <img
                  v-if="testimonial.photo"
                  :src="testimonial.photo"
                  :alt="testimonial.name"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div class="font-medium text-gray-900">{{ testimonial.name }}</div>
                  <div class="text-sm text-gray-600">{{ testimonial.event }}</div>
                </div>
              </div>
            </template>
          </BaseEventCard>
        </div>
      </div>

      <!-- Progress Highlights -->
      <div v-if="showProgressHighlights" class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold" :style="{ color: headlineColor }">
            {{ progressHighlightsTitle }}
          </h3>
          <p class="text-gray-600 mt-2">{{ progressHighlightsSubtitle }}</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(highlight, index) in progressHighlights"
            :key="highlight.key || index"
            class="progress-highlight-card"
          >
            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <component :is="iconComponent" :name="highlight.icon" class="w-8 h-8 text-primary" />
              </div>
              <div class="text-3xl font-bold text-primary mb-2">{{ highlight.value }}{{ highlight.suffix }}</div>
              <div class="font-semibold text-gray-900 mb-1">{{ highlight.label }}</div>
              <div class="text-sm text-gray-600">{{ highlight.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Before/After Success Stories -->
      <div v-if="showBeforeAfter" class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold" :style="{ color: headlineColor }">
            {{ beforeAfterTitle }}
          </h3>
          <p class="text-gray-600 mt-2">{{ beforeAfterSubtitle }}</p>
        </div>
        <div class="grid lg:grid-cols-2 gap-8">
          <div
            v-for="(story, index) in beforeAfterStories"
            :key="story.key || index"
            class="before-after-story"
          >
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <div class="flex items-center gap-4 mb-6">
                <img
                  :src="story.photo"
                  :alt="story.name"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 class="text-xl font-bold text-gray-900">{{ story.name }}</h4>
                  <p class="text-gray-600">{{ story.title }}</p>
                  <span class="text-sm text-primary font-medium">{{ story.event }}</span>
                </div>
              </div>
              <blockquote class="text-gray-700 mb-6 italic">
                "{{ story.quote }}"
              </blockquote>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="before-section">
                  <h5 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
                    Vorher
                  </h5>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li v-for="point in story.before" :key="point">{{ point }}</li>
                  </ul>
                </div>
                <div class="after-section">
                  <h5 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span class="w-3 h-3 bg-primary rounded-full"></span>
                    Nachher
                  </h5>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li v-for="point in story.after" :key="point">{{ point }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Community Feedback -->
      <div v-if="showCommunityFeedback" class="mb-16">
        <div class="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ communityFeedbackTitle }}</h3>
            <p class="text-lg opacity-90">{{ communityFeedbackDescription }}</p>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="(feedback, index) in communityFeedback"
              :key="feedback.key || index"
              class="community-feedback-item"
            >
              <div class="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div class="text-2xl font-bold mb-2">{{ feedback.value }}{{ feedback.suffix }}</div>
                <div class="font-semibold mb-1">{{ feedback.label }}</div>
                <div class="text-sm opacity-90">{{ feedback.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div v-if="showCta" class="text-center">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h3 class="text-2xl md:text-3xl font-bold mb-4" :style="{ color: headlineColor }">
            {{ ctaTitle }}
          </h3>
          <p class="text-lg mb-8" :style="{ color: subheadlineColor }">
            {{ ctaDescription }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              v-if="primaryCtaText"
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
              :external="primaryCtaExternal"
            />
            <BaseButton
              v-if="secondaryCtaText"
              :text="secondaryCtaText"
              :href="secondaryCtaUrl"
              variant="outline"
              size="lg"
              :external="secondaryCtaExternal"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import StatisticGrid from '~/components/design-system-section-components/StatisticGrid.vue'
interface Testimonial {
  key?: string
  name: string
  title?: string
  quote: string
  photo?: string
  badge?: string
  event?: string
  achievements?: string[]
  highlights?: string[]
}

interface ProgressHighlight {
  key?: string
  icon: string
  value: number
  suffix?: string
  label: string
  description: string
}

interface BeforeAfterStory {
  key?: string
  name: string
  title: string
  quote: string
  photo: string
  event: string
  before: string[]
  after: string[]
}

interface CommunityFeedback {
  key?: string
  value: number
  suffix?: string
  label: string
  description: string
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Summary Statistics
  showSummaryStats?: boolean
  summaryStatsTitle?: string
  summaryStatsSubtitle?: string

  // Featured Testimonials
  showFeaturedTestimonials?: boolean

  // Community Testimonials
  showCommunityTestimonials?: boolean
  communityTestimonialsTitle?: string
  communityTestimonialsSubtitle?: string

  // Progress Highlights
  showProgressHighlights?: boolean
  progressHighlightsTitle?: string
  progressHighlightsSubtitle?: string
  iconComponent?: string

  // Before/After Stories
  showBeforeAfter?: boolean
  beforeAfterTitle?: string
  beforeAfterSubtitle?: string

  // Community Feedback
  showCommunityFeedback?: boolean
  communityFeedbackTitle?: string
  communityFeedbackDescription?: string

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
  headline: 'Echte <span style="color: #ff6b35;">Erfolgsgeschichten</span> aus der Community',
  subheadline: 'Höre direkt von Teilnehmern der Level Up Week, wie eine intensive Woche ihr Leben verändert hat. Diese authentischen Geschichten zeigen, was möglich ist.',
  badgeText: 'Community Stories',
  showBadge: true,

  showSummaryStats: true,
  summaryStatsTitle: 'Community-Erfolge in Zahlen',
  summaryStatsSubtitle: 'Was unsere Teilnehmer gemeinsam erreicht haben',

  showFeaturedTestimonials: true,

  showCommunityTestimonials: true,
  communityTestimonialsTitle: 'Stimmen aus der Community',
  communityTestimonialsSubtitle: 'Was Teilnehmer über ihre Level Up Week sagen',

  showProgressHighlights: true,
  progressHighlightsTitle: 'Durchschnittliche Verbesserungen',
  progressHighlightsSubtitle: 'Das erreichen unsere Teilnehmer in nur 7 Tagen',
  iconComponent: 'Icon',

  showBeforeAfter: true,
  beforeAfterTitle: 'Transformation in 7 Tagen',
  beforeAfterSubtitle: 'Echte Vorher-Nachher Geschichten',

  showCommunityFeedback: true,
  communityFeedbackTitle: 'Die Community spricht für sich',
  communityFeedbackDescription: 'Diese Zahlen zeigen die Kraft einer starken Gemeinschaft',

  showCta: true,
  ctaTitle: 'Schreibe deine eigene Erfolgsgeschichte',
  ctaDescription: 'Werde Teil der nächsten Level Up Week und erlebe, was in einer intensiven Woche möglich ist.',
  primaryCtaText: 'Meine Level Up Week starten',
  primaryCtaUrl: '#anmeldung',
  primaryCtaExternal: false,
  secondaryCtaText: 'Success Stories ansehen',
  secondaryCtaUrl: '#stories',
  secondaryCtaExternal: false,

  backgroundColor: '#f8fafc',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

// Computed Properties
const summaryStats = computed(() => [
  {
    key: 'total_participants',
    value: 2847,
    label: 'Erfolgreiche Teilnehmer',
    suffix: '+',
    variant: 'highlight',
    iconName: 'people',
    description: 'Seit dem ersten Event'
  },
  {
    key: 'satisfaction_rate',
    value: 97,
    label: 'Zufriedenheitsrate',
    suffix: '%',
    variant: 'highlight',
    iconName: 'heart',
    description: 'Würden Level Up Week weiterempfehlen'
  },
  {
    key: 'routine_success',
    value: 94,
    label: 'Etablierte Routinen',
    suffix: '%',
    variant: 'highlight',
    iconName: 'target',
    description: 'Halten ihre neuen Gewohnheiten aufrecht'
  },
  {
    key: 'community_connections',
    value: 89,
    label: 'Community-Verbindungen',
    suffix: '%',
    variant: 'highlight',
    iconName: 'handshake',
    description: 'Haben langfristige Kontakte geknüpft'
  }
])

const featuredTestimonials = computed((): Testimonial[] => [
  {
    key: 'sarah_testimonial',
    name: 'Sarah M.',
    title: 'Marketing Managerin',
    quote: 'Die Level Up Week hat mein Leben komplett verändert. In nur 7 Tagen habe ich mehr über mich gelernt als in den letzten Jahren. Die Community war unglaublich unterstützend.',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b641?w=100&h=100&fit=crop&crop=face',
    badge: 'März 2024',
    event: 'Level Up Week #12',
    achievements: ['Neue Morgenroutine etabliert', '300% mehr Energie', 'Langfristige Accountability-Partnerin gefunden']
  },
  {
    key: 'markus_testimonial',
    name: 'Markus K.',
    title: 'Software Entwickler',
    quote: 'Als Introvertierter war ich skeptisch, aber die Level Up Week hat mir gezeigt, wie kraftvoll eine unterstützende Gemeinschaft sein kann. Ich bin ein neuer Mensch.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    badge: 'Februar 2024',
    event: 'Level Up Week #11',
    achievements: ['Soziale Ängste überwunden', 'Klarheit über Lebensziele', '5 neue Freundschaften geschlossen']
  }
])

const communityTestimonials = computed((): Testimonial[] => [
  {
    key: 'julia_community',
    name: 'Julia R.',
    quote: 'Die 7 Tage waren intensiv, aber so lohnenswert. Ich habe endlich die Routinen gefunden, die wirklich zu mir passen.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    badge: 'Januar 2024',
    event: 'Level Up Week #10',
    highlights: ['Personalisierte Routinen', 'Nachhaltiger Erfolg']
  },
  {
    key: 'tom_community',
    name: 'Tom S.',
    quote: 'Die Workshops waren genau das, was ich brauchte. Praktisch, umsetzbar und mit sofortigen Ergebnissen.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    badge: 'Dezember 2023',
    event: 'Level Up Week #9',
    highlights: ['Praxisnahe Workshops', 'Sofortige Umsetzung']
  },
  {
    key: 'anna_community',
    name: 'Anna L.',
    quote: 'Die Community-Unterstützung war unglaublich. Ich habe Freunde fürs Leben gefunden.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
    badge: 'November 2023',
    event: 'Level Up Week #8',
    highlights: ['Starke Community', 'Langfristige Freundschaften']
  },
  {
    key: 'michael_community',
    name: 'Michael B.',
    quote: 'Endlich habe ich gelernt, wie ich meine Ziele nicht nur setze, sondern auch erreiche.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    badge: 'Oktober 2023',
    event: 'Level Up Week #7',
    highlights: ['Klare Zielsetzung', 'Erfolgreiche Umsetzung']
  },
  {
    key: 'lisa_community',
    name: 'Lisa W.',
    quote: 'Die Mischung aus Workshops, Community und persönlichem Coaching war perfekt.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
    badge: 'September 2023',
    event: 'Level Up Week #6',
    highlights: ['Ganzheitlicher Ansatz', 'Persönliches Coaching']
  },
  {
    key: 'david_community',
    name: 'David F.',
    quote: 'In einer Woche mehr Fortschritt gemacht als in den letzten 6 Monaten alleine.',
    photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop&crop=face',
    badge: 'August 2023',
    event: 'Level Up Week #5',
    highlights: ['Beschleunigter Fortschritt', 'Effektive Methoden']
  }
])

const progressHighlights = computed((): ProgressHighlight[] => [
  {
    key: 'energy_increase',
    icon: 'heart',
    value: 87,
    suffix: '%',
    label: 'Mehr Energie',
    description: 'Durchschnittliche Energiesteigerung'
  },
  {
    key: 'focus_improvement',
    icon: 'target',
    value: 92,
    suffix: '%',
    label: 'Besserer Fokus',
    description: 'Verbesserte Konzentrationsfähigkeit'
  },
  {
    key: 'motivation_boost',
    icon: 'award',
    value: 89,
    suffix: '%',
    label: 'Höhere Motivation',
    description: 'Gesteigerte intrinsische Motivation'
  },
  {
    key: 'life_satisfaction',
    icon: 'lightbulb',
    value: 94,
    suffix: '%',
    label: 'Lebenszufriedenheit',
    description: 'Verbesserte Lebenszufriedenheit'
  }
])

const beforeAfterStories = computed((): BeforeAfterStory[] => [
  {
    key: 'transformation_sarah',
    name: 'Sarah M.',
    title: 'Marketing Managerin, 28',
    quote: 'Die Level Up Week war der Wendepunkt in meinem Leben. Endlich habe ich die Balance gefunden.',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b641?w=100&h=100&fit=crop&crop=face',
    event: 'Level Up Week #12 (März 2024)',
    before: [
      'Chaotische Morgen',
      'Niedrige Energie',
      'Prokrastination',
      'Isolation'
    ],
    after: [
      'Strukturierte Morgenroutine',
      'Hohe Energie den ganzen Tag',
      'Klare Prioritäten',
      'Starkes Support-Netzwerk'
    ]
  },
  {
    key: 'transformation_markus',
    name: 'Markus K.',
    title: 'Software Entwickler, 35',
    quote: 'Als Introvertierter dachte ich nie, dass ich von einer Community profitieren könnte. Ich lag falsch.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    event: 'Level Up Week #11 (Februar 2024)',
    before: [
      'Soziale Isolation',
      'Unklare Ziele',
      'Mangelnde Motivation',
      'Stress und Burnout'
    ],
    after: [
      'Aktive Community-Teilnahme',
      'Kristallklare Lebensziele',
      'Intrinsische Motivation',
      'Work-Life-Balance'
    ]
  }
])

const communityFeedback = computed((): CommunityFeedback[] => [
  {
    key: 'recommendation_rate',
    value: 97,
    suffix: '%',
    label: 'Weiterempfehlungsrate',
    description: 'Würden Level Up Week weiterempfehlen'
  },
  {
    key: 'long_term_connections',
    value: 89,
    suffix: '%',
    label: 'Langfristige Verbindungen',
    description: 'Halten Kontakt nach der Woche'
  },
  {
    key: 'repeat_participants',
    value: 43,
    suffix: '%',
    label: 'Wiederholungsteilnehmer',
    description: 'Nehmen an weiteren Events teil'
  }
])
</script>

<style scoped>
.level-up-week-testimonials {
  position: relative;
}

/* Testimonial Card Animations */
.testimonial-card {
  opacity: 0;
  animation: testimonialSlideIn 0.6s ease-out forwards;
}

.testimonial-card.featured {
  animation-delay: 0.1s;
}

.testimonial-card.community {
  animation-delay: calc(var(--index, 0) * 0.1s);
}

@keyframes testimonialSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Progress Highlight Cards */
.progress-highlight-card {
  opacity: 0;
  animation: progressSlideIn 0.6s ease-out forwards;
}

.progress-highlight-card:nth-child(1) { animation-delay: 0.1s; }
.progress-highlight-card:nth-child(2) { animation-delay: 0.2s; }
.progress-highlight-card:nth-child(3) { animation-delay: 0.3s; }
.progress-highlight-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes progressSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Before/After Story Styling */
.before-after-story {
  opacity: 0;
  animation: storyFadeIn 0.8s ease-out forwards;
}

.before-after-story:nth-child(odd) {
  animation-delay: 0.2s;
}

.before-after-story:nth-child(even) {
  animation-delay: 0.4s;
}

@keyframes storyFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Community Feedback Items */
.community-feedback-item {
  transition: all var(--transition-normal);
}

.community-feedback-item:hover {
  transform: translateY(-5px);
}

/* Enhanced hover effects */
.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.progress-highlight-card:hover {
  transform: translateY(-3px);
}

.progress-highlight-card:hover .w-16 {
  transform: scale(1.1);
  background: var(--color-primary);
}

.progress-highlight-card:hover .text-primary {
  color: white;
}

/* Photo styling */
.testimonial-card img,
.before-after-story img {
  transition: all var(--transition-normal);
}

.testimonial-card:hover img,
.before-after-story:hover img {
  transform: scale(1.05);
}

/* Quote styling */
blockquote {
  position: relative;
  padding-left: 1rem;
  border-left: 4px solid var(--color-primary);
}

blockquote::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  font-size: 3rem;
  color: var(--color-primary);
  opacity: 0.3;
}

/* Before/After lists */
.before-section ul li::before {
  content: '−';
  color: var(--color-gray-400);
  margin-right: 0.5rem;
}

.after-section ul li::before {
  content: '✓';
  color: var(--color-primary);
  margin-right: 0.5rem;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .testimonial-card,
  .progress-highlight-card,
  .before-after-story {
    margin-bottom: 1.5rem;
  }

  .before-after-story .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .featured-testimonials {
    grid-template-columns: 1fr;
  }
}

/* Interactive elements */
.testimonial-card:hover .badge {
  background: var(--color-primary);
  color: white;
}

.community-feedback-item:hover .bg-white\/10 {
  background: rgba(255, 255, 255, 0.2);
}

/* Loading states for images */
.testimonial-card img,
.before-after-story img {
  background: var(--color-gray-200);
}

/* Gradient overlays for visual enhancement */
.bg-gradient-primary {
  background: var(--gradient-primary);
}

/* Custom scrollbar for long content */
.testimonial-card::-webkit-scrollbar {
  width: 4px;
}

.testimonial-card::-webkit-scrollbar-track {
  background: var(--color-gray-100);
}

.testimonial-card::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 2px;
}
</style>