<template>
  <section class="level-up-week-benefits py-16 md:py-20" :style="{ backgroundColor }">
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

      <!-- Main Benefits Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <BaseEventCard
          v-for="(benefit, index) in benefitsData"
          :key="benefit.key || index"
          :title="benefit.title"
          :description="benefit.description"
          :icon="benefit.icon"
          :badge="benefit.badge"
          :features="benefit.features"
          :variant="benefit.variant || 'elevated'"
          :size="benefitCardSize"
          :hover-effect="true"
          class="benefit-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        />
      </div>

      <!-- Impact Metrics -->
      <div v-if="showMetrics" class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold" :style="{ color: headlineColor }">
            {{ metricsTitle }}
          </h3>
          <p class="text-gray-600 mt-2">{{ metricsSubtitle }}</p>
        </div>
        <BaseStatisticGrid
          :statistics="impactMetrics"
          grid-type="auto"
          gap="lg"
          max-width="xl"
          default-size="lg"
          default-variant="highlight"
          :default-count-up="true"
          animation="stagger"
          container-class="mx-auto"
        />
      </div>

      <!-- Community Impact Section -->
      <div v-if="showCommunityImpact" class="mb-16">
        <div class="bg-gradient-warm rounded-2xl p-8 md:p-12 text-white">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-2xl md:text-3xl font-bold mb-6">{{ communityImpactTitle }}</h3>
              <p class="text-lg mb-8 opacity-90">{{ communityImpactDescription }}</p>
              <div class="grid md:grid-cols-2 gap-6">
                <div
                  v-for="(impact, index) in communityImpacts"
                  :key="impact.key || index"
                  class="community-impact-item"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <component :is="iconComponent" :name="impact.icon" class="w-4 h-4" />
                    </div>
                    <h4 class="font-semibold">{{ impact.title }}</h4>
                  </div>
                  <p class="text-sm opacity-90">{{ impact.description }}</p>
                </div>
              </div>
            </div>
            <div class="lg:text-center">
              <div class="inline-block bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div class="text-4xl md:text-5xl font-bold mb-2">{{ communitySize }}+</div>
                <div class="text-lg opacity-90">Aktive Community-Mitglieder</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Before vs After Comparison -->
      <div v-if="showComparison" class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold" :style="{ color: headlineColor }">
            {{ comparisonTitle }}
          </h3>
          <p class="text-gray-600 mt-2">{{ comparisonSubtitle }}</p>
        </div>
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Before -->
          <BaseEventCard
            :title="beforeTitle"
            :description="beforeDescription"
            variant="default"
            size="lg"
            icon="shield"
            badge="Vorher"
            :features="beforePoints"
          />
          <!-- After -->
          <BaseEventCard
            :title="afterTitle"
            :description="afterDescription"
            variant="featured"
            size="lg"
            icon="award"
            badge="Nachher"
            :features="afterPoints"
          />
        </div>
      </div>

      <!-- Success Stories Preview -->
      <div v-if="showSuccessPreview" class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold" :style="{ color: headlineColor }">
            {{ successPreviewTitle }}
          </h3>
          <p class="text-gray-600 mt-2">{{ successPreviewSubtitle }}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <BaseEventCard
            v-for="(story, index) in successStories"
            :key="story.key || index"
            :title="story.title"
            :description="story.description"
            :badge="story.badge"
            variant="glass"
            size="md"
            :features="story.features"
          />
        </div>
      </div>

      <!-- Call to Action -->
      <BaseCTA
        v-if="showCta"
        :title="ctaTitle"
        :description="ctaDescription"
        :primary-text="primaryCtaText"
        :primary-url="primaryCtaUrl"
        :primary-external="primaryCtaExternal"
        :secondary-text="secondaryCtaText"
        :secondary-url="secondaryCtaUrl"
        :secondary-external="secondaryCtaExternal"
        :title-color="headlineColor"
        :description-color="subheadlineColor"
        variant="default"
        size="md"
        alignment="center"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Benefit {
  key?: string
  title: string
  description: string
  icon?: string
  badge?: string
  features?: string[]
  variant?: 'default' | 'featured' | 'elevated' | 'glass' | 'gradient'
}

interface CommunityImpact {
  key?: string
  title: string
  description: string
  icon?: string
}

interface SuccessStory {
  key?: string
  title: string
  description: string
  badge?: string
  features?: string[]
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Benefits
  benefitCardSize?: 'sm' | 'md' | 'lg'

  // Metrics
  showMetrics?: boolean
  metricsTitle?: string
  metricsSubtitle?: string

  // Community Impact
  showCommunityImpact?: boolean
  communityImpactTitle?: string
  communityImpactDescription?: string
  communitySize?: number
  iconComponent?: string

  // Before/After Comparison
  showComparison?: boolean
  comparisonTitle?: string
  comparisonSubtitle?: string
  beforeTitle?: string
  beforeDescription?: string
  beforePoints?: string[]
  afterTitle?: string
  afterDescription?: string
  afterPoints?: string[]

  // Success Stories Preview
  showSuccessPreview?: boolean
  successPreviewTitle?: string
  successPreviewSubtitle?: string

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
  headline: 'Was die <span style="color: #ff6b35;">Level Up Week</span> dir bringt',
  subheadline: 'Eine Woche, die dein Leben verändert. Erlebe intensive Workshops, baue neue Routinen auf und gewinne wertvolles Wissen – gemeinsam mit einer starken Community.',
  badgeText: 'Deine Vorteile',
  showBadge: true,

  benefitCardSize: 'md',

  showMetrics: true,
  metricsTitle: 'Messbare Ergebnisse nach nur einer Woche',
  metricsSubtitle: 'Das erreichen unsere Teilnehmer durchschnittlich',

  showCommunityImpact: true,
  communityImpactTitle: 'Die Kraft der Community',
  communityImpactDescription: 'Gemeinsam erreichen wir mehr. Die Level Up Week verbindet dich mit Gleichgesinnten und schafft langfristige Verbindungen.',
  communitySize: 500,
  iconComponent: 'Icon',

  showComparison: true,
  comparisonTitle: 'Deine Transformation in einer Woche',
  comparisonSubtitle: 'So veränderst du dich während der Level Up Week',
  beforeTitle: 'Ausgangssituation',
  beforeDescription: 'Wo du stehst, bevor die Level Up Week beginnt',
  beforePoints: () => ['Unklare Ziele', 'Fehlende Routinen', 'Mangelnde Motivation', 'Alleine kämpfen'],
  afterTitle: 'Nach der Level Up Week',
  afterDescription: 'Was du nach einer intensiven Woche erreicht hast',
  afterPoints: () => ['Klare Zielsetzung', 'Etablierte Routinen', 'Hohe Motivation', 'Starke Community'],

  showSuccessPreview: true,
  successPreviewTitle: 'Was andere erreicht haben',
  successPreviewSubtitle: 'Echte Ergebnisse von echten Teilnehmern',

  showCta: true,
  ctaTitle: 'Bereit für deine eigene Transformation?',
  ctaDescription: 'Sichere dir deinen Platz für die nächste Level Up Week und erlebe, was in einer intensiven Woche möglich ist.',
  primaryCtaText: 'Zur Level Up Week anmelden',
  primaryCtaUrl: '#anmeldung',
  primaryCtaExternal: false,
  secondaryCtaText: 'Kostenlose Beratung',
  secondaryCtaUrl: '#beratung',
  secondaryCtaExternal: false,

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

// Computed Properties
const benefitsData = computed((): Benefit[] => [
  {
    key: 'community',
    title: 'Starke Community-Verbindung',
    description: 'Knüpfe Kontakte zu Gleichgesinnten und finde langfristige Accountability-Partner',
    icon: 'people',
    badge: 'Community',
    features: ['Gleichgesinnte treffen', 'Langfristige Verbindungen', 'Gegenseitige Unterstützung'],
    variant: 'elevated'
  },
  {
    key: 'workshops',
    title: 'Intensive Workshop-Sessions',
    description: 'Praxisnahe Workshops mit direkter Anwendung und sofortigen Ergebnissen',
    icon: 'lightbulb',
    badge: 'Lernen',
    features: ['14 Workshop-Sessions', 'Praxis-orientiert', 'Sofortige Umsetzung'],
    variant: 'elevated'
  },
  {
    key: 'routines',
    title: 'Nachhaltige Routinen',
    description: 'Entwickle kraftvolle tägliche Gewohnheiten, die dein Leben langfristig verbessern',
    icon: 'target',
    badge: 'Habits',
    features: ['Personalisierte Routinen', 'Wissenschaftlich fundiert', 'Nachhaltig'],
    variant: 'elevated'
  },
  {
    key: 'knowledge',
    title: 'Wertvolles Expertenwissen',
    description: 'Erhalte bewährte Strategien und Methoden von erfahrenen Coaches und Experten',
    icon: 'award',
    badge: 'Expert',
    features: ['Bewährte Methoden', 'Expertenwissen', 'Praxiserprobt'],
    variant: 'elevated'
  },
  {
    key: 'progress',
    title: 'Messbarer Fortschritt',
    description: 'Verfolge deine Entwicklung mit klaren Metriken und sichtbaren Verbesserungen',
    icon: 'shield',
    badge: 'Tracking',
    features: ['Klare Metriken', 'Tägliches Tracking', 'Sichtbare Erfolge'],
    variant: 'elevated'
  },
  {
    key: 'motivation',
    title: 'Langfristige Motivation',
    description: 'Entdecke deine innere Motivation und halte sie auch nach der Woche aufrecht',
    icon: 'heart',
    badge: 'Mindset',
    features: ['Innere Motivation', 'Langfristige Perspektive', 'Nachhaltigkeit'],
    variant: 'elevated'
  }
])

const impactMetrics = computed(() => [
  {
    key: 'routine_establishment',
    value: 94,
    label: 'Etablieren neue Routinen',
    suffix: '%',
    variant: 'highlight',
    iconName: 'target',
    description: 'Teilnehmer mit nachhaltigen Gewohnheiten'
  },
  {
    key: 'motivation_increase',
    value: 87,
    label: 'Motivationssteigerung',
    suffix: '%',
    variant: 'highlight',
    iconName: 'heart',
    description: 'Höhere Motivation nach der Woche'
  },
  {
    key: 'knowledge_gain',
    value: 92,
    label: 'Wissenszuwachs',
    suffix: '%',
    variant: 'highlight',
    iconName: 'lightbulb',
    description: 'Praktisch anwendbares neues Wissen'
  },
  {
    key: 'community_connection',
    value: 89,
    label: 'Community-Verbindung',
    suffix: '%',
    variant: 'highlight',
    iconName: 'people',
    description: 'Langfristige Kontakte geknüpft'
  }
])

const communityImpacts = computed((): CommunityImpact[] => [
  {
    key: 'accountability',
    title: 'Accountability Partners',
    description: 'Finde Gleichgesinnte, die dich langfristig unterstützen',
    icon: 'handshake'
  },
  {
    key: 'motivation',
    title: 'Gegenseitige Motivation',
    description: 'Motiviert euch gegenseitig zu Höchstleistungen',
    icon: 'heart'
  },
  {
    key: 'knowledge',
    title: 'Wissensaustausch',
    description: 'Profitiere von den Erfahrungen anderer Teilnehmer',
    icon: 'lightbulb'
  },
  {
    key: 'challenges',
    title: 'Gemeinsame Challenges',
    description: 'Meistert Herausforderungen als starkes Team',
    icon: 'award'
  }
])

const successStories = computed((): SuccessStory[] => [
  {
    key: 'sarah',
    title: 'Sarah, 28',
    description: 'Hat ihre Morgenroutine komplett umgestellt und fühlt sich energiegeladener denn je',
    badge: '7 Tage',
    features: ['Neue Morgenroutine', '+200% Energie', 'Besserer Schlaf']
  },
  {
    key: 'markus',
    title: 'Markus, 35',
    description: 'Konnte endlich seine Ziele klar definieren und einen konkreten Umsetzungsplan entwickeln',
    badge: '7 Tage',
    features: ['Klare Ziele', 'Umsetzungsplan', '90% fokussierter']
  },
  {
    key: 'julia',
    title: 'Julia, 31',
    description: 'Fand ihre Accountability-Partnerin und hält bis heute alle Gewohnheiten aufrecht',
    badge: '7 Tage',
    features: ['Accountability Partner', 'Nachhaltige Habits', 'Langfristiger Erfolg']
  }
])
</script>

<style scoped>
.level-up-week-benefits {
  position: relative;
}

/* Benefit Card Animations */
.benefit-card {
  opacity: 0;
  animation: benefitSlideIn 0.6s ease-out forwards;
}

@keyframes benefitSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Community Impact Styling */
.community-impact-item {
  transition: all var(--transition-normal);
}

.community-impact-item:hover {
  transform: scale(1.05);
}

/* Enhanced card hover effects */
.benefit-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: var(--shadow-xl);
}

/* Gradient backgrounds for special sections */
.bg-gradient-primary {
  background: var(--gradient-primary);
}

/* Custom styling for comparison cards */
.comparison-before {
  background-color: var(--color-gray-50);
  border: 2px solid var(--color-gray-200);
}

.comparison-after {
  background: var(--gradient-primary);
  color: white;
  border: 0;
}

/* Success story card styling */
.success-story-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .benefit-card {
    margin-bottom: 1.5rem;
  }

  .community-impact-item {
    text-align: center;
  }
}

/* Interactive hover states */
.benefit-card:hover .icon-wrapper {
  transform: scale(1.1);
}

.benefit-card:hover .badge {
  background: var(--color-primary);
  color: white;
}

/* Staggered animation for metrics */
.metric-item {
  animation: metricFadeIn 0.8s ease-out forwards;
}

.metric-item:nth-child(1) { animation-delay: 0.1s; }
.metric-item:nth-child(2) { animation-delay: 0.2s; }
.metric-item:nth-child(3) { animation-delay: 0.3s; }
.metric-item:nth-child(4) { animation-delay: 0.4s; }

@keyframes metricFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA section styling */
.cta-section {
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
  animation: ctaGlow 6s ease-in-out infinite alternate;
}

@keyframes ctaGlow {
  0% { opacity: 0.5; }
  100% { opacity: 0.8; }
}
</style>