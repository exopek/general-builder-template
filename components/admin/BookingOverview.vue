<template>
  <div class="space-y-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Teilnehmer-Übersicht</h2>
        <p class="text-sm text-gray-500 mt-1">Wählen Sie einen Kurs und Termin, um die Teilnehmer anzuzeigen</p>
      </div>
      
      <div class="p-6 space-y-4">
        <!-- Kurs Auswahl -->
        <!-- Date Range Filter -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Startdatum</label>
            <input
              v-model="startDate"
              @change="onDateRangeChange"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Enddatum</label>
            <input
              v-model="endDate"
              @change="onDateRangeChange"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kurs auswählen</label>
          <select
            v-model="selectedCourseId"
            @change="onCourseChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Kurs wählen --</option>
            <option v-for="course in availableCourses" :key="course.courseSettingsId" :value="course.courseSettingsId">
              {{ course.title }}
            </option>
          </select>
        </div>
        
        <!-- Course Info Display -->
        <div v-if="selectedCourse" class="bg-gray-50 border rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-gray-900">{{ selectedCourse.title }}</h3>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              {{ selectedCourse.level }}
            </span>
          </div>
          <div class="text-sm text-gray-600 space-y-1">
            <div><strong>Datum:</strong> {{ formatDate(selectedCourse.date) }}</div>
            <div><strong>Zeit:</strong> {{ selectedCourse.startTime }} - {{ selectedCourse.endTime }}</div>
            <div><strong>Trainer:</strong> {{ selectedCourse.instructor }}</div>
            <div><strong>Max. Teilnehmer:</strong> {{ selectedCourse.maxParticipants }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Teilnehmer Liste -->
    <div v-if="selectedCourse && selectedCourseSettingId" class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 class="text-lg font-medium text-gray-900">
            Teilnehmer ({{ bookings.length }})
          </h3>
          <p class="text-sm text-gray-500">
            {{ selectedCourse?.title }} - {{ formatDate(selectedCourse.date) }} {{ selectedCourse.startTime }}
          </p>
        </div>
        
        <button
          v-if="bookings.length > 0"
          @click="exportParticipants"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V11a2 2 0 012 2v6a2 2 0 01-2 2z" />
          </svg>
          <span>CSV Export</span>
        </button>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-500">Teilnehmer werden geladen...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="bookings.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-gray-500 text-lg">Noch keine Anmeldungen</p>
        <p class="text-sm text-gray-400 mt-1">
          Für diesen Termin haben sich noch keine Teilnehmer angemeldet
        </p>
      </div>

      <!-- Participants Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teilnehmer
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-Mail
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Anmeldedatum
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="booking in bookings"
              :key="booking.id"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                    {{ getInitials(booking.user) }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">
                      {{ booking.user?.firstName }} {{ booking.user?.lastName }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ booking.user?.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatBookingDate(booking.bookedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(booking.status)"
                >
                  {{ booking.statusAsString }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookingReadDto } from '~/types'

// Stores
const coursesStore = useCoursesStore()
const bookingsStore = useBookingsStore()

// State
const isLoading = ref(false)
const selectedCourseId = ref('')
const selectedCourseSettingId = ref('')
const bookings = ref<BookingReadDto[]>([])
const startDate = ref(new Date().toUTCString())
const endDate = ref(new Date(new Date().setMonth(new Date().getMonth() + 3)).toUTCString())

// Computed
const availableCourses = computed(() => 
  coursesStore.courses.filter(course => course.isActive)
)

const selectedCourse = computed(() => 
  availableCourses.value.find(c => c.courseSettingsId === selectedCourseId.value)
)










// Methods
const onDateRangeChange = async () => {
  let fromDate = new Date(startDate.value).toUTCString()
  let toDate = new Date(endDate.value).toUTCString()
  if (startDate.value && endDate.value) {
    coursesStore.setQuery({
      startDate: fromDate,
      endDate: toDate
    })
    await coursesStore.fetchCourses()
    // Reset course selection since courses may have changed
    selectedCourseId.value = ''
    selectedCourseSettingId.value = ''
    bookings.value = []
  }
}

const onCourseChange = () => {
  // Since each course already has a courseSettingsId, auto-select it
  console.log('Selected course ID:', selectedCourse.value?.courseSettingsId)
  if (selectedCourse.value?.courseSettingsId) {
    selectCourseSetting(selectedCourse.value.courseSettingsId)
  } else {
    selectedCourseSettingId.value = ''
    bookings.value = []
  }
}

const selectCourseSetting = async (courseSettingId: string) => {
  selectedCourseSettingId.value = courseSettingId
  console.log('Selected course setting ID:', courseSettingId)
  await loadBookings(courseSettingId)
}

const loadBookings = async (courseSettingId: string) => {
  isLoading.value = true
  try {
    const result = await bookingsStore.fetchBookingsByCourseSettingId(courseSettingId)
    if (result.success) {
      // Convert from store format to DTO format for display
      bookings.value = bookingsStore.bookings.map(booking => ({
        id: booking.id,
        courseSettingId: courseSettingId,
        bookedAt: booking.bookingDate,
        status: booking.status,
        statusAsString: getStatusText(booking.status),
        createdAt: booking.createdAt,
        courseSetting: {
          id: courseSettingId,
          scheduledAt: selectedCourse.value!.date,
          maxParticipants: selectedCourse.value!.maxParticipants,
          courseId: selectedCourse.value!.id,
          trainerName: selectedCourse.value!.instructor
        },
        course: {
          id: selectedCourse.value!.id,
          title: selectedCourse.value!.title,
          description: selectedCourse.value!.description,
          imageUrl: selectedCourse.value!.image || '',
          difficulty: selectedCourse.value!.level === 'beginner' ? 1 : selectedCourse.value!.level === 'intermediate' ? 2 : 3,
          bookingsCount: 0
        },
        user: booking.user!
      }))
    }
  } catch (error) {
    console.error('Error loading bookings:', error)
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
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

const getInitials = (user: any) => {
  if (!user) return '?'
  return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase()
}

const getStatusText = (status: number) => {
  switch (status) {
    case 0: return 'Bestätigt'
    case 2: return 'Storniert'
    case 1: return 'Ausstehend'
    default: return 'Unbekannt'
  }
}

const getStatusBadgeClass = (status: number) => {
  switch (status) {
    case 0: return 'bg-green-100 text-green-800'
    case 2: return 'bg-red-100 text-red-800'
    case 1: return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const exportParticipants = () => {
  if (bookings.value.length === 0) return
  
  const headers = ['Name', 'E-Mail', 'Anmeldedatum', 'Status']
  const rows = bookings.value.map(booking => [
    `${booking.user.firstName} ${booking.user.lastName}`,
    booking.user.email,
    formatBookingDate(booking.bookedAt),
    booking.statusAsString
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `teilnehmer-${selectedCourse.value?.title}-${formatDate(selectedCourse.value!.date)}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}






// Load data on mount
onMounted(async () => {
  coursesStore.setQuery({
    startDate: startDate.value,
    endDate: endDate.value
  })
  await coursesStore.fetchCourses()
})

</script>