<template>
  <section class="py-16 md:py-20" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="success"
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

      <!-- Testimonials Slider -->
      <div class="relative max-w-6xl mx-auto mb-12">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                <!-- Before/After Images -->
                <div class="relative">
                  <div class="grid grid-cols-2 gap-4">
                    <!-- Before Image -->
                    <div class="relative">
                      <img
                        :src="testimonial.beforeImage"
                        :alt="`${testimonial.name} vorher`"
                        class="w-full rounded-xl object-cover shadow-lg"
                        style="aspect-ratio: 3/4;"
                      />
                      <TransformationBadge
                        text="Vorher"
                        variant="neutral"
                        size="sm"
                        position="bottom-left"
                      />
                    </div>

                    <!-- After Image -->
                    <div class="relative">
                      <img
                        :src="testimonial.afterImage"
                        :alt="`${testimonial.name} nachher`"
                        class="w-full rounded-xl object-cover shadow-lg"
                        style="aspect-ratio: 3/4;"
                      />
                      <TransformationBadge
                        text="Nachher"
                        variant="success"
                        size="sm"
                        position="bottom-right"
                      />
                    </div>
                  </div>

                  <!-- Results Badge -->
                  <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <TransformationBadge
                      :text="`${testimonial.weightLoss}kg verloren`"
                      variant="new"
                      size="lg"
                      animated
                    />
                  </div>
                </div>

                <!-- Testimonial Content -->
                <div class="space-y-6">

                  <!-- Star Rating -->
                  <div class="flex items-center gap-1">
                    <div
                      v-for="star in 5"
                      :key="star"
                      class="w-5 h-5"
                    >
                      <svg
                        :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <span class="ml-2 text-sm text-gray-600">({{ testimonial.rating }}/5)</span>
                  </div>

                  <!-- Quote -->
                  <blockquote class="text-lg md:text-xl text-gray-800 italic leading-relaxed">
                    "{{ testimonial.quote }}"
                  </blockquote>

                  <!-- Author Info -->
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      {{ testimonial.name.charAt(0) }}
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                      <div class="text-sm text-gray-600">{{ testimonial.details }}</div>
                    </div>
                  </div>

                  <!-- Achievement Stats -->
                  <div class="grid grid-cols-3 gap-4 pt-4">
                    <Statistic
                      :value="testimonial.weightLoss"
                      label="Gewichtsverlust"
                      suffix="kg"
                      variant="highlight"
                      size="sm"
                    />
                    <Statistic
                      :value="testimonial.durationWeeks"
                      label="Dauer"
                      suffix="Wochen"
                      variant="primary"
                      size="sm"
                    />
                    <Statistic
                      :value="testimonial.satisfactionScore"
                      label="Zufriedenheit"
                      suffix="%"
                      variant="success"
                      size="sm"
                    />
                  </div>

                  <!-- Program Highlight -->
                  <div v-if="testimonial.programHighlight" class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-start gap-3">
                      <TransformationIcon
                        emoji="🎯"
                        variant="primary"
                        size="sm"
                      />
                      <div>
                        <div class="font-medium text-gray-900 mb-1">{{ testimonial.programHighlight.title }}</div>
                        <div class="text-sm text-gray-600">{{ testimonial.programHighlight.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-center items-center gap-4 mt-8">
          <!-- Previous Button -->
          <TransformationButton
            text="‹"
            variant="ghost"
            size="sm"
            :disabled="currentSlide === 0"
            @click="previousSlide"
            class="w-10 h-10 rounded-full p-0"
          />

          <!-- Dots Indicator -->
          <div class="flex gap-2">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              ]"
            ></button>
          </div>

          <!-- Next Button -->
          <TransformationButton
            text="›"
            variant="ghost"
            size="sm"
            :disabled="currentSlide === testimonials.length - 1"
            @click="nextSlide"
            class="w-10 h-10 rounded-full p-0"
          />
        </div>
      </div>

      <!-- Summary Stats -->
      <div v-if="showSummaryStats" class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">{{ summaryStatsHeadline }}</h3>

        <StatisticGrid
          :statistics="summaryStatsData"
          grid-type="fixed-4"
          gap="md"
          default-size="md"
          :default-animated="true"
          animation="stagger"
        />
      </div>

      <!-- CTA Section -->
      <div v-if="showCta" class="text-center mt-12 lg:mt-16">
        <div class="max-w-2xl mx-auto space-y-6">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900">{{ ctaHeadline }}</h3>
          <p class="text-lg text-gray-600">{{ ctaDescription }}</p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
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
  </section>
</template>

<script setup lang="ts">
import Statistic from '~/components/design-system-section-components/Statistic.vue'
import StatisticGrid from '~/components/design-system-section-components/StatisticGrid.vue'
interface Testimonial {
  name: string
  details: string
  quote: string
  rating: number
  beforeImage: string
  afterImage: string
  weightLoss: number
  durationWeeks: number
  satisfactionScore: number
  programHighlight?: {
    title: string
    description: string
  }
}

interface SummaryStats {
  totalParticipants: number
  averageRating: number
  averageWeightLoss: number
  recommendationRate: number
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Testimonials
  testimonials?: Testimonial[]

  // Summary Stats
  showSummaryStats?: boolean
  summaryStatsHeadline?: string
  summaryStats?: SummaryStats

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
  headline: 'Echte Erfolgsgeschichten unserer Teilnehmer',
  subheadline: 'Überzeuge dich selbst von den beeindruckenden Transformationen. Diese Ergebnisse sprechen für sich und können auch deine Realität werden.',
  badgeText: 'Verifizierte Erfolge',
  showBadge: true,

  testimonials: () => [
    {
      name: 'Sarah Mueller',
      details: '29 Jahre, Bürokauffrau aus München',
      quote: 'Ich hatte schon so viele Diäten probiert, aber nie langfristige Erfolge erzielt. Das 7-Wochen Programm hat mein Leben verändert. Nicht nur körperlich, sondern auch mental bin ich viel stärker geworden.',
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1494790108755-2616c20e2a7c?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=center',
      weightLoss: 12,
      durationWeeks: 7,
      satisfactionScore: 98,
      programHighlight: {
        title: 'Ernährungsumstellung ohne Verzicht',
        description: 'Sarah lernte, wie sie ihre Lieblingsspeisen gesund zubereiten kann'
      }
    },
    {
      name: 'Michael Weber',
      details: '35 Jahre, Ingenieur aus Hamburg',
      quote: 'Als Vater von zwei Kindern dachte ich, ich hätte keine Zeit für Fitness. Das Programm hat mir gezeigt, wie ich auch mit wenig Zeit maximale Ergebnisse erzielen kann.',
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=400&fit=crop&crop=center',
      weightLoss: 8,
      durationWeeks: 7,
      satisfactionScore: 95,
      programHighlight: {
        title: 'Zeitsparende Workouts für Berufstätige',
        description: 'Effektive 30-Minuten Sessions, die perfekt in den Alltag passen'
      }
    },
    {
      name: 'Lisa Schneider',
      details: '26 Jahre, Lehrerin aus Berlin',
      quote: 'Die Community und das Support-Team waren unglaublich. Jeden Tag wurde ich motiviert und hatte das Gefühl, nicht alleine zu sein. Die Ergebnisse sprechen für sich.',
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=400&fit=crop&crop=center',
      weightLoss: 10,
      durationWeeks: 7,
      satisfactionScore: 100,
      programHighlight: {
        title: 'Mentale Stärke durch Community',
        description: 'Tägliche Motivation und Austausch mit Gleichgesinnten'
      }
    }
  ],

  showSummaryStats: true,
  summaryStatsHeadline: 'Diese Erfolge sprechen für sich',
  summaryStats: () => ({
    totalParticipants: 2847,
    averageRating: 4.8,
    averageWeightLoss: 8.2,
    recommendationRate: 96
  }),

  showCta: true,
  ctaHeadline: 'Deine Erfolgsgeschichte beginnt jetzt',
  ctaDescription: 'Schließe dich über 2.800 erfolgreichen Teilnehmern an und schreibe deine eigene Transformation.',
  primaryCtaText: 'Meine Transformation starten',
  primaryCtaUrl: '#anmeldung',
  secondaryCtaText: 'Erfolgsgeschichten entdecken',
  secondaryCtaUrl: '#galerie',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

const currentSlide = ref(0)

const nextSlide = () => {
  if (currentSlide.value < props.testimonials.length - 1) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Auto-slide functionality
let autoSlideInterval: NodeJS.Timeout | null = null

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    if (currentSlide.value === props.testimonials.length - 1) {
      currentSlide.value = 0
    } else {
      nextSlide()
    }
  }, 8000) // Change slide every 8 seconds
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
/* Star rating animation */
.w-5.h-5 svg {
  transition: color 0.2s ease;
}

/* Slide animation enhancement */
.overflow-hidden {
  border-radius: 1rem;
}

/* Custom button styling for navigation */
.w-10.h-10 {
  min-width: 2.5rem;
  min-height: 2.5rem;
}

/* Smooth hover transitions */
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Dot indicator hover effect */
.w-3.h-3:hover {
  transform: scale(1.2);
}
</style>