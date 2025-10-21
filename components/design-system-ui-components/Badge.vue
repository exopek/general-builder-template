<template>
  <span
    class="inline-flex items-center justify-center font-medium rounded-full transition-all"
    :class="[variantClass, sizeClass, dotPosition ? 'relative' : '']"
  >
    <span
      v-if="dot && !dotPosition"
      class="w-2 h-2 rounded-full mr-1.5"
      :class="dotColorClass"
    />

    <span v-if="dotPosition" class="absolute rounded-full" :class="[dotPositionClass, dotColorClass]" />

    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text?: string | number
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  dotPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  dot: false
})

const variantClass = computed(() => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    gray: 'bg-gray-200 text-gray-700'
  }
  return variants[props.variant]
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-0.5 min-w-5 h-5',
    md: 'text-sm px-2.5 py-1 min-w-6 h-6',
    lg: 'text-base px-3 py-1.5 min-w-7 h-7'
  }
  return sizes[props.size]
})

const dotColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    gray: 'bg-gray-400'
  }
  return colors[props.variant]
})

const dotPositionClass = computed(() => {
  if (!props.dotPosition) return ''

  const positions = {
    'top-right': 'top-0 right-0 w-2 h-2 border-2 border-white',
    'top-left': 'top-0 left-0 w-2 h-2 border-2 border-white',
    'bottom-right': 'bottom-0 right-0 w-2 h-2 border-2 border-white',
    'bottom-left': 'bottom-0 left-0 w-2 h-2 border-2 border-white'
  }
  return positions[props.dotPosition]
})
</script>
