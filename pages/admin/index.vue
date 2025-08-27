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

      <!-- Dashboard Content -->
      <div v-else>
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
            </div>
          </div>
        </div>
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
const coursesStore = useCoursesStore()

// State
const isLoading = ref(false)
const isRefreshing = ref(false)
const error = ref<string | null>(null)

// Methods
const refreshDashboard = async () => {
  isRefreshing.value = true
  
  try {
    // Clear caches and reload data
    coursesStore.clearCache()
  } finally {
    isRefreshing.value = false
  }
}

const handleLogout = async () => {
  if (confirm('Möchten Sie sich wirklich abmelden?')) {
    await logout()
  }
}

// Dynamic imports
const AdminDashboard = defineAsyncComponent(() => import('~/components/admin/AdminDashboard.vue'))
</script>