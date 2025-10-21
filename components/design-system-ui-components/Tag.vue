<template>
  <span
    class="inline-flex items-center gap-1.5 font-medium rounded-lg border transition-all"
    :class="[variantClass, sizeClass]"
  >
    <component v-if="icon" :is="icon" class="w-4 h-4 flex-shrink-0" />

    <slot>{{ text }}</slot>

    <button
      v-if="closable"
      type="button"
      class="flex-shrink-0 hover:opacity-70 transition-opacity"
      @click="handleClose"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-3.5 h-3.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const variantClass = computed(() => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200'
  }
  return variants[props.variant]
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1.5',
    lg: 'text-base px-3 py-2'
  }
  return sizes[props.size]
})

const handleClose = () => {
  emit('close')
}
</script>
