<template>
  <section
    class="py-16 md:py-20 overflow-hidden"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="info"
          class="mb-4"
        />

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          :style="{ color: headlineColor }"
          v-html="headline"
        />

        <p
          class="text-lg md:text-xl max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Story Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">

        <!-- Story Text Side -->
        <div class="space-y-6">
          <div v-if="storyText" class="prose prose-lg max-w-none">
            <p
              class="text-base md:text-lg leading-relaxed"
              :style="{ color: textColor }"
              v-html="storyText"
            />
          </div>

          <!-- Key Highlights -->
          <div v-if="highlights && highlights.length > 0" class="space-y-3">
            <h4 class="text-lg font-semibold" :style="{ color: headlineColor }">
              {{ highlightsTitle }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="highlight in highlights"
                :key="highlight"
                class="flex items-start gap-3"
              >
                <div class="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                <span class="text-base" :style="{ color: textColor }">{{ highlight }}</span>
              </li>
            </ul>
          </div>

          <!-- Story CTA -->
          <div v-if="showStoryCta" class="pt-4">
            <TransformationButton
              :text="storyCtaText"
              :href="storyCtaUrl"
              :variant="storyCtaVariant"
              :external="storyCtaExternal"
              size="md"
            />
          </div>
        </div>

        <!-- Story Visual Side -->
        <div class="relative">
          <div v-if="storyImage" class="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              :src="storyImage"
              :alt="storyImageAlt"
              class="w-full h-auto object-cover"
            />
            <div v-if="imageOverlay" class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <!-- Story Video Option -->
          <div v-else-if="videoUrl" class="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
            <iframe
              :src="videoUrl"
              :title="videoTitle"
              class="w-full h-full"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>

          <!-- Fallback: Company Stats Card -->
          <div v-else class="grid grid-cols-2 gap-4">
            <AboutCard
              variant="elevated"
              size="sm"
              title="Gegründet"
              :subtitle="foundedYear?.toString() || '2015'"
              icon-name="award"
            />
            <AboutCard
              variant="elevated"
              size="sm"
              title="Wachstum"
              subtitle="+200% YoY"
              icon-name="target"
            />
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div v-if="showTimeline" class="mb-16">
        <div class="text-center mb-12">
          <h3
            class="text-2xl md:text-3xl font-bold mb-4"
            :style="{ color: headlineColor }"
          >
            {{ timelineTitle }}
          </h3>
          <p
            class="text-base md:text-lg max-w-2xl mx-auto"
            :style="{ color: subheadlineColor }"
          >
            {{ timelineSubtitle }}
          </p>
        </div>

        <AboutTimeline
          :timeline-items="timelineItems"
          :layout="timelineLayout"
          :card-size="timelineCardSize"
          :show-progress="showTimelineProgress"
          :current-item-index="currentMilestoneIndex"
          :animate-on-scroll="true"
          :stagger-animation="true"
        />
      </div>

      <!-- Achievements Section -->
      <div v-if="showAchievements" class="text-center">
        <h3
          class="text-2xl md:text-3xl font-bold mb-8"
          :style="{ color: headlineColor }"
        >
          {{ achievementsTitle }}
        </h3>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <AboutStatistic
            v-for="achievement in achievements"
            :key="achievement.label"
            :value="achievement.value"
            :label="achievement.label"
            :suffix="achievement.suffix"
            :icon-name="achievement.iconName"
            :variant="achievement.variant || 'primary'"
            size="md"
            :count-up="true"
          />
        </div>
      </div>

      <!-- Final CTA -->
      <div v-if="showFinalCta" class="text-center mt-16">
        <div class="max-w-2xl mx-auto space-y-6">
          <h3
            class="text-2xl md:text-3xl font-bold"
            :style="{ color: headlineColor }"
          >
            {{ finalCtaTitle }}
          </h3>
          <p
            class="text-base md:text-lg"
            :style="{ color: subheadlineColor }"
          >
            {{ finalCtaSubtitle }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <TransformationButton
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
              :external="primaryCtaExternal"
            />
            <TransformationButton
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
interface Achievement {
  label: string
  value: number
  suffix?: string
  iconName?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  variant?: 'default' | 'primary' | 'secondary' | 'gradient' | 'minimal'
}

interface TimelineItem {
  title: string
  subtitle?: string
  description?: string
  year?: number
  date?: string
  image?: string
  imageAlt?: string
  iconName?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  highlights?: string[]
  status?: 'completed' | 'current' | 'upcoming'
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Story Content
  storyText?: string
  highlights?: string[]
  highlightsTitle?: string

  // Visual Content
  storyImage?: string
  storyImageAlt?: string
  imageOverlay?: boolean
  videoUrl?: string
  videoTitle?: string

  // Timeline
  showTimeline?: boolean
  timelineTitle?: string
  timelineSubtitle?: string
  timelineItems?: TimelineItem[]
  timelineLayout?: 'vertical' | 'horizontal'
  timelineCardSize?: 'sm' | 'md' | 'lg'
  showTimelineProgress?: boolean
  currentMilestoneIndex?: number

  // Achievements
  showAchievements?: boolean
  achievementsTitle?: string
  achievements?: Achievement[]

  // CTAs
  showStoryCta?: boolean
  storyCtaText?: string
  storyCtaUrl?: string
  storyCtaVariant?: 'primary' | 'secondary' | 'outline'
  storyCtaExternal?: boolean

  showFinalCta?: boolean
  finalCtaTitle?: string
  finalCtaSubtitle?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean

  // Fallback Data
  foundedYear?: number

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Die <span style="color: #f97316;">Exopek Gym</span> Geschichte',
  subheadline: 'Von der Vision funktionellen Trainings zur führenden Adresse für authentisches Fitness in Hannover-Linden.',
  badgeText: 'Unsere Geschichte',
  showBadge: true,

  storyText: 'Was 2018 als leidenschaftliche Vision für echtes, funktionelles Training begann, ist heute das Exopek Gym - eine Trainingsgemeinschaft, die das Fitness-Erlebnis in Hannover-Linden revolutioniert hat. Unsere Gründer erkannten, dass Menschen mehr brauchen als oberflächliche Workouts - sie brauchen Training, das ihren Körper ganzheitlich stärkt und für das echte Leben vorbereitet.',
  highlights: () => [
    'Funktionelles Training als Kern unserer Philosophie',
    'Persönliche Betreuung durch qualifizierte Trainer',
    'Echte Community statt anonymes Fitnessstudio',
    'Kontinuierliche Weiterentwicklung unserer Trainingsprogramme'
  ],
  highlightsTitle: 'Was uns ausmacht',

  storyImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
  storyImageAlt: 'Funktionelles Training im Exopek Gym Hannover-Linden',
  imageOverlay: false,

  showTimeline: true,
  timelineTitle: 'Unsere Reise',
  timelineSubtitle: 'Von der ersten Idee zur etablierten Trainingsgemeinschaft in Hannover-Linden',
  timelineItems: () => [
    {
      title: 'Die Vision entsteht',
      subtitle: 'Gründung 2018',
      description: 'Zwei Fitness-Enthusiasten mit der Vision, echtes funktionelles Training nach Hannover-Linden zu bringen.',
      year: 2018,
      iconName: 'lightbulb',
      status: 'completed'
    },
    {
      title: 'Erste Mitglieder',
      subtitle: 'Community wächst',
      description: 'Die ersten 50 Mitglieder entdecken die Vorteile von funktionellem Training und werden Teil unserer Familie.',
      year: 2019,
      iconName: 'people',
      status: 'completed'
    },
    {
      title: 'Erweiterung der Ausstattung',
      subtitle: 'Equipment-Upgrade',
      description: 'Investition in hochwertige Trainingsgeräte für noch vielfältigere Workouts.',
      year: 2020,
      iconName: 'target',
      status: 'completed'
    },
    {
      title: 'Trainer-Team erweitert',
      subtitle: 'Expertise vergrößert',
      description: 'Qualifizierte Trainer verstärken unser Team und bieten noch individuellere Betreuung.',
      year: 2022,
      iconName: 'people',
      status: 'completed'
    },
    {
      title: 'Etablierte Trainingsgemeinschaft',
      subtitle: 'Heute',
      description: 'Mit über 800 zufriedenen Mitgliedern sind wir die erste Adresse für funktionelles Training in Hannover-Linden.',
      year: 2024,
      iconName: 'award',
      status: 'current'
    }
  ],
  timelineLayout: 'vertical',
  timelineCardSize: 'md',
  showTimelineProgress: true,
  currentMilestoneIndex: 4,

  showAchievements: true,
  achievementsTitle: 'Das Exopek Gym heute',
  achievements: () => [
    { label: 'Aktive Mitglieder', value: 800, suffix: '+', iconName: 'heart', variant: 'primary' },
    { label: 'Trainingsstunden', value: 5000, suffix: '+', iconName: 'target', variant: 'primary' },
    { label: 'Qualifizierte Trainer', value: 8, iconName: 'people', variant: 'primary' },
    { label: 'Jahre Erfahrung', value: 6, iconName: 'award', variant: 'primary' }
  ],

  showStoryCta: true,
  storyCtaText: 'Unsere Trainer kennenlernen',
  storyCtaUrl: '#team',
  storyCtaVariant: 'outline',
  storyCtaExternal: false,

  showFinalCta: true,
  finalCtaTitle: 'Bereit, Teil unserer Geschichte zu werden?',
  finalCtaSubtitle: 'Starten Sie noch heute Ihre persönliche Fitness-Transformation im Exopek Gym.',
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#probetraining',
  primaryCtaExternal: false,
  secondaryCtaText: 'Kurse entdecken',
  secondaryCtaUrl: '#kurse',
  secondaryCtaExternal: false,

  foundedYear: 2018,

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280',
  textColor: '#374151'
})
</script>

<style scoped>
/* Story-specific animations */
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

/* Apply animations to story sections */
.space-y-6 {
  animation: fadeInLeft 0.8s ease-out;
}

.relative img, .relative iframe {
  animation: fadeInRight 0.8s ease-out;
}

/* Enhanced image hover effects */
.shadow-lg:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-xl);
  transition: all 0.3s ease;
}

/* Prose styling for story text */
.prose p {
  margin-bottom: 1.5rem;
}

.prose p:last-child {
  margin-bottom: 0;
}

/* Highlight list styling */
.flex.items-start.gap-3 {
  animation: fadeInUp 0.6s ease-out;
}

.flex.items-start.gap-3:nth-child(1) { animation-delay: 0.1s; }
.flex.items-start.gap-3:nth-child(2) { animation-delay: 0.2s; }
.flex.items-start.gap-3:nth-child(3) { animation-delay: 0.3s; }
.flex.items-start.gap-3:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Video responsive styling */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Achievements grid animation */
.grid.grid-cols-2 > * {
  animation: fadeInUp 0.8s ease-out;
}

.grid.grid-cols-2 > *:nth-child(1) { animation-delay: 0.1s; }
.grid.grid-cols-2 > *:nth-child(2) { animation-delay: 0.2s; }
.grid.grid-cols-2 > *:nth-child(3) { animation-delay: 0.3s; }
.grid.grid-cols-2 > *:nth-child(4) { animation-delay: 0.4s; }

/* Mobile responsiveness */
@media (max-width: 768px) {
  .prose.prose-lg {
    font-size: 1rem;
    line-height: 1.6;
  }

  .text-3xl {
    font-size: 1.875rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }
}
</style>