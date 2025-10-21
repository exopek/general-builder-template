<template>
  <div
    class="animate-pulse bg-gray-200 rounded"
    :class="[variantClass, sizeClass, customClass]"
  />
</template>

<script setup lang="ts">
interface Props {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: string
  height?: string
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'rectangular',
  size: 'md',
  customClass: ''
})

const variantClass = computed(() => {
  const variants = {
    text: 'rounded-md',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded',
    rounded: 'rounded-xl'
  }
  return variants[props.variant]
})

const sizeClass = computed(() => {
  if (props.width || props.height) return ''

  const sizes = {
    text: {
      sm: 'h-3 w-20',
      md: 'h-4 w-32',
      lg: 'h-5 w-48',
      xl: 'h-6 w-64'
    },
    circular: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24'
    },
    rectangular: {
      sm: 'h-16 w-full',
      md: 'h-24 w-full',
      lg: 'h-32 w-full',
      xl: 'h-48 w-full'
    },
    rounded: {
      sm: 'h-16 w-full',
      md: 'h-24 w-full',
      lg: 'h-32 w-full',
      xl: 'h-48 w-full'
    }
  }

  return sizes[props.variant][props.size]
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
