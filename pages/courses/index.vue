<template>
  <div class="min-h-screen bg-gray-50 pt-24">
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
   
    <!-- Week Navigation -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

       <!-- Back Button -->
    <div class="mb-6">
        <NuxtLink
          to="/user"
          class="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück
        </NuxtLink>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Kursübersicht</h2>
            <p class="text-sm text-gray-600 mt-1">{{ currentWeekDisplayText }}</p>
          </div>
          
          <!-- Week Navigation Controls -->
          <div class="flex items-center space-x-4">
            <button
              @click="previousWeek"
              :disabled="currentWeekIndex === 0"
              class="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span class="text-sm text-gray-600 min-w-[200px] text-center font-medium">
              {{ formatWeekRange(currentWeekStart, currentWeekEnd) }}
            </span>
            
            <button
              @click="nextWeek"
              :disabled="currentWeekIndex >= maxWeekIndex"
              class="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mt-4 text-sm text-gray-600">
          {{ currentWeekCourses.length }} {{ currentWeekCourses.length === 1 ? 'Kurs' : 'Kurse' }} verfügbar
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
      <div v-else-if="currentWeekCourses.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Keine Kurse diese Woche</h3>
        <p class="text-gray-600 mb-4">Für diese Woche sind keine Kurse verfügbar.</p>
        <div class="space-x-2">
          <button
            v-if="currentWeekIndex < maxWeekIndex"
            @click="nextWeek"
            class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Nächste Woche
          </button>
          <button
            v-if="currentWeekIndex > 0"
            @click="previousWeek"
            class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            Vorherige Woche
          </button>
        </div>
      </div>

      <!-- Courses Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CourseCard
          v-for="course in currentWeekCourses"
          :key="course.id"
          :course="course"
          @book-course="handleBookCourse"
          @view-details="handleViewDetails(course.id, course.courseSettingsId)"
        />
      </div>
    </div>

    <!-- BookingModal -->
   <!--  <BookingModal
      v-if="showBookingModal"
      :course-id="selectedCourseId"
      @close="closeBookingModal"
      @success="handleBookingSuccess"
    /> -->
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
const currentWeekIndex = ref(0)
const showBookingModal = ref(false)
const selectedCourseId = ref<string | null>(null)
const isLoadingMore = ref(false)

// Computed
const today = computed(() => new Date())

const currentWeekStart = computed(() => {
  const start = new Date(today.value)
  const day = start.getDay()
  const diff = start.getDate() - day + (day === 0 ? -6 : 1) // Monday as first day
  start.setDate(diff)
  start.setDate(start.getDate() + (currentWeekIndex.value * 7))
  return start
})

const currentWeekEnd = computed(() => {
  const end = new Date(currentWeekStart.value)
  end.setDate(end.getDate() + 6)
  return end
})

const currentWeekCourses = computed(() => {
  const startDate = currentWeekStart.value.toISOString().split('T')[0]
  const endDate = currentWeekEnd.value.toISOString().split('T')[0]
  
  console.log(`image url of first course: ${coursesStore.courses.length > 0 ? coursesStore.courses[0].image : 'no courses'}`)

  return coursesStore.courses.filter(course => {
    return course.date >= startDate && course.date <= endDate
  })
  
})

const currentWeekDisplayText = computed(() => {
  if (currentWeekIndex.value === 0) {
    return 'Aktuelle Woche'
  } else if (currentWeekIndex.value === 1) {
    return 'Nächste Woche'
  } else {
    return `Woche ${currentWeekIndex.value + 1}`
  }
})

const maxWeekIndex = computed(() => {
  // Allow navigation up to 4 weeks ahead
  return 3
})

// Methods
const loadCourses = async () => {
  coursesStore.setQuery({
    startDate: currentWeekStart.value.toUTCString(),
    endDate: currentWeekEnd.value.toUTCString()
  })
  await coursesStore.fetchCourses()
  /* if (isAuthenticated.value) {
    await bookingsStore.fetchBookings()
  } */
}

const formatWeekRange = (startDate: Date, endDate: Date) => {
  const formatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit'
  }
  
  return `${startDate.toLocaleDateString('de-DE', formatOptions)} - ${endDate.toLocaleDateString('de-DE', formatOptions)}`
}

const previousWeek = () => {
  if (currentWeekIndex.value > 0) {
    currentWeekIndex.value--
  }
}

const nextWeek = () => {
  if (currentWeekIndex.value < maxWeekIndex.value) {
    currentWeekIndex.value++
  }
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

const handleViewDetails = (courseId: string, courseSettingsId: string | undefined) => {
  navigateTo({
    path:`/courses/${courseId}`,
    query: { courseSettingsId: courseSettingsId }})
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

// Watch for week navigation changes and update query
watch([currentWeekStart, currentWeekEnd], async () => {
  coursesStore.setQuery({
    startDate: currentWeekStart.value.toUTCString(),
    endDate: currentWeekEnd.value.toUTCString()
  })
  await coursesStore.fetchCourses(true) // Force refresh
  if (isAuthenticated.value) {
    await bookingsStore.fetchBookings()
  }
})

// Load courses on mount
onMounted(async () => {
  await loadCourses()
})

// Dynamic imports for components used conditionally
const BookingModal = defineAsyncComponent(() => import('~/components/booking/BookingModal.vue'))
</script>