<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-4">
            Unsere Kurse
          </h1>
          <p class="text-xl text-orange-100 max-w-2xl mx-auto">
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
          class="inline-flex items-center" style="color: rgb(252, 85, 32);"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück
        </NuxtLink>
      </div>

      <div class="bg-gradient-to-r from-white to-gray-50/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-8 mb-8">
        <div class="flex flex-col gap-6">
          <!-- Header Section -->
          <div class="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Kursübersicht</h2>
              <p class="text-gray-600">{{ currentWeekDisplayText }}</p>
            </div>
            
            <!-- Desktop Week Navigation Controls -->
            <div class="hidden sm:flex items-center bg-white/60 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200/50">
              <button
                @click="previousWeek"
                :disabled="currentWeekIndex === 0"
                class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span class="text-sm text-gray-700 min-w-[220px] text-center font-semibold px-4">
                {{ formatWeekRange(currentWeekStart, currentWeekEnd) }}
              </span>
              
              <button
                @click="nextWeek"
                :disabled="currentWeekIndex >= maxWeekIndex"
                class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Course Count -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-500 rounded-full"></div>
              <span class="text-gray-700 font-medium">
                {{ currentWeekCourses.length }} {{ currentWeekCourses.length === 1 ? 'Kurs' : 'Kurse' }} verfügbar
              </span>
            </div>
          </div>

          <!-- Mobile Week Navigation -->
          <div class="flex sm:hidden items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200/50">
            <button
              @click="previousWeek"
              :disabled="currentWeekIndex === 0"
              class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span class="text-sm text-gray-700 flex-1 text-center font-semibold px-4">
              {{ formatWeekRange(currentWeekStart, currentWeekEnd) }}
            </span>
            
            <button
              @click="nextWeek"
              :disabled="currentWeekIndex >= maxWeekIndex"
              class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="coursesStore.isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style="border-color: rgb(252, 85, 32);"></div>
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
            class="text-white py-2 px-4 rounded-md transition-colors" style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);"
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
       <div v-else>
        <WeeklyCoursesGrid 
          :courses="currentWeekCourses" 
          @course-click="handleCourseClick"
        />
       </div>
      <!-- <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CourseCard
          v-for="course in currentWeekCourses"
          :key="course.id"
          :course="course"
          @book-course="handleBookCourse"
          @view-details="handleViewDetails(course.id, course.courseSettingsId)"
        />
      </div> -->
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
  // Set to beginning of day
  start.setHours(0, 0, 0, 0)
  return start
})

const currentWeekEnd = computed(() => {
  const end = new Date(currentWeekStart.value)
  end.setDate(end.getDate() + 6)
  // Set to end of day
  end.setHours(23, 59, 59, 999)
  return end
})

const currentWeekCourses = computed(() => {
  const startDate = currentWeekStart.value.toISOString().split('T')[0]
  const endDate = currentWeekEnd.value.toISOString().split('T')[0]
  
  console.log(`Total courses in store: ${coursesStore.courses.length}`)
  console.log(`Date range: ${startDate} to ${endDate}`)
  
  if (coursesStore.courses.length > 0) {
    console.log('First course:', coursesStore.courses[0])
    console.log('All course dates:', coursesStore.courses.map(c => ({ title: c.title, date: c.date })))
  }

  const filtered = coursesStore.courses.filter(course => {
    const isInRange = course.date >= startDate && course.date <= endDate
    console.log(`Course "${course.title}" on ${course.date}: ${isInRange ? 'INCLUDED' : 'EXCLUDED'}`)
    return isInRange
  })
  
  console.log(`Filtered courses: ${filtered.length}`)
  return filtered
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
  console.log('loadCourses called')
  console.log('Setting query with dates:', {
    startDate: currentWeekStart.value.toISOString(),
    endDate: currentWeekEnd.value.toISOString()
  })
  
  coursesStore.setQuery({
    startDate: currentWeekStart.value.toISOString(),
    endDate: currentWeekEnd.value.toISOString()
  })
  
  console.log('Calling fetchCourses...')
  const result = await coursesStore.fetchCourses()
  console.log('fetchCourses result:', result)
  
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

const handleCourseClick = (course: any) => {
  handleViewDetails(course.id, course.courseSettingsId)
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
  console.log('onMounted called!')
  try {
    await loadCourses()
    console.log('onMounted loadCourses completed')
  } catch (error) {
    console.error('onMounted loadCourses error:', error)
  }
})

// Dynamic imports for components used conditionally
const BookingModal = defineAsyncComponent(() => import('~/components/booking/BookingModal.vue'))
const WeeklyCoursesGrid = defineAsyncComponent(() => import('~/components/booking/WeeklyCoursesGrid.vue'))
</script>
