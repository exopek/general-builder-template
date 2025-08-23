<template>
  <div class="space-y-6">
    <!-- Recent Bookings and Course Overview Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Bookings -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Neueste Buchungen</h3>
            <NuxtLink
              to="/admin/bookings"
              class="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Alle anzeigen
            </NuxtLink>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Loading State -->
          <div v-if="isLoadingBookings" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mb-2"></div>
            <p class="text-sm text-gray-500">Buchungen werden geladen...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="recentBookings.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-sm text-gray-500">Keine aktuellen Buchungen</p>
          </div>

          <!-- Bookings List -->
          <div v-else class="space-y-4">
            <div
              v-for="booking in recentBookings.slice(0, 5)"
              :key="booking.id"
              class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ booking.courseName || 'Unbekannter Kurs' }}</p>
                <p class="text-sm text-gray-500">{{ booking.userName }} • {{ formatBookingDate(booking.createdAt) }}</p>
              </div>
              <div class="text-right">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusBadgeClass(booking.status)"
                >
                  {{ getStatusText(booking.status) }}
                </span>
              </div>
            </div>

            <div v-if="recentBookings.length > 5" class="text-center pt-4 border-t border-gray-200">
              <NuxtLink
                to="/admin/bookings"
                class="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {{ recentBookings.length - 5 }} weitere Buchungen anzeigen
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Courses -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Kommende Kurse</h3>
            <NuxtLink
              to="/admin/courses"
              class="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Alle verwalten
            </NuxtLink>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Loading State -->
          <div v-if="coursesStore.isLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mb-2"></div>
            <p class="text-sm text-gray-500">Kurse werden geladen...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="upcomingCourses.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm text-gray-500">Keine kommenden Kurse</p>
          </div>

          <!-- Courses List -->
          <div v-else class="space-y-4">
            <div
              v-for="course in upcomingCourses.slice(0, 5)"
              :key="course.id"
              class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ course.title }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatCourseDate(course.date) }} • {{ course.startTime }} - {{ course.endTime }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ course.instructor }} • {{ course.currentParticipants }}/{{ course.maxParticipants }} Teilnehmer
                </p>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">
                  {{ Math.round((course.currentParticipants / course.maxParticipants) * 100) }}%
                </div>
                <div 
                  class="text-xs font-medium"
                  :class="getOccupancyColor(course.currentParticipants / course.maxParticipants)"
                >
                  {{ course.currentParticipants >= course.maxParticipants ? 'Ausgebucht' : 'Verfügbar' }}
                </div>
              </div>
            </div>

            <div v-if="upcomingCourses.length > 5" class="text-center pt-4 border-t border-gray-200">
              <NuxtLink
                to="/admin/courses"
                class="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {{ upcomingCourses.length - 5 }} weitere Kurse anzeigen
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Booking Statistics -->
      <div class="lg:col-span-2 bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Buchungsstatistiken</h3>
        </div>
        <div class="p-6">
          <!-- Mock Chart Area -->
          <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p class="text-gray-500 text-sm">
                Buchungstrends der letzten 30 Tage
              </p>
              <p class="text-xs text-gray-400 mt-1">
                Chart-Bibliothek wird in einer späteren Version hinzugefügt
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Categories -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Beliebte Kategorien</h3>
        </div>
        <div class="p-6">
          <!-- Loading State -->
          <div v-if="coursesStore.isLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mb-2"></div>
            <p class="text-sm text-gray-500">Kategorien werden geladen...</p>
          </div>

          <!-- Categories List -->
          <div v-else-if="Object.keys(categoriesWithCounts).length > 0" class="space-y-4">
            <div
              v-for="[category, count] in sortedCategories"
              :key="category"
              class="flex items-center justify-between"
            >
              <div>
                <p class="font-medium text-gray-900">{{ category }}</p>
                <p class="text-sm text-gray-500">{{ count }} Kurs{{ count !== 1 ? 'e' : '' }}</p>
              </div>
              <div class="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-indigo-600 h-2 rounded-full"
                  :style="{ width: `${(count / Math.max(...Object.values(categoriesWithCounts))) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-8">
            <p class="text-sm text-gray-500">Keine Kategorien gefunden</p>
          </div>
        </div>
      </div>
    </div>

    <!-- System Status -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">System-Status</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Database Status -->
          <div class="flex items-center p-3 bg-green-50 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">Datenbank</p>
              <p class="text-xs text-green-600">Verbunden</p>
            </div>
          </div>

          <!-- API Status -->
          <div class="flex items-center p-3 bg-green-50 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">API</p>
              <p class="text-xs text-green-600">Online</p>
            </div>
          </div>

          <!-- Cache Status -->
          <div class="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-yellow-800">Cache</p>
              <p class="text-xs text-yellow-600">Teilweise aktiv</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores
const adminStore = useAdminStore()
const coursesStore = useCoursesStore()

// State
const isLoadingBookings = ref(false)

// Computed
const recentBookings = computed(() => adminStore.recentBookings)
const upcomingCourses = computed(() => coursesStore.upcomingCourses)
const categoriesWithCounts = computed(() => coursesStore.categoriesWithCounts)

const sortedCategories = computed(() => {
  return Object.entries(categoriesWithCounts.value)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
})

// Methods
const formatBookingDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCourseDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit'
  })
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed': return 'Bestätigt'
    case 'cancelled': return 'Storniert'
    case 'pending': return 'Ausstehend'
    default: return status
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-100 text-green-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getOccupancyColor = (ratio: number) => {
  if (ratio >= 1) return 'text-red-600'
  if (ratio >= 0.8) return 'text-yellow-600'
  return 'text-green-600'
}

// Load additional data on mount
onMounted(async () => {
  // Load recent bookings for admin
  isLoadingBookings.value = true
  try {
    await adminStore.fetchAllBookings()
  } catch (error) {
    console.error('Error loading admin bookings:', error)
  } finally {
    isLoadingBookings.value = false
  }
})
</script>