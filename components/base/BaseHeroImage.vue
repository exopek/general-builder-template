<template>
  <section
    class="relative overflow-hidden min-h-screen flex items-center"
  >
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        v-if="backgroundImage"
        :src="backgroundImage"
        :alt="backgroundImageAlt"
        class="w-full h-full object-cover"
        :class="imagePositionClass"
      />
      <div
        v-else
        class="w-full h-full bg-gray-800"
      ></div>
    </div>

    <!-- Overlay -->
    <div
      class="absolute inset-0 z-1"
      :style="{ backgroundColor: overlayColor, opacity: overlayOpacity }"
    ></div>

    <!-- Gradient Overlay -->
    <div
      v-if="showGradientOverlay"
      class="absolute inset-0 z-2"
      :class="gradientOverlayClass"
    ></div>

    <!-- Content -->
    <div class="container mx-auto relative z-10 text-center py-12">
      <div class="w-full max-w-4xl mx-auto">
        <!-- Badge Slot -->
        <slot name="badge">
          <TransformationBadge
            v-if="showBadge"
            :text="badgeText"
            :variant="badgeVariant"
            class="mb-6 mx-auto"
            animated
          />
        </slot>

        <!-- Headline -->
        <h1
          class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></h1>

        <!-- Subheadline -->
        <p
          v-if="subheadline"
          class="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton
            v-if="primaryCtaText"
            :text="primaryCtaText"
            :href="primaryCtaUrl"
            variant="gradient"
            size="lg"
            class="w-full sm:w-auto"
            :external="primaryCtaExternal"
          />

          <BaseButton
            v-if="secondaryCtaText"
            :text="secondaryCtaText"
            :href="secondaryCtaUrl"
            variant="outline"
            size="lg"
            class="w-full sm:w-auto"
            :external="secondaryCtaExternal"
          />
        </div>

        <!-- Trust Indicators -->
        <div
          v-if="showTrustIndicators && trustIndicators.length > 0"
          class="flex flex-wrap gap-6 pt-8 justify-center"
        >
          <div
            v-for="(indicator, index) in trustIndicators"
            :key="index"
            class="flex items-center gap-2 text-sm"
            :style="{ color: subheadlineColor }"
          >
            <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            {{ indicator }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited'
  showBadge?: boolean

  // CTAs
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean

  // Background Image
  backgroundImage?: string
  backgroundImageAlt?: string
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right'

  // Overlay
  overlayColor?: string
  overlayOpacity?: number
  showGradientOverlay?: boolean
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl'

  // Trust Indicators
  showTrustIndicators?: boolean
  trustIndicators?: string[]

  // Colors
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Lorem ipsum dolor sit amet consectetur',
  subheadline: 'Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
  badgeText: 'New',
  badgeVariant: 'featured',
  showBadge: false,

  primaryCtaText: 'Contact now',
  primaryCtaUrl: '#',
  primaryCtaExternal: false,
  secondaryCtaText: '',
  secondaryCtaUrl: '#',
  secondaryCtaExternal: false,

  backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=1000&fit=crop',
  backgroundImageAlt: 'Hero Background',
  imagePosition: 'center',

  overlayColor: '#000000',
  overlayOpacity: 0.5,
  showGradientOverlay: true,
  gradientDirection: 'to-r',

  showTrustIndicators: false,
  trustIndicators: () => [],

  headlineColor: '#ffffff',
  subheadlineColor: '#e5e7eb'
})

// Computed classes
const imagePositionClass = computed(() => {
  const positions = {
    center: 'object-center',
    top: 'object-top',
    bottom: 'object-bottom',
    left: 'object-left',
    right: 'object-right'
  }
  return positions[props.imagePosition]
})

const gradientOverlayClass = computed(() => {
  const gradients = {
    'to-r': 'bg-gradient-to-r from-black/60 via-black/30 to-transparent',
    'to-l': 'bg-gradient-to-l from-black/60 via-black/30 to-transparent',
    'to-t': 'bg-gradient-to-t from-black/60 via-black/30 to-transparent',
    'to-b': 'bg-gradient-to-b from-black/60 via-black/30 to-transparent',
    'to-br': 'bg-gradient-to-br from-black/60 via-black/30 to-transparent',
    'to-bl': 'bg-gradient-to-bl from-black/60 via-black/30 to-transparent'
  }
  return gradients[props.gradientDirection]
})

</script>

<style scoped>
/* Parallax effect on scroll (optional enhancement) */
section:hover .absolute img {
  transform: scale(1.05);
  transition: transform 8s ease-out;
}

/* Content fade-in animation */
.container > div {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive text shadows for better readability */
h1 {
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

p {
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
}
</style>