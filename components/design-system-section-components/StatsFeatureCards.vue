<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Centered Header Section -->
      <div v-if="showTagline || showHeadline || showDescription" class="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>
        <div
          v-if="showDescription && description"
          class="text-base md:text-lg leading-relaxed"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>
      </div>

      <!-- Statistics Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 max-w-4xl mx-auto">
        <div
          v-for="(stat, index) in statistics"
          :key="index"
          class="text-center"
        >
          <!-- Large Number -->
          <div
            class="text-4xl md:text-5xl lg:text-6xl font-black mb-2 leading-none"
            :style="{ color: numberColor }"
          >
            {{ formatStatValue(stat.value, stat.suffix) }}
          </div>
          <!-- Label -->
          <p
            class="text-sm md:text-base leading-normal"
            :style="{ color: labelColor }"
          >
            {{ stat.label }}
          </p>
        </div>
      </div>

      <!-- Feature Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        <div
          v-for="(card, index) in featureCards"
          :key="index"
          class="rounded-2xl p-6 md:p-8"
          :style="{ backgroundColor: cardBackgroundColor }"
        >
          <!-- Icon/Emoji -->
          <div
            v-if="card.icon"
            class="mb-4 leading-none"
            :style="{ fontSize: iconSize }"
          >
            {{ card.icon }}
          </div>

          <!-- Heading -->
          <h3
            class="text-xl md:text-2xl font-bold mb-3 leading-tight"
            :style="{ color: cardHeadingColor }"
          >
            {{ card.heading }}
          </h3>

          <!-- Description -->
          <p
            class="text-sm md:text-base leading-relaxed"
            :style="{ color: cardDescriptionColor }"
          >
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Statistic {
  value: number | string
  suffix?: string
  label: string
}

interface FeatureCard {
  icon?: string
  heading: string
  description: string
}

interface Props {
  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean

  // Content (richText)
  tagline?: string
  headline?: string
  description?: string

  // Statistics
  statistics?: Statistic[]

  // Feature Cards
  featureCards?: FeatureCard[]
  iconSize?: string

  // Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string
  numberColor?: string
  labelColor?: string
  cardBackgroundColor?: string
  cardHeadingColor?: string
  cardDescriptionColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: true,
  showHeadline: true,
  showDescription: true,

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Statistics
  statistics: () => [
    { value: 100, suffix: '+', label: 'Lorem ipsum' },
    { value: 50, suffix: '+', label: 'Class aptent' },
    { value: 5, suffix: '+', label: 'Aliquam in' }
  ],

  // Feature Cards
  featureCards: () => [
    {
      icon: '📦',
      heading: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus.'
    },
    {
      icon: '📦',
      heading: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus.'
    },
    {
      icon: '📦',
      heading: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus.'
    }
  ],

  iconSize: '2.5rem',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#6b7280',
  headlineColor: '#111827',
  descriptionColor: '#6b7280',
  numberColor: '#111827',
  labelColor: '#6b7280',
  cardBackgroundColor: '#f3f4f6',
  cardHeadingColor: '#111827',
  cardDescriptionColor: '#374151'
})

// Format statistic value with suffix
const formatStatValue = (value: number | string, suffix?: string): string => {
  return `${value}${suffix || ''}`
}
</script>
