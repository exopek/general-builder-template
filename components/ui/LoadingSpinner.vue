<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div
      class="animate-spin rounded-full border-gray-300 border-t-current"
      :class="[
        size === 'sm' && 'h-4 w-4 border-2',
        size === 'md' && 'h-6 w-6 border-2', 
        size === 'lg' && 'h-8 w-8 border-3',
        size === 'xl' && 'h-12 w-12 border-4',
        colorClass
      ]"
    ></div>
    <span v-if="text" class="ml-3 text-sm font-medium" :class="textColorClass">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  color?: 'primary' | 'secondary' | 'white' | 'gray'
  center?: boolean
  fullHeight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  center: false,
  fullHeight: false
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'text-blue-600'
    case 'secondary':
      return 'text-gray-600'
    case 'white':
      return 'text-white'
    case 'gray':
      return 'text-gray-400'
    default:
      return 'text-blue-600'
  }
})

const textColorClass = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'text-blue-600'
    case 'secondary':
      return 'text-gray-600'
    case 'white':
      return 'text-white'
    case 'gray':
      return 'text-gray-400'
    default:
      return 'text-blue-600'
  }
})

const containerClass = computed(() => {
  const classes = []
  
  if (props.center) {
    classes.push('justify-center')
  }
  
  if (props.fullHeight) {
    classes.push('min-h-[200px]')
  }
  
  return classes
})
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}
</style>