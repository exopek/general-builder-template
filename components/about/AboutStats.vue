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

      <!-- Main Stats Grid -->
      <StatisticGrid
        v-if="stats && stats.length > 0"
        :statistics="stats"
        grid-type="auto"
        gap="lg"
        :default-size="statSize"
        default-variant="primary"
        :default-count-up="true"
        animation="stagger"
        :show-context="showContext"
        :context-text="contextText"
        container-class="mb-16"
      />

    </div>
  </section>
</template>

<script setup lang="ts">
import StatisticGrid from '~/components/design-system-section-components/StatisticGrid.vue'
interface Stat {
  label: string
  value: number
  suffix?: string
  description?: string
  iconName?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  variant?: 'default' | 'primary' | 'secondary' | 'gradient' | 'minimal'
  showTrend?: boolean
  trendValue?: number
  trendSuffix?: string
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Stats
  stats?: Stat[]
  statSize?: 'sm' | 'md' | 'lg' | 'xl'

  // Context
  showContext?: boolean
  contextText?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Das <span style="color: #f97316;">Exopek Gym</span> in Zahlen',
  subheadline: 'Diese Zahlen zeigen, was echtes funktionelles Training und eine starke Community bewirken können.',
  badgeText: 'Unsere Zahlen',
  showBadge: true,

  stats: () => [
    {
      label: 'Aktive Mitglieder',
      value: 800,
      suffix: '+',
      description: 'Teil unserer Trainingsgemeinschaft',
      iconName: 'people',
      variant: 'primary',
      showTrend: true,
      trendValue: 15,
      trendSuffix: '%'
    },
    {
      label: 'Trainingsstunden',
      value: 5000,
      suffix: '+',
      description: 'Funktionelles Training absolviert',
      iconName: 'target',
      variant: 'primary'
    },
    {
      label: 'Qualifizierte Trainer',
      value: 8,
      description: 'Experten für funktionelles Training',
      iconName: 'award',
      variant: 'primary'
    },
    {
      label: 'Mitgliederzufriedenheit',
      value: 98,
      suffix: '%',
      description: 'Bewertung unserer Community',
      iconName: 'heart',
      variant: 'primary'
    }
  ],
  statSize: 'lg',

  showContext: true,
  contextText: 'Diese Zahlen spiegeln wider, was echte Community und leidenschaftliches Coaching bewirken können. Jede einzelne Zahl steht für Menschen, die stärker geworden sind.',

  backgroundColor: '#f8fafc',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280',
  textColor: '#374151'
})

// Note: Grid classes logic moved to BaseStatisticGrid component
</script>

<style scoped>
/* Animation styles moved to BaseStatisticGrid component */
</style>