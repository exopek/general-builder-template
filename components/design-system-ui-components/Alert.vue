<template>
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-1"
  >
    <div
      v-if="show"
      class="flex items-start p-4 rounded-lg border"
      :class="[variantClass, sizeClass]"
      role="alert"
    >
      <div v-if="showIcon" class="flex-shrink-0">
        <component :is="iconComponent" class="w-5 h-5" :class="iconColorClass" />
      </div>

      <div class="flex-1" :class="showIcon ? 'ml-3' : ''">
        <h3 v-if="title" class="font-semibold mb-1" :class="titleSizeClass">
          {{ title }}
        </h3>

        <div :class="descriptionSizeClass">
          <slot>{{ description }}</slot>
        </div>
      </div>

      <button
        v-if="closable"
        type="button"
        class="flex-shrink-0 ml-4 hover:opacity-70 transition-opacity"
        @click="handleClose"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
          :class="iconColorClass"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  description?: string
  showIcon?: boolean
  closable?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  size: 'md',
  showIcon: true,
  closable: false,
  modelValue: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const show = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  show.value = newValue
})

const variantClass = computed(() => {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900'
  }
  return variants[props.variant]
})

const iconColorClass = computed(() => {
  const colors = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  }
  return colors[props.variant]
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const titleSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const descriptionSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})

const iconComponent = computed(() => {
  const icons = {
    info: 'svg',
    success: 'svg',
    warning: 'svg',
    error: 'svg'
  }
  return icons[props.variant]
})

const handleClose = () => {
  show.value = false
  emit('update:modelValue', false)
  emit('close')
}
</script>

<script lang="ts">
// SVG icon templates as inline components
const iconTemplates = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>',
  success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  error: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
}
</script>
