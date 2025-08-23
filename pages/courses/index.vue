<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-4">
            Unsere Kurse
          </h1>
          <p class="text-xl text-indigo-100 max-w-2xl mx-auto">
            Entdecken Sie unser vielfältiges Kursangebot und finden Sie das perfekte Training für Ihre Ziele
          </p>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Filter</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
            <select
              v-model="selectedCategory"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Alle Kategorien</option>
              <option v-for="category in availableCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Level Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              v-model="selectedLevel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Alle Level</option>
              <option value="beginner">Anfänger</option>
              <option value="intermediate">Fortgeschritten</option>
              <option value="advanced">Experte</option>
            </select>
          </div>

          <!-- Date Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Datum</label>
            <input
              v-model="selectedDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Availability Filter -->
          <div class="flex items-end">
            <label class="flex items-center">
              <input
                v-model="showOnlyAvailable"
                type="checkbox"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              />
              <span class="ml-2 text-sm text-gray-700">Nur verfügbare Kurse</span>
            </label>
          </div>
        </div>

        <!-- Clear Filters -->
        <div class="mt-4 flex justify-between items-center">
          <button
            @click="clearFilters"
            class="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Filter zurücksetzen
          </button>
          <div class="text-sm text-gray-600">
            {{ filteredCourses.length }} von {{ totalCourses }} Kursen
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="coursesStore.isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p class="mt-2 text-gray-600">Kurse werden geladen...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="coursesStore.error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
          <div class="text-red-600">
            <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="font-medium">Fehler beim Laden der Kurse</p>
            <p class="text-sm mt-1">{{ coursesStore.error }}</p>
          </div>
          <button
            @click="loadCourses"
            class="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredCourses.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Keine Kurse gefunden</h3>
        <p class="text-gray-600 mb-4">Mit den aktuellen Filtern wurden keine Kurse gefunden.</p>
        <button
          @click="clearFilters"
          class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Filter zurücksetzen
        </button>
      </div>

      <!-- Courses Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
          @book-course="handleBookCourse"
          @view-details="handleViewDetails"
        />
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreCourses" class="text-center mt-8">
        <button
          @click="loadMore"
          :disabled="isLoadingMore"
          class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg 
            v-if="isLoadingMore" 
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          {{ isLoadingMore ? 'Lade weitere Kurse...' : 'Weitere Kurse laden' }}
        </button>
      </div>
    </div>

    <!-- BookingModal -->
    <BookingModal
      v-if="showBookingModal"
      :course-id="selectedCourseId"
      @close="closeBookingModal"
      @success="handleBookingSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import CourseCard from '~/components/booking/CourseCard.vue'

// Page meta
definePageMeta({
  title: 'Kurse',
  description: 'Entdecken Sie unser vielfältiges Kursangebot'
})

// Stores
const coursesStore = useCoursesStore()
const bookingsStore = useBookingsStore()
const { isAuthenticated } = useAuth()

// State
const selectedCategory = ref('')
const selectedLevel = ref('')
const selectedDate = ref('')
const showOnlyAvailable = ref(false)
const showBookingModal = ref(false)
const selectedCourseId = ref<string | null>(null)
const isLoadingMore = ref(false)

// Computed
const filteredCourses = computed(() => {
  return coursesStore.filteredCourses
})

const totalCourses = computed(() => {
  return coursesStore.courses.length
})

const availableCategories = computed(() => {
  const categories = new Set(coursesStore.courses.map(course => course.category))
  return Array.from(categories).sort()
})

const hasMoreCourses = computed(() => {
  // This would be used for pagination in a real app
  return false
})

// Methods
const loadCourses = async () => {
  await coursesStore.fetchCourses()
  if (isAuthenticated.value) {
    await bookingsStore.fetchBookings()
  }
}

const clearFilters = () => {
  selectedCategory.value = ''
  selectedLevel.value = ''
  selectedDate.value = ''
  showOnlyAvailable.value = false
  coursesStore.clearFilters()
}

const loadMore = async () => {
  isLoadingMore.value = true
  // Simulate loading more courses
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoadingMore.value = false
}

const handleBookCourse = (courseId: string) => {
  if (!isAuthenticated.value) {
    navigateTo(`/auth/login?redirect=${encodeURIComponent($route.fullPath)}`)
    return
  }
  
  selectedCourseId.value = courseId
  showBookingModal.value = true
}

const handleViewDetails = (courseId: string) => {
  navigateTo(`/courses/${courseId}`)
}

const closeBookingModal = () => {
  showBookingModal.value = false
  selectedCourseId.value = null
}

const handleBookingSuccess = () => {
  closeBookingModal()
  // Refresh courses to update participant counts
  loadCourses()
}

// Watch filters and update store
watch([selectedCategory, selectedLevel, selectedDate, showOnlyAvailable], () => {
  coursesStore.setFilters({
    category: selectedCategory.value || undefined,
    level: selectedLevel.value || undefined,
    date: selectedDate.value || undefined,
    available: showOnlyAvailable.value || undefined
  })
})

// Load courses on mount
onMounted(async () => {
  await loadCourses()
})

// Dynamic imports for components used conditionally
const BookingModal = defineAsyncComponent(() => import('~/components/booking/BookingModal.vue'))
</script>