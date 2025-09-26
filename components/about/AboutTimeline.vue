<template>
  <div class="relative">
    <!-- Timeline Container -->
    <div ref="timelineContainer" class="relative">

      <!-- Vertical Timeline Line (for vertical layout) -->
      <div
        v-if="layout === 'vertical'"
        class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-primary rounded-full"
        :class="timelineLineClass"
      ></div>

      <!-- Timeline Items -->
      <div
        :class="[
          layout === 'vertical' ? 'space-y-8 md:space-y-12' : 'grid gap-8',
          layout === 'horizontal' ? horizontalGridClass : ''
        ]"
      >
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="relative timeline-item"
          :class="[
            layout === 'vertical' ? 'flex items-start' : '',
            getItemAnimationClass(index)
          ]"
        >

          <!-- Timeline Node/Badge (for vertical layout) -->
          <div
            v-if="layout === 'vertical'"
            class="relative z-10 flex-shrink-0"
            :class="nodePositionClass"
          >
            <div
              class="flex items-center justify-center rounded-full border-4 border-white shadow-md transition-all duration-300"
              :class="getNodeClasses(index)"
            >
              <AboutIcon
                v-if="item.icon || item.iconName"
                :icon="item.icon"
                :name="item.iconName"
                :variant="getIconVariant(index)"
                size="sm"
              />
              <span v-else-if="item.year" class="text-sm font-bold text-white">
                {{ String(item.year).slice(-2) }}
              </span>
              <span v-else class="text-sm font-bold text-white">
                {{ index + 1 }}
              </span>
            </div>
            <!-- Connection line for this item -->
            <div
              v-if="index < timelineItems.length - 1"
              class="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 rounded-full"
              :style="{ height: `${itemSpacing}px` }"
            ></div>
          </div>

          <!-- Content Card -->
          <div
            :class="[
              layout === 'vertical' ? 'ml-6 flex-1' : '',
              'timeline-content'
            ]"
          >
            <AboutCard
              :variant="getCardVariant(index)"
              :size="cardSize"
              :title="item.title"
              :subtitle="item.subtitle"
              :description="item.description"
              :image="item.image"
              :image-alt="item.imageAlt"
              :image-style="item.imageStyle || 'landscape'"
              :badge="getBadgeText(item)"
              :badge-variant="getBadgeVariant(index)"
              :icon="!item.image ? (item.icon || null) : null"
              :icon-name="!item.image ? item.iconName : null"
              :icon-variant="getIconVariant(index)"
              :hover-effect="true"
            >
              <!-- Custom content for metrics/achievements -->
              <div v-if="item.metrics && item.metrics.length > 0" class="mt-4">
                <div class="grid grid-cols-2 gap-3">
                  <AboutStatistic
                    v-for="metric in item.metrics"
                    :key="metric.label"
                    :value="metric.value"
                    :label="metric.label"
                    :suffix="metric.suffix"
                    variant="minimal"
                    size="sm"
                    :count-up="false"
                  />
                </div>
              </div>

              <!-- Custom content for highlights -->
              <div v-if="item.highlights && item.highlights.length > 0" class="mt-4">
                <ul class="space-y-2">
                  <li
                    v-for="highlight in item.highlights"
                    :key="highlight"
                    class="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                    <span>{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </AboutCard>
          </div>

        </div>
      </div>

      <!-- Progress Indicator (shows how much of timeline is complete) -->
      <div v-if="showProgress && layout === 'vertical'" class="mt-8 text-center">
        <div class="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
          <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <span class="text-sm font-medium text-gray-600">
            {{ Math.round(progressPercentage) }}% der Geschichte
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineMetric {
  label: string
  value: number
  suffix?: string
}

interface TimelineItem {
  title: string
  subtitle?: string
  description?: string
  year?: number
  date?: string
  image?: string
  imageAlt?: string
  imageStyle?: 'square' | 'portrait' | 'landscape' | 'circle'
  icon?: string
  iconName?: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
  highlights?: string[]
  metrics?: TimelineMetric[]
  status?: 'completed' | 'current' | 'upcoming'
}

interface Props {
  // Timeline data
  timelineItems: TimelineItem[]

  // Layout options
  layout?: 'vertical' | 'horizontal'
  cardSize?: 'sm' | 'md' | 'lg'

  // Visual options
  showProgress?: boolean
  progressPercentage?: number
  currentItemIndex?: number

  // Animation options
  animateOnScroll?: boolean
  staggerAnimation?: boolean

  // Styling options
  primaryColor?: string
  lineStyle?: 'solid' | 'dashed' | 'gradient'
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  cardSize: 'md',
  showProgress: false,
  progressPercentage: 100,
  currentItemIndex: -1,
  animateOnScroll: true,
  staggerAnimation: true,
  primaryColor: 'var(--color-primary)',
  lineStyle: 'gradient'
})

// Computed classes and utilities
const timelineLineClass = computed(() => {
  const styles = {
    solid: 'bg-primary',
    dashed: 'bg-primary border-dashed',
    gradient: 'bg-gradient-primary'
  }
  return styles[props.lineStyle]
})

const horizontalGridClass = computed(() => {
  const itemCount = props.timelineItems.length
  if (itemCount <= 2) return 'grid-cols-1 md:grid-cols-2'
  if (itemCount <= 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
})

const nodePositionClass = computed(() => {
  return props.layout === 'vertical' ? '-ml-3' : ''
})

const itemSpacing = computed(() => {
  const sizes = {
    sm: 80,
    md: 96,
    lg: 112
  }
  return sizes[props.cardSize]
})

// Node (timeline dot) styling
const getNodeClasses = (index: number) => {
  const item = props.timelineItems[index]
  const isCompleted = item.status === 'completed' || index < props.currentItemIndex
  const isCurrent = item.status === 'current' || index === props.currentItemIndex

  if (isCurrent) {
    return 'w-12 h-12 bg-gradient-primary ring-4 ring-primary/20 animate-pulse'
  } else if (isCompleted) {
    return 'w-10 h-10 bg-gradient-primary hover:bg-primary-dark'
  } else {
    return 'w-8 h-8 bg-gray-300 hover:bg-gray-400'
  }
}

const getCardVariant = (index: number) => {
  const item = props.timelineItems[index]
  const isCurrent = item.status === 'current' || index === props.currentItemIndex

  if (isCurrent) return 'gradient'
  return 'elevated'
}

const getIconVariant = (index: number) => {
  const item = props.timelineItems[index]
  const isCompleted = item.status === 'completed' || index < props.currentItemIndex
  const isCurrent = item.status === 'current' || index === props.currentItemIndex

  if (isCurrent) return 'primary'
  if (isCompleted) return 'success'
  return 'neutral'
}

const getBadgeText = (item: TimelineItem) => {
  if (item.year) return item.year.toString()
  if (item.date) return item.date
  if (item.status === 'current') return 'Aktuell'
  if (item.status === 'upcoming') return 'Geplant'
  return null
}

const getBadgeVariant = (index: number) => {
  const item = props.timelineItems[index]
  const isCurrent = item.status === 'current' || index === props.currentItemIndex

  if (isCurrent) return 'featured'
  return 'info'
}

// Animation classes
const getItemAnimationClass = (index: number) => {
  if (!props.animateOnScroll) return ''

  if (props.staggerAnimation) {
    return `animate-fade-in-up animate-delay-${Math.min(index * 100, 700)}`
  }

  return 'animate-fade-in-up'
}

// Refs and lifecycle
const timelineContainer = ref<HTMLElement>()
</script>

<style scoped>
/* Timeline Animation Classes */
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

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Stagger animation delays */
.animate-delay-0 { animation-delay: 0ms; }
.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }
.animate-delay-400 { animation-delay: 400ms; }
.animate-delay-500 { animation-delay: 500ms; }
.animate-delay-600 { animation-delay: 600ms; }
.animate-delay-700 { animation-delay: 700ms; }

/* Enhanced timeline line */
.bg-gradient-primary {
  background: var(--gradient-primary);
}

/* Timeline node pulse animation for current item */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 107, 53, 0);
  }
}

.animate-pulse {
  animation: pulse-glow 2s infinite;
}

/* Hover effects for timeline items */
.timeline-item:hover .timeline-content {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .timeline-item {
    margin-bottom: 2rem;
  }

  .w-12 { width: 2.5rem; height: 2.5rem; }
  .w-10 { width: 2rem; height: 2rem; }
  .w-8 { width: 1.75rem; height: 1.75rem; }
}

/* Connection line styling */
.timeline-item::before {
  content: '';
  position: absolute;
  left: 1.5rem;
  top: 3rem;
  bottom: -2rem;
  width: 2px;
  background: linear-gradient(to bottom,
    var(--color-primary) 0%,
    var(--color-primary-light) 50%,
    var(--color-gray-300) 100%
  );
  z-index: 0;
}

.timeline-item:last-child::before {
  display: none;
}

/* Grid layout adjustments for horizontal timeline */
.grid .timeline-item::before {
  display: none;
}

/* Progress indicator styling */
.bg-gradient-primary {
  background: var(--gradient-primary);
}
</style>