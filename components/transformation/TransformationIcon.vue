<template>
  <div
    class="inline-flex items-center justify-center flex-shrink-0 relative transition-all duration-300 hover:-translate-y-0.5"
    :class="[
      variantClasses,
      sizeClasses,
      shapeClasses,
      { 'animate-pulse': animated }
    ]"
  >
    <component
      v-if="icon"
      :is="icon"
      class="w-3/5 h-3/5 flex-shrink-0"
    />
    <div v-else-if="emoji" class="text-3/5 leading-none">
      {{ emoji }}
    </div>
    <div v-else class="w-full h-full flex items-center justify-center opacity-50">
      <svg viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  emoji?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'rounded' | 'square'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  shape: 'circle',
  animated: false
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-orange-500',
    secondary: 'bg-blue-900 text-white hover:bg-blue-800',
    accent: 'bg-blue-500 text-white hover:bg-purple-500',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  return sizes[props.size]
})

const shapeClasses = computed(() => {
  const shapes = {
    circle: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none'
  }
  return shapes[props.shape]
})
</script>

<style scoped>
/* Icon hover effects */
.icon-container {
  transition: transform 0.2s ease;
}

.icon-container:hover {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .w-16 {
    width: 3rem;
    height: 3rem;
  }

  .w-12 {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>