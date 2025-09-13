<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        Willkommen zurück, {{ user?.firstName }}!
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        Verwalten Sie Ihre Kurse und Buchungen
      </p>
    </div>

    <!-- Main Content -->
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 mb-4" style="border-color: rgb(252, 85, 32);"></div>
        <p class="text-gray-600">Dashboard wird geladen...</p>
      </div>

      <!-- Dashboard Content -->
      <div v-else class="space-y-8">
        <!-- Next Course Section -->
        <!-- <div v-if="nextRegisteredCourse" class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-900">Nächster Kurs</h2>
          <CourseCard 
            :course="nextRegisteredCourse" 
            :showBookingButton="false"
            class="max-w-md"
          />
        </div> -->

        <!-- No Courses Placeholder -->
       <!--  <div v-else class="bg-white shadow rounded-lg p-8 text-center">
          <div class="max-w-md mx-auto">
            <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 class="text-xl font-medium text-gray-900 mb-2">
              Noch keine Kurse gebucht
            </h3>
            <p class="text-gray-500 mb-6">
              Entdecken Sie unser vielfältiges Kursangebot und buchen Sie Ihren ersten Kurs!
            </p>
            <NuxtLink
              to="/courses"
              class="inline-flex items-center px-6 py-3 text-white font-medium rounded-md transition-colors"
              style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Kurse entdecken
            </NuxtLink>
          </div>
        </div> -->

        <!-- Quick Access Actions -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Schnellaktionen</h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <NuxtLink
                to="/courses"
                class="flex items-center p-4 rounded-lg hover:opacity-90 transition-colors group"
                style="background: rgba(252, 85, 32, 0.1);"
              >
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 group-hover:opacity-80" style="color: rgb(252, 85, 32);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium group-hover:opacity-80" style="color: rgb(252, 85, 32);">
                    Kurse anzeigen
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/user/my-courses"
                class="flex items-center p-4 rounded-lg hover:opacity-90 transition-colors group"
                style="background: rgba(34, 197, 94, 0.1);"
              >
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 group-hover:opacity-80" style="color: rgb(34, 197, 94);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium group-hover:opacity-80" style="color: rgb(34, 197, 94);">
                    Meine Kurse
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/user/profile"
                class="flex items-center p-4 rounded-lg hover:opacity-90 transition-colors group"
                style="background: rgba(252, 85, 32, 0.1);"
              >
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 group-hover:opacity-80" style="color: rgb(252, 85, 32);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium group-hover:opacity-80" style="color: rgb(252, 85, 32);">
                    Profil bearbeiten
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'user',
  layout: 'user',
  title: 'Dashboard'
})

// Stores and composables
const { user } = useAuth()
const coursesStore = useCoursesStore()
const bookingsStore = useBookingsStore()

// State
const isLoading = ref(true)

// Computed
const nextRegisteredCourse = computed(() => {
  const userBookings = bookingsStore.userBookings
  if (!userBookings.length) return null

  const now = new Date()
  const upcomingBookings = userBookings
    .filter(booking => new Date(booking.course.date) > now)
    .sort((a, b) => new Date(a.course.date).getTime() - new Date(b.course.date).getTime())
  
  return upcomingBookings.length > 0 ? upcomingBookings[0].course : null
})

// Methods
const loadDashboardData = async () => {
  isLoading.value = true
  
  try {
    await coursesStore.fetchCourses()
    await bookingsStore.fetchUserBookings()
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}


// Lifecycle
onMounted(async () => {
  await loadDashboardData()
})

</script>