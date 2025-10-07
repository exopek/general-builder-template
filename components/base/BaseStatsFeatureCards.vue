<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: sectionBackgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Centered Header Section -->
      <div class="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
        <p
          v-if="tagline"
          class="text-sm md:text-base font-semibold mb-3"
          :style="{ color: 'var(--color-gray-600)' }"
        >
          {{ tagline }}
        </p>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{
            color: 'var(--color-gray-900)',
            lineHeight: 'var(--line-height-tight)'
          }"
        >
          {{ headline }}
        </h2>
        <p
          v-if="description"
          class="text-base md:text-lg"
          :style="{
            color: 'var(--color-gray-600)',
            lineHeight: 'var(--line-height-relaxed)'
          }"
        >
          {{ description }}
        </p>
      </div>

      <!-- Statistics Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-12 max-w-4xl mx-auto">
        <div
          v-for="(stat, index) in statistics"
          :key="index"
          class="text-center"
        >
          <!-- Large Number -->
          <div
            class="text-4xl md:text-5xl lg:text-6xl font-black mb-2"
            :style="{
              color: 'var(--color-gray-900)',
              lineHeight: 'var(--line-height-none)'
            }"
          >
            {{ formatStatValue(stat.value, stat.suffix) }}
          </div>
          <!-- Label -->
          <p
            class="text-sm md:text-base"
            :style="{
              color: 'var(--color-gray-600)',
              lineHeight: 'var(--line-height-normal)'
            }"
          >
            {{ stat.label }}
          </p>
        </div>
      </div>

      <!-- Feature Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        <div
          v-for="(card, index) in featureCards"
          :key="index"
          class="rounded-xl p-6 md:p-8"
          :style="{
            backgroundColor: cardBackgroundColor,
            borderRadius: 'var(--border-radius-xl)'
          }"
        >
          <!-- Icon/Emoji -->
          <div
            v-if="card.icon"
            class="mb-4"
            :style="{
              fontSize: iconSize,
              lineHeight: 'var(--line-height-none)'
            }"
          >
            {{ card.icon }}
          </div>

          <!-- Heading -->
          <h3
            class="text-xl md:text-2xl font-bold mb-3"
            :style="{
              color: 'var(--color-gray-900)',
              lineHeight: 'var(--line-height-tight)'
            }"
          >
            {{ card.heading }}
          </h3>

          <!-- Description -->
          <p
            class="text-sm md:text-base"
            :style="{
              color: 'var(--color-gray-700)',
              lineHeight: 'var(--line-height-relaxed)'
            }"
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
  // Section Header
  tagline?: string
  headline?: string
  description?: string
  sectionBackgroundColor?: string

  // Statistics
  statistics?: Statistic[]

  // Feature Cards
  featureCards?: FeatureCard[]
  cardBackgroundColor?: string
  iconSize?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  sectionBackgroundColor: 'var(--color-white)',

  statistics: () => [
    { value: 100, suffix: '+', label: 'Lorem ipsum' },
    { value: 50, suffix: '+', label: 'Class aptent' },
    { value: 5, suffix: '+', label: 'Aliquam in' }
  ],

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

  cardBackgroundColor: 'var(--color-gray-100)',
  iconSize: '2.5rem'
})

// Format statistic value with suffix
const formatStatValue = (value: number | string, suffix?: string): string => {
  return `${value}${suffix || ''}`
}
</script>
