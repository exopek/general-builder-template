<template>
  <section class="py-16 md:py-20" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="featured"
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

      <!-- Pricing Cards -->
      <div class="space-y-6 max-w-6xl mx-auto mb-16">
        <TransformationCard
          v-for="(plan, index) in pricingPlans"
          :key="index"
          :variant="plan.featured ? 'gradient' : 'elevated'"
          size="md"
          :hover-effect="false"
          :class="[
            'relative',
            plan.featured ? 'ring-2 ring-orange-200' : ''
          ]"
        >
          <!-- Content Grid -->
          <div class="grid md:grid-cols-12 gap-6 items-center">

            <!-- Left: Plan Info & Pricing (4 columns) -->
            <div class="md:col-span-4 text-center md:text-left">
              <!-- Plan Header -->
              <div class="flex items-center justify-center md:justify-start gap-3 mb-4">
                
                
                <div>
                  <h3 class="text-lg lg:text-xl font-bold mb-1 text-gray-900">
                    {{ plan.name }}
                  </h3>
                  <p class="text-xs opacity-90" :class="plan.featured ? 'text-gray-100' : 'text-gray-600'">
                    {{ plan.description }}
                  </p>
                </div>
              </div>

              <!-- Pricing -->
              <div class="mb-4">
                <div class="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                  <span class="text-2xl md:text-3xl font-black text-gray-700">
                    {{ plan.price }}€
                  </span>
                  <span class="text-sm opacity-80" :class="plan.featured ? 'text-gray-100' : 'text-gray-600'">
                    {{ plan.period }}
                  </span>
                </div>

                <!-- Original Price (if discounted) -->
                <div v-if="plan.originalPrice" class="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span class="text-sm line-through opacity-60" :class="plan.featured ? 'text-gray-200' : 'text-gray-500'">
                    {{ plan.originalPrice }}€
                  </span>
                  <TransformationBadge
                    :text="`${plan.discount}% Ersparnis`"
                    variant="success"
                    size="sm"
                  />
                </div>

                <!-- Payment Info -->
                <p class="text-xs opacity-70" :class="plan.featured ? 'text-gray-100' : 'text-gray-600'">
                  {{ plan.paymentInfo }}
                </p>
              </div>
            </div>

            <!-- Middle: Features (5 columns) -->
            <div class="md:col-span-5">
              <!-- Features List -->
              <div class="space-y-2">
                <h4 class="font-semibold text-xs mb-3" :class="plan.featured ? 'text-white' : 'text-gray-700'">
                  Was ist enthalten:
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="feature in plan.features.slice(0, 6)"
                    :key="feature"
                    class="flex items-start gap-2"
                  >
                    <svg class="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs" :class="plan.featured ? 'text-gray-100' : 'text-gray-700'">
                      {{ feature }}
                    </span>
                  </div>
                </div>

                <!-- Show remaining features if more than 6 -->
                <div v-if="plan.features.length > 6" class="text-xs opacity-70" :class="plan.featured ? 'text-gray-100' : 'text-gray-600'">
                  + {{ plan.features.length - 6 }} weitere Features
                </div>
              </div>

              <!-- Bonus Features (if any) -->
              <div v-if="plan.bonusFeatures" class="rounded-lg p-3 mt-4 border" :class="plan.featured ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-200'">
                <h5 class="font-semibold mb-2 flex items-center gap-2 text-xs text-gray-900">
                  <div class="w-3 h-3">
                    <img src="/icons/trophy.svg" alt="Bonus" class="w-full h-full filter brightness-0"/>
                  </div>
                  Exklusive Boni:
                </h5>
                <div class="space-y-1">
                  <div
                    v-for="bonus in plan.bonusFeatures.slice(0, 2)"
                    :key="bonus"
                    class="flex items-start gap-2"
                  >
                    <svg class="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-xs" :class="plan.featured ? 'text-gray-100' : 'text-gray-700'">
                      {{ bonus }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: CTA (3 columns) -->
            <div class="md:col-span-3 text-center md:text-right">
              <div class="space-y-3">
                <!-- CTA Button -->
                <TransformationButton
                  :text="plan.ctaText"
                  :href="plan.ctaUrl"
                  :variant="plan.featured ? 'secondary' : 'gradient'"
                  size="md"
                  class="w-full md:w-auto md:min-w-[140px]"
                />

                <!-- Additional Info -->
                <p v-if="plan.additionalInfo" class="text-xs opacity-70 text-primary">
                  {{ plan.additionalInfo }}
                </p>
              </div>
            </div>
          </div>
        </TransformationCard>
      </div>

      <!-- Value Proposition -->
      <div v-if="showValueProposition" class="max-w-5xl mx-auto mb-16">
        <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ valuePropositionHeadline }}</h3>
            <p class="text-gray-600">{{ valuePropositionDescription }}</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 lg:gap-10">
            <div class="text-center">
              <div class="w-12 h-12 mx-auto mb-4">
                <img src="/icons/coins.svg" alt="Geld-zurück" class="w-full h-full" />
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">Erfolgs-Bonus</h4>
              <p class="text-sm text-gray-600">{{ guaranteeText }}</p>
            </div>

            <div class="text-center">
              <div class="w-12 h-12 mx-auto mb-4">
                <img src="/icons/trophy.svg" alt="Erfolg" class="w-full h-full" />
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">Erfolg garantiert</h4>
              <p class="text-sm text-gray-600">{{ successText }}</p>
            </div>

            <div class="text-center">
              <div class="w-12 h-12 mx-auto mb-4">
                <img src="/icons/users-medical.svg" alt="Support" class="w-full h-full" />
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">Premium Support</h4>
              <p class="text-sm text-gray-600">{{ supportText }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <!-- <div v-if="showComparison" class="max-w-6xl mx-auto mb-16">
        <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">{{ comparisonHeadline }}</h3>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-xl shadow-xl border border-gray-200">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-6 py-4 text-left font-bold text-gray-900 border-b border-gray-300">Features</th>
                <th
                  v-for="plan in pricingPlans"
                  :key="plan.name"
                  class="px-6 py-4 text-center font-bold text-gray-900 border-b border-gray-300"
                >
                  {{ plan.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(feature, index) in comparisonFeatures"
                :key="feature.name"
                :class="index % 2 === 0 ? 'bg-white border-b border-gray-200' : 'bg-gray-50 border-b border-gray-200'"
              >
                <td class="px-6 py-4 font-medium text-gray-900">{{ feature.name }}</td>
                <td
                  v-for="plan in pricingPlans"
                  :key="plan.name"
                  class="px-6 py-4 text-center"
                >
                  <div v-if="feature.values[plan.name] === true">
                    <svg class="w-5 h-5 mx-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div v-else-if="feature.values[plan.name] === false">
                    <svg class="w-5 h-5 mx-auto text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span v-else class="text-sm font-medium text-gray-900">{{ feature.values[plan.name] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> -->

      <!-- FAQ Teaser -->
      <div v-if="showFaqTeaser" class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ faqTeaserHeadline }}</h3>
        <p class="text-gray-600 mb-6">{{ faqTeaserDescription }}</p>

        <TransformationButton
          :text="faqButtonText"
          :href="faqButtonUrl"
          variant="outline"
          size="lg"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
interface PricingPlan {
  name: string
  description: string
  icon: string
  price: number
  originalPrice?: number
  discount?: number
  period: string
  paymentInfo: string
  features: string[]
  bonusFeatures?: string[]
  guarantee?: string
  ctaText: string
  ctaUrl: string
  additionalInfo?: string
  featured?: boolean
  badge?: string
}

interface ComparisonFeature {
  name: string
  values: Record<string, boolean | string>
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Pricing Plans
  pricingPlans?: PricingPlan[]

  // Value Proposition
  showValueProposition?: boolean
  valuePropositionHeadline?: string
  valuePropositionDescription?: string
  guaranteeText?: string
  successText?: string
  supportText?: string

  // Comparison
  showComparison?: boolean
  comparisonHeadline?: string
  comparisonFeatures?: ComparisonFeature[]

  // FAQ Teaser
  showFaqTeaser?: boolean
  faqTeaserHeadline?: string
  faqTeaserDescription?: string
  faqButtonText?: string
  faqButtonUrl?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Starte deine 7-Wochen Transformation',
  subheadline: 'Eigenständige Programme für neue Mitglieder. Nach Abschluss erhältst du exklusive Angebote für unsere Gym-Mitgliedschaften mit bis zu 80% Ersparnis.',
  badgeText: 'Limitierte Zeit',
  showBadge: true,

  pricingPlans: () => [
    /* {
      name: 'Core Start',
      description: 'Dein Einstieg in die Transformation',
      icon: '/icons/brain-lightning.svg',
      price: 197,
      period: 'einmalig',
      paymentInfo: 'Einmalzahlung, sofortiger Zugang',
      features: [
        '7-Wochen Trainingsplan',
        'Grundlagen der Ernährung',
        'Workout-App Zugang',
        'Community-Support',
        'Fortschritts-Tracking',
        'E-Mail Support'
      ],
      bonusFeatures: [
        'Nach Abschluss: 50% Rabatt auf Core Mitgliedschaft (ersten 2 Monate)'
      ],
      ctaText: 'Starter wählen',
      ctaUrl: '#core-start',
      additionalInfo: 'Sofortiger Download nach Zahlung'
    }, */
    {
      name: 'Hybrid Transform',
      description: 'Intensives Training + persönliche Betreuung',
      icon: '/icons/chart-pie-alt.svg',
      price: 297,
      period: 'einmalig',
      paymentInfo: 'Einmalzahlung, sofortiger Zugang',
      features: [
        'Alles aus Core Start',
        'Hybrider Trainingsansatz',
        'Wöchentliche Coaching-Calls',
        'Individuelle Ernährungspläne',
        '3x Personal Training Sessions',
        'Erfolgs-Bonus: 100€ Cashback'
      ],
      bonusFeatures: [
        'Nach Abschluss: 297€ Verrechnung auf Mitgliedschaft über 6 Monate',
        'Prioritärer Support'
      ],
      ctaText: 'Premium wählen',
      ctaUrl: '/kontakt?utm_source=transformation_pricing&utm_medium=Anmeldung_7_Wochen_Transformation&utm_campaign=Anmledung_zur_7_Wochen_Transformation',
      additionalInfo: 'Bei Erfolg: 100€ Cashback erhalten',
      featured: true,
      badge: 'Bestseller'
    }/* ,
    {
      name: 'High Performance',
      description: 'Premium Transformation mit VIP-Betreuung',
      icon: '/icons/trophy.svg',
      price: 497,
      period: 'einmalig',
      paymentInfo: 'Ratenzahlung möglich',
      features: [
        'Alles aus Hybrid Transform',
        '7x Personal Training Sessions',
        'Tägliche WhatsApp Betreuung',
        'Regelmäßige HRV-Messungen',
        'Resilienzcoaching'
      ],
      bonusFeatures: [
        'Nach Abschluss: 497€ Verrechnung auf Mitgliedschaft über 6 Monate'
      ],
      ctaText: 'VIP werden',
      ctaUrl: '#high-performance',
      additionalInfo: 'Limitiert auf 20 Plätze pro Monat'
    } */
  ],

  showValueProposition: true,
  valuePropositionHeadline: 'Mehr als nur ein Programm - Dein Weg ins EXOPEK',
  valuePropositionDescription: 'Starte mit der Transformation und werde Teil unserer Community. Nach 7 Wochen wartet deine neue Gym-Heimat auf dich.',
  guaranteeText: 'Cashback wenn du Erfolg hast. Machen wir unsere Sache gut, bekommst du 100€ zurück.',
  successText: '89% unserer Teilnehmer werden danach EXOPEK-Mitglieder.',
  supportText: 'Nahtloser Übergang: Von der Transformation zur dauerhaften Mitgliedschaft.',

  showComparison: true,
  comparisonHeadline: 'Detaillierter Paket-Vergleich',
  comparisonFeatures: () => [
    {
      name: 'Trainingsplan (7 Wochen)',
      values: { 'Core Start': true, 'Hybrid Transform': true, 'High Performance': true }
    },
    {
      name: 'Workout-App Zugang',
      values: { 'Core Start': true, 'Hybrid Transform': true, 'High Performance': true }
    },
    {
      name: 'Personal Training Sessions',
      values: { 'Core Start': false, 'Hybrid Transform': '3x', 'High Performance': '7x' }
    },
    {
      name: 'Persönliche Betreuung',
      values: { 'Core Start': 'E-Mail Support', 'Hybrid Transform': 'Wöchentliche Calls', 'High Performance': 'Täglich WhatsApp' }
    },
    {
      name: 'Individuelle Ernährungspläne',
      values: { 'Core Start': false, 'Hybrid Transform': true, 'High Performance': true }
    },
    {
      name: 'HRV-Messungen',
      values: { 'Core Start': false, 'Hybrid Transform': false, 'High Performance': 'Regelmäßig' }
    },
    {
      name: 'Resilienzcoaching',
      values: { 'Core Start': false, 'Hybrid Transform': false, 'High Performance': true }
    },
    {
      name: 'Cashback bei Erfolg',
      values: { 'Core Start': false, 'Hybrid Transform': '100€', 'High Performance': '100€' }
    },
    {
      name: 'Mitgliedschaftsverrechnung',
      values: { 'Core Start': '50% Rabatt 2 Monate', 'Hybrid Transform': '297€ über 6 Monate', 'High Performance': '497€ über 6 Monate' }
    }
  ],

  showFaqTeaser: true,
  faqTeaserHeadline: 'Fragen zur Transformation oder Mitgliedschaft?',
  faqTeaserDescription: 'Erfahre mehr über den nahtlosen Übergang von der Transformation zur Mitgliedschaft.',
  faqButtonText: 'Häufige Fragen ansehen',
  faqButtonUrl: '#faq',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})
</script>

<style scoped>
/* Enhanced card shadows */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Featured card glow effect */
.ring-2.ring-orange-200 {
  box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

/* Table styling enhancements */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th:first-child,
td:first-child {
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}

th:last-child,
td:last-child {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}

/* Value proposition card styling */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #f9fafb, #ffffff);
}

/* Responsive improvements */
@media (max-width: 1023px) {
  .grid.lg\:grid-cols-3 {
    gap: 1.5rem;
  }
}
</style>