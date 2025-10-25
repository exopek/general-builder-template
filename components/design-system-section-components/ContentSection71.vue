<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <div
        :class="[
          'grid grid-cols-1 gap-8 items-center mx-auto max-w-6xl',
          layoutColumns === '2-columns' ? 'lg:grid-cols-2 lg:gap-12' : ''
        ]"
      >

        <!-- Image Column -->
        <div
          v-if="showImage"
          :class="[
            imagePosition === 'left' ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
          ]"
        >
          <div
            class="overflow-hidden rounded-2xl"
            :class="showImageShadow ? 'shadow-lg' : ''"
          >
            <img
              :src="image"
              :alt="imageAlt"
              class="w-full h-auto object-cover"
              :style="{ aspectRatio: imageAspectRatio }"
            />
          </div>
        </div>

        <!-- Content Column -->
        <div
          :class="[
            'space-y-6',
            imagePosition === 'left' ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
          ]"
        >
          <!-- Tagline -->
          <p
            v-if="showTagline && tagline"
            class="text-sm md:text-base font-semibold"
            :style="{ color: taglineColor }"
            v-html="tagline"
          ></p>

          <!-- Headline -->
          <div
            v-if="showHeadline && headline"
            class="text-3xl md:text-4xl lg:text-5xl font-black"
            :style="{ color: headlineColor }"
            v-html="headline"
          ></div>

          <!-- Description -->
          <div
            v-if="showDescription && description"
            class="text-base md:text-lg"
            :style="{ color: descriptionColor }"
            v-html="description"
          ></div>

          <!-- Statistics -->
          <div
            v-if="showStatistics && statistics.length > 0"
            class="space-y-4 md:space-y-5"
          >
            <div
              v-for="(stat, index) in statistics"
              :key="index"
              class="flex items-start gap-4"
            >
              <!-- Percentage/Value -->
              <div
                class="text-4xl md:text-5xl font-black flex-shrink-0"
                :style="{ color: statValueColor }"
                v-html="formatStatValue(stat.value, stat.suffix)"
              ></div>

              <!-- Description -->
              <div
                class="text-sm md:text-base pt-2"
                :style="{ color: statDescriptionColor }"
                v-html="stat.description"
              ></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Statistic {
  value: number | string
  suffix?: string
  description: string
}

interface Props {
  // Layout
  layoutColumns?: '1-column' | '2-columns'
  imagePosition?: 'left' | 'right'

  // Visibility Toggles
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showImage?: boolean
  showStatistics?: boolean

  // Content
  tagline?: string
  headline?: string
  description?: string

  // Image
  image?: string
  imageAlt?: string
  imageAspectRatio?: string
  showImageShadow?: boolean

  // Statistics
  statistics?: Statistic[]

  // Colors
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string
  statValueColor?: string
  statDescriptionColor?: string
}

withDefaults(defineProps<Props>(), {
  // Layout
  layoutColumns: '2-columns',
  imagePosition: 'left',

  // Visibility Toggles
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showImage: true,
  showStatistics: true,

  // Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet consectetur adipiscing',
  description: '',

  // Image
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop',
  imageAlt: 'Content Image',
  imageAspectRatio: '4/3',
  showImageShadow: true,

  // Statistics
  statistics: () => [
    {
      value: 75,
      suffix: '%',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.'
    },
    {
      value: 83,
      suffix: '%',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.'
    }
  ],

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#374151',
  headlineColor: '#111827',
  descriptionColor: '#4b5563',
  statValueColor: '#111827',
  statDescriptionColor: '#4b5563'
})

// Format statistic value with suffix
const formatStatValue = (value: number | string, suffix?: string): string => {
  return `${value}${suffix || ''}`
}
</script>
