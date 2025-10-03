<template>
  <div
    class="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    :class="variantClasses"
  >
    <!-- Icon Container -->
    <div
      v-if="showIcon"
      class="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl transition-transform duration-300 group-hover:scale-110"
      :class="iconContainerClasses"
    >
      <!-- SVG Icon Slot -->
      <slot name="icon">
        <svg class="w-8 h-8" :class="iconClasses" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
        </svg>
      </slot>
    </div>

    <!-- Title -->
    <h3
      class="text-xl md:text-2xl font-bold mb-3 leading-tight"
      :class="titleClasses"
    >
      {{ title }}
    </h3>

    <!-- Description -->
    <p
      class="text-base md:text-lg leading-relaxed"
      :class="descriptionClasses"
    >
      {{ description }}
    </p>

    <!-- Optional Badge -->
    <div v-if="badge" class="absolute top-4 right-4">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
        {{ badge }}
      </span>
    </div>

    <!-- Optional Link/Button -->
    <div v-if="linkText" class="mt-6">
      <BaseButton
        :text="linkText"
        :href="linkUrl"
        variant="ghost"
        size="sm"
        class="group-hover:text-orange-500"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline' | 'minimal'
  showIcon?: boolean
  badge?: string
  linkText?: string
  linkUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  showIcon: true,
  badge: '',
  linkText: '',
  linkUrl: '#'
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-white border-2 border-gray-200',
    secondary: 'bg-gray-50 border-2 border-gray-300',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600 text-white border-0',
    outline: 'bg-transparent border-2 border-orange-500',
    minimal: 'bg-gray-100 border-0'
  }
  return variants[props.variant]
})

const iconContainerClasses = computed(() => {
  const variants = {
    primary: 'bg-orange-100 text-orange-600',
    secondary: 'bg-blue-100 text-blue-600',
    gradient: 'bg-white/20 text-white',
    outline: 'bg-orange-50 text-orange-600',
    minimal: 'bg-white text-orange-600'
  }
  return variants[props.variant]
})

const iconClasses = computed(() => {
  return props.variant === 'gradient' ? 'text-white' : 'text-current'
})

const titleClasses = computed(() => {
  return props.variant === 'gradient' ? 'text-white' : 'text-gray-900'
})

const descriptionClasses = computed(() => {
  return props.variant === 'gradient' ? 'text-white/90' : 'text-gray-600'
})
</script>

<style scoped>
/* Hover glow effect for gradient variant */
.bg-gradient-to-br:hover {
  box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.4);
}

/* Smooth icon rotation on hover */
.group:hover .group-hover\:scale-110 {
  animation: iconPulse 0.6s ease-in-out;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
}
</style>
