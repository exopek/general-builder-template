<template>
  <section class="py-16 md:py-20" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="success"
          class="mb-4"
        />

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          :style="{ color: headlineColor }"
        >
          {{ headline }}
        </h2>

        <p
          class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Filter Controls -->
      <div v-if="showFilters" class="flex flex-wrap gap-3 justify-center mb-12">
        <TransformationButton
          text="Alle"
          variant="ghost"
          size="sm"
          :class="selectedFilter === 'all' ? 'bg-orange-500 text-white' : ''"
          @click="setFilter('all')"
        />
        <TransformationButton
          v-for="filter in filterOptions"
          :key="filter.id"
          :text="filter.name"
          variant="ghost"
          size="sm"
          :class="selectedFilter === filter.id ? 'bg-orange-500 text-white' : ''"
          @click="setFilter(filter.id)"
        />
      </div>

      <!-- Results Statistics -->
      <BaseStatisticGrid
        v-if="showStatistics"
        :statistics="statisticsData"
        grid-type="fixed-4"
        gap="md"
        default-size="md"
        :default-animated="true"
        animation="stagger"
        container-class="mb-16"
      />

      <!-- Results Masonry Grid -->
      <div class="masonry-container mb-12">
        <div
          v-for="(result, index) in filteredResults"
          :key="index"
          class="masonry-item break-inside-avoid mb-6"
          @click="openModal(result)"
        >
          <TransformationCard
            variant="elevated"
            size="sm"
            :hover-effect="true"
            class="cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <!-- Before/After Images -->
            <div class="grid grid-cols-2 gap-2 mb-4">
              <div class="relative">
                <img
                  :src="result.beforeImage"
                  :alt="`${result.name} - Vorher`"
                  class="w-full rounded-lg object-cover"
                  style="aspect-ratio: 3/4;"
                />
                <TransformationBadge
                  text="Vorher"
                  variant="neutral"
                  size="xs"
                  position="bottom-left"
                />
              </div>
              <div class="relative">
                <img
                  :src="result.afterImage"
                  :alt="`${result.name} - Nachher`"
                  class="w-full rounded-lg object-cover"
                  style="aspect-ratio: 3/4;"
                />
                <TransformationBadge
                  text="Nachher"
                  variant="success"
                  size="xs"
                  position="bottom-right"
                />
              </div>
            </div>

            <!-- Result Info -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-gray-900">{{ result.name }}</h3>
                <TransformationBadge
                  :text="`-${result.weightLoss}kg`"
                  variant="new"
                  size="sm"
                />
              </div>

              <div class="text-sm text-gray-600">
                <div class="flex items-center gap-2 mb-1">
                  <TransformationIcon
                    emoji="📅"
                    variant="neutral"
                    size="xs"
                  />
                  <span>{{ result.duration }} Wochen</span>
                </div>
                <div class="flex items-center gap-2">
                  <TransformationIcon
                    emoji="🎯"
                    variant="primary"
                    size="xs"
                  />
                  <span>{{ result.goal }}</span>
                </div>
              </div>

              <!-- Key Stats -->
              <div class="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200">
                <div class="text-center">
                  <div class="text-lg font-bold text-orange-500">{{ result.weightLoss }}kg</div>
                  <div class="text-xs text-gray-500">Verlust</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-blue-500">{{ result.muscleGain }}%</div>
                  <div class="text-xs text-gray-500">Muskeln</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-green-500">{{ result.bodyFat }}%</div>
                  <div class="text-xs text-gray-500">Körperfett</div>
                </div>
              </div>

              <!-- Program Type -->
              <div class="flex items-center gap-2">
                <TransformationBadge
                  :text="result.program"
                  :variant="getProgramVariant(result.program)"
                  size="xs"
                />
                <span class="text-xs text-gray-500">{{ result.age }} Jahre</span>
              </div>
            </div>
          </TransformationCard>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="text-center">
        <TransformationButton
          :text="loadMoreText"
          variant="outline"
          size="lg"
          @click="loadMoreResults"
          :disabled="isLoading"
        />
      </div>

      <!-- CTA Section -->
      <div v-if="showCta" class="text-center mt-16">
        <div class="max-w-3xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{{ ctaHeadline }}</h3>
          <p class="text-lg text-gray-600 mb-8">{{ ctaDescription }}</p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <TransformationButton
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
            />
            <TransformationButton
              :text="secondaryCtaText"
              :href="secondaryCtaUrl"
              variant="outline"
              size="lg"
            />
          </div>
        </div>
      </div>

    </div>

    <!-- Modal for detailed view -->
    <div
      v-if="selectedResult"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6 md:p-8">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedResult.name }}s Transformation</h3>
            <button
              @click="closeModal"
              class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Images -->
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <img
                    :src="selectedResult.beforeImage"
                    :alt="`${selectedResult.name} - Vorher`"
                    class="w-full rounded-xl object-cover"
                    style="aspect-ratio: 3/4;"
                  />
                  <TransformationBadge
                    text="Vorher"
                    variant="neutral"
                    size="md"
                    position="bottom-left"
                  />
                </div>
                <div class="relative">
                  <img
                    :src="selectedResult.afterImage"
                    :alt="`${selectedResult.name} - Nachher`"
                    class="w-full rounded-xl object-cover"
                    style="aspect-ratio: 3/4;"
                  />
                  <TransformationBadge
                    text="Nachher"
                    variant="success"
                    size="md"
                    position="bottom-right"
                  />
                </div>
              </div>

              <!-- Detailed Stats -->
              <div class="grid grid-cols-2 gap-4">
                <BaseStatistic
                  :value="selectedResult.weightLoss"
                  label="Gewichtsverlust"
                  suffix="kg"
                  variant="highlight"
                  size="sm"
                />
                <BaseStatistic
                  :value="selectedResult.duration"
                  label="Dauer"
                  suffix="Wochen"
                  variant="primary"
                  size="sm"
                />
              </div>
            </div>

            <!-- Story -->
            <div class="space-y-6">
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Transformation Story</h4>
                <p class="text-gray-700 leading-relaxed">{{ selectedResult.story }}</p>
              </div>

              <div>
                <h4 class="font-semibold text-gray-900 mb-3">Erfolgs-Metriken</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Gewichtsverlust</span>
                    <span class="font-semibold">{{ selectedResult.weightLoss }}kg</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Muskelzuwachs</span>
                    <span class="font-semibold">{{ selectedResult.muscleGain }}%</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Körperfett-Reduktion</span>
                    <span class="font-semibold">{{ selectedResult.bodyFat }}%</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Programm</span>
                    <TransformationBadge
                      :text="selectedResult.program"
                      :variant="getProgramVariant(selectedResult.program)"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <div v-if="selectedResult.quote">
                <h4 class="font-semibold text-gray-900 mb-2">Persönliches Statement</h4>
                <blockquote class="text-gray-700 italic border-l-4 border-orange-500 pl-4">
                  "{{ selectedResult.quote }}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TransformationResult {
  name: string
  age: number
  beforeImage: string
  afterImage: string
  weightLoss: number
  muscleGain: number
  bodyFat: number
  duration: number
  goal: string
  program: 'Starter' | 'Premium' | 'VIP'
  category: string
  story: string
  quote?: string
}

interface FilterOption {
  id: string
  name: string
}

interface Statistics {
  totalTransformations: number
  averageWeightLoss: number
  averageDuration: number
  satisfactionRate: number
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Results Data
  results?: TransformationResult[]

  // Statistics
  showStatistics?: boolean
  statistics?: Statistics

  // Filters
  showFilters?: boolean
  filterOptions?: FilterOption[]

  // Load More
  showLoadMore?: boolean
  loadMoreText?: string

  // CTA
  showCta?: boolean
  ctaHeadline?: string
  ctaDescription?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Echte Transformationen. Echte Ergebnisse.',
  subheadline: 'Sieh selbst, was in nur 7 Wochen möglich ist. Diese Erfolgsgeschichten zeigen das wahre Potenzial unseres Programms und können auch deine Realität werden.',
  badgeText: 'Verifizierte Ergebnisse',
  showBadge: true,

  results: () => [
    {
      name: 'Sarah M.',
      age: 29,
      beforeImage: 'https://images.unsplash.com/photo-1494790108755-2616c20e2a7c?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=center',
      weightLoss: 12,
      muscleGain: 18,
      bodyFat: 8,
      duration: 7,
      goal: 'Gewichtsverlust & Toning',
      program: 'Premium',
      category: 'weightloss',
      story: 'Nach der Geburt meines zweiten Kindes fühlte ich mich nicht mehr wohl in meinem Körper. Das 7-Wochen Programm hat mir geholfen, nicht nur Gewicht zu verlieren, sondern auch mein Selbstvertrauen zurückzugewinnen.',
      quote: 'Ich hätte nie gedacht, dass ich in so kurzer Zeit so viel erreichen kann!'
    },
    {
      name: 'Michael K.',
      age: 35,
      beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=400&fit=crop&crop=center',
      weightLoss: 8,
      muscleGain: 25,
      bodyFat: 6,
      duration: 7,
      goal: 'Muskelaufbau & Definition',
      program: 'VIP',
      category: 'muscle',
      story: 'Als Vater und Vollzeit-Berufstätiger dachte ich, ich hätte keine Zeit für Fitness. Das Programm hat mir gezeigt, wie ich effizient trainieren und trotzdem Ergebnisse erzielen kann.',
      quote: 'Die beste Investition in meine Gesundheit, die ich je gemacht habe.'
    },
    {
      name: 'Lisa R.',
      age: 26,
      beforeImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=400&fit=crop&crop=center',
      weightLoss: 10,
      muscleGain: 15,
      bodyFat: 7,
      duration: 7,
      goal: 'Körper straffen',
      program: 'Premium',
      category: 'toning',
      story: 'Jahrelang habe ich verschiedene Diäten probiert, aber nie nachhaltige Ergebnisse erzielt. Hier habe ich gelernt, wie Ernährung und Training wirklich funktionieren.',
      quote: 'Endlich verstehe ich, wie mein Körper funktioniert!'
    },
    {
      name: 'Thomas B.',
      age: 42,
      beforeImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=center',
      weightLoss: 15,
      muscleGain: 12,
      bodyFat: 10,
      duration: 7,
      goal: 'Bauchfett verlieren',
      program: 'Starter',
      category: 'weightloss',
      story: 'Mit 42 dachte ich, es sei zu spät für eine Transformation. Das Programm hat mir das Gegenteil bewiesen und mir gezeigt, dass es nie zu spät ist.',
      quote: 'Ich fühle mich jünger als mit 30!'
    },
    {
      name: 'Anna W.',
      age: 31,
      beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=center',
      weightLoss: 9,
      muscleGain: 20,
      bodyFat: 5,
      duration: 7,
      goal: 'Fitness & Ausdauer',
      program: 'Premium',
      category: 'fitness',
      story: 'Ich wollte endlich fit werden und nicht nur dünn sein. Das Programm hat mir geholfen, echte Stärke aufzubauen und meine Ausdauer deutlich zu verbessern.',
      quote: 'Stärke fühlt sich besser an als dünn sein!'
    },
    {
      name: 'David L.',
      age: 28,
      beforeImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop&crop=center',
      weightLoss: 6,
      muscleGain: 30,
      bodyFat: 4,
      duration: 7,
      goal: 'Muskelmasse aufbauen',
      program: 'VIP',
      category: 'muscle',
      story: 'Als Hardgainer hatte ich jahrelang Probleme, Muskelmasse aufzubauen. Das VIP-Programm mit persönlicher Betreuung war der Game-Changer.',
      quote: 'Endlich sehe ich Ergebnisse meines harten Trainings!'
    }
  ],

  showStatistics: true,
  statistics: () => ({
    totalTransformations: 2847,
    averageWeightLoss: 8.2,
    averageDuration: 7.2,
    satisfactionRate: 94
  }),

  showFilters: true,
  filterOptions: () => [
    { id: 'weightloss', name: 'Gewichtsverlust' },
    { id: 'muscle', name: 'Muskelaufbau' },
    { id: 'toning', name: 'Körperstraffung' },
    { id: 'fitness', name: 'Fitness & Ausdauer' }
  ],

  showLoadMore: true,
  loadMoreText: 'Weitere Erfolgsgeschichten laden',

  showCta: true,
  ctaHeadline: 'Schreibe deine eigene Erfolgsgeschichte',
  ctaDescription: 'Werde Teil unserer Community erfolgreicher Transformationen und erreiche deine Ziele in nur 7 Wochen.',
  primaryCtaText: 'Meine Transformation starten',
  primaryCtaUrl: '#anmeldung',
  secondaryCtaText: 'Kostenlose Beratung',
  secondaryCtaUrl: '#beratung',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

// Transform statistics into array format
const statisticsData = computed(() => [
  {
    key: 'totalTransformations',
    value: props.statistics.totalTransformations,
    label: 'Erfolgreiche Transformationen',
    suffix: '+',
    variant: 'primary'
  },
  {
    key: 'averageWeightLoss',
    value: props.statistics.averageWeightLoss,
    label: 'Ø Gewichtsverlust',
    suffix: 'kg',
    variant: 'highlight'
  },
  {
    key: 'averageDuration',
    value: props.statistics.averageDuration,
    label: 'Ø Programmdauer',
    suffix: 'Wochen',
    variant: 'secondary'
  },
  {
    key: 'satisfactionRate',
    value: props.statistics.satisfactionRate,
    label: 'Zufriedenheitsrate',
    suffix: '%',
    variant: 'success'
  }
])

const selectedFilter = ref('all')
const selectedResult = ref<TransformationResult | null>(null)
const displayCount = ref(6)
const isLoading = ref(false)

const filteredResults = computed(() => {
  let filtered = props.results

  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(result => result.category === selectedFilter.value)
  }

  return filtered.slice(0, displayCount.value)
})

const setFilter = (filterId: string) => {
  selectedFilter.value = filterId
  displayCount.value = 6
}

const loadMoreResults = () => {
  isLoading.value = true
  setTimeout(() => {
    displayCount.value += 6
    isLoading.value = false
  }, 500)
}

const openModal = (result: TransformationResult) => {
  selectedResult.value = result
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedResult.value = null
  document.body.style.overflow = 'auto'
}

const getProgramVariant = (program: string) => {
  const variants = {
    'Starter': 'neutral',
    'Premium': 'popular',
    'VIP': 'featured'
  }
  return variants[program as keyof typeof variants] || 'neutral'
}

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* Masonry Layout */
.masonry-container {
  columns: 1;
  column-gap: 1.5rem;
}

@media (min-width: 640px) {
  .masonry-container {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-container {
    columns: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-container {
    columns: 4;
  }
}

.masonry-item {
  display: inline-block;
  width: 100%;
}

/* Modal animations */
.fixed {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Smooth hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Loading state for load more button */
.transition-all {
  transition: all 0.3s ease;
}
</style>