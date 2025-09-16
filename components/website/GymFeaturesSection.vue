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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group text-center p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300"
        >
          <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <div v-if="feature.icon" v-html="feature.icon" class="text-white w-8 h-8"></div>
            <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-white mb-4">
            {{ feature.title }}
          </h3>
          <p class="text-gray-200 leading-relaxed">
            {{ feature.description }}
          </p>

          <div v-if="feature.stats" class="mt-6 pt-6 border-t border-gray-600">
            <div class="text-3xl font-black text-orange-500 mb-1">
              {{ feature.stats.value }}
            </div>
            <div class="text-sm text-gray-300">
              {{ feature.stats.label }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="showBottomSection" class="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 text-white">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-3xl md:text-4xl font-black mb-4">
              {{ bottomSectionTitle }}
            </h3>
            <p class="text-xl text-gray-300 mb-6">
              {{ bottomSectionSubtitle }}
            </p>
            <button class="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105">
              {{ bottomSectionCta }}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="text-center"
            >
              <div class="text-4xl md:text-5xl font-black text-orange-400 mb-2">
                {{ stat.value }}
              </div>
              <div class="text-gray-300 font-medium">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
  icon?: string
  stats?: {
    value: string
    label: string
  }
}

interface Stat {
  value: string
  label: string
}

interface Props {
  sectionTitle?: string
  sectionSubtitle?: string
  features?: Feature[]
  showBottomSection?: boolean
  bottomSectionTitle?: string
  bottomSectionSubtitle?: string
  bottomSectionCta?: string
  stats?: Stat[]
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Warum unser Gym?',
  sectionSubtitle: 'Wir bieten dir alles, was du für dein erfolgreiches Training brauchst. Von der modernsten Ausstattung bis zur persönlichen Betreuung.',
  showBottomSection: true,
  bottomSectionTitle: 'Bereit für dein Training?',
  bottomSectionSubtitle: 'Starte noch heute mit deinem kostenlosen Probetraining und erlebe den Unterschied.',
  bottomSectionCta: 'Kostenloses Probetraining',
  features: () => [
    {
      title: 'Professionelle Trainer',
      description: 'Unsere zertifizierten Trainer begleiten dich persönlich und sorgen für optimale Ergebnisse.',
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.1 15.9 11 17 11V20C17 20.6 16.6 21 16 21H15C14.4 21 14 20.6 14 20V16H10V20C10 20.6 9.6 21 9 21H8C7.4 21 7 20.6 7 20V11C8.1 11 9 10.1 9 9V7H3V9C3 10.1 3.9 11 5 11V20C5 21.1 5.9 22 7 22H9C10.1 22 11 21.1 11 20V17H13V20C13 21.1 13.9 22 15 22H17C18.1 22 19 21.1 19 20V11C20.1 11 21 10.1 21 9Z"/></svg>',
      stats: { value: '15+', label: 'Jahre Erfahrung' }
    },
    {
      title: 'Kleine Gruppen',
      description: 'Maximale Aufmerksamkeit für jeden Teilnehmer durch begrenzte Gruppengröße.',
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C20.4 14 24 15.8 24 18V20H8V18C8 15.8 11.6 14 16 14M8 4C10.2 4 12 5.8 12 8S10.2 12 8 12 4 10.2 4 8 5.8 4 8 4M8 14C12.4 14 16 15.8 16 18V20H0V18C0 15.8 3.6 14 8 14Z"/></svg>',
      stats: { value: '8-12', label: 'Personen max.' }
    },
    {
      title: 'Modernste Ausstattung',
      description: 'Hochwertige Trainingsgeräte und Equipment für maximale Sicherheit und Effizienz.',
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z"/></svg>',
      stats: { value: '800m²', label: 'Trainingsfläche' }
    },
    {
      title: 'Flexible Zeiten',
      description: 'Trainiere wann es dir passt mit unserem flexiblen Kursplan von früh bis spät.',
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/></svg>',
      stats: { value: '6-22', label: 'Uhr geöffnet' }
    },
    {
      title: 'Community Spirit',
      description: 'Trainiere in einer motivierenden Gemeinschaft und erreiche deine Ziele gemeinsam.',
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/></svg>',
      stats: { value: '500+', label: 'Mitglieder' }
    },
    {
      title: 'Individuelle Betreuung',
      description: 'Persönliche Trainingsanpassung und regelmäßige Fortschrittskontrolle für optimale Ergebnisse.',
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/></svg>',
      stats: { value: '1:1', label: 'Betreuung' }
    }
  ],
  stats: () => [
    { value: '2500+', label: 'Erfolgreiche Trainings' },
    { value: '98%', label: 'Zufriedenheit' },
    { value: '24/7', label: 'Support' },
    { value: '5★', label: 'Bewertung' }
  ]
})
</script>