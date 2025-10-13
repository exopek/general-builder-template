<template>
  <div :class="['card p-6 transition-all', bgClass, borderClass, customClass]">
    <div v-if="icon || title" class="flex items-start gap-3 mb-3">
      <div v-if="icon" :class="['flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center', iconBgClass]">
        <span class="text-xl">{{ icon }}</span>
      </div>
      <h3 v-if="title" class="text-xl font-semibold text-gray-900 flex-1">
        {{ title }}
      </h3>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  icon?: string
  variant?: 'default' | 'warning' | 'info' | 'success' | 'primary'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  icon: '',
  variant: 'default',
  customClass: ''
})

const bgClass = computed(() => {
  const backgrounds = {
    default: 'bg-gray-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50',
    success: 'bg-green-50',
    primary: 'bg-primary/5'
  }
  return backgrounds[props.variant]
})

const borderClass = computed(() => {
  const borders = {
    default: 'border-2 border-gray-200',
    warning: 'border-2 border-yellow-400',
    info: 'border-2 border-blue-400',
    success: 'border-2 border-green-400',
    primary: 'border-2 border-primary'
  }
  return borders[props.variant]
})

const iconBgClass = computed(() => {
  const backgrounds = {
    default: 'bg-gray-200',
    warning: 'bg-yellow-200',
    info: 'bg-blue-200',
    success: 'bg-green-200',
    primary: 'bg-primary/20'
  }
  return backgrounds[props.variant]
})
</script>
