<template>
  <div :class="['p-5 md:p-6 rounded-lg transition-all', bgClass, hoverEffect ? 'hover:shadow-lg hover:scale-[1.02]' : '']">
    <h4 v-if="title" class="font-semibold text-lg text-white mb-3 flex items-start gap-2">
      <span v-if="icon" class="flex-shrink-0 text-xl">{{ icon }}</span>
      <span>{{ title }}</span>
    </h4>
    <p v-if="description" :class="['text-sm leading-relaxed', textColorClass]">
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  icon?: string
  bgColor?: 'white' | 'gray' | 'primary'
  textColor?: 'gray' | 'dark'
  hoverEffect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  icon: '✓',
  bgColor: 'gray',
  textColor: 'gray',
  hoverEffect: true
})

const bgClass = computed(() => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary/5'
  }
  return backgrounds[props.bgColor]
})

const textColorClass = computed(() => {
  const colors = {
    gray: 'text-gray-600',
    dark: 'text-gray-900'
  }
  return colors[props.textColor]
})
</script>
