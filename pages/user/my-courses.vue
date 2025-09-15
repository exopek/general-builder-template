<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Meine Kurse</h1>
      <p class="mt-1 text-sm text-gray-500">
        Ihre angemeldeten Kurse
      </p>
    </div>

    <!-- Main Content -->
      <!-- Loading State -->
      <div v-if="bookingsStore.isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-4"></div>
        <p class="text-gray-600">Kurse werden geladen...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="bookingsStore.error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
          <div class="text-red-600">
            <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="font-medium">Fehler beim Laden der Kurse</p>
            <p class="text-sm mt-1">{{ bookingsStore.error }}</p>
          </div>
        </div>
      </div>

    
      <!-- Content when loaded successfully -->
      <div v-else class="space-y-8">
        <!-- Dashboard Section -->
        <div class="space-y-6">
          <!-- Course Statistics -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Kurs-Übersicht</h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Total Courses -->
                <div class="text-center">
                  <div class="w-12 h-12 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div class="text-2xl font-bold text-gray-900">{{ totalCourses }}</div>
                  <div class="text-sm text-gray-500">Gebuchte Kurse</div>
                </div>

                <!-- Upcoming Courses -->
                <div class="text-center">
                  <div class="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="text-2xl font-bold text-gray-900">{{ upcomingCoursesCount }}</div>
                  <div class="text-sm text-gray-500">Kommende Kurse</div>
                </div>

                <!-- Next Course -->
                <div class="text-center">
                  <div class="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="text-lg font-bold text-gray-900">{{ nextCourseDate }}</div>
                  <div class="text-sm text-gray-500">Nächster Kurs</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Course Preview -->
          <div v-if="nextCourse" class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div class="px-6 py-4 border-b border-orange-200">
              <h2 class="text-lg font-medium text-orange-900">Ihr nächster Kurs</h2>
            </div>
            <div class="p-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900">{{ nextCourse.title }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ nextCourse.category }}</p>
                  <div class="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(nextCourse.date) }}
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ nextCourse.startTime }} - {{ nextCourse.endTime }}
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ nextCourse.location }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="setActiveTab('upcoming')"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'upcoming'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Kommende Kurse
            </button>
            <!-- <button
              @click="setActiveTab('attended')"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'attended'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Abgeschlossene Kurse
            </button> -->
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="mt-8">
          <!-- Upcoming Courses Tab -->
          <div v-if="activeTab === 'upcoming'">
            <MyUpcomingCourses :courses="filteredCourses" />
          </div>

          <!-- Completed Courses Tab -->
          <div v-if="activeTab === 'attended'">
            <MyCompletedCourses :courses="filteredCourses" />
          </div>
        </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
// Types
interface Course {
  id: number
  title: string
  category: string
  date: string
  startTime: string
  endTime: string
  duration: number
  instructor: string
  location: string
  description?: string
  price: number
  status: string
}

// Page meta
definePageMeta({
  middleware: 'user',
  layout: 'user',
  title: 'Kurse'
})

// Stores
const bookingsStore = useBookingsStore()

// Reactive state
const activeTab = ref('upcoming')

// Computed
const filteredCourses = computed(() =>
  bookingsStore.bookings.map(booking => booking.course)
)

const totalCourses = computed(() => bookingsStore.bookings.length)

const upcomingCoursesCount = computed(() => {
  const now = new Date()
  return bookingsStore.bookings
    .filter(booking => new Date(booking.course.date) > now)
    .length
})

const nextCourse = computed(() => {
  const now = new Date()
  const upcomingBookings = bookingsStore.bookings
    .filter(booking => new Date(booking.course.date) > now)
    .sort((a, b) => new Date(a.course.date).getTime() - new Date(b.course.date).getTime())

  return upcomingBookings.length > 0 ? upcomingBookings[0].course : null
})

const nextCourseDate = computed(() => {
  if (!nextCourse.value) return 'Keine'

  const date = new Date(nextCourse.value.date)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'Morgen'
  if (diffDays <= 7) return `In ${diffDays} Tagen`

  return formatDate(nextCourse.value.date)
})

// Methods
const loadCourses = async () => {
  await bookingsStore.fetchMyBookings()
}

const setActiveTab = async (tab: string) => {
  console.log('Switching to tab:', tab)
  if (activeTab.value === tab) return

  activeTab.value = tab
  bookingsStore.query = tab === 'upcoming' ? { 'status': 'booked' } : { 'status': 'attended' }
  await bookingsStore.fetchMyBookings()
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(async () => {
  await loadCourses()
})

// Dynamic imports
const MyUpcomingCourses = defineAsyncComponent(() => import('~/components/user/MyUpcomingCourses.vue'))
const MyCompletedCourses = defineAsyncComponent(() => import('~/components/user/MyCompletedCourses.vue'))
</script>