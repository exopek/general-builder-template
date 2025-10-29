<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex items-start justify-between mb-8 md:mb-12">
        <div class="flex-1">
          <p
            v-if="showTagline && tagline"
            class="text-sm md:text-base font-medium mb-3"
            :style="{ color: taglineColor }"
            v-html="tagline"
          ></p>
          <div
            v-if="showTitle && title"
            class="text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight"
            :style="{ color: titleColor }"
            v-html="title"
          ></div>
          <div
            v-if="showDescription && description"
            class="text-base md:text-lg max-w-2xl"
            :style="{ color: descriptionColor }"
            v-html="description"
          ></div>
        </div>

        <div v-if="showNavigation" class="flex gap-2 ml-4">
          <button
            type="button"
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentSlide === 0"
            @click="previousSlide"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentSlide >= items.length - slidesToShow"
            @click="nextSlide"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex-shrink-0 px-3"
            :style="{ width: `${slideWidth}%` }"
          >
            <div class="bg-white rounded-2xl overflow-hidden shadow-md transition-all hover:shadow-lg group">
              <div class="relative aspect-video bg-gray-300 overflow-hidden">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.imageAlt || item.title"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-16 h-16 text-gray-400"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>

                <a
                  v-if="item.link"
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="absolute bottom-4 left-4 w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Open link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>

              <div class="p-5">
                <p v-if="item.category" class="text-xs font-medium text-gray-500 mb-2">
                  {{ item.category }}
                </p>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.title }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showDots" class="flex justify-center gap-2 mt-8">
        <button
          v-for="(_, index) in Math.ceil(items.length / slidesToShow)"
          :key="index"
          type="button"
          class="w-2 h-2 rounded-full transition-all"
          :class="Math.floor(currentSlide / slidesToShow) === index ? 'bg-primary w-6' : 'bg-gray-300'"
          @click="goToSlide(index * slidesToShow)"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CarouselItem {
  title: string
  category?: string
  image?: string
  imageAlt?: string
  link?: string
}

interface Props {
  // Visibility Toggles
  showTagline?: boolean
  showTitle?: boolean
  showDescription?: boolean

  // Content (richText)
  tagline?: string
  title?: string
  description?: string

  // Carousel Items
  items?: CarouselItem[]

  // Carousel Settings
  slidesToShow?: number
  showNavigation?: boolean
  showDots?: boolean
  autoplay?: boolean
  autoplayInterval?: number

  // Colors
  backgroundColor?: string
  taglineColor?: string
  titleColor?: string
  descriptionColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showTagline: false,
  showTitle: true,
  showDescription: true,

  // Content
  tagline: '',
  title: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Items
  items: () => [
    {
      title: 'Lorem ipsum',
      category: 'Taxonomy'
    },
    {
      title: 'Lorem ipsum',
      category: 'Taxonomy'
    },
    {
      title: 'Lorem ipsum',
      category: 'Taxonomy'
    },
    {
      title: 'Lorem ipsum',
      category: 'Taxonomy'
    }
  ],

  // Settings
  slidesToShow: 3,
  showNavigation: true,
  showDots: false,
  autoplay: false,
  autoplayInterval: 5000,

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#ea580c',
  titleColor: '#111827',
  descriptionColor: '#4b5563'
})

const currentSlide = ref(0)
let autoplayTimer: ReturnType<typeof setTimeout> | null = null

const slideWidth = computed(() => {
  return 100 / props.slidesToShow
})

const nextSlide = () => {
  if (currentSlide.value < props.items.length - props.slidesToShow) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = Math.max(0, Math.min(index, props.items.length - props.slidesToShow))
}

const startAutoplay = () => {
  if (props.autoplay && props.items.length > props.slidesToShow) {
    autoplayTimer = setInterval(() => {
      if (currentSlide.value >= props.items.length - props.slidesToShow) {
        currentSlide.value = 0
      } else {
        nextSlide()
      }
    }, props.autoplayInterval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

watch(() => props.autoplay, (newValue: boolean) => {
  if (newValue) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})
</script>
