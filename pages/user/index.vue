<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">
                Willkommen zurück, {{ user?.firstName }}!
              </h1>
              <p class="mt-1 text-sm text-gray-500">
                Verwalten Sie Ihre Kurse und Buchungen
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <NuxtLink
                to="/courses"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Neue Kurse entdecken
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

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Upcoming Bookings -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Kommende Kurse
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ upcomingBookings.length }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <NuxtLink to="/user/my-courses" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Alle anzeigen
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
                      Gebuchte Kurse gesamt
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ userBookings.length }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <NuxtLink to="/user/bookings" class="font-medium text-green-600 hover:text-green-500">
                  Historie anzeigen
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Profile Completion -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Profil
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Vollständig
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <NuxtLink to="/user/profile" class="font-medium text-yellow-600 hover:text-yellow-500">
                  Profil bearbeiten
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Component -->
        <UserDashboard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'user',
  title: 'Dashboard'
})

// Stores and composables
const { user, logout } = useAuth()
const bookingsStore = useBookingsStore()
const coursesStore = useCoursesStore()

// State
const isLoading = ref(true)

// Computed
const userBookings = computed(() => bookingsStore.userBookings)
const upcomingBookings = computed(() => bookingsStore.upcomingBookings)

// Methods
const loadDashboardData = async () => {
  isLoading.value = true
  
  try {
    // Load user's bookings and courses in parallel
    await Promise.all([
      bookingsStore.fetchBookings(),
      coursesStore.fetchCourses()
    ])
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

const handleLogout = async () => {
  if (confirm('Möchten Sie sich wirklich abmelden?')) {
    await logout()
  }
}

// Lifecycle
onMounted(async () => {
  await loadDashboardData()
})

// Dynamic imports
const UserDashboard = defineAsyncComponent(() => import('~/components/user/UserDashboard.vue'))
</script>