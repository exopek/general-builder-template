<template>
  <section class="py-20 bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
          {{ sectionTitle }}
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          {{ sectionSubtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(plan, index) in membershipPlans"
          :key="index"
          class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
          :class="{ 'lg:scale-105 border-orange-400': plan.featured }"
        >
          <div v-if="plan.featured" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span class="px-4 py-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-bold rounded-full">
              {{ plan.badge || 'Beliebt' }}
            </span>
          </div>

          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">
              {{ plan.title }}
            </h3>
            <p class="text-gray-300 mb-6">
              {{ plan.description }}
            </p>

            <div class="mb-6">
              <div class="text-5xl font-black text-white mb-2">
                {{ plan.price }}
                <span class="text-xl text-gray-300 font-normal">€</span>
              </div>
              <div class="text-gray-300">
                pro {{ plan.period || 'Monat' }}
              </div>
              <div v-if="plan.originalPrice" class="text-sm text-gray-400 line-through">
                vorher {{ plan.originalPrice }}€
              </div>
            </div>
          </div>

          <div class="space-y-4 mb-8">
            <div
              v-for="(feature, featureIndex) in plan.features"
              :key="featureIndex"
              class="flex items-center gap-3"
            >
              <div class="w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-200">{{ feature }}</span>
            </div>
          </div>

          <button
            class="w-full py-4 font-bold rounded-xl transition-all duration-300 transform group-hover:scale-105"
            :class="plan.featured
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
              : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'"
          >
            {{ plan.ctaText || 'Jetzt starten' }}
          </button>

          <div v-if="plan.note" class="text-center mt-4">
            <p class="text-sm text-gray-400">
              {{ plan.note }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="showTrialSection" class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="text-center lg:text-left">
            <h3 class="text-3xl md:text-4xl font-black text-white mb-4">
              {{ trialTitle }}
            </h3>
            <p class="text-xl text-gray-300 mb-6">
              {{ trialSubtitle }}
            </p>

            <div v-if="trialFeatures?.length" class="space-y-3 mb-8">
              <div
                v-for="(feature, index) in trialFeatures"
                :key="index"
                class="flex items-center gap-3 text-gray-200"
              >
                <div class="w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span>{{ feature }}</span>
              </div>
            </div>

            <button class="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              {{ trialCta }}
            </button>
          </div>

          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur-3xl opacity-20"></div>
            <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div class="text-center">
                <div class="text-6xl font-black text-orange-400 mb-4">
                  {{ trialDuration || '7' }}
                </div>
                <div class="text-2xl font-bold text-white mb-2">
                  Tage kostenlos
                </div>
                <div class="text-gray-300">
                  Teste alle Programme
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface MembershipPlan {
  title: string
  description: string
  price: string | number
  period?: string
  originalPrice?: string | number
  features: string[]
  featured?: boolean
  badge?: string
  ctaText?: string
  note?: string
}

interface Props {
  sectionTitle?: string
  sectionSubtitle?: string
  membershipPlans?: MembershipPlan[]
  showTrialSection?: boolean
  trialTitle?: string
  trialSubtitle?: string
  trialFeatures?: string[]
  trialCta?: string
  trialDuration?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Wähle dein Membership',
  sectionSubtitle: 'Flexible Optionen für jeden Fitnesstyp. Starte noch heute und erreiche deine Ziele mit unserem professionellen Training.',
  showTrialSection: true,
  trialTitle: 'Kostenloses Probetraining',
  trialSubtitle: 'Überzeuge dich selbst von der Qualität unseres Trainings. Teste alle Programme 7 Tage lang völlig kostenlos.',
  trialCta: 'Jetzt 7 Tage kostenlos testen',
  trialDuration: '7',
  trialFeatures: () => [
    'Zugang zu allen Kursen',
    'Persönliche Trainingsberatung',
    'Keine Vertragsbindung',
    'Vollständiger Gym-Zugang'
  ],
  membershipPlans: () => [
    {
      title: 'Starter',
      description: 'Perfekt für Einsteiger',
      price: '49',
      period: 'Monat',
      features: [
        '8 Gruppenstunden pro Monat',
        'Zugang zu allen Programmen',
        'Persönliche Einführung',
        'Flexible Terminbuchung',
        'Community Zugang'
      ],
      ctaText: 'Starter werden'
    },
    {
      title: 'Pro',
      description: 'Für ambitionierte Athleten',
      price: '79',
      period: 'Monat',
      originalPrice: '99',
      featured: true,
      badge: 'Beliebt',
      features: [
        'Unbegrenzte Gruppenstunden',
        'Alle Programme inklusive',
        '1 Personal Training pro Monat',
        'Ernährungsberatung',
        'Prioritätsbuchung',
        'Gast-Mitnahme (1x/Monat)'
      ],
      ctaText: 'Pro werden'
    },
    {
      title: 'Elite',
      description: 'Maximaler Support',
      price: '129',
      period: 'Monat',
      features: [
        'Unbegrenzte Gruppenstunden',
        'Alle Programme inklusive',
        '4 Personal Trainings pro Monat',
        'Individueller Trainingsplan',
        'Ernährungs- & Lifestyle Coaching',
        'Gast-Mitnahme (4x/Monat)',
        '24/7 Support'
      ],
      ctaText: 'Elite werden',
      note: 'Begrenzter Zugang'
    }
  ]
})
</script>