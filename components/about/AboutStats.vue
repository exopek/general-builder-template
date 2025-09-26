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
      <div v-if="stats && stats.length > 0" class="mb-16">
        <div
          class="grid gap-6 lg:gap-8"
          :class="getGridClasses(stats.length)"
        >
          <AboutStatistic
            v-for="(stat, index) in stats"
            :key="index"
            :value="stat.value"
            :label="stat.label"
            :suffix="stat.suffix"
            :description="stat.description"
            :icon-name="stat.iconName"
            :variant="stat.variant || 'primary'"
            :size="statSize"
            :show-trend="stat.showTrend"
            :trend-value="stat.trendValue"
            :trend-suffix="stat.trendSuffix"
            :count-up="true"
            class="main-stat"
          />
        </div>
      </div>

      <!-- Additional Context -->
      <div v-if="showContext" class="text-center">
        <p
          class="text-base md:text-lg max-w-2xl mx-auto"
          :style="{ color: textColor }"
        >
          {{ contextText }}
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
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

// Helper function for responsive grid classes
const getGridClasses = (statCount: number): string => {
  if (statCount === 1) return 'grid-cols-1 max-w-sm mx-auto'
  if (statCount === 2) return 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto'
  if (statCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  if (statCount <= 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  if (statCount <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
}
</script>

<style scoped>
.main-stat {
  animation: fadeInUp 0.8s ease-out;
}

.main-stat:nth-child(1) { animation-delay: 0.1s; }
.main-stat:nth-child(2) { animation-delay: 0.2s; }
.main-stat:nth-child(3) { animation-delay: 0.3s; }
.main-stat:nth-child(4) { animation-delay: 0.4s; }
.main-stat:nth-child(5) { animation-delay: 0.5s; }
.main-stat:nth-child(6) { animation-delay: 0.6s; }

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
</style>