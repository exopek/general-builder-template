<template>
  <div
    v-if="flipCard"
    class="w-full max-w-lg mx-auto h-[600px]"
    style="perspective: 1000px;"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
  >
    <div
      class="relative w-full h-full text-center duration-700 ease-in-out"
      style="transform-style: preserve-3d; transition: transform 0.6s ease-in-out;"
      :style="{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
    >

      <!-- Front of flip card -->
      <div
        class="absolute w-full h-full rounded-3xl overflow-hidden"
        style="backface-visibility: hidden;"
      >
        <div class="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden relative border-4 border-white" style="box-shadow: var(--shadow-xl);">
          <!-- Large Profile Image (70% height) -->
          <div class="relative w-full h-[70%] overflow-hidden rounded-t-2xl">
            <img
              :src="image"
              :alt="imageAlt"
              class="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>

          <!-- Bottom Info Overlay (30% height) -->
          <div class="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-b-2xl">
            <div class="text-left">
              <div class="text-3xl font-black text-gray-900 leading-tight mb-1" style="letter-spacing: -0.025em;">{{ title }}</div>
              <div class="text-base text-gray-600 font-medium">{{ subtitle }}</div>
              <div v-if="yearsExperience" class="absolute top-6 right-6 text-xl font-semibold text-gray-800">{{ yearsExperience }} Jahre</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back of flip card -->
      <div
        class="absolute w-full h-full rounded-3xl overflow-hidden bg-gradient-warm border-4 border-white"
        style="backface-visibility: hidden; transform: rotateY(180deg); box-shadow: var(--shadow-xl);"
      >
        <div class="w-full h-full p-8 text-white flex flex-col justify-center">
          <slot name="back-content" />
        </div>
      </div>

    </div>
  </div>

  <!-- Regular card (non-flip) -->
  <div
    v-else
    class="card flex flex-col relative overflow-hidden"
    :class="[
      variantClasses,
      sizeClasses,
      hoverEffect ? 'hover:transform hover:-translate-y-1' : 'hover:transform-none hover:shadow-md'
    ]"
  >
    <!-- Header Section -->
    <div v-if="hasHeader" class="flex items-center justify-between flex-shrink-0 mb-4">
      <AboutIcon
        v-if="icon"
        :icon="icon"
        :variant="iconVariant"
        :size="iconSize"
        class="order-1"
      />
      <TransformationBadge
        v-if="badge"
        :text="badge"
        :variant="badgeVariant"
        :size="badgeSize"
        class="order-2"
      />
    </div>

    <!-- Image Section -->
    <div v-if="image" class="flex-shrink-0 mb-4">
      <div class="relative overflow-hidden" :class="imageClasses">
        <img
          :src="image"
          :alt="imageAlt"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div v-if="imageOverlay" class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 flex flex-col" :class="contentGapClasses">
      <h3 v-if="title" class="font-bold text-gray-900 m-0" :class="titleClasses">{{ title }}</h3>
      <p v-if="subtitle" class="font-medium text-gray-600 m-0" :class="subtitleClasses">{{ subtitle }}</p>
      <p v-if="description" class="text-gray-600 m-0 leading-relaxed" :class="descriptionClasses">{{ description }}</p>

      <!-- Social Links (for team members) -->
      <div v-if="socialLinks && socialLinks.length > 0" class="flex gap-3 mt-4">
        <a
          v-for="link in socialLinks"
          :key="link.platform"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center text-gray-600"
        >
          <AboutIcon :icon="link.icon" variant="neutral" size="sm" />
        </a>
      </div>

      <!-- Custom slot for additional content -->
      <slot />
    </div>

    <!-- Stats/Metrics Section (for locations, achievements, etc.) -->
    <div v-if="stats && stats.length > 0" class="flex-shrink-0 mt-4 pt-4 border-t border-gray-200">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="font-bold text-lg text-primary">{{ stat.value }}</div>
          <div class="text-sm text-gray-500">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div v-if="hasFooter" class="flex flex-col flex-shrink-0 mt-auto" :class="contentGapClasses">
      <TransformationButton
        v-if="ctaText"
        :text="ctaText"
        :variant="ctaVariant"
        :size="ctaSize"
        :href="ctaUrl"
        :external="ctaExternal"
        class="w-full"
      />

      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
  icon: string
}

interface Stat {
  label: string
  value: string | number
}

interface Props {
  // Content
  title?: string
  subtitle?: string
  description?: string

  // Visual
  image?: string
  imageAlt?: string
  imageOverlay?: boolean
  icon?: string
  iconVariant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  iconSize?: 'sm' | 'md' | 'lg'

  // Badge
  badge?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'success' | 'info'
  badgeSize?: 'sm' | 'md' | 'lg'

  // Social Links (for team members)
  socialLinks?: SocialLink[]

  // Stats/Metrics (for locations, achievements)
  stats?: Stat[]

  // CTA
  ctaText?: string
  ctaUrl?: string
  ctaExternal?: boolean
  ctaVariant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  ctaSize?: 'sm' | 'md' | 'lg'

  // Styling
  variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'team' | 'location'
  size?: 'sm' | 'md' | 'lg'
  imageStyle?: 'square' | 'portrait' | 'landscape' | 'circle'
  hoverEffect?: boolean

  // Flip Card
  flipCard?: boolean
  flipped?: boolean
  yearsExperience?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  imageStyle: 'landscape',
  iconVariant: 'primary',
  iconSize: 'md',
  badgeVariant: 'featured',
  badgeSize: 'sm',
  ctaVariant: 'primary',
  ctaSize: 'md',
  ctaExternal: false,
  imageOverlay: false,
  hoverEffect: true,
  flipCard: false,
  flipped: false,
  yearsExperience: undefined
})

const emit = defineEmits<{
  flip: [flipped: boolean]
}>()

// Flip card state
const isFlipped = ref(props.flipped)

const handleHover = (hovering: boolean) => {
  isFlipped.value = hovering
  emit('flip', isFlipped.value)
}

const slots = useSlots()

// Computed properties
const hasHeader = computed(() => props.icon || props.badge)
const hasFooter = computed(() => props.ctaText || slots.footer)

const variantClasses = computed(() => {
  const variants: Record<string, string> = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border-0',
    glass: 'card-glass border-0',
    gradient: 'bg-gradient-warm border-0 text-white',
    team: 'bg-white border border-gray-200 text-center',
    location: 'bg-white shadow-md border-0'
  }
  return variants[props.variant] || variants.default
})

const sizeClasses = computed(() => {
  const sizes: Record<string, string> = {
    sm: 'p-4 md:p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10'
  }
  return sizes[props.size] || sizes.md
})

const contentGapClasses = computed(() => {
  const gaps: Record<string, string> = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  }
  return gaps[props.size] || gaps.md
})

const imageClasses = computed(() => {
  const styles: Record<string, string> = {
    square: 'aspect-square rounded-lg',
    portrait: 'aspect-[3/4] rounded-lg',
    landscape: 'aspect-[4/3] rounded-lg',
    circle: 'aspect-square rounded-full w-24 h-24 mx-auto'
  }
  return styles[props.imageStyle] || styles.landscape
})

const titleClasses = computed(() => {
  const sizes: Record<string, string> = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }
  return sizes[props.size] || sizes.md
})

const subtitleClasses = computed(() => {
  const sizes: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size] || sizes.md
})

const descriptionClasses = computed(() => {
  const sizes: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-base'
  }
  return sizes[props.size] || sizes.md
})
</script>

<style scoped>
/* Regular card styles */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

/* Mobile responsiveness for flip cards */
@media (max-width: 1024px) {
  .max-w-lg {
    max-width: 28rem; /* 448px */
  }
}

@media (max-width: 768px) {
  .h-\[600px\] {
    height: 500px;
  }

  .max-w-lg {
    max-width: 22rem; /* 352px */
  }

  .text-3xl {
    font-size: 1.5rem;
  }

  .p-6 {
    padding: 1rem;
  }

  .text-xl {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .max-w-lg {
    max-width: 18.75rem; /* 300px */
  }
}

/* Gradient text override for gradient variant */
.bg-gradient-warm h3,
.bg-gradient-warm p {
  color: white;
}

.bg-gradient-warm .text-gray-600 {
  color: rgba(255, 255, 255, 0.9);
}

/* Team variant specific styles */
.variant-team .text-center {
  text-align: center;
}

/* Social link hover effects */
.social-link {
  transition: all 0.2s ease;
}

.social-link:hover {
  transform: translateY(-1px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .p-10 {
    padding: 2rem;
  }

  .p-8 {
    padding: 1.5rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .text-xl {
    font-size: 1.125rem;
  }
}
</style>