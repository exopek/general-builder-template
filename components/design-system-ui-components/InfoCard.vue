<template>
  <div
    :class="[
      'card p-6 transition-all',
      borderClass,
      bgClass,
      hoverEffect ? 'hover:shadow-lg' : '',
      customClass
    ]"
  >
    <h3 v-if="title" :class="['font-semibold text-gray-900 mb-3', titleSizeClass]">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  titleSize?: 'sm' | 'md' | 'lg' | 'xl'
  borderPosition?: 'none' | 'left' | 'top' | 'right' | 'bottom' | 'all'
  borderColor?: 'primary' | 'accent-blue' | 'accent-purple' | 'accent-green' | 'accent-yellow' | 'gray'
  bgColor?: 'white' | 'gray' | 'primary' | 'yellow'
  hoverEffect?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  titleSize: 'xl',
  borderPosition: 'none',
  borderColor: 'primary',
  bgColor: 'white',
  hoverEffect: false,
  customClass: ''
})

const titleSizeClass = computed(() => {
  const sizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-xl'
  }
  return sizes[props.titleSize]
})

const borderClass = computed(() => {
  if (props.borderPosition === 'none') return ''

  const colors = {
    'primary': 'border-primary',
    'accent-blue': 'border-accent-blue',
    'accent-purple': 'border-accent-purple',
    'accent-green': 'border-accent-green',
    'accent-yellow': 'border-accent-yellow',
    'gray': 'border-gray-300'
  }

  const positions = {
    left: 'border-l-4',
    top: 'border-t-4',
    right: 'border-r-4',
    bottom: 'border-b-4',
    all: 'border-2'
  }

  return `${positions[props.borderPosition]} ${colors[props.borderColor]}`
})

const bgClass = computed(() => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary/5',
    yellow: 'bg-yellow-50'
  }
  return backgrounds[props.bgColor]
})
</script>
