<template>
  <div
    class="w-full mx-auto"
    :class="[maxWidthClass, paddingClass, customClass]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'none'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'xl',
  padding: 'md',
  centered: true,
  customClass: ''
})

const maxWidthClass = computed(() => {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '3xl': 'max-w-7xl',
    '4xl': 'max-w-[1400px]',
    '5xl': 'max-w-[1600px]',
    '6xl': 'max-w-[1800px]',
    '7xl': 'max-w-[2000px]',
    full: 'max-w-full',
    none: ''
  }
  return maxWidths[props.maxWidth]
})

const paddingClass = computed(() => {
  const paddings = {
    none: '',
    sm: 'px-2 md:px-4',
    md: 'px-4 md:px-6',
    lg: 'px-6 md:px-8',
    xl: 'px-8 md:px-12'
  }
  return paddings[props.padding]
})
</script>
