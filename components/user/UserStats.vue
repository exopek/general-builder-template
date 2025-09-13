<template>
  <div class="space-y-6">
    <!-- Section Header -->
    <div>
      <h2 class="text-xl font-semibold"
          style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        Ihre Statistiken
      </h2>
      <p class="text-sm text-gray-600 mt-1">Überblick über Ihre Aktivitäten</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <!-- Gebuchte Kurse -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                 style="background: linear-gradient(-90deg, rgba(252, 209, 34, 0.1) 0%, rgba(252, 124, 34, 0.1) 35%, rgba(252, 85, 32, 0.1) 70%, rgba(251, 60, 54, 0.1) 100%)">
              <svg class="w-6 h-6" style="color: rgb(252, 124, 34)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-2xl font-bold text-gray-900">{{ bookedCoursesCount }}</p>
            <p class="text-sm text-gray-600">Gebuchte Kurse</p>
          </div>
        </div>
      </div>

      <!-- Abgeschlossene Kurse -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-2xl font-bold text-gray-900">{{ completedCoursesCount }}</p>
            <p class="text-sm text-gray-600">Abgeschlossene Kurse</p>
          </div>
        </div>
      </div>

      <!-- Lieblingskategorie -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-lg font-bold text-gray-900">{{ favoriteCategory || '-' }}</p>
            <p class="text-sm text-gray-600">Lieblingskategorie</p>
          </div>
        </div>
      </div>

      <!-- Mitgliedsstatus & Streak -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                 :class="membershipStatusClass">
              <svg class="w-6 h-6" :class="membershipStatusIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <div class="flex items-center space-x-2">
              <p class="text-lg font-bold text-gray-900">{{ activityStreak }}</p>
              <span class="text-orange-500">🔥</span>
            </div>
            <p class="text-sm text-gray-600">Wochen-Streak</p>
            <p class="text-xs" :class="membershipStatusTextClass">
              {{ membershipStatusText }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- Zusätzliche Statistiken (Optional) -->
    <div v-if="showDetailedStats" class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Detailanalyse</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Kategorie-Verteilung -->
        <div v-if="categoryDistribution.length > 0">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Kategorie-Verteilung</h4>
          <div class="space-y-2">
            <div v-for="category in categoryDistribution" :key="category.name" class="flex justify-between items-center">
              <span class="text-sm text-gray-600">{{ category.name }}</span>
              <span class="text-sm font-medium text-gray-900">{{ category.count }}</span>
            </div>
          </div>
        </div>

        <!-- Wöchentliche Aktivität -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-3">Diese Woche</h4>
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold" style="color: rgb(252, 124, 34)">{{ thisWeekCourses }}</span>
            <span class="text-sm text-gray-600">Kurse</span>
          </div>
        </div>

        <!-- Nächste Woche -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-3">Nächste Woche</h4>
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-green-600">{{ nextWeekCourses }}</span>
            <span class="text-sm text-gray-600">Geplant</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// Stores
const authStore = useAuthStore()
const bookingsStore = useBookingsStore()

// Props
interface Props {
  showDetailedStats?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDetailedStats: false
})

// Computed Statistics
const bookedCoursesCount = computed(() => {
  return bookingsStore.userBookings.length
})

const completedCoursesCount = computed(() => {
  return bookingsStore.bookingHistory.length
})

const favoriteCategory = computed(() => {
  const categories: Record<string, number> = {}

  // Count categories from user bookings
  bookingsStore.userBookings.forEach(booking => {
    if (booking.course?.category) {
      categories[booking.course.category] = (categories[booking.course.category] || 0) + 1
    }
  })

  // Find most frequent category
  let maxCount = 0
  let favorite = ''

  Object.entries(categories).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count
      favorite = category
    }
  })

  return favorite || null
})

const activityStreak = computed(() => {
  // Simple streak calculation based on recent bookings
  const now = new Date()
  const oneWeek = 7 * 24 * 60 * 60 * 1000

  let streak = 0
  let currentWeekStart = new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000))

  // Check last 8 weeks for activity
  for (let i = 0; i < 8; i++) {
    const weekEnd = new Date(currentWeekStart.getTime() + oneWeek)

    const hasActivityThisWeek = bookingsStore.userBookings.some(booking => {
      if (!booking.course?.date) return false
      const courseDate = new Date(booking.course.date)
      return courseDate >= currentWeekStart && courseDate < weekEnd
    })

    if (hasActivityThisWeek) {
      streak++
      currentWeekStart = new Date(currentWeekStart.getTime() - oneWeek)
    } else {
      break
    }
  }

  return streak
})

const membershipStatusText = computed(() => {
  return authStore.hasActiveMembership ? 'Aktives Mitglied' : 'Inaktives Mitglied'
})

const membershipStatusClass = computed(() => {
  return authStore.hasActiveMembership ? 'bg-green-100' : 'bg-red-100'
})

const membershipStatusIconClass = computed(() => {
  return authStore.hasActiveMembership ? 'text-green-600' : 'text-red-600'
})

const membershipStatusTextClass = computed(() => {
  return authStore.hasActiveMembership ? 'text-green-600' : 'text-red-600'
})

// Detailed Stats (for extended view)
const categoryDistribution = computed(() => {
  const categories: Record<string, number> = {}

  bookingsStore.userBookings.forEach(booking => {
    if (booking.course?.category) {
      categories[booking.course.category] = (categories[booking.course.category] || 0) + 1
    }
  })

  return Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5 categories
})

const thisWeekCourses = computed(() => {
  const now = new Date()
  const weekStart = new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000))
  const weekEnd = new Date(weekStart.getTime() + (7 * 24 * 60 * 60 * 1000))

  return bookingsStore.userBookings.filter(booking => {
    if (!booking.course?.date) return false
    const courseDate = new Date(booking.course.date)
    return courseDate >= weekStart && courseDate < weekEnd
  }).length
})

const nextWeekCourses = computed(() => {
  const now = new Date()
  const nextWeekStart = new Date(now.getTime() + ((7 - now.getDay()) * 24 * 60 * 60 * 1000))
  const nextWeekEnd = new Date(nextWeekStart.getTime() + (7 * 24 * 60 * 60 * 1000))

  return bookingsStore.userBookings.filter(booking => {
    if (!booking.course?.date) return false
    const courseDate = new Date(booking.course.date)
    return courseDate >= nextWeekStart && courseDate < nextWeekEnd
  }).length
})
</script>