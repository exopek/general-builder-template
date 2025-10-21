<template>
  <div :style="{ backgroundColor }" class="py-12 md:py-16 lg:py-20">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Left: Steps Content -->
        <div>
          <p v-if="tagline" class="text-sm font-medium text-primary mb-3">
            {{ tagline }}
          </p>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 lg:mb-12">
            {{ title }}
          </h2>

          <div class="space-y-6">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="p-5 md:p-6 rounded-xl border transition-all"
              :class="[
                step.highlighted
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
              ]"
            >
              <div
                class="inline-block px-3 py-1 rounded-md text-xs font-medium mb-3"
                :class="[
                  step.highlighted
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-700'
                ]"
              >
                {{ step.label || `Step ${String(index + 1).padStart(2, '0')}` }}
              </div>

              <h3
                class="text-lg md:text-xl font-semibold mb-2"
                :class="step.highlighted ? 'text-white' : 'text-gray-900'"
              >
                {{ step.title }}
              </h3>

              <p
                class="text-sm md:text-base"
                :class="step.highlighted ? 'text-gray-300' : 'text-gray-600'"
              >
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Image + CTA -->
        <div class="relative">
          <div class="aspect-[4/5] bg-gray-300 rounded-2xl overflow-hidden">
            <img
              v-if="image"
              :src="image"
              :alt="imageAlt || title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20 text-gray-400"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </div>

          <!-- CTA Button (bottom-right) -->
          <a
            v-if="ctaText && ctaUrl"
            :href="ctaUrl"
            class="absolute bottom-6 right-6 inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
          >
            {{ ctaText }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  label?: string
  title: string
  description: string
  highlighted?: boolean
}

interface Props {
  backgroundColor?: string
  tagline?: string
  title?: string
  steps?: Step[]
  image?: string
  imageAlt?: string
  ctaText?: string
  ctaUrl?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  tagline: 'Tagline',
  title: 'Lorem ipsum dolor sit amet consectetur adipiscing',
  steps: () => [
    {
      label: 'Step 01',
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing viverra ornare, eros dolor nulla.',
      highlighted: true
    },
    {
      label: 'Step 02',
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing viverra ornare, eros dolor nulla.'
    },
    {
      label: 'Step 03',
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing viverra ornare, eros dolor nulla.'
    }
  ],
  image: '',
  imageAlt: '',
  ctaText: 'Contact now',
  ctaUrl: '#'
})
</script>
