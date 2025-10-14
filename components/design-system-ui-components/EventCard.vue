<template>
  <div
    class="relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg"
    :class="[
      variantClasses,
      sizeClasses,
      statusClasses,
      { 'cursor-pointer': clickable },
      hoverEffect ? 'hover:-translate-y-1' : ''
    ]"
    @click="handleClick"
  >
    <!-- Header Section -->
    <div v-if="hasHeader" class="card-header flex items-center justify-between mb-4">
      <!-- Icon/Badge -->
      <div v-if="icon || badge" class="flex items-center">
        
        <span
          v-if="badge"
          class="badge"
          :class="badgeClasses"
        >
          {{ badge }}
        </span>
      </div>

      <!-- Status/Date -->
      <div v-if="date || status" class="card-meta text-sm text-gray-500">
        <span v-if="date" class="date">{{ formattedDate }}</span>
        <span v-if="status" class="status" :class="statusTextClasses">{{ status }}</span>
      </div>
    </div>

    <!-- Progress Bar -->
    <div v-if="showProgress && progress !== undefined" class="progress-wrapper mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-700">{{ progressLabel }}</span>
        <span class="text-sm text-gray-500">{{ progress }}%</span>
      </div>
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500 bg-gradient-primary"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="card-body flex-1">
      <h3 v-if="title" class="card-title" :class="titleClasses">{{ title }}</h3>
      <p v-if="description" class="card-description" :class="descriptionClasses">{{ description }}</p>

      <!-- Custom Content Slot -->
      <slot />
    </div>

    <!-- Features/Tags -->
    <div v-if="features && features.length > 0" class="card-features mt-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(feature, index) in features"
          :key="index"
          class="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-sm"
        >
          {{ getFeatureText(feature) }}
        </span>
      </div>
    </div>

    <!-- Footer Section -->
    <div v-if="hasFooter" class="card-footer mt-6">
      <slot name="footer">
        <Button
          v-if="ctaText"
          :text="ctaText"
          :href="ctaUrl"
          :variant="ctaVariant"
          :size="ctaSize"
          :external="ctaExternal"
          class="w-full"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'
interface Props {
  // Content
  title?: string
  description?: string
  icon?: string
  iconComponent?: string
  badge?: string
  date?: string | Date
  status?: string

  // Features/Tags
  features?: (string | { feature?: string; text?: string })[]

  // Progress
  showProgress?: boolean
  progress?: number
  progressLabel?: string

  // CTA
  ctaText?: string
  ctaUrl?: string
  ctaVariant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline'
  ctaSize?: 'sm' | 'md' | 'lg'
  ctaExternal?: boolean

  // Styling
  variant?: 'default' | 'featured' | 'timeline' | 'glass' | 'elevated' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  statusVariant?: 'default' | 'success' | 'warning' | 'error' | 'info'

  // Behavior
  clickable?: boolean
  hoverEffect?: boolean

  // Layout
  imagePosition?: 'top' | 'left' | 'right' | 'background'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  statusVariant: 'default',
  ctaVariant: 'primary',
  ctaSize: 'md',
  ctaExternal: false,
  clickable: false,
  hoverEffect: true,
  iconComponent: 'Icon',
  imagePosition: 'top'
})

const slots = useSlots()

// Computed properties
const hasHeader = computed(() => props.icon || props.badge || props.date || props.status)
const hasFooter = computed(() => props.ctaText || slots.footer)

const formattedDate = computed(() => {
  if (!props.date) return ''
  if (typeof props.date === 'string') return props.date
  return props.date.toLocaleDateString('de-DE')
})

// CSS Classes
const variantClasses = computed(() => {
  const variants = {
    default: 'card bg-white border border-gray-200',
    featured: 'card bg-white border-2 border-primary shadow-lg',
    timeline: 'card bg-white border-l-4 border-primary pl-6 shadow-sm',
    glass: 'card-glass backdrop-blur-lg border border-white/20',
    elevated: 'card bg-white shadow-xl border-0',
    gradient: 'card bg-gradient-warm text-white border-0'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  return sizes[props.size]
})

const statusClasses = computed(() => {
  const statuses = {
    default: '',
    success: 'border-l-green-400',
    warning: 'border-l-yellow-400',
    error: 'border-l-red-400',
    info: 'border-l-blue-400'
  }
  return statuses[props.statusVariant]
})

const iconClasses = computed(() => {
  return 'w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'
})

const badgeClasses = computed(() => {
  return 'py-1 bg-primary/10 text-primary text-sm font-medium rounded-full'
})

const statusTextClasses = computed(() => {
  const statuses = {
    default: 'text-gray-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600'
  }
  return statuses[props.statusVariant]
})

const titleClasses = computed(() => {
  const baseClasses = 'font-semibold mb-2'
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }
  const colorClasses = props.variant === 'gradient' ? 'text-white' : 'text-gray-900'

  return `${baseClasses} ${sizeClasses[props.size]} ${colorClasses}`
})

const descriptionClasses = computed(() => {
  const colorClasses = props.variant === 'gradient'
    ? 'text-white/90'
    : 'text-gray-600'

  return `text-base leading-relaxed ${colorClasses}`
})

// Methods
const getFeatureText = (feature: string | { feature?: string; text?: string }): string => {

  if (typeof feature === 'string') {
    return feature
  }
  console.log('feature object:', feature)
  console.log(feature)
  return feature.feature || feature.text || ''
}

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Gradient variant adjustments */
.bg-gradient-primary .px-2 {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Timeline variant specific styling */
.card.border-l-4 {
  position: relative;
}

.card.border-l-4::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-gray-200);
}

/* Glass effect */
.card-glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .card-meta {
    align-self: flex-end;
  }
}
</style>