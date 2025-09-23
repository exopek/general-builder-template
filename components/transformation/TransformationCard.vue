<template>
  <div
    class="card flex flex-col relative overflow-hidden"
    :class="[
      variantClasses,
      sizeClasses,
      hoverEffect ? '' : 'hover:transform-none hover:shadow-md'
    ]"
  >
    <div v-if="hasHeader" class="flex items-center justify-between flex-shrink-0">
      <TransformationIcon
        v-if="icon"
        :icon="icon"
        :variant="iconVariant"
        class="order-1"
      />
      <TransformationBadge
        v-if="badge"
        :text="badge"
        :variant="badgeVariant"
        class="order-2"
      />
    </div>

    <div class="flex-1 flex flex-col" :class="gapClasses">
      <h3 v-if="title" class="text-xl lg:text-2xl font-semibold text-gray-900 m-0">{{ title }}</h3>
      <p v-if="description" class="text-base text-gray-600 m-0">{{ description }}</p>

      <slot />
    </div>

    <div v-if="hasFooter" class="flex flex-col flex-shrink-0 mt-auto" :class="gapClasses">
      <TransformationButton
        v-if="ctaText"
        :text="ctaText"
        :variant="ctaVariant"
        :href="ctaUrl"
        class="w-full"
      />

      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  icon?: string
  iconVariant?: 'primary' | 'secondary' | 'accent'
  badge?: string
  badgeVariant?: 'new' | 'popular' | 'featured'
  ctaText?: string
  ctaUrl?: string
  ctaVariant?: 'primary' | 'secondary' | 'ghost'
  variant?: 'default' | 'elevated' | 'glass' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  hoverEffect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  iconVariant: 'primary',
  badgeVariant: 'featured',
  ctaVariant: 'primary',
  hoverEffect: true
})

const slots = useSlots()

const hasHeader = computed(() => props.icon || props.badge)
const hasFooter = computed(() => props.ctaText || slots.footer)

const variantClasses = computed(() => {
  const variants = {
    default: 'border border-gray-200',
    elevated: 'shadow-lg border-0',
    glass: 'card-glass border-0',
    gradient: 'bg-gradient-warm border-0 text-white'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'p-4 md:p-6',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10'
  }
  return sizes[props.size]
})

const gapClasses = computed(() => {
  const gaps = {
    sm: 'gap-4',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8'
  }
  return gaps[props.size]
})
</script>

<style scoped>
/* Card hover effects */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Gradient text override for gradient variant */
.bg-gradient-warm h3 {
  color: white;
}

.bg-gradient-warm p {
  color: rgba(255, 255, 255, 0.9);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .p-10 {
    padding: 2rem;
  }

  .p-8 {
    padding: 1.5rem;
  }

  .text-xl {
    font-size: 1.125rem;
  }
}
</style>