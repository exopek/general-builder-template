<template>
  <div
    v-if="statistics && statistics.length > 0"
    class="statistic-grid-container"
    :class="containerClasses"
  >
    <div
      class="grid"
      :class="[gridClasses, gapClasses, maxWidthClasses]"
    >
      <BaseStatistic
        v-for="(statistic, index) in statistics"
        :key="statistic.key || index"
        v-bind="getStatisticProps(statistic, index)"
        :class="[animationClass, getAnimationDelay(index)]"
        class="statistic-item"
      />
    </div>

    <!-- Optional context/description -->
    <div v-if="showContext && contextText" class="text-center mt-6">
      <p class="text-base md:text-lg max-w-2xl mx-auto opacity-80">
        {{ contextText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StatisticData {
  key?: string
  value: number
  label: string
  suffix?: string
  description?: string
  iconName?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  variant?: 'default' | 'primary' | 'secondary' | 'gradient' | 'glass' | 'minimal' | 'highlight'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  countUp?: boolean
  showTrend?: boolean
  trendValue?: number
  trendSuffix?: string
  showProgress?: boolean
  maxValue?: number
  progressLabel?: string
}

interface Props {
  // Statistics data
  statistics: StatisticData[]

  // Grid layout
  gridType?: 'auto' | 'fixed-2' | 'fixed-3' | 'fixed-4' | 'fixed-5' | 'fixed-6'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none'
  alignment?: 'left' | 'center' | 'right'

  // Default props for all statistics (can be overridden per statistic)
  defaultSize?: 'sm' | 'md' | 'lg' | 'xl'
  defaultVariant?: 'default' | 'primary' | 'secondary' | 'gradient' | 'glass' | 'minimal' | 'highlight'
  defaultAnimated?: boolean
  defaultCountUp?: boolean

  // Animation
  animation?: 'none' | 'stagger' | 'fade' | 'slide-up'
  animationDuration?: number

  // Context
  showContext?: boolean
  contextText?: string

  // Styling
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  gridType: 'auto',
  gap: 'md',
  maxWidth: 'none',
  alignment: 'center',
  defaultSize: 'md',
  defaultVariant: 'primary',
  defaultAnimated: true,
  defaultCountUp: true,
  animation: 'stagger',
  animationDuration: 100,
  showContext: false
})

// Computed classes
const containerClasses = computed(() => [
  props.containerClass,
  {
    'text-left': props.alignment === 'left',
    'text-center': props.alignment === 'center',
    'text-right': props.alignment === 'right'
  }
])

const gridClasses = computed(() => {
  const count = props.statistics.length

  if (props.gridType === 'fixed-2') return 'grid-cols-1 md:grid-cols-2'
  if (props.gridType === 'fixed-3') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  if (props.gridType === 'fixed-4') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  if (props.gridType === 'fixed-5') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  if (props.gridType === 'fixed-6') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'

  // Auto grid based on count
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-1 md:grid-cols-2'
  if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  if (count <= 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  if (count <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
})

const gapClasses = computed(() => {
  const gaps = {
    sm: 'gap-3 md:gap-4',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8',
    xl: 'gap-8 md:gap-12'
  }
  return gaps[props.gap]
})

const maxWidthClasses = computed(() => {
  if (props.maxWidth === 'none') return ''

  const maxWidths = {
    sm: 'max-w-2xl mx-auto',
    md: 'max-w-4xl mx-auto',
    lg: 'max-w-6xl mx-auto',
    xl: 'max-w-7xl mx-auto',
    full: 'max-w-full',
    none: ''
  }
  return maxWidths[props.maxWidth] || ''
})

const animationClass = computed(() => {
  if (props.animation === 'none') return ''
  if (props.animation === 'fade') return 'animate-fade-in'
  if (props.animation === 'slide-up') return 'animate-slide-up'
  return 'animate-stagger' // default stagger
})

// Helper functions
const getStatisticProps = (statistic: StatisticData, index: number) => {
  return {
    value: statistic.value,
    label: statistic.label,
    suffix: statistic.suffix,
    description: statistic.description,
    iconName: statistic.iconName,
    variant: statistic.variant || props.defaultVariant,
    size: statistic.size || props.defaultSize,
    animated: statistic.animated ?? props.defaultAnimated,
    countUp: statistic.countUp ?? props.defaultCountUp,
    showTrend: statistic.showTrend || false,
    trendValue: statistic.trendValue,
    trendSuffix: statistic.trendSuffix,
    showProgress: statistic.showProgress || false,
    maxValue: statistic.maxValue,
    progressLabel: statistic.progressLabel
  }
}

const getAnimationDelay = (index: number): string => {
  if (props.animation === 'none' || props.animation === 'fade') return ''
  return `animation-delay-${index + 1}`
}
</script>

<style scoped>
/* Animation classes */
.animate-stagger {
  animation: slideInUp 0.8s ease-out backwards;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out backwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out backwards;
}

/* Animation delays */
.animation-delay-1 { animation-delay: 0.1s; }
.animation-delay-2 { animation-delay: 0.2s; }
.animation-delay-3 { animation-delay: 0.3s; }
.animation-delay-4 { animation-delay: 0.4s; }
.animation-delay-5 { animation-delay: 0.5s; }
.animation-delay-6 { animation-delay: 0.6s; }
.animation-delay-7 { animation-delay: 0.7s; }
.animation-delay-8 { animation-delay: 0.8s; }

/* Keyframes */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .statistic-item {
    margin-bottom: 1rem;
  }
}

/* Hover enhancement for grid */
.statistic-grid-container:hover .statistic-item {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.statistic-grid-container:hover .statistic-item:not(:hover) {
  opacity: 0.8;
  transform: scale(0.98);
}

.statistic-grid-container .statistic-item:hover {
  transform: scale(1.02);
}
</style>