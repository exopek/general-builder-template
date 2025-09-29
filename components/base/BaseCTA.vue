<template>
  <div class="base-cta" :class="sectionClasses">
    <div class="cta-container" :class="containerClasses">
      <!-- Header Section -->
      <div v-if="hasHeader" class="cta-header" :class="headerAlignment">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          :variant="badgeVariant"
          :class="badgeAlignment"
        />
        <h3
          v-if="title"
          class="cta-title"
          :class="titleClasses"
          :style="{ color: titleColor }"
          v-html="title"
        ></h3>
        <p
          v-if="description"
          class="cta-description"
          :class="descriptionClasses"
          :style="{ color: descriptionColor }"
        >
          {{ description }}
        </p>
      </div>

      <!-- Custom Content Slot -->
      <div v-if="hasContent" class="cta-content" :class="contentAlignment">
        <slot />
      </div>

      <!-- Action Buttons -->
      <div v-if="hasActions" class="cta-actions" :class="actionsClasses">
        <BaseButton
          v-if="primaryText"
          :text="primaryText"
          :href="primaryUrl"
          :variant="primaryVariant"
          :size="buttonSize"
          :external="primaryExternal"
          :disabled="primaryDisabled"
          class="cta-primary-button"
        />
        <BaseButton
          v-if="secondaryText"
          :text="secondaryText"
          :href="secondaryUrl"
          :variant="secondaryVariant"
          :size="buttonSize"
          :external="secondaryExternal"
          :disabled="secondaryDisabled"
          class="cta-secondary-button"
        />

        <!-- Additional actions slot -->
        <slot name="actions" />
      </div>

      <!-- Footer Content -->
      <div v-if="hasFooter" class="cta-footer" :class="footerAlignment">
        <slot name="footer" />

        <!-- Trust indicators -->
        <div v-if="trustIndicators && trustIndicators.length > 0" class="trust-indicators">
          <div
            v-for="(indicator, index) in trustIndicators"
            :key="index"
            class="trust-indicator"
          >
            <component v-if="indicator.icon" :is="iconComponent" :name="indicator.icon" class="w-4 h-4" />
            <span>{{ indicator.text || indicator }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TrustIndicator {
  text?: string
  icon?: string
}

interface Props {
  // Content
  title?: string
  description?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited' | 'info'
  showBadge?: boolean

  // Primary Action
  primaryText?: string
  primaryUrl?: string
  primaryVariant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline'
  primaryExternal?: boolean
  primaryDisabled?: boolean

  // Secondary Action
  secondaryText?: string
  secondaryUrl?: string
  secondaryVariant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline'
  secondaryExternal?: boolean
  secondaryDisabled?: boolean

  // Trust Indicators
  trustIndicators?: (string | TrustIndicator)[]

  // Styling
  variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'outline' | 'minimal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  buttonSize?: 'sm' | 'md' | 'lg' | 'xl'
  alignment?: 'left' | 'center' | 'right'

  // Colors
  titleColor?: string
  descriptionColor?: string
  backgroundColor?: string
  borderColor?: string

  // Layout
  fullWidth?: boolean
  spacing?: 'tight' | 'normal' | 'relaxed'

  // Components
  iconComponent?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  buttonSize: 'lg',
  alignment: 'center',
  badgeVariant: 'featured',
  showBadge: false,
  primaryVariant: 'gradient',
  secondaryVariant: 'outline',
  primaryExternal: false,
  secondaryExternal: false,
  primaryDisabled: false,
  secondaryDisabled: false,
  fullWidth: false,
  spacing: 'normal',
  iconComponent: 'Icon'
})

const slots = useSlots()

// Computed properties
const hasHeader = computed(() => props.showBadge || props.title || props.description)
const hasContent = computed(() => !!slots.default)
const hasActions = computed(() => props.primaryText || props.secondaryText || !!slots.actions)
const hasFooter = computed(() => !!slots.footer || (props.trustIndicators && props.trustIndicators.length > 0))

const sectionClasses = computed(() => {
  const base = 'base-cta'
  const fullWidth = props.fullWidth ? 'w-full' : ''
  return `${base} ${fullWidth}`.trim()
})

const containerClasses = computed(() => {
  const variants = {
    default: 'bg-white rounded-2xl shadow-xl border border-gray-100',
    elevated: 'bg-white rounded-2xl shadow-2xl border-0',
    glass: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
    gradient: 'bg-gradient-primary rounded-2xl border-0 text-white',
    outline: 'bg-transparent rounded-2xl border-2 border-primary',
    minimal: 'bg-gray-50 rounded-2xl border-0'
  }

  const sizes = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-8 md:p-12',
    xl: 'p-12 md:p-16'
  }

  const spacing = {
    tight: 'space-y-4',
    normal: 'space-y-6',
    relaxed: 'space-y-8'
  }

  return `${variants[props.variant]} ${sizes[props.size]} ${spacing[props.spacing]}`
})

const headerAlignment = computed(() => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  return alignments[props.alignment]
})

const badgeAlignment = computed(() => {
  const alignments = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto'
  }
  return alignments[props.alignment]
})

const contentAlignment = computed(() => {
  return headerAlignment.value
})

const footerAlignment = computed(() => {
  return headerAlignment.value
})

const actionsClasses = computed(() => {
  const base = 'flex gap-4'
  const responsive = 'flex-col sm:flex-row'

  const alignments = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  return `${base} ${responsive} ${alignments[props.alignment]}`
})

const titleClasses = computed(() => {
  const base = 'font-bold mb-4'
  const sizes = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl md:text-5xl'
  }

  const colors = props.variant === 'gradient' ? 'text-white' : 'text-gray-900'

  return `${base} ${sizes[props.size]} ${colors}`
})

const descriptionClasses = computed(() => {
  const base = 'mb-8'
  const sizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  }

  const colors = props.variant === 'gradient' ? 'text-white/90' : 'text-gray-600'

  return `${base} ${sizes[props.size]} ${colors}`
})
</script>

<style scoped>
.base-cta {
  position: relative;
}

.cta-container {
  position: relative;
  transition: all var(--transition-normal);
}

.cta-container:hover {
  transform: translateY(-2px);
}

.cta-title {
  line-height: var(--line-height-tight);
}

.cta-description {
  line-height: var(--line-height-relaxed);
  max-width: 42rem;
}

.text-center .cta-description {
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  align-items: center;
}

.cta-primary-button,
.cta-secondary-button {
  flex: 1;
  max-width: 16rem;
}

@media (min-width: 640px) {
  .cta-primary-button,
  .cta-secondary-button {
    flex: 0 0 auto;
    max-width: none;
  }
}

/* Trust indicators */
.trust-indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-gray-200);
}

.trust-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.bg-gradient-primary .trust-indicators {
  border-top-color: rgba(255, 255, 255, 0.2);
}

.bg-gradient-primary .trust-indicator {
  color: rgba(255, 255, 255, 0.9);
}

/* Variant-specific adjustments */
.bg-gradient-primary .cta-header,
.bg-gradient-primary .cta-content,
.bg-gradient-primary .cta-footer {
  color: white;
}

.bg-white\/10 {
  backdrop-filter: blur(16px);
}

/* Size-specific spacing adjustments */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-8 > * + * {
  margin-top: 2rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .cta-primary-button,
  .cta-secondary-button {
    width: 100%;
    max-width: none;
  }
}

/* Animation for glass variant */
.bg-white\/10 {
  animation: glassShimmer 3s ease-in-out infinite alternate;
}

@keyframes glassShimmer {
  0% {
    background: rgba(255, 255, 255, 0.1);
  }
  100% {
    background: rgba(255, 255, 255, 0.15);
  }
}

/* Focus states */
.cta-container:focus-within {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
</style>