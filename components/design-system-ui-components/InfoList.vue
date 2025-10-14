<template>
  <ul :class="['space-y-2', listStyleClass, textColorClass, customClass]">
    <slot />
  </ul>
</template>

<script setup lang="ts">
interface Props {
  listStyle?: 'disc' | 'decimal' | 'none' | 'check'
  textColor?: 'gray' | 'dark' | 'white'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  listStyle: 'disc',
  textColor: 'gray',
  customClass: ''
})

const listStyleClass = computed(() => {
  const styles = {
    disc: 'list-disc pl-6',
    decimal: 'list-decimal pl-6',
    none: 'list-none',
    check: 'list-none space-y-3'
  }
  return styles[props.listStyle]
})

const textColorClass = computed(() => {
  const colors = {
    gray: 'text-gray-700',
    dark: 'text-gray-900',
    white: 'text-white'
  }
  return colors[props.textColor]
})
</script>
