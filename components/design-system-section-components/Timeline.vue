<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
    :class="timelineClasses"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Header Section -->
      <div v-if="showHeadline || showSubheadline" class="text-center mb-8 md:mb-12">
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>
        <div
          v-if="showSubheadline && subheadline"
          class="text-base md:text-lg max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
          v-html="subheadline"
        ></div>
      </div>

      <!-- Progress Bar (for horizontal timeline) -->
      <div
        v-if="showProgress && orientation === 'horizontal'"
        class="timeline-progress mb-8"
      >
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <div class="text-center mt-2 text-sm" :style="{ color: subheadlineColor }">
          {{ currentStep }} von {{ totalSteps }} Schritten
        </div>
      </div>

      <!-- Timeline Container -->
      <div class="timeline-container" :class="containerClasses">
        <div
          v-for="(item, index) in processedItems"
          :key="item.key || index"
          class="timeline-item"
          :class="[
            getItemClasses(item, index),
            { 'active': item.active, 'completed': item.completed }
          ]"
          @click="handleItemClick(item, index)"
        >
          <!-- Timeline Connector (vertical only) -->
          <div
            v-if="orientation === 'vertical' && index < processedItems.length - 1"
            class="timeline-connector"
            :class="{ 'completed': item.completed }"
          ></div>

          <!-- Timeline Marker -->
          <div class="timeline-marker" :class="getMarkerClasses(item)">
            <span v-if="showNumbers" class="marker-number">
              {{ index + 1 }}
            </span>
            <div v-else class="marker-dot"></div>
          </div>

          <!-- Timeline Content -->
          <div class="timeline-content" :class="getContentClasses(item)">
            <!-- Date/Step Info -->
            <div v-if="item.date || item.step" class="timeline-meta">
              <span v-if="item.date" class="timeline-date">{{ formatDate(item.date) }}</span>
              <span v-if="item.step" class="timeline-step">{{ item.step }}</span>
            </div>

            <!-- Main Content -->
            <h3 v-if="item.title" class="timeline-title">{{ item.title }}</h3>
            <p v-if="item.description" class="timeline-description">{{ item.description }}</p>

            <!-- Features/Details -->
            <div v-if="item.features && item.features.length > 0" class="timeline-features">
              <ul class="feature-list">
                <li v-for="(feature, featureIndex) in item.features" :key="featureIndex">
                  {{ getFeatureText(feature) }}
                </li>
              </ul>
            </div>

            <!-- Custom Content Slot -->
            <slot :name="`item-${index}`" :item="item" :index="index" />

            <!-- CTA Button -->
            <Button
              v-if="item.ctaText"
              :text="item.ctaText"
              :href="item.ctaUrl"
              :variant="item.ctaVariant || 'outline'"
              size="sm"
              class="mt-4"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="hasFooter" class="timeline-footer mt-8 md:mt-12 text-center">
        <slot name="footer" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'

interface TimelineItem {
  key?: string
  title: string
  description?: string
  date?: string | Date
  step?: string
  features?: (string | { feature?: string; text?: string })[]
  active?: boolean
  completed?: boolean
  status?: 'pending' | 'active' | 'completed'
  ctaText?: string
  ctaUrl?: string
  ctaVariant?: 'primary' | 'secondary' | 'ghost' | 'outline'
}

interface Props {
  // Visibility Toggles
  showHeadline?: boolean
  showSubheadline?: boolean

  // Content (richText)
  headline?: string
  subheadline?: string

  // Timeline Items
  items: TimelineItem[]

  // Layout
  orientation?: 'vertical' | 'horizontal'
  variant?: 'default' | 'minimal' | 'cards' | 'connected'
  size?: 'sm' | 'md' | 'lg'

  // Progress
  showProgress?: boolean
  currentStep?: number
  showNumbers?: boolean

  // Behavior
  interactive?: boolean

  // Colors
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  // Visibility
  showHeadline: true,
  showSubheadline: true,

  // Content
  headline: 'Timeline',
  subheadline: 'Follow our journey',

  // Layout
  orientation: 'vertical',
  variant: 'default',
  size: 'md',

  // Progress
  showProgress: false,
  currentStep: 1,
  showNumbers: true,

  // Behavior
  interactive: false,

  // Colors
  backgroundColor: '#ffffff',
  headlineColor: '#111827',
  subheadlineColor: '#4b5563'
})

const slots = useSlots()
const emit = defineEmits<{
  itemClick: [item: TimelineItem, index: number]
}>()

// Computed properties
const hasFooter = computed(() => !!slots.footer)

const totalSteps = computed(() => props.items.length)

const progressPercentage = computed(() => {
  if (totalSteps.value === 0) return 0
  return Math.min((props.currentStep / totalSteps.value) * 100, 100)
})

const processedItems = computed(() => {
  return props.items.map((item, index) => ({
    ...item,
    active: item.active || (index + 1 === props.currentStep),
    completed: item.completed || (index + 1 < props.currentStep)
  }))
})

// CSS Classes
const timelineClasses = computed(() => {
  return [
    'base-timeline',
    `timeline-${props.orientation}`,
    `timeline-${props.variant}`,
    `timeline-${props.size}`
  ]
})

const containerClasses = computed(() => {
  const orientationClasses = {
    vertical: 'timeline-vertical',
    horizontal: 'timeline-horizontal grid gap-4 md:gap-6'
  }

  const responsiveClasses = props.orientation === 'horizontal'
    ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : ''

  return `${orientationClasses[props.orientation]} ${responsiveClasses}`
})

const getItemClasses = (item: TimelineItem, index: number) => {
  const baseClasses = 'relative'
  const variantClasses = {
    default: '',
    minimal: 'minimal-item',
    cards: 'card-item',
    connected: 'connected-item'
  }
  const interactiveClasses = props.interactive ? 'cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors' : ''

  return `${baseClasses} ${variantClasses[props.variant]} ${interactiveClasses}`
}

const getMarkerClasses = (item: TimelineItem) => {
  const baseClasses = 'timeline-marker'
  const statusClasses = {
    pending: 'marker-pending',
    active: 'marker-active',
    completed: 'marker-completed'
  }

  const status = item.completed ? 'completed' : item.active ? 'active' : 'pending'
  return `${baseClasses} ${statusClasses[status]}`
}

const getContentClasses = (item: TimelineItem) => {
  const baseClasses = 'timeline-content'
  const variantClasses = {
    default: '',
    minimal: 'minimal-content',
    cards: 'card bg-white p-6 shadow-md rounded-2xl',
    connected: 'connected-content'
  }

  return `${baseClasses} ${variantClasses[props.variant]}`
}

// Methods
const formatDate = (date: string | Date) => {
  if (typeof date === 'string') return date
  return date.toLocaleDateString('de-DE')
}

const getFeatureText = (feature: string | { feature?: string; text?: string }): string => {
  if (typeof feature === 'string') {
    return feature
  }
  return feature.feature || feature.text || ''
}

const handleItemClick = (item: TimelineItem, index: number) => {
  if (props.interactive) {
    emit('itemClick', item, index)
  }
}
</script>

<style scoped>
.base-timeline {
  position: relative;
}

/* Progress Bar */
.progress-bar {
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 9999px;
  transition: width 0.5s ease;
}

/* Vertical Timeline */
.timeline-vertical {
  position: relative;
  padding-left: 2rem;
}

.timeline-vertical::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #d1d5db;
  transform: translateX(-50%);
}

.timeline-vertical .timeline-item {
  position: relative;
  padding-bottom: 3rem;
}

.timeline-vertical .timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-connector {
  position: absolute;
  left: -1.75rem;
  top: 3rem;
  width: 2px;
  height: calc(100% - 1rem);
  background: #d1d5db;
  transition: background-color 0.3s ease;
}

.timeline-connector.completed {
  background: #ea580c;
}

/* Horizontal Timeline */
.timeline-horizontal .timeline-item {
  text-align: center;
}

/* Timeline Marker */
.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  z-index: 10;
}

.timeline-horizontal .timeline-marker {
  position: relative;
  left: auto;
  top: auto;
  margin: 0 auto 1rem;
}

/* Marker States */
.marker-pending {
  background: #e5e7eb;
  color: #6b7280;
  border: 2px solid #d1d5db;
}

.marker-active {
  background: #ea580c;
  color: white;
  border: 2px solid #ea580c;
  box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.2);
}

.marker-completed {
  background: #ea580c;
  color: white;
  border: 2px solid #ea580c;
}

.marker-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.marker-number {
  font-size: 0.75rem;
  font-weight: 700;
}

/* Timeline Content */
.timeline-content {
  margin-left: 1rem;
}

.timeline-horizontal .timeline-content {
  margin-left: 0;
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.timeline-date {
  font-size: 0.875rem;
  font-weight: 500;
  color: #ea580c;
}

.timeline-step {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  color: #6b7280;
  border-radius: 9999px;
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.timeline-description {
  color: #6b7280;
  margin-bottom: 0.75rem;
  line-height: 1.625;
}

.timeline-features {
  margin-bottom: 1rem;
}

.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.feature-list li {
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.feature-list li::before {
  content: '✓';
  color: #ea580c;
  margin-right: 0.5rem;
  font-weight: 600;
}

/* Variants */
.timeline-minimal .timeline-marker {
  width: 1rem;
  height: 1rem;
  left: -1.5rem;
}

.timeline-minimal .timeline-content {
  margin-left: 0.5rem;
}

.timeline-minimal::before {
  left: 0.5rem;
}

.card-item {
  margin-bottom: 1.5rem;
}

.card-item .timeline-content {
  margin-left: 0;
}

/* Size variations */
.timeline-sm .timeline-title {
  font-size: 1rem;
}

.timeline-sm .timeline-description {
  font-size: 0.875rem;
}

.timeline-lg .timeline-title {
  font-size: 1.25rem;
}

.timeline-lg .timeline-description {
  font-size: 1.125rem;
}

.timeline-lg .timeline-marker {
  width: 2.5rem;
  height: 2.5rem;
  left: -2.25rem;
}

.timeline-lg .timeline-content {
  margin-left: 1.5rem;
}

/* Active/Hover states */
.timeline-item.active .timeline-content {
  background-color: rgba(234, 88, 12, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .timeline-horizontal {
    grid-template-columns: repeat(1, 1fr);
  }

  .timeline-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .timeline-title {
    font-size: 1rem;
  }

  .timeline-description {
    font-size: 0.875rem;
  }
}
</style>
