<template>
  <div class="space-y-6">
    
    <!-- Quick Action Filters -->
    <div class="bg-white shadow rounded-lg p-4">
      <div class="flex flex-wrap gap-2">
        <button
          @click="setQuickFilter('needsAttention')"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            quickFilter === 'needsAttention'
              ? 'bg-orange-100 text-orange-800 border border-orange-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Benötigt Aufmerksamkeit
          <span v-if="bookingStats.pending > 0" class="ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-200 text-orange-800">
            {{ bookingStats.pending }}
          </span>
        </button>
        
        <button
          @click="setQuickFilter('todaysCourses')"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            quickFilter === 'todaysCourses'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          Heutige Kurse
          <span v-if="todaysCoursesCount > 0" class="ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-200 text-blue-800">
            {{ todaysCoursesCount }}
          </span>
        </button>
        
        <button
          @click="setQuickFilter('cancellations')"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            quickFilter === 'cancellations'
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Stornierungen
          <span v-if="bookingStats.cancelled > 0" class="ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-200 text-red-800">
            {{ bookingStats.cancelled }}
          </span>
        </button>
        
        <button
          @click="setQuickFilter('recent')"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            quickFilter === 'recent'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
          Letzte 24h
          <span v-if="recentBookingsCount > 0" class="ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
            {{ recentBookingsCount }}
          </span>
        </button>
        
        <button
          v-if="quickFilter"
          @click="clearAllFilters()"
          class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
        >
          <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Alle Filter löschen
        </button>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          
          <div class="flex space-x-3">
            <!-- Course Filter -->
            <select
              v-model="selectedCourse"
              class="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Alle Kurse</option>
              <option v-for="course in uniqueCourses" :key="course" :value="course">
                {{ course }}
              </option>
            </select>
            
            <!-- Date Picker -->
            <VueDatePicker
              v-model="selectedDate"
              :placeholder="'Datum wählen'"
              :enable-time-picker="false"
              range
              auto-apply
              class="min-w-[200px]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bookings Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          Buchungen ({{ filteredBookings.length }})
        </h3>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
        <p class="text-gray-500">Buchungen werden geladen...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredBookings.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-500 text-lg">{{ searchQuery || selectedCourse || selectedDate ? 'Keine passenden Buchungen gefunden' : 'Noch keine Buchungen vorhanden' }}</p>
        <p v-if="searchQuery || selectedCourse || selectedDate" class="text-sm text-gray-400 mt-1">
          Versuchen Sie andere Filterkriterien
        </p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buchung
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kurs
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kunde
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="booking in paginatedBookings"
              :key="booking.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>
                  <div class="font-medium">#{{ booking.id.slice(0, 8) }}</div>
                  <div class="text-gray-500">{{ formatBookingDate(booking.createdAt) }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ booking.courseName || 'Unbekannter Kurs' }}</div>
                  <div class="text-sm text-gray-500">{{ formatCourseDate(booking.courseDate) }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ booking.userName }}</div>
                  <div class="text-sm text-gray-500">{{ booking.userEmail || 'Keine E-Mail' }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(booking.status)"
                >
                  {{ getStatusText(booking.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button
                    v-if="booking.status === 'pending'"
                    @click="updateBookingStatus(booking.id, 'confirmed')"
                    class="text-green-600 hover:text-green-900 font-medium"
                    :disabled="isUpdating"
                  >
                    Bestätigen
                  </button>
                  <button
                    v-if="booking.status !== 'cancelled'"
                    @click="updateBookingStatus(booking.id, 'cancelled')"
                    class="text-red-600 hover:text-red-900 font-medium"
                    :disabled="isUpdating"
                  >
                    Stornieren
                  </button>
                  <button
                    @click="viewBookingDetails(booking)"
                    class="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    Details
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Zurück
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Zeige
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                bis
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredBookings.length) }}</span>
                von
                <span class="font-medium">{{ filteredBookings.length }}</span>
                Ergebnissen
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <template v-for="page in visiblePages" :key="page">
                  <button
                    v-if="page === '...'"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </button>
                  <button
                    v-else
                    @click="currentPage = page"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === currentPage
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookingOverview } from '~/stores/admin'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Stores
const adminStore = useAdminStore()
const coursesStore = useCoursesStore()

// State
const isLoading = ref(false)
const isUpdating = ref(false)
const searchQuery = ref('')
const selectedCourse = ref('')
const selectedDate = ref<[Date, Date] | null>(null)
const quickFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 100

// Computed
const bookings = computed(() => adminStore.allBookings)

const bookingStats = computed(() => {
  const stats = {
    total: bookings.value.length,
    confirmed: 0,
    pending: 0,
    cancelled: 0
  }

  bookings.value.forEach((booking: BookingOverview) => {
    switch (booking.status) {
      case 'confirmed':
        stats.confirmed++
        break
      case 'pending':
        stats.pending++
        break
      case 'cancelled':
        stats.cancelled++
        break
    }
  })

  return stats
})

const todaysCoursesCount = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  return bookings.value.filter((booking: BookingOverview) => {
    if (!booking.courseDate) return false
    const courseDate = new Date(booking.courseDate)
    courseDate.setHours(0, 0, 0, 0)
    return courseDate.getTime() === today.getTime()
  }).length
})

const recentBookingsCount = computed(() => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  return bookings.value.filter((booking: BookingOverview) => {
    const createdAt = new Date(booking.createdAt)
    return createdAt >= yesterday
  }).length
})

const filteredBookings = computed(() => bookings.value)

const totalPages = computed(() => Math.ceil(filteredBookings.value.length / itemsPerPage))

const queryParams = computed(() => {
  const params: any = {}
  
  if (quickFilter.value) {
    params.quickFilter = quickFilter.value
  }
  
  if (searchQuery.value) {
    params.search = searchQuery.value
  }
  
  if (selectedCourse.value) {
    params.courseName = selectedCourse.value
  }
  
  if (selectedDate.value && selectedDate.value.length === 2) {
    params.dateFrom = selectedDate.value[0].toISOString().split('T')[0]
    params.dateTo = selectedDate.value[1].toISOString().split('T')[0]
  }
  
  params.limit = itemsPerPage
  params.offset = (currentPage.value - 1) * itemsPerPage
  
  return params
})

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredBookings.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    
    if (total > 1) {
      pages.push(total)
    }
  }

  return pages
})

// Methods
const formatBookingDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCourseDate = (dateString?: string) => {
  if (!dateString) return 'Unbekanntes Datum'
  
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
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

const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
  isUpdating.value = true
  
  try {
    const result = await adminStore.updateBookingStatus(bookingId, status)
    if (!result.success) {
      console.error('Failed to update booking status:', result.error)
    }
  } catch (error) {
    console.error('Error updating booking status:', error)
  } finally {
    isUpdating.value = false
  }
}

const setQuickFilter = (filterType: string) => {
  // Clear other filters when using quick filter
  selectedCourse.value = ''
  selectedDate.value = null
  quickFilter.value = quickFilter.value === filterType ? '' : filterType
  currentPage.value = 1
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCourse.value = ''
  selectedDate.value = null
  quickFilter.value = ''
  currentPage.value = 1
}

const viewBookingDetails = (booking: BookingOverview) => {
  // TODO: Implement booking details modal or navigation
  console.log('View booking details:', booking)
}

const fetchBookingsWithFilters = async () => {
  isLoading.value = true
  try {
    await adminStore.fetchAllBookings(queryParams.value)
  } catch (error) {
    console.error('Error loading bookings:', error)
  } finally {
    isLoading.value = false
  }
}

// Reset pagination and fetch when filters change
watch([searchQuery, selectedCourse, selectedDate, quickFilter], () => {
  currentPage.value = 1
  fetchBookingsWithFilters()
}, { deep: true })

// Fetch when pagination changes
watch(currentPage, () => {
  fetchBookingsWithFilters()
})

// Load data on mount
onMounted(async () => {
  // Load courses for dropdown
  await coursesStore.fetchCourses()
  // Load bookings
  fetchBookingsWithFilters()
})
const uniqueCourses = computed(() => {
  return coursesStore.courses
    .filter(course => course.isActive)
    .map(course => course.title)
    .sort()
})

</script>