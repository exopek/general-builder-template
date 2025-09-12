<template>
  <div>
    <!-- Header -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-4 sm:px-6 py-4">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900">Teilnehmer-Übersicht</h2>
        <p class="text-sm text-gray-500 mt-1">Klicken Sie auf einen Kurs in der aktuellen Woche, um die Teilnehmer anzuzeigen</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoadingCourses" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Kurse werden geladen...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="coursesError" class="text-center py-12">
      <svg 
        class="w-16 h-16 mx-auto text-red-400 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="1" 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h3 class="text-lg font-medium text-red-900 mb-2">Fehler beim Laden</h3>
      <p class="text-red-600 mb-4">{{ coursesError }}</p>
      <button
        @click="refreshCourses"
        class="text-white py-2 px-4 rounded-md transition-colors" 
        style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);"
      >
        Erneut versuchen
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="courses.length === 0" class="text-center py-12">
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
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 01-2 2z" 
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Keine Kurse verfügbar
      </h3>
      <p class="text-gray-600">
        Für diese Woche sind keine Kurse verfügbar.
      </p>
    </div>

    <!-- Weekly Grid -->
    <div v-else>
      <!-- Weekly Course Grid -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <!-- Week Days Grid -->
        <div class="p-3 sm:p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 sm:gap-4">
            <div 
              v-for="day in weekDays" 
              :key="day.date"
              class="min-h-[120px] sm:min-h-[140px]"
            >
              <!-- Day Header -->
              <div class="mb-3 pb-2 border-b border-gray-100">
                <div class="text-sm font-semibold text-gray-900">
                  {{ formatDayName(day.date) }}
                </div>
              </div>

              <!-- Day Courses -->
              <div class="space-y-2">
                <div
                  v-for="course in day.courses"
                  :key="course.id"
                  @click="selectCourse(course)"
                  :class="[
                    'rounded-lg p-2 sm:p-3 transition-all duration-200 cursor-pointer',
                    selectedCourseId === course.courseSettingsId 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 shadow-lg'
                      : 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 hover:shadow-md hover:from-orange-100 hover:to-red-100 hover:border-orange-300 transform hover:scale-[1.02]'
                  ]"
                >
                  <div :class="[
                    'text-sm font-semibold mb-1 line-clamp-2',
                    'text-gray-900'
                  ]">
                    {{ course.title }}
                  </div>
                  <div :class="[
                    'text-xs mb-1'
                  ]" :style="'color: rgb(252, 85, 32);'">
                    {{ formatTime(course.startTime) }} - {{ formatTime(course.endTime) }}
                  </div>
                  <div :class="[
                    'text-xs mb-1',
                    'text-gray-600'
                  ]">
                    {{ course.instructor }}
                  </div>
                  <div :class="[
                    'text-xs',
                    'text-gray-500'
                  ]">
                    {{ course.location }}
                  </div>
                </div>
              </div>

              <!-- Empty Day -->
              <div 
                v-if="day.courses.length === 0"
                class="text-xs text-gray-400 italic text-center py-4"
              >
                Keine Kurse
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Teilnehmer Liste -->
    <div v-if="selectedCourse && selectedCourseSettingId" class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div>
          <h3 class="text-lg font-medium text-gray-900">
            Teilnehmer ({{ bookings.length }})
          </h3>
          <p class="text-sm text-gray-500 break-words">
            {{ selectedCourse?.title }} - {{ formatDate(selectedCourse.date) }}
          </p>
        </div>
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

      <!-- Participants Table/Cards -->
      <div v-else>
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
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

        <!-- Mobile Cards -->
        <div class="md:hidden space-y-4 p-4">
          <div
            v-for="booking in bookings"
            :key="booking.id"
            class="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                  {{ getInitials(booking.user) }}
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">
                    {{ booking.user?.firstName }} {{ booking.user?.lastName }}
                  </div>
                  <div class="text-sm text-gray-500 break-all">
                    {{ booking.user?.email }}
                  </div>
                </div>
              </div>
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="getStatusBadgeClass(booking.status)"
              >
                {{ booking.statusAsString }}
              </span>
            </div>
            <div class="text-xs text-gray-500">
              Angemeldet: {{ formatBookingDate(booking.bookedAt) }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookingReadDto } from '~/types'

interface Course {
  id: string | number
  title: string
  category: string
  date: string
  startTime: string
  endTime: string
  duration: number
  instructor: string
  location: string
  description?: string
  price: number
  status?: string
  availableSlots?: number
  courseSettingsId?: string
}

interface DaySchedule {
  date: string
  courses: Course[]
}

// Stores
const coursesStore = useCoursesStore()
const bookingsStore = useBookingsStore()

// State
const isLoading = ref(false)
const isLoadingCourses = ref(false)
const coursesError = ref<string | null>(null)
const courses = ref<Course[]>([])
const selectedCourseId = ref('')
const selectedCourseSettingId = ref('')
const bookings = ref<BookingReadDto[]>([])

// Computed
const today = computed(() => new Date())

const currentWeekStart = computed(() => {
  const start = new Date(today.value)
  const day = start.getDay()
  // Calculate days to subtract to get to Monday (1)
  // Sunday is 0, Monday is 1, etc.
  const daysToSubtract = day === 0 ? 6 : day - 1
  start.setDate(start.getDate() - daysToSubtract)
  start.setHours(3, 0, 0, 0)
  return start
})

const currentWeekEnd = computed(() => {
  const end = new Date(currentWeekStart.value)
  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
})

const weekDays = computed<DaySchedule[]>(() => {
  if (!courses.value.length) {
    // Still create the 7 days even if no courses
    const days: DaySchedule[] = []
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(currentWeekStart.value)
      dayDate.setDate(dayDate.getDate() + i)
      const dayDateStr = dayDate.toISOString().split('T')[0]
      
      days.push({
        date: dayDateStr,
        courses: []
      })
    }
    return days
  }

  // Create all 7 days of the week
  const days: DaySchedule[] = []
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(currentWeekStart.value)
    dayDate.setDate(dayDate.getDate() + i)
    const dayDateStr = dayDate.toISOString().split('T')[0]
    
    days.push({
      date: dayDateStr,
      courses: courses.value.filter((course: Course) => course.date === dayDateStr)
    })
  }

  return days
})

const selectedCourse = computed(() => 
  courses.value.find((c: Course) => c.courseSettingsId === selectedCourseId.value)
)










// Methods
const fetchCurrentWeekCourses = async () => {
  try {
    isLoadingCourses.value = true
    coursesError.value = null

    // Set query for current week
    coursesStore.setQuery({
      startDate: currentWeekStart.value.toISOString(),
      endDate: currentWeekEnd.value.toISOString()
    })

    // Fetch courses
    const result = await coursesStore.fetchCourses(true) // Force refresh
    
    if (result.success) {
      courses.value = coursesStore.courses
    } else {
      coursesError.value = result.error || 'Fehler beim Laden der Kurse'
    }
  } catch (err: any) {
    coursesError.value = err?.message || 'Unbekannter Fehler'
  } finally {
    isLoadingCourses.value = false
  }
}

const refreshCourses = async () => {
  await fetchCurrentWeekCourses()
}

const selectCourse = async (course: Course) => {
  if (course.courseSettingsId) {
    selectedCourseId.value = course.courseSettingsId
    selectedCourseSettingId.value = course.courseSettingsId
    await loadBookings(course.courseSettingsId)
  }
}

const formatDayName = (dateStr: string) => {
  const date = new Date(dateStr)
  const dayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
  const dayIndex = date.getDay()
  // Convert Sunday (0) to index 6, and Monday (1) to index 0
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
  return dayNames[adjustedIndex]
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

const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  
  // Handle different time formats
  if (timeStr.includes('T')) {
    // ISO datetime string
    const date = new Date(timeStr)
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } else if (timeStr.includes(':')) {
    // Simple time string like "10:30"
    return timeStr
  }
  
  return timeStr
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






// Load courses on mount
onMounted(async () => {
  await fetchCurrentWeekCourses()
})

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>