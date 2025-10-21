<template>
  <div class="w-full">
    <div v-if="showLabel" class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">{{ label }}</span>
      <span class="text-sm font-medium text-gray-700">{{ displayValue }}%</span>
    </div>

    <div
      v-if="type === 'linear'"
      class="w-full bg-gray-200 rounded-full overflow-hidden"
      :class="sizeClass"
    >
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="[colorClass, striped ? 'bg-stripes' : '']"
        :style="{ width: `${displayValue}%` }"
      >
        <div v-if="animated" class="h-full w-full animate-pulse" />
      </div>
    </div>

    <div
      v-else-if="type === 'circle'"
      class="relative inline-flex items-center justify-center"
    >
      <svg :width="circleSize" :height="circleSize" class="transform -rotate-90">
        <circle
          :cx="circleSize / 2"
          :cy="circleSize / 2"
          :r="radius"
          fill="none"
          stroke="currentColor"
          :stroke-width="strokeWidth"
          class="text-gray-200"
        />
        <circle
          :cx="circleSize / 2"
          :cy="circleSize / 2"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
          class="transition-all duration-300"
          :class="strokeColorClass"
        />
      </svg>

      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-sm font-semibold text-gray-700">
          {{ displayValue }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value?: number
  type?: 'linear' | 'circle'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  showLabel?: boolean
  label?: string
  striped?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  type: 'linear',
  size: 'md',
  color: 'primary',
  showLabel: false,
  striped: false,
  animated: false
})

const displayValue = computed(() => {
  return Math.min(Math.max(props.value, 0), 100)
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }
  return colors[props.color]
})

const strokeColorClass = computed(() => {
  const colors = {
    primary: 'text-primary',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    info: 'text-blue-500'
  }
  return colors[props.color]
})

const circleSize = computed(() => {
  const sizes = {
    sm: 80,
    md: 120,
    lg: 160
  }
  return sizes[props.size]
})

const strokeWidth = computed(() => {
  const widths = {
    sm: 4,
    md: 6,
    lg: 8
  }
  return widths[props.size]
})

const radius = computed(() => {
  return (circleSize.value - strokeWidth.value) / 2
})

const circumference = computed(() => {
  return 2 * Math.PI * radius.value
})

const dashOffset = computed(() => {
  return circumference.value * (1 - displayValue.value / 100)
})
</script>

<style scoped>
.bg-stripes {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}
</style>
