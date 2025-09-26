<template>
  <section
    class="flex items-center py-16 md:py-20 overflow-hidden relative"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- Content Side -->
        <div class="space-y-8 text-center lg:text-left relative z-10">

          <!-- Badge -->
          <TransformationBadge
            v-if="showBadge"
            :text="badgeText"
            :variant="badgeVariant"
            class="mx-auto lg:mx-0"
            animated
          />

          <!-- Main Headline -->
          <div class="space-y-4">
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
              :style="{ color: headlineColor }"
              v-html="headline"
            ></h1>

            <p
              class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
              :style="{ color: subheadlineColor }"
            >
              {{ subheadline }}
            </p>
          </div>

          <!-- Company Stats/Trust Indicators -->
          <div v-if="showStats" class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
            <AboutStatistic
              v-if="foundedYear"
              :value="new Date().getFullYear() - foundedYear"
              label="Jahre Erfahrung"
              suffix="+"
              variant="minimal"
              size="sm"
              :count-up="true"
            />
            <AboutStatistic
              v-if="clientsServed"
              :value="clientsServed"
              label="Aktive Mitglieder"
              suffix="+"
              variant="minimal"
              size="sm"
              :count-up="true"
            />
            <AboutStatistic
              v-if="projectsCompleted"
              :value="projectsCompleted"
              label="Trainingsstunden"
              suffix="+"
              variant="minimal"
              size="sm"
              :count-up="true"
            />
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <TransformationButton
              v-if="primaryCtaText"
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
              class="w-full sm:w-auto"
              :external="primaryCtaExternal"
            />

            <TransformationButton
              v-if="secondaryCtaText"
              :text="secondaryCtaText"
              :href="secondaryCtaUrl"
              variant="outline"
              size="lg"
              class="w-full sm:w-auto"
              :external="secondaryCtaExternal"
            />
          </div>

          <!-- Trust Indicators -->
          <div v-if="showTrustIndicators" class="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
            <div v-for="indicator in trustIndicators" :key="indicator" class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ indicator }}
            </div>
          </div>
        </div>

        <!-- Visual Side -->
        <div class="relative flex items-center justify-center">
          <div class="relative max-w-md lg:max-w-lg w-full">

            <!-- Main Hero Image -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                :src="heroImage"
                :alt="heroImageAlt"
                class="w-full h-auto object-cover"
                style="aspect-ratio: 4/5;"
              />

              <!-- Image overlay for better text contrast -->
              <div v-if="imageOverlay" class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <!-- Overlay Badge -->
              <TransformationBadge
                v-if="showImageBadge"
                :text="imageBadgeText"
                variant="new"
                size="lg"
                position="top-right"
                animated
              />
            </div>

            <!-- Floating Company Info Cards -->
            <div v-if="showFloatingCards" class="absolute -top-4 -left-4 lg:-left-8">
              <AboutCard
                variant="glass"
                size="sm"
                class="backdrop-blur-lg max-w-48"
              >
                <div class="flex items-center gap-3">
                  <AboutIcon
                    name="award"
                    variant="primary"
                    size="sm"
                  />
                  <div>
                    <div class="font-semibold text-white">{{ floatingCard1Title }}</div>
                    <div class="text-sm text-white/80">{{ floatingCard1Text }}</div>
                  </div>
                </div>
              </AboutCard>
            </div>

            <div v-if="showFloatingCards" class="absolute -bottom-4 -right-4 lg:-right-8">
              <AboutCard
                variant="glass"
                size="sm"
                class="backdrop-blur-lg max-w-48"
              >
                <div class="flex items-center gap-3">
                  <AboutIcon
                    name="people"
                    variant="success"
                    size="sm"
                  />
                  <div>
                    <div class="font-semibold text-white">{{ floatingCard2Title }}</div>
                    <div class="text-sm text-white/80">{{ floatingCard2Text }}</div>
                  </div>
                </div>
              </AboutCard>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited'
  showBadge?: boolean

  // CTAs
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean

  // Visual
  heroImage?: string
  heroImageAlt?: string
  imageOverlay?: boolean
  showImageBadge?: boolean
  imageBadgeText?: string

  // Floating Cards
  showFloatingCards?: boolean
  floatingCard1Title?: string
  floatingCard1Text?: string
  floatingCard2Title?: string
  floatingCard2Text?: string

  // Company Stats
  showStats?: boolean
  foundedYear?: number
  clientsServed?: number
  projectsCompleted?: number

  // Trust Indicators
  showTrustIndicators?: boolean
  trustIndicators?: string[]

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Hi, wir sind <span style="color: #f97316;">Tom & Lisa</span><br>und unser Trainer-Team',
  subheadline: 'Wir haben das Exopek Gym gegründet, weil wir an Training glauben, das wirklich etwas verändert. Persönlich, authentisch und immer mit dem Fokus darauf, dich stärker zu machen.',
  badgeText: 'Über uns',
  badgeVariant: 'featured',
  showBadge: true,

  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#probetraining',
  primaryCtaExternal: false,
  secondaryCtaText: 'Kurse entdecken',
  secondaryCtaUrl: '#kurse',
  secondaryCtaExternal: false,

  heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center',
  heroImageAlt: 'Funktionelles Training im Exopek Gym',
  imageOverlay: false,
  showImageBadge: true,
  imageBadgeText: 'Functional Fitness',

  showFloatingCards: true,
  floatingCard1Title: 'Tom & Lisa',
  floatingCard1Text: 'Gründer & Head Trainer',
  floatingCard2Title: 'Unser Team',
  floatingCard2Text: '8 leidenschaftliche Trainer',

  showStats: true,
  foundedYear: 2018,
  clientsServed: 800,
  projectsCompleted: 5000,

  showTrustIndicators: true,
  trustIndicators: () => [
    'Persönliche Betreuung durch unser Team',
    'Wir kennen jeden beim Namen',
    'Familie statt anonymes Gym'
  ],

  backgroundColor: '#0f0f0f',
  headlineColor: '#ffffff',
  subheadlineColor: '#d1d5db'
})
</script>

<style scoped>
/* Custom gradient animations */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Floating animation for cards */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.absolute .backdrop-blur-lg {
  animation: float 6s ease-in-out infinite;
}

.absolute:nth-child(2) .backdrop-blur-lg {
  animation-delay: -3s;
}

/* Enhanced hero image hover effect */
.shadow-2xl:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

/* Trust indicator animations */
.flex.items-center.gap-2 {
  animation: fadeInUp 0.6s ease-out;
}

.flex.items-center.gap-2:nth-child(1) { animation-delay: 0.1s; }
.flex.items-center.gap-2:nth-child(2) { animation-delay: 0.2s; }
.flex.items-center.gap-2:nth-child(3) { animation-delay: 0.3s; }

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

/* Responsive adjustments */
@media (max-width: 768px) {
  .max-w-48 {
    max-width: 10rem;
  }

  .text-6xl {
    font-size: 3rem;
  }

  .text-5xl {
    font-size: 2.5rem;
  }
}
</style>