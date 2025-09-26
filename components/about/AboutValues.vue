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

      <!-- Values Grid -->
      <div v-if="values && values.length > 0" class="mb-16">
        <div
          class="grid gap-8"
          :class="getGridClasses(values.length)"
        >
          <AboutCard
            v-for="(value, index) in values"
            :key="index"
            :variant="cardVariant"
            :size="cardSize"
            :title="value.title"
            :description="value.description"
            :icon-name="value.iconName"
            :icon-variant="iconVariant"
            :hover-effect="true"
            class="value-card"
          />
        </div>
      </div>

      <!-- Mission Statement -->
      <div v-if="showMission" class="mb-16">
        <div class="max-w-4xl mx-auto text-center">
          <h3
            class="text-2xl md:text-3xl font-bold mb-6"
            :style="{ color: headlineColor }"
          >
            {{ missionTitle }}
          </h3>
          <div class="card-glass p-8 md:p-12 rounded-2xl backdrop-blur-lg">
            <p
              class="text-lg md:text-xl leading-relaxed"
              :style="{ color: textColor }"
            >
              {{ missionStatement }}
            </p>
          </div>
        </div>
      </div>

      <!-- Vision Section -->
      <div v-if="showVision" class="mb-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h3
              class="text-2xl md:text-3xl font-bold"
              :style="{ color: headlineColor }"
            >
              {{ visionTitle }}
            </h3>
            <p
              class="text-base md:text-lg leading-relaxed"
              :style="{ color: textColor }"
            >
              {{ visionStatement }}
            </p>

            <!-- Vision Goals -->
            <div v-if="visionGoals && visionGoals.length > 0" class="space-y-3">
              <div
                v-for="goal in visionGoals"
                :key="goal"
                class="flex items-start gap-3"
              >
                <div class="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                <span class="text-base" :style="{ color: textColor }">{{ goal }}</span>
              </div>
            </div>
          </div>

          <div class="relative">
            <img
              v-if="visionImage"
              :src="visionImage"
              :alt="visionImageAlt"
              class="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
            <!-- Fallback: Values stats -->
            <div v-else class="grid grid-cols-2 gap-4">
              <AboutStatistic
                :value="98"
                label="Mitgliederzufriedenheit"
                suffix="%"
                icon-name="heart"
                variant="primary"
                size="sm"
              />
              <AboutStatistic
                :value="8"
                label="Qualifizierte Trainer"
                suffix=""
                icon-name="people"
                variant="primary"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div v-if="showCta" class="text-center">
        <div class="max-w-2xl mx-auto space-y-6">
          <h3
            class="text-2xl md:text-3xl font-bold"
            :style="{ color: headlineColor }"
          >
            {{ ctaTitle }}
          </h3>
          <p
            class="text-base md:text-lg"
            :style="{ color: subheadlineColor }"
          >
            {{ ctaSubtitle }}
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
interface Value {
  title: string
  description: string
  iconName: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Values
  values?: Value[]
  cardVariant?: 'default' | 'elevated' | 'glass'
  cardSize?: 'sm' | 'md' | 'lg'
  iconVariant?: 'primary' | 'secondary' | 'accent'

  // Mission
  showMission?: boolean
  missionTitle?: string
  missionStatement?: string

  // Vision
  showVision?: boolean
  visionTitle?: string
  visionStatement?: string
  visionGoals?: string[]
  visionImage?: string
  visionImageAlt?: string

  // CTA
  showCta?: boolean
  ctaTitle?: string
  ctaSubtitle?: string
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
  headline: 'Unsere <span style="color: #f97316;">Trainings-Philosophie</span>',
  subheadline: 'Diese Grundsätze prägen unser Training und unseren Umgang miteinander im Exopek Gym. Sie machen uns zu mehr als nur einem Fitnessstudio.',
  badgeText: 'Unsere Werte',
  showBadge: true,

  values: () => [
    {
      title: 'Funktionelles Training',
      description: 'Wir trainieren Bewegungen, nicht nur Muskeln. Jede Übung hat einen direkten Bezug zum echten Leben.',
      iconName: 'target'
    },
    {
      title: 'Individuelle Betreuung',
      description: 'Jeder Körper ist anders. Unsere Trainer passen das Training an deine persönlichen Ziele und Bedürfnisse an.',
      iconName: 'people'
    },
    {
      title: 'Sicherheit First',
      description: 'Korrekte Ausführung und Verletzungsprävention stehen immer an erster Stelle - vor Gewicht und Geschwindigkeit.',
      iconName: 'shield'
    },
    {
      title: 'Community Spirit',
      description: 'Wir unterstützen uns gegenseitig, feiern Erfolge zusammen und schaffen eine Atmosphäre des Vertrauens.',
      iconName: 'heart'
    }
  ],
  cardVariant: 'elevated',
  cardSize: 'md',
  iconVariant: 'primary',

  showMission: true,
  missionTitle: 'Unsere Mission',
  missionStatement: 'Wir helfen Menschen dabei, stärker, beweglicher und selbstbewusster zu werden - nicht nur körperlich, sondern auch mental. Unser funktionelles Training soll dich auf die Herausforderungen des echten Lebens vorbereiten.',

  showVision: true,
  visionTitle: 'Unsere Vision',
  visionStatement: 'Wir wollen das Exopek Gym zur ersten Adresse für funktionelles Training in Hannover machen. Ein Ort, wo Menschen nicht nur trainieren, sondern eine Lebenseinstellung entwickeln, die sie stärker macht.',
  visionGoals: () => [
    'Hannover-Lindens Trainingsgemeinschaft Nummer 1',
    'Jedes Mitglied erreicht seine persönlichen Ziele',
    'Vorbild für nachhaltiges und gesundes Training',
    'Eine Familie, die über das Gym hinaus besteht'
  ],
  visionImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
  visionImageAlt: 'Funktionelles Training im Exopek Gym',

  showCta: true,
  ctaTitle: 'Bereit für echtes Training?',
  ctaSubtitle: 'Wenn diese Werte zu dir passen, dann bist du bei uns richtig. Starte noch heute deine Transformation.',
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#probetraining',
  primaryCtaExternal: false,
  secondaryCtaText: 'Kurse entdecken',
  secondaryCtaUrl: '#kurse',
  secondaryCtaExternal: false,

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280',
  textColor: '#374151'
})

// Helper function for responsive grid classes
const getGridClasses = (valueCount: number): string => {
  if (valueCount === 1) return 'grid-cols-1 max-w-md mx-auto'
  if (valueCount === 2) return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
  if (valueCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  if (valueCount <= 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'
  if (valueCount <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
}
</script>

<style scoped>
.value-card {
  animation: fadeInUp 0.8s ease-out;
}

.value-card:nth-child(1) { animation-delay: 0.1s; }
.value-card:nth-child(2) { animation-delay: 0.2s; }
.value-card:nth-child(3) { animation-delay: 0.3s; }
.value-card:nth-child(4) { animation-delay: 0.4s; }
.value-card:nth-child(5) { animation-delay: 0.5s; }
.value-card:nth-child(6) { animation-delay: 0.6s; }

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

.card-glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.shadow-lg:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-xl);
  transition: all 0.3s ease;
}
</style>