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

      <!-- Locations Grid -->
      <div v-if="locations && locations.length > 0" class="mb-16">
        <div
          class="grid gap-8"
          :class="getGridClasses(locations.length)"
        >
          <AboutCard
            v-for="(location, index) in locations"
            :key="index"
            variant="location"
            :size="cardSize"
            :title="location.name"
            :description="location.description"
            :image="location.image"
            :image-alt="`${location.name} - Gym Innenansicht`"
            image-style="landscape"
            :cta-text="location.ctaText || 'Probetraining buchen'"
            :cta-url="location.ctaUrl || '#probetraining'"
            :cta-external="location.ctaExternal || false"
            :hover-effect="true"
            class="location-card"
          >
            <!-- Contact Information -->
            <div class="space-y-2 text-sm text-gray-600 pb-4">
              <div v-if="location.address" class="flex items-start gap-2">
                <AboutIcon name="location" variant="neutral" size="sm" />
                <span>{{ location.address }}</span>
              </div>
              <div v-if="location.phone" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>{{ location.phone }}</span>
              </div>
              <div v-if="location.email" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>{{ location.email }}</span>
              </div>

              <!-- Opening Hours -->
              <div v-if="location.hours" class="mt-3">
                <h5 class="font-medium text-gray-700 mb-1">Öffnungszeiten:</h5>
                <div class="text-xs space-y-1">
                  <div v-for="hour in location.hours" :key="hour.day" class="flex justify-between">
                    <span>{{ hour.day }}:</span>
                    <span>{{ hour.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </AboutCard>
        </div>
      </div>

      <!-- Map Section -->
      <div v-if="showMap" class="mb-16">
        <div class="text-center mb-8">
          <h3
            class="text-2xl md:text-3xl font-bold"
            :style="{ color: headlineColor }"
          >
            {{ mapTitle }}
          </h3>
        </div>

        <div class="relative rounded-2xl overflow-hidden shadow-lg bg-gray-200" style="aspect-ratio: 16/9;">
          <!-- Embedded Map HTML -->
          <div v-if="mapEmbedHtml && mapEmbedHtml.trim() !== ''" v-html="mapEmbedHtml" class="w-full h-full"></div>

          <!-- Placeholder for map -->
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <div class="text-center space-y-2">
              <AboutIcon name="location" variant="neutral" size="lg" />
              <p class="text-gray-500">{{ mapPlaceholderText }}</p>
              <p class="text-xs text-gray-400">Google Maps Integration verfügbar</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div v-if="showContactCta" class="text-center">
        <div class="max-w-2xl mx-auto space-y-6">
          <h3
            class="text-2xl md:text-3xl font-bold"
            :style="{ color: headlineColor }"
          >
            {{ contactCtaTitle }}
          </h3>
          <p
            class="text-base md:text-lg"
            :style="{ color: subheadlineColor }"
          >
            {{ contactCtaSubtitle }}
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
interface LocationHour {
  day: string
  time: string
}

interface Location {
  name: string
  description?: string
  image?: string
  address?: string
  phone?: string
  email?: string
  hours?: LocationHour[]
  ctaText?: string
  ctaUrl?: string
  ctaExternal?: boolean
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Locations
  locations?: Location[]
  cardSize?: 'sm' | 'md' | 'lg'

  // Map
  showMap?: boolean
  mapTitle?: string
  mapPlaceholderText?: string
  mapEmbedHtml?: string

  // Contact CTA
  showContactCta?: boolean
  contactCtaTitle?: string
  contactCtaSubtitle?: string
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
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Unser <span style="color: #f97316;">Standort</span> in Hannover-Linden',
  subheadline: 'Mitten im Herzen von Linden finden Sie unser Gym - perfekt erreichbar und mit allem ausgestattet, was Sie für funktionelles Training brauchen.',
  badgeText: 'Standort',
  showBadge: true,

  locations: () => [
    {
      name: 'Exopek Gym Hannover-Linden',
      description: 'Unser modernes Functional Training Studio im Herzen von Hannover-Linden. Hier findest du alles für effektives, funktionelles Training in kleinen Gruppen.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
      address: 'Musterstraße 123\n30451 Hannover-Linden\nDeutschland',
      phone: '+49 511 123 456 78',
      email: 'info@exopek-gym.de',
      hours: [
        { day: 'Montag - Freitag', time: '6:00 - 22:00' },
        { day: 'Samstag', time: '8:00 - 20:00' },
        { day: 'Sonntag', time: '10:00 - 18:00' }
      ],
      ctaText: 'Probetraining buchen',
      ctaUrl: '#probetraining',
      ctaExternal: false
    }
  ],
  cardSize: 'md',

  showMap: true,
  mapTitle: 'So finden Sie uns',
  mapPlaceholderText: 'Karte von Hannover-Linden hier einfügen',
  mapEmbedHtml: '',

  showContactCta: true,
  contactCtaTitle: 'Besuchen Sie uns im Exopek Gym',
  contactCtaSubtitle: 'Schauen Sie vorbei, lernen Sie unser Team kennen und überzeugen Sie sich selbst von unserem Trainingskonzept.',
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#probetraining',
  primaryCtaExternal: false,
  secondaryCtaText: 'Anfahrt planen',
  secondaryCtaUrl: 'https://maps.google.com/maps?q=Limmerstra%C3%9Fe+42+30451+Hannover',
  secondaryCtaExternal: true,

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280',
  textColor: '#374151'
})

// Helper function for responsive grid classes
const getGridClasses = (locationCount: number): string => {
  if (locationCount === 1) return 'grid-cols-1 max-w-2xl mx-auto'
  if (locationCount === 2) return 'grid-cols-1 lg:grid-cols-2'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
}
</script>

<style scoped>
.location-card {
  animation: fadeInUp 0.8s ease-out;
}

.location-card:nth-child(1) { animation-delay: 0.1s; }
.location-card:nth-child(2) { animation-delay: 0.2s; }
.location-card:nth-child(3) { animation-delay: 0.3s; }
.location-card:nth-child(4) { animation-delay: 0.4s; }

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

/* Map placeholder styling */
.bg-gray-200 {
  background-image: linear-gradient(45deg, #f3f4f6 25%, transparent 25%),
                    linear-gradient(-45deg, #f3f4f6 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #f3f4f6 75%),
                    linear-gradient(-45deg, transparent 75%, #f3f4f6 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
</style>