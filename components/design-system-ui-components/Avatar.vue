<template>
  <div
    class="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full transition-all"
    :class="[sizeClass, !src && !initials ? bgColorClass : '', borderClass]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt || initials || 'Avatar'"
      class="w-full h-full object-cover"
      @error="handleImageError"
    />

    <span
      v-else-if="initials"
      class="font-semibold select-none"
      :class="[textSizeClass, textColorClass]"
    >
      {{ displayInitials }}
    </span>

    <svg
      v-else
      class="w-full h-full"
      :class="iconColorClass"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>

    <span
      v-if="badge"
      class="absolute rounded-full border-2 border-white"
      :class="[badgePositionClass, badgeColorClass]"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  initials?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'
  badge?: boolean
  badgeColor?: 'green' | 'red' | 'yellow' | 'blue' | 'gray'
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  badgeColor: 'green',
  badgePosition: 'bottom-right',
  badge: false,
  bordered: false
})

const imageError = ref(false)

const displayInitials = computed(() => {
  if (!props.initials) return ''
  return props.initials.substring(0, 2).toUpperCase()
})

const sizeClass = computed(() => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24'
  }
  return sizes[props.size]
})

const textSizeClass = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-2xl'
  }
  return sizes[props.size]
})

const bgColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    gray: 'bg-gray-400'
  }
  return colors[props.color]
})

const textColorClass = computed(() => {
  return 'text-white'
})

const iconColorClass = computed(() => {
  return 'text-gray-400'
})

const borderClass = computed(() => {
  return props.bordered ? 'ring-2 ring-white shadow-md' : ''
})

const badgePositionClass = computed(() => {
  const badgeSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5'
  }

  const positions = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0'
  }

  return `${badgeSizes[props.size]} ${positions[props.badgePosition]}`
})

const badgeColorClass = computed(() => {
  const colors = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    gray: 'bg-gray-400'
  }
  return colors[props.badgeColor]
})

const handleImageError = () => {
  imageError.value = true
}
</script>
