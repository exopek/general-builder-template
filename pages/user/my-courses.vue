<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Meine Kurse</h1>
              <p class="mt-1 text-sm text-gray-500">
                Ihre angemeldeten Kurse
              </p>
            </div>
            <NuxtLink
              to="/courses"
              class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Neue Kurse entdecken
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <!-- Back Button -->
    <div class="mb-6">
        <NuxtLink
          to="/user"
          class="inline-flex items-center text-orange-600 hover:text-orange-500"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück
        </NuxtLink>
      </div>
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

    
      <!-- Tabs -->
      <div v-else class="mb-8">
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

// Lifecycle
onMounted(async () => {
  await loadCourses()
})

// Dynamic imports
const MyUpcomingCourses = defineAsyncComponent(() => import('~/components/user/MyUpcomingCourses.vue'))
const MyCompletedCourses = defineAsyncComponent(() => import('~/components/user/MyCompletedCourses.vue'))
</script>