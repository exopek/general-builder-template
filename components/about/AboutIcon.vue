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
    <!-- Custom Icon Component -->
    <component
      v-if="icon"
      :is="icon"
      class="w-3/5 h-3/5 flex-shrink-0"
    />

    <!-- Emoji Support -->
    <div v-else-if="emoji" class="text-3/5 leading-none">
      {{ emoji }}
    </div>

    <!-- SVG Icons for common About Us use cases -->
    <svg v-else-if="name === 'heart'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>

    <svg v-else-if="name === 'target'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>

    <svg v-else-if="name === 'people'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.5 2.5 0 0 0 17.5 7c-.8 0-1.54.37-2.01.95l-1.54-1.54C15.68 4.41 17.5 3 19.5 3c1.65 0 3.35 1.34 3.35 3 0 .34-.1.63-.24.95L24 22h-4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm1.5 1h-3C9.01 12.5 8 13.51 8 15v7h8v-7c0-1.49-1.01-2.5-3-2.5z"/>
    </svg>

    <svg v-else-if="name === 'shield'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
    </svg>

    <svg v-else-if="name === 'location'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>

    <svg v-else-if="name === 'award'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M5 16L3 21l5.5-2L12 21l3.5-2L21 21l-2-5 2-1V8c0-2.21-1.79-4-4-4H7c-2.21 0-4 1.79-4 4v7l2 1zm2.5-6.5C7.5 8.12 8.62 7 10 7s2.5 1.12 2.5 2.5S11.38 12 10 12s-2.5-1.12-2.5-2.5zM12 7c1.38 0 2.5 1.12 2.5 2.5S13.38 12 12 12s-2.5-1.12-2.5-2.5S10.62 7 12 7zm2 2.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5S15.88 7 14.5 7 12 8.12 12 9.5z"/>
    </svg>

    <svg v-else-if="name === 'handshake'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M11 6V4h2v2h2.5L13 7.5 10.5 6H11zm-1 2.5L6.5 10H2v2h3l3-1.5 3 1.5h3v-2h-4.5L8.5 8.5zM13 13v2.5L15.5 14h4.5v-2h-3l-3 1zm-1-1.5L8.5 10H4v2h3l3-1.5 3 1.5h3v-2h-4.5L13 11.5z"/>
    </svg>

    <svg v-else-if="name === 'lightbulb'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
    </svg>

    <svg v-else-if="name === 'linkedin'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>

    <svg v-else-if="name === 'twitter'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>

    <svg v-else-if="name === 'instagram'" viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>

    <!-- Default fallback icon -->
    <svg v-else viewBox="0 0 24 24" fill="currentColor" class="w-3/5 h-3/5 opacity-50">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // Icon types
  icon?: string  // Custom component
  emoji?: string  // Emoji character
  name?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb' | 'linkedin' | 'twitter' | 'instagram'  // Pre-defined SVG icons

  // Styling
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'neutral' | 'info'
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
    primary: 'bg-gradient-warm text-white hover:brightness-110',
    secondary: 'bg-blue-900 text-white hover:bg-blue-800',
    accent: 'bg-blue-500 text-white hover:bg-purple-500',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    info: 'bg-blue-500 text-white hover:bg-blue-600'
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
.hover\:-translate-y-0\.5:hover {
  transform: translateY(-0.125rem) scale(1.02);
}

/* Pulse animation for animated icons */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
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