<template>
  <span
    class="inline-flex items-center gap-1 font-semibold rounded-full whitespace-nowrap leading-none font-family-primary transition-all duration-150"
    :class="[
      variantClasses,
      sizeClasses,
      positionClasses,
      {
        'animate-bounce': animated,
        'cursor-pointer transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0': clickable
      }
    ]"
    @click="handleClick"
  >
    <component
      v-if="icon"
      :is="icon"
      class="flex-shrink-0"
      :class="iconSizeClass"
    />

    <span class="leading-none">{{ text }}</span>

    <span v-if="count" class="bg-black/20 rounded-full px-1.5 py-0.5 text-xs font-bold ml-1">{{ count }}</span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string
  variant?: 'new' | 'popular' | 'featured' | 'limited' | 'success' | 'warning' | 'info' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  position?: 'static' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  icon?: string
  count?: number | string
  animated?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'featured',
  size: 'md',
  position: 'static',
  animated: false,
  clickable: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const hasIcon = computed(() => !!props.icon)

const variantClasses = computed(() => {
  const variants = {
    new: 'bg-gradient-warm text-white',
    popular: 'bg-orange-500 text-white',
    featured: 'bg-gradient-warm text-white',
    limited: 'bg-purple-600 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-400 text-gray-900',
    info: 'bg-blue-500 text-white',
    neutral: 'bg-gray-200 text-gray-700'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  return sizes[props.size]
})

const positionClasses = computed(() => {
  if (props.position === 'static') return ''

  const positions = {
    'top-right': 'absolute -top-2 -right-2 z-10',
    'top-left': 'absolute -top-2 -left-2 z-10',
    'bottom-right': 'absolute -bottom-2 -right-2 z-10',
    'bottom-left': 'absolute -bottom-2 -left-2 z-10'
  }
  return positions[props.position as keyof typeof positions] || ''
})

const iconSizeClass = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  }
  return sizes[props.size]
})

const handleClick = (event: Event) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Badge hover effects */
.badge-container {
  transition: transform 0.2s ease;
}

.badge-container:hover {
  transform: translateY(-1px);
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .px-4 {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  .px-3 {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>