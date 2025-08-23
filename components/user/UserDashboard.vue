<template>
  <div class="space-y-6">
    <!-- Quick Actions -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Schnellaktionen</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink
            to="/courses"
            class="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group"
          >
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-indigo-600 group-hover:text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                Neuen Kurs buchen
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/user/my-courses"
            class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-green-600 group-hover:text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-green-600 group-hover:text-green-700">
                Meine Kurse
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/user/bookings"
            class="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group"
          >
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-yellow-600 group-hover:text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-yellow-600 group-hover:text-yellow-700">
                Buchungshistorie
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Upcoming Courses -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Kommende Kurse</h2>
            <NuxtLink
              to="/user/my-courses"
              class="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Alle anzeigen
            </NuxtLink>
          </div>
        </div>

        <div class="p-6">
          <!-- Loading State -->
          <div v-if="bookingsStore.isLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mb-2"></div>
            <p class="text-sm text-gray-500">Kurse werden geladen...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="upcomingBookings.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm text-gray-500 mb-4">Keine kommenden Kurse</p>
            <NuxtLink
              to="/courses"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Kurse entdecken
            </NuxtLink>
          </div>

          <!-- Upcoming Bookings List -->
          <div v-else class="space-y-4">
            <div
              v-for="booking in upcomingBookings.slice(0, 3)"
              :key="booking.id"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">
                  {{ booking.course?.title }}
                </h3>
                <div class="mt-1 flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(booking.course?.date) }}
                </div>
                <div class="mt-1 flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ booking.course?.startTime }} - {{ booking.course?.endTime }}
                </div>
              </div>
              <div class="text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ booking.status === 'confirmed' ? 'Bestätigt' : booking.status }}
                </span>
                <div class="mt-1">
                  <button
                    @click="handleCancelBooking(booking.id, booking.course?.title || '')"
                    :disabled="!canCancelBooking(booking)"
                    class="text-xs text-red-600 hover:text-red-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Stornieren
                  </button>
                </div>
              </div>
            </div>

            <div v-if="upcomingBookings.length > 3" class="text-center pt-4 border-t border-gray-200">
              <NuxtLink
                to="/user/my-courses"
                class="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {{ upcomingBookings.length - 3 }} weitere Kurse anzeigen
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Aktivitäten</h2>
        </div>
        
        <div class="p-6">
          <!-- Loading State -->
          <div v-if="bookingsStore.isLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mb-2"></div>
            <p class="text-sm text-gray-500">Aktivitäten werden geladen...</p>
          </div>

          <!-- Activity List -->
          <div v-else class="flow-root">
            <ul class="-mb-8">
              <li v-for="(activity, index) in recentActivities" :key="activity.id" class="relative pb-8">
                <div v-if="index !== recentActivities.length - 1" class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"></div>
                <div class="relative flex items-start space-x-3">
                  <div class="relative">
                    <div 
                      class="h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white"
                      :class="activity.type === 'booking' ? 'bg-green-500' : 'bg-red-500'"
                    >
                      <svg v-if="activity.type === 'booking'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div>
                      <div class="text-sm">
                        <span class="font-medium text-gray-900">{{ activity.title }}</span>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">
                        {{ activity.description }}
                      </p>
                    </div>
                    <div class="mt-2 text-sm text-gray-500">
                      <time :datetime="activity.date">
                        {{ formatRelativeTime(activity.date) }}
                      </time>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <!-- Empty State -->
            <div v-if="recentActivities.length === 0" class="text-center py-8">
              <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-sm text-gray-500">Noch keine Aktivitäten</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Booking } from '~/stores/bookings'

// Stores
const bookingsStore = useBookingsStore()
const coursesStore = useCoursesStore()

// Computed
const upcomingBookings = computed(() => bookingsStore.upcomingBookings)

const recentActivities = computed(() => {
  // Generate recent activity from bookings
  const activities = []
  
  // Add recent bookings
  const recentBookings = bookingsStore.bookings
    .filter(booking => {
      const bookingDate = new Date(booking.createdAt)
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return bookingDate > monthAgo
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  for (const booking of recentBookings) {
    if (booking.status === 'confirmed') {
      activities.push({
        id: `booking-${booking.id}`,
        type: 'booking' as const,
        title: 'Kurs gebucht',
        description: `${booking.course?.title} am ${formatDate(booking.course?.date)}`,
        date: booking.createdAt
      })
    } else if (booking.status === 'cancelled') {
      activities.push({
        id: `cancel-${booking.id}`,
        type: 'cancellation' as const,
        title: 'Kurs storniert',
        description: `${booking.course?.title} am ${formatDate(booking.course?.date)}`,
        date: booking.updatedAt
      })
    }
  }

  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// Methods
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'vor wenigen Sekunden'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `vor ${days} Tag${days !== 1 ? 'en' : ''}`
  }
}

const canCancelBooking = (booking: Booking) => {
  return bookingsStore.canCancelBooking(booking).canCancel
}

const handleCancelBooking = async (bookingId: string, courseTitle: string) => {
  if (confirm(`Möchten Sie die Buchung für "${courseTitle}" wirklich stornieren?`)) {
    const result = await bookingsStore.cancelBooking(bookingId)
    if (result.success) {
      // Refresh data
      await bookingsStore.fetchBookings()
    }
  }
}
</script>