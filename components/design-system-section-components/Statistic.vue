<template>
  <div
    class="stat-card flex flex-col items-center text-center hover:-translate-y-0.5 transition-all duration-300"
    :class="[
      variantClasses,
      sizeClasses,
      alignmentClasses,
      { 'animate-bounce': animated }
    ]"
  >
    <!-- Icon (optional) -->
    <div
      v-if="icon || iconName"
      class="mb-2"
    >
      <component
        :is="icon || 'AboutIcon'"
        v-if="icon || iconName"
        :icon="icon"
        :name="iconName"
        :variant="iconVariant"
        :size="iconSize"
      />
    </div>

    <!-- Label (optional, can be above or below) -->
    <div
      v-if="label && labelPosition === 'top'"
      class="font-medium uppercase tracking-wider opacity-80"
      :class="[labelSizeClass, labelColorClass]"
    >
      {{ label }}
    </div>

    <!-- Main statistic display -->
    <div class="flex items-baseline justify-center gap-1 my-2">
      <span
        class="stat-number font-black leading-none"
        :class="[numberSizeClass, numberColorClass]"
        :style="numberStyles"
      >
        {{ displayValue }}
      </span>
      <span v-if="suffix" class="font-semibold opacity-80 text-gray-600" :class="suffixSizeClass">{{ suffix }}</span>
    </div>

    <!-- Label (when positioned below number) -->
    <div
      v-if="label && labelPosition === 'bottom'"
      class="font-medium uppercase tracking-wider opacity-80"
      :class="[labelSizeClass, labelColorClass]"
    >
      {{ label }}
    </div>

    <!-- Description (optional additional context) -->
    <div v-if="description" class="opacity-90 leading-relaxed" :class="descriptionSizeClass">
      {{ description }}
    </div>

    <!-- Progress bar (for goals/targets) -->
    <div v-if="showProgress && maxValue" class="w-full" :class="progressContainerClass">
      <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1" :class="progressBarClass">
        <div
          class="h-full rounded-full transition-all duration-1000 ease-out"
          :class="progressFillClass"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      <div class="text-xs font-medium opacity-80">
        {{ Math.round(progressPercentage) }}% {{ progressLabel || 'erreicht' }}
      </div>
    </div>

    <!-- Trending indicator (growth/decline) -->
    <div v-if="showTrend && trendValue" class="flex items-center gap-1 mt-1">
      <svg
        v-if="trendValue > 0"
        class="w-4 h-4 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7M17 7H7"/>
      </svg>
      <svg
        v-else-if="trendValue < 0"
        class="w-4 h-4 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-9.2 9.2M7 7v10M7 7h10"/>
      </svg>
      <span
        class="text-xs font-medium"
        :class="trendValue > 0 ? 'text-green-500' : 'text-red-500'"
      >
        {{ Math.abs(trendValue) }}{{ trendSuffix }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // Main data
  value: number
  targetValue?: number
  maxValue?: number
  label?: string
  description?: string
  suffix?: string

  // Icon
  icon?: string // Custom component
  iconName?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  iconVariant?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'neutral'
  iconSize?: 'sm' | 'md' | 'lg'

  // Styling
  variant?: 'default' | 'primary' | 'secondary' | 'gradient' | 'glass' | 'minimal' | 'highlight'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  alignment?: 'left' | 'center' | 'right'
  labelPosition?: 'top' | 'bottom'

  // Animations & Effects
  animated?: boolean
  countUp?: boolean
  duration?: number

  // Progress & Trends
  showProgress?: boolean
  progressLabel?: string
  showTrend?: boolean
  trendValue?: number
  trendSuffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  alignment: 'center',
  labelPosition: 'bottom',
  iconVariant: 'primary',
  iconSize: 'md',
  animated: false,
  countUp: true,
  showProgress: false,
  showTrend: false,
  duration: 2000,
  trendSuffix: '%'
})

const displayValue = ref(props.countUp ? 0 : props.value)

// Computed Classes
const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white border border-gray-200 text-gray-900',
    primary: 'bg-white border-l-4 border-l-primary text-gray-900 shadow-sm',
    secondary: 'bg-secondary text-white',
    gradient: 'bg-gradient-warm text-white',
    glass: 'card-glass text-gray-900',
    minimal: 'bg-transparent text-gray-900',
    highlight: 'bg-yellow-50 border border-yellow-200 text-gray-900'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'p-3 gap-1',
    md: 'p-4 gap-2',
    lg: 'p-6 gap-3',
    xl: 'p-8 gap-4'
  }
  return sizes[props.size]
})

const alignmentClasses = computed(() => {
  const alignments = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }
  return alignments[props.alignment]
})

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }
  return sizes[props.size]
})

const numberSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-4xl',
    lg: 'text-3xl md:text-5xl',
    xl: 'text-4xl md:text-6xl'
  }
  return sizes[props.size]
})

const suffixSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  }
  return sizes[props.size]
})

const descriptionSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs max-w-32',
    md: 'text-sm max-w-40',
    lg: 'text-base max-w-48',
    xl: 'text-lg max-w-56'
  }
  return sizes[props.size]
})

const labelColorClass = computed(() => {
  return props.variant === 'gradient' || props.variant === 'secondary' ? 'text-white/80' : 'text-gray-500'
})

const numberColorClass = computed(() => {
  if (props.variant === 'gradient') return ''
  if (props.variant === 'primary') return 'text-primary'
  return 'text-current'
})

const progressContainerClass = computed(() => {
  const sizes = {
    sm: 'max-w-32 mt-2',
    md: 'max-w-40 mt-2',
    lg: 'max-w-48 mt-3',
    xl: 'max-w-56 mt-3'
  }
  return sizes[props.size]
})

const progressBarClass = computed(() => {
  const variants = {
    default: 'bg-gray-200',
    primary: 'bg-gray-200',
    secondary: 'bg-white/20',
    gradient: 'bg-white/20',
    glass: 'bg-white/30',
    minimal: 'bg-gray-200',
    highlight: 'bg-yellow-200'
  }
  return variants[props.variant]
})

const progressFillClass = computed(() => {
  const variants = {
    default: 'bg-primary',
    primary: 'bg-primary',
    secondary: 'bg-white',
    gradient: 'bg-gradient-warm',
    glass: 'bg-primary',
    minimal: 'bg-primary',
    highlight: 'bg-yellow-500'
  }
  return variants[props.variant]
})

const numberStyles = computed(() => {
  if (props.variant === 'gradient') {
    return {
      background: 'var(--gradient-warm)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    }
  }
  return {}
})

const progressPercentage = computed(() => {
  if (!props.maxValue) return 0
  return Math.min((props.value / props.maxValue) * 100, 100)
})

// Count up animation
const animateCountUp = () => {
  if (!props.countUp) {
    displayValue.value = props.value
    return
  }

  if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') {
    displayValue.value = props.value
    return
  }

  const startValue = 0
  const endValue = props.value
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)

    displayValue.value = Math.round(startValue + (endValue - startValue) * easeOutCubic)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// Watch for value changes
watch(() => props.value, () => {
  if (props.countUp) {
    animateCountUp()
  } else {
    displayValue.value = props.value
  }
}, { immediate: true })

onMounted(() => {
  if (props.countUp && typeof window !== 'undefined') {
    setTimeout(() => {
      animateCountUp()
    }, 100)
  }
})
</script>

<style scoped>
/* Enhanced stat card styling */
.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.stat-card:hover {
  box-shadow: var(--shadow-lg);
}

/* Glass morphism effect */
.card-glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive number sizing */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }

  .text-5xl {
    font-size: 2.5rem;
  }

  .text-4xl {
    font-size: 2rem;
  }
}

/* Trend indicator animations */
.text-green-500,
.text-red-500 {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* Suffix sizing relative to number */
.text-2xl + .font-semibold,
.text-4xl + .font-semibold,
.text-5xl + .font-semibold,
.text-6xl + .font-semibold {
  font-size: 0.6em;
}
</style>