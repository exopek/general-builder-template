<template>
  <div>
    <!-- Loading State -->
    <div v-if="bookingsStore.isLoading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
      <p class="text-gray-600">Buchungshistorie wird geladen...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="bookingsStore.error" class="text-center py-12">
      <div class="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
        <div class="text-red-600">
          <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="font-medium">Fehler beim Laden der Buchungshistorie</p>
          <p class="text-sm mt-1">{{ bookingsStore.error }}</p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="allBookings.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Keine Buchungen vorhanden</h3>
      <p class="text-gray-600 mb-4">Sie haben noch keine Kurse gebucht.</p>
      <NuxtLink
        to="/courses"
        class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Kurse entdecken
      </NuxtLink>
    </div>

    <!-- Bookings List -->
    <div v-else class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div class="ml-5">
                <p class="text-sm font-medium text-gray-500">Bestätigte Buchungen</p>
                <p class="text-2xl font-bold text-gray-900">{{ confirmedBookings.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div class="ml-5">
                <p class="text-sm font-medium text-gray-500">Stornierte Buchungen</p>
                <p class="text-2xl font-bold text-gray-900">{{ cancelledBookings.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div class="ml-5">
                <p class="text-sm font-medium text-gray-500">Gesamtausgaben</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatPrice(totalSpent) }}€</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Chronologie</h3>
        </div>
        <div class="p-6">
          <div class="flow-root">
            <ul class="-mb-8">
              <li v-for="(booking, index) in sortedBookings" :key="booking.id" class="relative pb-8">
                <div v-if="index !== sortedBookings.length - 1" class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"></div>
                
                <div class="relative flex items-start space-x-3">
                  <!-- Icon -->
                  <div class="relative">
                    <div 
                      class="h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white"
                      :class="getBookingStatusColor(booking.status)"
                    >
                      <svg v-if="booking.status === 'confirmed'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <svg v-else-if="booking.status === 'cancelled'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">
                          {{ getBookingActionText(booking.status) }}
                        </p>
                        <p class="text-lg font-semibold text-gray-900 mt-1">
                          {{ booking.course?.title }}
                        </p>
                        <div class="mt-2 text-sm text-gray-500 space-y-1">
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {{ formatCourseDate(booking.course?.date) }}
                          </div>
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {{ booking.course?.startTime }} - {{ booking.course?.endTime }}
                          </div>
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {{ booking.course?.instructor }}
                          </div>
                        </div>
                      </div>
                      
                      <div class="text-right ml-4">
                        <div class="text-lg font-bold text-gray-900">
                          {{ formatPrice(booking.course?.price) }}€
                        </div>
                        <div class="text-sm text-gray-500 mt-1">
                          {{ formatBookingDate(getRelevantDate(booking)) }}
                        </div>
                        <div class="mt-2">
                          <span 
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="getStatusBadgeClass(booking.status)"
                          >
                            {{ getStatusText(booking.status) }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Notes -->
                    <div v-if="booking.notes" class="mt-3 p-3 bg-gray-50 rounded-md">
                      <p class="text-sm text-gray-600">
                        <strong>Anmerkungen:</strong> {{ booking.notes }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
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

// Computed
const allBookings = computed(() => bookingsStore.bookings)

const sortedBookings = computed(() => {
  return [...allBookings.value].sort((a, b) => {
    const dateA = new Date(getRelevantDate(a))
    const dateB = new Date(getRelevantDate(b))
    return dateB.getTime() - dateA.getTime()
  })
})

const confirmedBookings = computed(() => {
  return allBookings.value.filter(b => b.status === 'confirmed')
})

const cancelledBookings = computed(() => {
  return allBookings.value.filter(b => b.status === 'cancelled')
})

const totalSpent = computed(() => {
  return confirmedBookings.value.reduce((total, booking) => {
    return total + (booking.course?.price || 0)
  }, 0)
})

// Methods
const getRelevantDate = (booking: Booking) => {
  // For cancelled bookings, use updatedAt, otherwise createdAt
  return booking.status === 'cancelled' ? booking.updatedAt : booking.createdAt
}

const formatBookingDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatCourseDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const formatPrice = (price?: number) => {
  if (!price) return '0.00'
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const getBookingActionText = (status: string) => {
  switch (status) {
    case 'confirmed': return 'Kurs gebucht'
    case 'cancelled': return 'Buchung storniert'
    case 'pending': return 'Buchung ausstehend'
    default: return 'Buchung'
  }
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

const getBookingStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-500'
    case 'cancelled': return 'bg-red-500'
    case 'pending': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}

// Lifecycle
onMounted(async () => {
  await bookingsStore.fetchBookings()
})
</script>