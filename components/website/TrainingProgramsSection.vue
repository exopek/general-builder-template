<template>
  <section class="py-20 bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
          {{ sectionTitle }}
        </h2>
        <p class="text-xl text-gray-200 max-w-3xl mx-auto">
          {{ sectionSubtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(program, index) in programs"
          :key="index"
          class="group relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gray-800/80 transition-all duration-300 overflow-hidden"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              v-if="program.image"
              :src="program.image"
              :alt="program.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div v-if="program.badge" class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                {{ program.badge }}
              </span>
            </div>

            <div v-if="program.difficulty" class="absolute top-4 right-4">
              <div class="flex gap-1">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="w-2 h-2 rounded-full"
                  :class="i <= program.difficulty ? 'bg-orange-400' : 'bg-white/30'"
                ></div>
              </div>
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-2xl font-bold text-white mb-2">
              {{ program.title }}
            </h3>
            <p class="text-gray-200 mb-4 leading-relaxed">
              {{ program.description }}
            </p>

            <div v-if="program.features?.length" class="space-y-2 mb-6">
              <div
                v-for="(feature, featureIndex) in program.features"
                :key="featureIndex"
                class="flex items-center gap-2 text-sm text-gray-200"
              >
                <svg class="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div v-if="program.duration || program.groupSize" class="text-sm text-gray-300">
                <div v-if="program.duration" class="flex items-center gap-1 mb-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ program.duration }}
                </div>
                <div v-if="program.groupSize" class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {{ program.groupSize }}
                </div>
              </div>

              <button class="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                {{ program.ctaText || 'Mehr erfahren' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showViewAll" class="text-center mt-12">
        <button class="px-8 py-4 bg-gray-800/60 backdrop-blur-sm border-2 border-orange-500 text-orange-400 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300">
          {{ viewAllText }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TrainingProgram {
  title: string
  description: string
  image?: string
  badge?: string
  difficulty?: number
  duration?: string
  groupSize?: string
  features?: string[]
  ctaText?: string
}

interface Props {
  sectionTitle?: string
  sectionSubtitle?: string
  programs?: TrainingProgram[]
  showViewAll?: boolean
  viewAllText?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Unsere Training Programme',
  sectionSubtitle: 'Entdecke das perfekte Training für deine Ziele. Vom Einsteiger bis zum Profi - wir haben das richtige Programm für dich.',
  showViewAll: true,
  viewAllText: 'Alle Programme ansehen',
  programs: () => [
    {
      title: 'Functional Strength',
      description: 'Krafttraining mit dem eigenen Körpergewicht und funktionellen Bewegungen für maximale Alltagstauglichkeit.',
      badge: 'Beliebt',
      difficulty: 2,
      duration: '45-60 Min',
      groupSize: 'Max. 12 Personen',
      features: [
        'Ganzkörper-Workout',
        'Verbesserung der Kraft',
        'Functional Movement Patterns'
      ]
    },
    {
      title: 'HIIT Cardio',
      description: 'Hochintensives Intervalltraining für maximale Fettverbrennung und Verbesserung der Ausdauer.',
      badge: 'Intensiv',
      difficulty: 3,
      duration: '30-45 Min',
      groupSize: 'Max. 10 Personen',
      features: [
        'Maximale Kalorienverbrennung',
        'Herz-Kreislauf Training',
        'Schnelle Erfolge'
      ]
    },
    {
      title: 'Mobility & Recovery',
      description: 'Verbesserung der Beweglichkeit, Flexibilität und Regeneration für optimale Performance.',
      difficulty: 1,
      duration: '60 Min',
      groupSize: 'Max. 15 Personen',
      features: [
        'Verbesserung der Flexibilität',
        'Verletzungsprävention',
        'Stressabbau'
      ]
    }
  ]
})
</script>