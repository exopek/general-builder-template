<template>
  <div
    class="stat-card flex flex-col items-center text-center hover:-translate-y-0.5"
    :class="[
      variantClasses,
      sizeClasses,
      { 'animate-bounce': animated }
    ]"
  >
    <div v-if="label" class="text-sm font-medium uppercase tracking-wider opacity-80 mb-1"
         :class="labelSizeClass">{{ label }}</div>

    <div class="flex items-baseline justify-center gap-1">
      <span
        class="stat-number font-black leading-none"
        :class="[numberSizeClass, numberColorClass]"
        :style="numberStyles"
      >
        {{ displayValue }}
      </span>
      <span v-if="suffix" class="text-sm font-semibold opacity-80">{{ suffix }}</span>
    </div>

    <div v-if="description" class="opacity-90 leading-relaxed max-w-48"
         :class="descriptionSizeClass">{{ description }}</div>

    <div v-if="showProgress && maxValue" class="w-full max-w-48">
      <div class="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-1"
           :class="progressBarClass">
        <div
          class="h-full bg-gradient-warm rounded-full transition-all duration-1000 ease-out"
          :class="progressFillClass"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      <div class="text-xs font-medium opacity-80">
        {{ Math.round(progressPercentage) }}% erreicht
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number
  targetValue?: number
  maxValue?: number
  label?: string
  description?: string
  suffix?: string
  variant?: 'primary' | 'secondary' | 'gradient' | 'minimal' | 'highlight'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  countUp?: boolean
  showProgress?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  animated: false,
  countUp: true,
  showProgress: false,
  duration: 2000
})

const displayValue = ref(props.countUp ? 0 : props.value)

const variantClasses = computed(() => {
  const variants = {
    primary: 'border-l-primary text-gray-900',
    secondary: 'bg-secondary text-white border-l-secondary',
    gradient: 'bg-gradient-warm text-white border-l-primary',
    minimal: 'bg-transparent text-gray-900 border-l-gray-300',
    highlight: 'bg-yellow-400 text-gray-900 border-l-primary'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }
  return sizes[props.size]
})

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-base'
  }
  return sizes[props.size]
})

const numberSizeClass = computed(() => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl'
  }
  return sizes[props.size]
})

const descriptionSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs max-w-36',
    md: 'text-sm max-w-48',
    lg: 'text-base max-w-60',
    xl: 'text-base max-w-64'
  }
  return sizes[props.size]
})

const numberColorClass = computed(() => {
  return props.variant === 'gradient' ? '' : 'text-current'
})

const progressBarClass = computed(() => {
  const variants = {
    primary: 'bg-gray-200',
    secondary: 'bg-white/20',
    gradient: 'bg-white/20',
    minimal: 'bg-gray-200',
    highlight: 'bg-orange-500/20'
  }
  return variants[props.variant]
})

const progressFillClass = computed(() => {
  const variants = {
    primary: 'bg-orange-500',
    secondary: 'bg-white',
    gradient: 'bg-gradient-warm',
    minimal: 'bg-orange-500',
    highlight: 'bg-orange-500'
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

  // Check if we're in browser environment
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
    // Small delay for better visual effect
    setTimeout(() => {
      animateCountUp()
    }, 100)
  }
})
</script>

<style scoped>
/* Suffix sizing relative to number */
.text-2xl + .text-xs,
.text-4xl + .text-xs,
.text-5xl + .text-xs,
.text-6xl + .text-xs {
  font-size: 0.6em;
}

/* Counter animation */
.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
</style>