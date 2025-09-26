<template>
  <section
    class="py-16 md:py-20 overflow-hidden relative"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- Background Elements -->
    <div v-if="showBackgroundElements" class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto relative z-10">

      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          :variant="badgeVariant"
          class="mb-4"
          animated
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

      <!-- CTA Options -->
      <div class="grid gap-8 mb-12" :class="getCtaGridClasses()">

        <!-- Primary CTA Card -->
        <div v-if="showPrimaryCta" class="cta-card">
          <AboutCard
            :variant="primaryCtaVariant"
            size="lg"
            :title="primaryCtaTitle"
            :description="primaryCtaDescription"
            :icon-name="primaryCtaIcon"
            :cta-text="primaryCtaText"
            :cta-url="primaryCtaUrl"
            :cta-external="primaryCtaExternal"
            :cta-variant="primaryCtaButtonVariant"
            :hover-effect="true"
          >
            <!-- Additional benefits list -->
            <div v-if="primaryCtaBenefits && primaryCtaBenefits.length > 0" class="mt-4">
              <ul class="space-y-2">
                <li
                  v-for="benefit in primaryCtaBenefits"
                  :key="benefit"
                  class="flex items-start gap-2 text-sm"
                >
                  <div class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>
          </AboutCard>
        </div>

        <!-- Secondary CTA Card -->
        <div v-if="showSecondaryCta" class="cta-card">
          <AboutCard
            :variant="secondaryCtaVariant"
            size="lg"
            :title="secondaryCtaTitle"
            :description="secondaryCtaDescription"
            :icon-name="secondaryCtaIcon"
            :cta-text="secondaryCtaText"
            :cta-url="secondaryCtaUrl"
            :cta-external="secondaryCtaExternal"
            :cta-variant="secondaryCtaButtonVariant"
            :hover-effect="true"
          >
            <!-- Additional benefits list -->
            <div v-if="secondaryCtaBenefits && secondaryCtaBenefits.length > 0" class="mt-4">
              <ul class="space-y-2">
                <li
                  v-for="benefit in secondaryCtaBenefits"
                  :key="benefit"
                  class="flex items-start gap-2 text-sm"
                >
                  <div class="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2"></div>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>
          </AboutCard>
        </div>

      </div>

      <!-- Contact Information (if applicable) -->
      <div v-if="showContactInfo" class="text-center mb-12">
        <div class="inline-flex items-center justify-center gap-8 flex-wrap">
          <div v-if="contactPhone" class="flex items-center gap-2 text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <a :href="`tel:${contactPhone}`" class="hover:text-primary transition-colors">
              {{ contactPhone }}
            </a>
          </div>
          <div v-if="contactEmail" class="flex items-center gap-2 text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <a :href="`mailto:${contactEmail}`" class="hover:text-primary transition-colors">
              {{ contactEmail }}
            </a>
          </div>
        </div>
      </div>

      <!-- Final Centered CTA Buttons -->
      <div v-if="showFinalButtons" class="text-center">
        <div class="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
          <TransformationButton
            :text="finalPrimaryText"
            :href="finalPrimaryUrl"
            :variant="finalPrimaryVariant"
            size="xl"
            :external="finalPrimaryExternal"
          />
          <TransformationButton
            v-if="finalSecondaryText"
            :text="finalSecondaryText"
            :href="finalSecondaryUrl"
            :variant="finalSecondaryVariant"
            size="xl"
            :external="finalSecondaryExternal"
          />
        </div>

        <!-- Small trust indicators -->
        <div v-if="trustIndicators && trustIndicators.length > 0" class="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div v-for="indicator in trustIndicators" :key="indicator" class="flex items-center gap-1">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ indicator }}
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

  // Primary CTA Card
  showPrimaryCta?: boolean
  primaryCtaTitle?: string
  primaryCtaDescription?: string
  primaryCtaIcon?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  primaryCtaVariant?: 'default' | 'elevated' | 'glass' | 'gradient'
  primaryCtaButtonVariant?: 'primary' | 'gradient' | 'outline'
  primaryCtaBenefits?: string[]

  // Secondary CTA Card
  showSecondaryCta?: boolean
  secondaryCtaTitle?: string
  secondaryCtaDescription?: string
  secondaryCtaIcon?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean
  secondaryCtaVariant?: 'default' | 'elevated' | 'glass' | 'gradient'
  secondaryCtaButtonVariant?: 'primary' | 'secondary' | 'outline'
  secondaryCtaBenefits?: string[]

  // Contact Info
  showContactInfo?: boolean
  contactPhone?: string
  contactEmail?: string

  // Final Buttons
  showFinalButtons?: boolean
  finalPrimaryText?: string
  finalPrimaryUrl?: string
  finalPrimaryVariant?: 'primary' | 'gradient' | 'outline'
  finalPrimaryExternal?: boolean
  finalSecondaryText?: string
  finalSecondaryUrl?: string
  finalSecondaryVariant?: 'secondary' | 'outline' | 'ghost'
  finalSecondaryExternal?: boolean

  // Trust Indicators
  trustIndicators?: string[]

  // Visual
  showBackgroundElements?: boolean

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Bereit für <span style="color: #f97316;">echtes Training?</span>',
  subheadline: 'Starten Sie noch heute Ihre Transformation im Exopek Gym. Funktionelles Training, das wirklich einen Unterschied macht.',
  badgeText: 'Jetzt starten',
  badgeVariant: 'featured',
  showBadge: true,

  showPrimaryCta: true,
  primaryCtaTitle: 'Kostenloses Probetraining',
  primaryCtaDescription: 'Testen Sie unser funktionelles Training eine Woche lang kostenlos und überzeugen Sie sich selbst.',
  primaryCtaIcon: 'target',
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#probetraining',
  primaryCtaExternal: false,
  primaryCtaVariant: 'gradient',
  primaryCtaButtonVariant: 'gradient',
  primaryCtaBenefits: () => [
    '7 Tage kostenlos testen',
    'Persönliche Trainingsberatung',
    'Keine Anmeldegebühr'
  ],

  showSecondaryCta: true,
  secondaryCtaTitle: 'Unsere Kurse',
  secondaryCtaDescription: 'Entdecken Sie unser vielfältiges Angebot an funktionellen Trainingskursen für alle Level.',
  secondaryCtaIcon: 'people',
  secondaryCtaText: 'Kurse entdecken',
  secondaryCtaUrl: '#kurse',
  secondaryCtaExternal: false,
  secondaryCtaVariant: 'elevated',
  secondaryCtaButtonVariant: 'outline',
  secondaryCtaBenefits: () => [
    'Verschiedene Trainingslevels',
    'Kleine Gruppengrößen',
    'Flexible Terminbuchung'
  ],

  showContactInfo: true,
  contactPhone: '+49 511 123456789',
  contactEmail: 'info@exopek-gym.de',

  showFinalButtons: false,
  finalPrimaryText: 'Hauptaktion',
  finalPrimaryUrl: '#',
  finalPrimaryVariant: 'gradient',
  finalPrimaryExternal: false,

  trustIndicators: () => [
    'Kostenloses Probetraining',
    'Keine Anmeldegebühr',
    'Flexible Verträge'
  ],

  showBackgroundElements: true,

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

// Helper function for CTA grid classes
const getCtaGridClasses = (): string => {
  const hasPrimary = props.showPrimaryCta
  const hasSecondary = props.showSecondaryCta

  if (hasPrimary && hasSecondary) {
    return 'grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto'
  }

  return 'grid-cols-1 max-w-2xl mx-auto'
}
</script>

<style scoped>
.cta-card {
  animation: fadeInUp 0.8s ease-out;
}

.cta-card:nth-child(1) { animation-delay: 0.1s; }
.cta-card:nth-child(2) { animation-delay: 0.2s; }

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

/* Enhanced CTA hover effects */
.cta-card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

/* Background animation */
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(10px, -10px) rotate(1deg); }
  66% { transform: translate(-5px, 5px) rotate(-1deg); }
}

.absolute.w-96.h-96 {
  animation: float 20s ease-in-out infinite;
}

.absolute.w-96.h-96:nth-child(3) {
  animation-delay: -10s;
}

/* Trust indicators fade-in */
.flex.items-center.gap-1 {
  animation: fadeIn 0.6s ease-out;
}

.flex.items-center.gap-1:nth-child(1) { animation-delay: 0.2s; }
.flex.items-center.gap-1:nth-child(2) { animation-delay: 0.4s; }
.flex.items-center.gap-1:nth-child(3) { animation-delay: 0.6s; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Contact info hover effects */
a[href^="tel:"],
a[href^="mailto:"] {
  transition: all 0.2s ease;
}

a[href^="tel:"]:hover,
a[href^="mailto:"]:hover {
  transform: translateY(-1px);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>