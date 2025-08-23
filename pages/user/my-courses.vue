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
                Verwalten Sie Ihre gebuchten Kurse
              </p>
            </div>
            <NuxtLink
              to="/courses"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Neue Kurse entdecken
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button
            @click="activeTab = 'upcoming'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="activeTab === 'upcoming' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Kommende Kurse
            <span v-if="upcomingBookings.length > 0" class="ml-2 bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs">
              {{ upcomingBookings.length }}
            </span>
          </button>
          <button
            @click="activeTab = 'completed'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="activeTab === 'completed' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Abgeschlossene Kurse
            <span v-if="completedBookings.length > 0" class="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {{ completedBookings.length }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Loading State -->
      <div v-if="bookingsStore.isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
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

      <!-- Course Lists -->
      <div v-else>
        <MyCoursesList 
          :bookings="activeTab === 'upcoming' ? upcomingBookings : completedBookings"
          :type="activeTab"
          @refresh="loadBookings"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'user',
  title: 'Meine Kurse'
})

// Stores
const bookingsStore = useBookingsStore()

// State
const activeTab = ref<'upcoming' | 'completed'>('upcoming')

// Computed
const upcomingBookings = computed(() => bookingsStore.upcomingBookings)
const completedBookings = computed(() => bookingsStore.bookingHistory)

// Methods
const loadBookings = async () => {
  await bookingsStore.fetchBookings()
}

// Lifecycle
onMounted(async () => {
  await loadBookings()
})

// Dynamic imports
const MyCoursesList = defineAsyncComponent(() => import('~/components/user/MyCoursesList.vue'))
</script>