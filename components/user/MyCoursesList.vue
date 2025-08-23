<template>
  <div>
    <!-- Empty State -->
    <div v-if="bookings.length === 0" class="text-center py-12">
      <svg 
        class="w-16 h-16 mx-auto text-gray-400 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="1" 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ type === 'upcoming' ? 'Keine kommenden Kurse' : 'Keine abgeschlossenen Kurse' }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ type === 'upcoming' 
          ? 'Sie haben aktuell keine gebuchten Kurse.' 
          : 'Sie haben noch keine Kurse abgeschlossen.' 
        }}
      </p>
      <NuxtLink
        v-if="type === 'upcoming'"
        to="/courses"
        class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Kurse entdecken
      </NuxtLink>
    </div>

    <!-- Courses List -->
    <div v-else class="space-y-4">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <!-- Course Title and Category -->
              <div class="flex items-center mb-2">
                <h3 class="text-xl font-semibold text-gray-900 mr-3">
                  {{ booking.course?.title }}
                </h3>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ booking.course?.category }}
                </span>
              </div>

              <!-- Course Details -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <!-- Date -->
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div class="font-medium">{{ formatDate(booking.course?.date) }}</div>
                    <div class="text-xs text-gray-500">{{ formatDayOfWeek(booking.course?.date) }}</div>
                  </div>
                </div>

                <!-- Time -->
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div class="font-medium">{{ booking.course?.startTime }} - {{ booking.course?.endTime }}</div>
                    <div class="text-xs text-gray-500">{{ booking.course?.duration }} Min.</div>
                  </div>
                </div>

                <!-- Instructor -->
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <div class="font-medium">{{ booking.course?.instructor }}</div>
                    <div class="text-xs text-gray-500">Trainer</div>
                  </div>
                </div>

                <!-- Location -->
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div class="font-medium">{{ booking.course?.location }}</div>
                    <div class="text-xs text-gray-500">Standort</div>
                  </div>
                </div>
              </div>

              <!-- Notes (if any) -->
              <div v-if="booking.notes" class="mb-4 p-3 bg-gray-50 rounded-md">
                <h4 class="text-sm font-medium text-gray-700 mb-1">Ihre Anmerkungen:</h4>
                <p class="text-sm text-gray-600">{{ booking.notes }}</p>
              </div>

              <!-- Booking Info -->
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>Gebucht am {{ formatBookingDate(booking.createdAt) }}</span>
                <span class="font-medium text-gray-900">{{ formatPrice(booking.course?.price) }}€</span>
              </div>
            </div>

            <!-- Status and Actions -->
            <div class="ml-6 flex flex-col items-end space-y-3">
              <!-- Status Badge -->
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusBadgeClass(booking.status)"
              >
                {{ getStatusText(booking.status) }}
              </span>

              <!-- Actions -->
              <div class="flex flex-col space-y-2">
                <!-- View Course Details -->
                <NuxtLink
                  :to="`/courses/${booking.course?.id}`"
                  class="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Kurs Details
                </NuxtLink>

                <!-- Cancel Booking (only for upcoming) -->
                <button
                  v-if="type === 'upcoming' && canCancelBooking(booking)"
                  @click="handleCancelBooking(booking)"
                  :disabled="isCancelling === booking.id"
                  class="text-sm text-red-600 hover:text-red-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-left"
                >
                  {{ isCancelling === booking.id ? 'Stornierung...' : 'Stornieren' }}
                </button>

                <!-- Cancellation not possible -->
                <span
                  v-else-if="type === 'upcoming' && !canCancelBooking(booking)"
                  class="text-xs text-gray-400"
                  :title="getCancellationReason(booking)"
                >
                  Stornierung nicht möglich
                </span>
              </div>
            </div>
          </div>

          <!-- Progress indicator for upcoming courses -->
          <div v-if="type === 'upcoming'" class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Zeit bis Kursbeginn</span>
              <span>{{ getTimeUntilCourse(booking.course?.date, booking.course?.startTime) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                class="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                :style="{ width: `${getProgressPercentage(booking.course?.date, booking.course?.startTime)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Booking } from '~/stores/bookings'

interface Props {
  bookings: Booking[]
  type: 'upcoming' | 'completed'
}

interface Emits {
  (e: 'refresh'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Stores
const bookingsStore = useBookingsStore()

// State
const isCancelling = ref<string | null>(null)

// Methods
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatDayOfWeek = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'long'
  })
}

const formatBookingDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPrice = (price?: number) => {
  if (!price) return '0.00'
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
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

const canCancelBooking = (booking: Booking) => {
  return bookingsStore.canCancelBooking(booking).canCancel
}

const getCancellationReason = (booking: Booking) => {
  return bookingsStore.canCancelBooking(booking).reason || ''
}

const getTimeUntilCourse = (dateString?: string, timeString?: string) => {
  if (!dateString || !timeString) return ''
  
  const courseDateTime = new Date(`${dateString}T${timeString}`)
  const now = new Date()
  const diffInMs = courseDateTime.getTime() - now.getTime()
  
  if (diffInMs <= 0) return 'Begonnen'
  
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))
  
  if (diffInDays > 0) return `${diffInDays} Tag${diffInDays !== 1 ? 'e' : ''}`
  if (diffInHours > 0) return `${diffInHours} Stunde${diffInHours !== 1 ? 'n' : ''}`
  return `${diffInMinutes} Minute${diffInMinutes !== 1 ? 'n' : ''}`
}

const getProgressPercentage = (dateString?: string, timeString?: string) => {
  if (!dateString || !timeString) return 0
  
  const courseDateTime = new Date(`${dateString}T${timeString}`)
  const now = new Date()
  const bookingDateTime = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)) // Assuming booking was 7 days ago
  
  const totalTime = courseDateTime.getTime() - bookingDateTime.getTime()
  const elapsed = now.getTime() - bookingDateTime.getTime()
  
  return Math.min(100, Math.max(0, (elapsed / totalTime) * 100))
}

const handleCancelBooking = async (booking: Booking) => {
  if (!booking.course) return
  
  const confirmMessage = `Möchten Sie die Buchung für "${booking.course.title}" am ${formatDate(booking.course.date)} wirklich stornieren?`
  
  if (confirm(confirmMessage)) {
    isCancelling.value = booking.id
    
    try {
      const result = await bookingsStore.cancelBooking(booking.id)
      if (result.success) {
        emit('refresh')
      }
    } finally {
      isCancelling.value = null
    }
  }
}
</script>