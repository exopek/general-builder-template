<template>
  <section class="py-16 md:py-20" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="limited"
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
      <div class="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto mb-16">
        <TransformationCard
          v-for="(plan, index) in pricingPlans"
          :key="index"
          :variant="plan.featured ? 'gradient' : 'elevated'"
          size="lg"
          :hover-effect="true"
          :class="[
            'relative transition-all duration-500',
            plan.featured ? 'scale-105 lg:scale-110 z-10 ring-4 ring-orange-200' : ''
          ]"
        >
          <!-- Popular Badge -->
          <TransformationBadge
            v-if="plan.featured"
            :text="plan.badge || 'Beliebt'"
            variant="new"
            size="lg"
            position="top-right"
            animated
          />

          <!-- Plan Header -->
          <div class="text-center mb-10">
            <div class="mb-6">
              <TransformationIcon
                :emoji="plan.emoji"
                :variant="plan.featured ? 'success' : 'primary'"
                size="xl"
                :animated="true"
                class="hover:scale-110 transition-transform duration-300"
              />
            </div>

            <h3 class="text-2xl lg:text-3xl font-bold mb-3" :class="plan.featured ? 'text-white' : 'text-gray-900'">
              {{ plan.name }}
            </h3>
            <p class="text-sm lg:text-base opacity-90" :class="plan.featured ? 'text-white' : 'text-gray-600'">
              {{ plan.description }}
            </p>
          </div>

          <!-- Pricing -->
          <div class="text-center mb-10">
            <div class="flex items-baseline justify-center gap-2 mb-3">
              <span class="text-4xl md:text-5xl lg:text-6xl font-black" :class="plan.featured ? 'text-white' : 'text-gray-900'">
                {{ plan.price }}€
              </span>
              <span class="text-lg lg:text-xl opacity-80" :class="plan.featured ? 'text-white' : 'text-gray-600'">
                {{ plan.period }}
              </span>
            </div>

            <!-- Original Price (if discounted) -->
            <div v-if="plan.originalPrice" class="flex items-center justify-center gap-3">
              <span class="text-lg lg:text-xl line-through opacity-60" :class="plan.featured ? 'text-white' : 'text-gray-500'">
                {{ plan.originalPrice }}€
              </span>
              <TransformationBadge
                :text="`${plan.discount}% Ersparnis`"
                variant="success"
                size="sm"
                animated
              />
            </div>

            <!-- Payment Info -->
            <p class="text-sm mt-2 opacity-70" :class="plan.featured ? 'text-white' : 'text-gray-600'">
              {{ plan.paymentInfo }}
            </p>
          </div>

          <!-- Features List -->
          <div class="space-y-4 mb-10">
            <h4 class="font-semibold" :class="plan.featured ? 'text-white' : 'text-gray-900'">
              Was ist enthalten:
            </h4>
            <div class="space-y-4">
              <div
                v-for="(feature, featureIndex) in plan.features"
                :key="feature"
                class="flex items-start gap-3 transition-all duration-300 hover:translate-x-1"
                :style="{ animationDelay: `${featureIndex * 0.1}s` }"
              >
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm lg:text-base" :class="plan.featured ? 'text-white' : 'text-gray-700'">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bonus Features (if any) -->
          <div v-if="plan.bonusFeatures" class="bg-black/10 rounded-xl p-5 mb-10 border transition-all duration-300 hover:shadow-lg" :class="plan.featured ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-200'">
            <h5 class="font-semibold mb-3 flex items-center gap-2" :class="plan.featured ? 'text-white' : 'text-gray-900'">
              <TransformationIcon
                emoji="🎁"
                variant="warning"
                size="sm"
              />
              Exklusive Boni:
            </h5>
            <div class="space-y-2">
              <div
                v-for="bonus in plan.bonusFeatures"
                :key="bonus"
                class="flex items-start gap-3"
              >
                <svg class="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-sm" :class="plan.featured ? 'text-white' : 'text-gray-700'">
                  {{ bonus }}
                </span>
              </div>
            </div>
          </div>

          <!-- Guarantee -->
          <div v-if="plan.guarantee" class="text-center mb-8">
            <div class="flex items-center justify-center gap-2 text-sm" :class="plan.featured ? 'text-white' : 'text-gray-600'">
              <TransformationIcon
                emoji="🛡️"
                variant="success"
                size="sm"
              />
              <span>{{ plan.guarantee }}</span>
            </div>
          </div>

          <!-- CTA Button -->
          <TransformationButton
            :text="plan.ctaText"
            :href="plan.ctaUrl"
            :variant="plan.featured ? 'secondary' : 'gradient'"
            size="lg"
            class="w-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          />

          <!-- Additional Info -->
          <p v-if="plan.additionalInfo" class="text-xs text-center mt-4 opacity-70" :class="plan.featured ? 'text-white' : 'text-gray-500'">
            {{ plan.additionalInfo }}
          </p>
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
              <TransformationIcon
                emoji="💰"
                variant="success"
                size="lg"
                class="mx-auto mb-4"
              />
              <h4 class="font-semibold text-gray-900 mb-2">Geld-zurück-Garantie</h4>
              <p class="text-sm text-gray-600">{{ guaranteeText }}</p>
            </div>

            <div class="text-center">
              <TransformationIcon
                emoji="🏆"
                variant="primary"
                size="lg"
                class="mx-auto mb-4"
              />
              <h4 class="font-semibold text-gray-900 mb-2">Erfolg garantiert</h4>
              <p class="text-sm text-gray-600">{{ successText }}</p>
            </div>

            <div class="text-center">
              <TransformationIcon
                emoji="👥"
                variant="secondary"
                size="lg"
                class="mx-auto mb-4"
              />
              <h4 class="font-semibold text-gray-900 mb-2">Premium Support</h4>
              <p class="text-sm text-gray-600">{{ supportText }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div v-if="showComparison" class="max-w-6xl mx-auto mb-16">
        <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">{{ comparisonHeadline }}</h3>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-xl shadow-xl border border-gray-200">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-4 text-left font-semibold text-gray-900">Features</th>
                <th
                  v-for="plan in pricingPlans"
                  :key="plan.name"
                  class="px-6 py-4 text-center font-semibold text-gray-900"
                >
                  {{ plan.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(feature, index) in comparisonFeatures"
                :key="feature.name"
                :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
              >
                <td class="px-6 py-4 text-gray-900 font-medium">{{ feature.name }}</td>
                <td
                  v-for="plan in pricingPlans"
                  :key="plan.name"
                  class="px-6 py-4 text-center"
                >
                  <div v-if="feature.values[plan.name] === true">
                    <svg class="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div v-else-if="feature.values[plan.name] === false">
                    <svg class="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span v-else class="text-gray-600 text-sm">{{ feature.values[plan.name] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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
  emoji: string
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
  headline: 'Wähle dein Transformations-Paket',
  subheadline: 'Investiere in deine Gesundheit und wähle das Paket, das perfekt zu deinen Zielen und deinem Budget passt. Alle Pakete beinhalten unsere Erfolgsgarantie.',
  badgeText: 'Limitierte Zeit',
  showBadge: true,

  pricingPlans: () => [
    {
      name: 'Starter',
      description: 'Perfekt für Fitness-Einsteiger',
      emoji: '🌱',
      price: 197,
      period: 'einmalig',
      paymentInfo: 'Einmalzahlung, sofortiger Zugang',
      features: [
        '7-Wochen Trainingsplan',
        'Grundlagen der Ernährung',
        'Community-Zugang',
        'E-Mail Support',
        'Fortschritts-Tracking',
        'Mobile App Zugang'
      ],
      guarantee: '30 Tage Geld-zurück-Garantie',
      ctaText: 'Starter wählen',
      ctaUrl: '#starter',
      additionalInfo: 'Sofortiger Download nach Zahlung'
    },
    {
      name: 'Premium',
      description: 'Unser beliebtestes Komplettpaket',
      emoji: '🚀',
      price: 297,
      originalPrice: 397,
      discount: 25,
      period: 'einmalig',
      paymentInfo: 'Einmalzahlung, 25% Ersparnis',
      features: [
        'Alles aus Starter-Paket',
        'Persönliche Trainingsbetreuung',
        'Individuelle Ernährungspläne',
        'Wöchentliche Coaching-Calls',
        'Prioritärer Support',
        'Erfolgs-Bonus: 100€ Cashback'
      ],
      bonusFeatures: [
        'Rezeptbuch mit 50+ Rezepten',
        'Supplement-Guide',
        'Meditation & Mindset Training',
        'Lebenslanger Community-Zugang'
      ],
      guarantee: '60 Tage Geld-zurück-Garantie',
      ctaText: 'Premium wählen',
      ctaUrl: '#premium',
      additionalInfo: 'Bei Erfolg: 100€ Cashback erhalten',
      featured: true,
      badge: 'Bestseller'
    },
    {
      name: 'VIP',
      description: 'Maximaler Erfolg mit 1:1 Betreuung',
      emoji: '👑',
      price: 497,
      period: 'einmalig',
      paymentInfo: 'Ratenzahlung möglich',
      features: [
        'Alles aus Premium-Paket',
        '1:1 Personal Training Sessions',
        'Tägliche WhatsApp Betreuung',
        'Individuelle Supplement-Pläne',
        'Body-Composition Analysen',
        'VIP Community Gruppe'
      ],
      bonusFeatures: [
        'Exklusives VIP-Event Ticket',
        'Persönlicher Erfolgstrainer',
        'Maßgeschneiderte Workout-Videos',
        '12 Monate Follow-up Support'
      ],
      guarantee: '90 Tage Geld-zurück-Garantie',
      ctaText: 'VIP werden',
      ctaUrl: '#vip',
      additionalInfo: 'Limitiert auf 20 Plätze pro Monat'
    }
  ],

  showValueProposition: true,
  valuePropositionHeadline: 'Warum sich die Investition lohnt',
  valuePropositionDescription: 'Deine Gesundheit ist unbezahlbar. Mit unserem System erhältst du professionelle Betreuung zum Bruchteil der Kosten eines Personal Trainers.',
  guaranteeText: 'Nicht zufrieden? Geld zurück. Bis zu 90 Tage je nach Paket.',
  successText: '94% Erfolgsquote. Deine Transformation ist praktisch garantiert.',
  supportText: 'Persönliche Betreuung durch zertifizierte Trainer und Ernährungsexperten.',

  showComparison: true,
  comparisonHeadline: 'Detaillierter Paket-Vergleich',
  comparisonFeatures: () => [
    {
      name: 'Trainingsplan (7 Wochen)',
      values: { 'Starter': true, 'Premium': true, 'VIP': true }
    },
    {
      name: 'Ernährungsgrundlagen',
      values: { 'Starter': true, 'Premium': true, 'VIP': true }
    },
    {
      name: 'Community Zugang',
      values: { 'Starter': true, 'Premium': true, 'VIP': 'VIP Gruppe' }
    },
    {
      name: 'Personal Coaching',
      values: { 'Starter': false, 'Premium': 'Wöchentlich', 'VIP': 'Täglich' }
    },
    {
      name: 'Individuelle Ernährungspläne',
      values: { 'Starter': false, 'Premium': true, 'VIP': true }
    },
    {
      name: '1:1 Training Sessions',
      values: { 'Starter': false, 'Premium': false, 'VIP': true }
    },
    {
      name: 'Cashback bei Erfolg',
      values: { 'Starter': false, 'Premium': '100€', 'VIP': '100€' }
    },
    {
      name: 'Geld-zurück-Garantie',
      values: { 'Starter': '30 Tage', 'Premium': '60 Tage', 'VIP': '90 Tage' }
    }
  ],

  showFaqTeaser: true,
  faqTeaserHeadline: 'Noch Fragen zu den Paketen?',
  faqTeaserDescription: 'Finde Antworten auf die häufigsten Fragen oder kontaktiere uns direkt.',
  faqButtonText: 'Häufige Fragen ansehen',
  faqButtonUrl: '#faq',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})
</script>

<style scoped>
/* Enhanced hover effects for pricing cards */
.relative:hover {
  transform: translateY(-6px);
}

.scale-105:hover {
  transform: scale(1.05) translateY(-6px);
}

.scale-110:hover {
  transform: scale(1.1) translateY(-6px);
}

/* Feature list animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.flex.items-start.gap-3 {
  animation: slideInLeft 0.5s ease-out;
}

/* Enhanced card shadows */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Featured card glow effect */
.ring-4.ring-orange-200 {
  box-shadow: 0 0 0 4px rgba(251, 146, 60, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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

/* Smooth transitions for all interactive elements */
.transition-transform {
  transition: transform 0.3s ease;
}

/* Button hover enhancements */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Value proposition card styling */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #f9fafb, #ffffff);
}

/* Responsive improvements */
@media (max-width: 1023px) {
  .grid.lg\:grid-cols-3 {
    gap: 2rem;
  }
}
</style>