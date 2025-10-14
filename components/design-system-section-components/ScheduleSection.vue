<template>
  <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <p v-if="tagline" class="text-sm md:text-base font-semibold text-orange-600 mb-3 uppercase tracking-wide">
          {{ tagline }}
        </p>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
          {{ headline }}
        </h2>
        <p v-if="subheadline" class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {{ subheadline }}
        </p>
      </div>

      <!-- Schedule Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <div
          v-for="(slot, index) in timeSlots"
          :key="index"
          class="group relative bg-white rounded-2xl p-6 md:p-8 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          :class="slot.featured ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-white' : 'border-gray-200 hover:border-orange-300'"
        >
          <!-- Featured Badge -->
          <div v-if="slot.featured" class="absolute -top-3 left-6">
            <span class="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-lg">
              Beliebt
            </span>
          </div>

          <!-- Day -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg md:text-xl font-bold text-gray-900">
              {{ slot.day }}
            </h3>
            <!-- Clock Icon -->
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <!-- Time -->
          <div class="mb-4">
            <p class="text-3xl md:text-4xl font-black text-gray-900">
              {{ slot.time }}
            </p>
            <p class="text-sm text-gray-500 mt-1">
              {{ slot.duration }}
            </p>
          </div>

          <!-- Course Name -->
          <p class="text-base font-semibold text-gray-700 mb-3">
            {{ slot.courseName }}
          </p>

          <!-- Benefit Tag -->
          <div class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-100 text-orange-700 text-sm font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            {{ slot.benefit }}
          </div>

          <!-- Spots Available (optional) -->
          <div v-if="slot.spotsAvailable" class="mt-4 pt-4 border-t border-gray-200">
            <p class="text-sm text-gray-600">
              <span class="font-semibold text-gray-900">{{ slot.spotsAvailable }}</span> Plätze verfügbar
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div v-if="showCta" class="text-center">
        <Button
          :text="ctaText"
          :href="ctaUrl"
          variant="gradient"
          size="lg"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'
interface TimeSlot {
  day: string
  time: string
  duration: string
  courseName: string
  benefit: string
  featured?: boolean
  spotsAvailable?: number
}

interface Props {
  tagline?: string
  headline?: string
  subheadline?: string
  timeSlots?: TimeSlot[]
  showCta?: boolean
  ctaText?: string
  ctaUrl?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'Dein Trainingsplan',
  headline: 'Morgens trainieren, gestärkt in den Tag',
  subheadline: 'Starte deinen Tag mit Energie und Fokus. Unsere morgendlichen Kurse bringen dich fit und konzentriert zur Arbeit.',
  timeSlots: () => [
    {
      day: 'Montag',
      time: '06:30',
      duration: '45 Minuten',
      courseName: 'EXOPEK Morning Power',
      benefit: 'Perfekt vor der Arbeit',
      featured: true,
      spotsAvailable: 8
    },
    {
      day: 'Mittwoch',
      time: '06:30',
      duration: '45 Minuten',
      courseName: 'Functional HIIT',
      benefit: 'Maximale Effizienz',
      spotsAvailable: 12
    },
    {
      day: 'Freitag',
      time: '06:30',
      duration: '45 Minuten',
      courseName: 'EXOPEK Intensity',
      benefit: 'Starker Wochenabschluss',
      spotsAvailable: 6
    }
  ],
  showCta: true,
  ctaText: 'Jetzt Probetraining buchen',
  ctaUrl: '#kontakt'
})
</script>

<style scoped>
/* Featured card glow effect */
.border-orange-500 {
  box-shadow: 0 4px 20px -5px rgba(249, 115, 22, 0.2);
}

.border-orange-500:hover {
  box-shadow: 0 8px 30px -5px rgba(249, 115, 22, 0.3);
}

/* Smooth transitions */
.group:hover svg {
  animation: iconBounce 0.6s ease-in-out;
}

@keyframes iconBounce {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}
</style>
