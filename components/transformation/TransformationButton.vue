<template>
  <component
    :is="isLink ? 'a' : 'button'"
    class="btn relative whitespace-nowrap select-none focus:outline-none focus:ring-3 focus:ring-orange-500/30"
    :class="[
      variantClasses,
      sizeClasses,
      {
        'cursor-not-allowed': loading || disabled,
        'opacity-50 pointer-events-none': disabled,
        'aspect-square': iconOnly
      }
    ]"
    :href="isLink ? href : undefined"
    :target="isLink && external ? '_blank' : undefined"
    :rel="isLink && external ? 'noopener noreferrer' : undefined"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="w-4 h-4 mr-2">
      <svg class="animate-spin w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-30"/>
        <path fill="currentColor" class="opacity-100" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
    </span>

    <span v-if="icon && !loading" class="flex items-center justify-center flex-shrink-0" :class="[
      iconPosition === 'right' ? 'order-2' : '',
      hasIcon && !iconOnly ? (iconPosition === 'right' ? 'ml-2' : 'mr-2') : ''
    ]">
      <component :is="icon" class="w-5 h-5" />
    </span>

    <span v-if="!iconOnly" class="leading-tight">{{ text }}</span>

    <span v-if="badge" class="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold leading-none min-w-6 text-center">{{ badge }}</span>
  </component>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  href?: string
  external?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: string
  iconPosition?: 'left' | 'right'
  iconOnly?: boolean
  badge?: string
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  iconPosition: 'left',
  iconOnly: false,
  loading: false,
  disabled: false,
  external: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const isLink = computed(() => !!props.href)
const hasIcon = computed(() => !!props.icon)

const variantClasses = computed(() => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    gradient: 'bg-gradient-warm text-white hover:bg-gradient-primary hover:-translate-y-0.5',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-sm gap-1 px-3 py-2 md:px-4',
    md: 'gap-2',
    lg: 'text-lg gap-3 px-6 py-4 md:px-8',
    xl: 'text-xl gap-3 px-8 py-5 md:px-10'
  }
  return sizes[props.size]
})

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Button hover effects */
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* Icon sizing for different button sizes */
.px-4 .w-5 {
  width: 1rem;
  height: 1rem;
}

.px-8 .w-5,
.px-10 .w-5 {
  width: 1.5rem;
  height: 1.5rem;
}

/* Icon only button sizing */
.aspect-square.px-4 {
  padding: 0.5rem;
}

.aspect-square.px-6 {
  padding: 0.75rem;
}

.aspect-square.px-8 {
  padding: 1rem;
}

.aspect-square.px-10 {
  padding: 1.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .px-10 {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  .px-8 {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>