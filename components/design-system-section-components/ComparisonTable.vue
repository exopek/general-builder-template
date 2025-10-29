<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div class="text-center mb-8 md:mb-12">
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3 uppercase tracking-wide"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>
        <div
          v-if="showSubheadline && subheadline"
          class="text-base md:text-lg max-w-2xl mx-auto"
          :style="{ color: subheadlineColor }"
          v-html="subheadline"
        ></div>
      </div>

      <!-- Comparison Table -->
      <div class="max-w-5xl mx-auto">
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-hidden rounded-2xl border-2 border-gray-200 shadow-xl">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-4 text-left">
                  <span class="text-lg font-bold text-gray-900" v-html="leftColumnTitle"></span>
                </th>
                <th class="px-6 py-4 text-center bg-gradient-to-br from-orange-500 to-red-600">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-lg font-bold text-white" v-html="rightColumnTitle"></span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in comparisonRows"
                :key="index"
                class="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <p class="font-semibold text-gray-900 mb-1" v-html="row.feature"></p>
                  <p class="text-sm text-gray-600" v-html="row.traditional"></p>
                </td>
                <td class="px-6 py-4 bg-orange-50">
                  <div class="flex items-center justify-center gap-3">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <p class="font-semibold text-gray-900" v-html="row.exopek"></p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden space-y-6">
          <div
            v-for="(row, index) in comparisonRows"
            :key="index"
            class="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg"
          >
            <!-- Feature Title -->
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="font-bold text-gray-900 text-lg" v-html="row.feature"></h3>
            </div>

            <!-- Traditional -->
            <div class="px-6 py-4 border-b border-gray-200">
              <p class="text-sm font-semibold text-gray-500 mb-2" v-html="leftColumnTitle"></p>
              <p class="text-gray-700" v-html="row.traditional"></p>
            </div>

            <!-- EXOPEK -->
            <div class="px-6 py-4 bg-gradient-to-br from-orange-50 to-white">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <p class="text-sm font-semibold text-orange-600" v-html="rightColumnTitle"></p>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p class="font-semibold text-gray-900" v-html="row.exopek"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA (optional) -->
      <div v-if="showCta && ctaText" class="text-center mt-12">
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

interface ComparisonRow {
  feature: string
  traditional: string
  exopek: string
}

interface Props {
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showSubheadline?: boolean
  showCta?: boolean

  // Content (richText)
  tagline?: string
  headline?: string
  subheadline?: string
  leftColumnTitle?: string
  rightColumnTitle?: string
  comparisonRows?: ComparisonRow[]
  ctaText?: string
  ctaUrl?: string

  // Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility Toggles
  showTagline: true,
  showHeadline: true,
  showSubheadline: true,
  showCta: true,

  // Content
  tagline: 'Der Unterschied',
  headline: 'EXOPEK vs. Traditionelles Training',
  subheadline: 'Entdecke, wie EXOPEK dein Training revolutioniert – mehr Effizienz, bessere Ergebnisse, kürzere Trainingszeiten.',
  leftColumnTitle: 'Traditionelles Training',
  rightColumnTitle: 'EXOPEK Training',
  comparisonRows: () => [
    {
      feature: 'Trainingsdauer',
      traditional: '60-90 Minuten',
      exopek: 'Nur 45 Minuten'
    },
    {
      feature: 'Trainingseffektivität',
      traditional: 'Moderate Intensität',
      exopek: 'Maximale Intensität & Effizienz'
    },
    {
      feature: 'Zeitersparnis pro Woche',
      traditional: '0 Minuten',
      exopek: 'Bis zu 135 Minuten gespart'
    },
    {
      feature: 'Ganzkörper-Workout',
      traditional: 'Split-Training (mehrere Tage)',
      exopek: 'Kompletttraining in einer Session'
    },
    {
      feature: 'Konzentration für den Tag',
      traditional: 'Standard Effekt',
      exopek: 'Maximaler Fokus-Boost'
    }
  ],
  ctaText: 'Jetzt EXOPEK testen',
  ctaUrl: '#kontakt',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#ea580c',
  headlineColor: '#111827',
  subheadlineColor: '#4b5563'
})
</script>

<style scoped>
/* Smooth hover effects */
tbody tr {
  transition: background-color 0.2s ease;
}

/* Gradient shine effect */
.bg-gradient-to-br {
  position: relative;
  overflow: hidden;
}

.bg-gradient-to-br::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.bg-gradient-to-br:hover::before {
  left: 100%;
}
</style>
