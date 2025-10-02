<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor: sectionBackgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div class="mb-8 md:mb-12">
        <p
          v-if="tagline"
          class="text-sm md:text-base font-semibold mb-3 uppercase tracking-wide"
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
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
          <p
            v-if="description"
            class="text-base md:text-lg md:max-w-2xl"
            :style="{
              color: 'var(--color-gray-600)',
              lineHeight: 'var(--line-height-relaxed)'
            }"
          >
            {{ description }}
          </p>
          <BaseButton
            v-if="showButton && buttonText"
            :text="buttonText"
            :href="buttonUrl"
            variant="primary"
            size="md"
            class="flex-shrink-0"
          />
        </div>
      </div>

      <!-- Feature Grid (Asymmetric on large screens) -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="rounded-xl p-6 md:p-8 transition-all"
          :class="{
            'lg:col-span-2': index === 0 || index === 2,
            'lg:col-start-2': index === 2
          }"
          :style="{
            backgroundColor: feature.backgroundColor || 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-xl)'
          }"
        >
          <!-- Number -->
          <div
            class="text-5xl md:text-6xl font-black mb-4 md:mb-6"
            :style="{
              color: feature.numberColor || 'var(--color-gray-400)',
              lineHeight: 'var(--line-height-none)'
            }"
          >
            {{ feature.number }}
          </div>

          <!-- Heading -->
          <h3
            class="text-xl md:text-2xl font-bold mb-3"
            :style="{
              color: feature.headingColor || 'var(--color-gray-900)',
              lineHeight: 'var(--line-height-tight)'
            }"
          >
            {{ feature.heading }}
          </h3>

          <!-- Description -->
          <p
            class="text-sm md:text-base"
            :style="{
              color: feature.descriptionColor || 'var(--color-gray-600)',
              lineHeight: 'var(--line-height-relaxed)'
            }"
          >
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  number: string
  heading: string
  description: string
  backgroundColor?: string
  numberColor?: string
  headingColor?: string
  descriptionColor?: string
}

interface Props {
  tagline?: string
  headline?: string
  description?: string
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  features?: Feature[]
  sectionBackgroundColor?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  showButton: true,
  buttonText: 'View all',
  buttonUrl: '#',
  features: () => [
    {
      number: '01',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim and more lorem.',
      backgroundColor: 'var(--color-gray-900)',
      numberColor: 'var(--color-gray-700)',
      headingColor: 'var(--color-white)',
      descriptionColor: 'var(--color-gray-300)'
    },
    {
      number: '02',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
      backgroundColor: 'var(--color-gray-100)',
      numberColor: 'var(--color-gray-400)',
      headingColor: 'var(--color-gray-900)',
      descriptionColor: 'var(--color-gray-600)'
    },
    {
      number: '03',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
      backgroundColor: 'var(--color-gray-100)',
      numberColor: 'var(--color-gray-400)',
      headingColor: 'var(--color-gray-900)',
      descriptionColor: 'var(--color-gray-600)'
    },
    {
      number: '04',
      heading: 'Lorem ipsum dolor sit amet',
      description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
      backgroundColor: 'var(--color-gray-100)',
      numberColor: 'var(--color-gray-400)',
      headingColor: 'var(--color-gray-900)',
      descriptionColor: 'var(--color-gray-600)'
    }
  ],
  sectionBackgroundColor: 'var(--color-white)'
})
</script>
