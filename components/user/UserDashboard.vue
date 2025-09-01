<template>
  <div class="space-y-6">
    <!-- Quick Actions -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Schnellaktionen</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            to="/courses"
            class="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group"
          >
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-indigo-600 group-hover:text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                Kurse anzeigen
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/user/my-courses"
            class="flex items-center p-4 rounded-lg transition-all duration-200 group"
            style="background: linear-gradient(-90deg, rgba(252, 209, 34, 0.1) 0%, rgba(252, 124, 34, 0.1) 35%, rgba(252, 85, 32, 0.1) 70%, rgba(251, 60, 54, 0.1) 100%)"
          >
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 group-hover:opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   style="color: rgb(252, 124, 34)">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium group-hover:opacity-80"
                 style="color: rgb(252, 124, 34)">
                Meine Kurse
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/user/profile"
            class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-purple-600 group-hover:text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-purple-600 group-hover:text-purple-700">
                Profil bearbeiten
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- My Courses Section -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200" style="background: linear-gradient(-90deg, rgba(252, 209, 34, 0.1) 0%, rgba(252, 124, 34, 0.1) 35%, rgba(252, 85, 32, 0.1) 70%, rgba(251, 60, 54, 0.1) 100%)">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium" style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Meine Kurse</h2>
          <NuxtLink
            to="/user/my-courses"
            class="text-sm hover:opacity-80 transition-opacity"
            style="color: rgb(252, 124, 34)"
          >
            Alle anzeigen
          </NuxtLink>
        </div>
      </div>

      <div class="p-6">
        <!-- Loading State -->
        <div v-if="coursesStore.isLoading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 mb-2" style="border-bottom-color: rgb(252, 124, 34)"></div>
          <p class="text-sm text-gray-500">Kurse werden geladen...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="userCourses.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-sm text-gray-500 mb-4">Sie haben noch keine Kurse</p>
          <NuxtLink
            to="/courses"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-opacity"
            style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)"
          >
            Kurse entdecken
          </NuxtLink>
        </div>

        <!-- User Courses List -->
        <div v-else class="space-y-4">
          <div
            v-for="course in userCourses.slice(0, 3)"
            :key="course.id"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">
                {{ course.title }}
              </h3>
              <div class="mt-1 flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(course.date) }}
              </div>
              <div class="mt-1 flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ course.startTime }} - {{ course.endTime }}
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style="background: linear-gradient(-90deg, rgba(252, 209, 34, 0.8) 0%, rgba(252, 124, 34, 0.8) 35%, rgba(252, 85, 32, 0.8) 70%, rgba(251, 60, 54, 0.8) 100%)">
                {{ course.category }}
              </span>
            </div>
          </div>

          <div v-if="userCourses.length > 3" class="text-center pt-4 border-t border-gray-200">
            <NuxtLink
              to="/user/my-courses"
              class="text-sm hover:opacity-80 transition-opacity"
            style="color: rgb(252, 124, 34)"
            >
              {{ userCourses.length - 3 }} weitere Kurse anzeigen
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores
const coursesStore = useCoursesStore()

// Computed
const userCourses = computed(() => coursesStore.courses.slice(0, 5)) // Show first 5 courses as user's courses

// Methods
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>