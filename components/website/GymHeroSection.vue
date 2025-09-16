<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center">
    <div class="absolute inset-0 bg-black/20"></div>
    <div
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>

    <div class="relative z-10 container mx-auto px-6 py-12 text-center">
      <div class="max-w-4xl mx-auto">
        <div v-if="badge" class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
          {{ badge }}
        </div>

        <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
          <span v-if="titleHighlight" class="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
            {{ titleHighlight }}
          </span>
          {{ title }}
        </h1>

        <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed mx-auto">
          {{ subtitle }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <button
            v-if="primaryCta"
            class="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {{ primaryCta }}
          </button>

          <button
            v-if="secondaryCta"
            class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            {{ secondaryCta }}
          </button>
        </div>

        <div v-if="features?.length" class="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-center gap-3 text-white"
          >
            <div class="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="font-medium">{{ feature }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  titleHighlight?: string
  subtitle?: string
  badge?: string
  backgroundImage?: string
  primaryCta?: string
  secondaryCta?: string
  features?: string[]
}

withDefaults(defineProps<Props>(), {
  title: 'Funktionelles Training für echte Ergebnisse',
  titleHighlight: 'POWER UP',
  subtitle: 'Erreiche deine Fitnessziele mit unserem professionellen Gruppentraining. Kraft, Ausdauer und Beweglichkeit in einer perfekten Kombination.',
  badge: '🔥 Jetzt kostenloses Probetraining',
  primaryCta: 'Jetzt starten',
  secondaryCta: 'Mehr erfahren',
  features: [
    'Kleine Gruppen (max. 12 Personen)',
    'Erfahrene Trainer',
    'Modernste Ausstattung'
  ]
})
</script>