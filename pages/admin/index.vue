<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p class="mt-1 text-sm text-gray-500">
                Verwalten Sie Kurse, Buchungen und Teilnehmer
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <NuxtLink
                to="/user"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                title="Zur Benutzeransicht"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </NuxtLink>
              <button
                @click="handleLogout"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                title="Abmelden"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
        <p class="text-gray-600">Dashboard wird geladen...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
          <div class="text-red-600">
            <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="font-medium">Fehler beim Laden des Dashboards</p>
            <p class="text-sm mt-1">{{ error }}</p>
          </div>
          <button
            @click="loadDashboardData"
            class="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Courses -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Aktive Kurse
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ dashboardStats?.totalCourses || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <NuxtLink to="/admin/courses" class="font-medium text-blue-600 hover:text-blue-500">
                  Verwalten
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Total Bookings -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Buchungen gesamt
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ dashboardStats?.totalBookings || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <NuxtLink to="/admin/bookings" class="font-medium text-green-600 hover:text-green-500">
                  Übersicht anzeigen
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Revenue -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Gesamtumsatz
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ formatPrice(dashboardStats?.totalRevenue || 0) }}€
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <span class="text-gray-500">Alle Buchungen</span>
              </div>
            </div>
          </div>

          <!-- Average Booking Rate -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Auslastung
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ dashboardStats?.averageBookingRate || 0 }}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <span class="text-gray-500">Durchschnittlich</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white shadow rounded-lg mb-8">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Schnellaktionen</h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <NuxtLink
                to="/admin/courses"
                class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    Neuen Kurs erstellen
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/admin/bookings"
                class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-green-600 group-hover:text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-green-600 group-hover:text-green-700">
                    Buchungen verwalten
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/admin/participants"
                class="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group"
              >
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-yellow-600 group-hover:text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-yellow-600 group-hover:text-yellow-700">
                    Teilnehmer verwalten
                  </p>
                </div>
              </NuxtLink>

              <button
                @click="refreshDashboard"
                :disabled="isRefreshing"
                class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group disabled:opacity-50"
              >
                <div class="flex-shrink-0">
                  <svg 
                    class="w-8 h-8 text-purple-600 group-hover:text-purple-700"
                    :class="{ 'animate-spin': isRefreshing }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-purple-600 group-hover:text-purple-700">
                    {{ isRefreshing ? 'Aktualisiere...' : 'Dashboard aktualisieren' }}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Component -->
        <AdminDashboard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'admin',
  title: 'Admin Dashboard'
})

// Stores and composables
const { logout } = useAuth()
const adminStore = useAdminStore()
const coursesStore = useCoursesStore()
const bookingsStore = useBookingsStore()

// State
const isLoading = ref(true)
const isRefreshing = ref(false)
const error = ref<string | null>(null)

// Computed
const dashboardStats = computed(() => adminStore.dashboardStats)

// Methods
const loadDashboardData = async () => {
  isLoading.value = true
  error.value = null

  try {
    // Load dashboard statistics
    const result = await adminStore.fetchDashboardStats()
    if (!result.success) {
      error.value = result.error || 'Fehler beim Laden der Dashboard-Daten'
    }
  } catch (err: any) {
    error.value = err.message || 'Unerwarteter Fehler'
    console.error('Dashboard loading error:', err)
  } finally {
    isLoading.value = false
  }
}

const refreshDashboard = async () => {
  isRefreshing.value = true
  
  try {
    // Clear caches and reload data
    coursesStore.clearCache()
    adminStore.clearCache()
    
    await loadDashboardData()
  } finally {
    isRefreshing.value = false
  }
}

const handleLogout = async () => {
  if (confirm('Möchten Sie sich wirklich abmelden?')) {
    await logout()
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

// Lifecycle
onMounted(async () => {
  await loadDashboardData()
})

// Auto-refresh every 5 minutes
const refreshInterval = setInterval(() => {
  if (!isLoading.value && !isRefreshing.value) {
    loadDashboardData()
  }
}, 5 * 60 * 1000)

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})

// Dynamic imports
const AdminDashboard = defineAsyncComponent(() => import('~/components/admin/AdminDashboard.vue'))
</script>