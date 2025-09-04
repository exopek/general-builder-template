<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Kurse werden geladen...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
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
      <p class="text-red-600 mb-4">{{ error }}</p>
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
      <!-- Week Header with Course Count -->
      <div class="mb-6">
        <div class="bg-gradient-to-r from-white to-gray-50/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6">
          <h2 class="text-xl font-semibold mb-2" style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            Aktuelle Woche
          </h2>
          <p class="text-sm text-gray-600">
            {{ courses.length }} {{ courses.length === 1 ? 'Kurs' : 'Kurse' }} verfügbar
          </p>
        </div>
      </div>

      <!-- Weekly Course Grid -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Week Days Grid -->
        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-7 gap-4">
            <div 
              v-for="day in weekDays" 
              :key="day.date"
              class="min-h-[120px]"
            >
              <!-- Day Header -->
              <div class="mb-3 pb-2 border-b border-gray-100">
                <div class="text-sm font-semibold text-gray-900">
                  {{ formatDayName(day.date) }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ formatDate(day.date) }}
                </div>
              </div>

              <!-- Day Courses -->
              <div class="space-y-2">
                <div
                  v-for="course in day.courses"
                  :key="course.id"
                  @click="!isCourseInPast(course) ? handleCourseClick(course) : null"
                  :class="[
                    'rounded-lg p-3 transition-all duration-200',
                    isCourseInPast(course) 
                      ? 'bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 cursor-pointer hover:shadow-md hover:from-orange-100 hover:to-red-100 hover:border-orange-300 transform hover:scale-[1.02]'
                  ]"
                >
                  <div :class="[
                    'text-sm font-semibold mb-1 line-clamp-2',
                    isCourseInPast(course) ? 'text-gray-500' : 'text-gray-900'
                  ]">
                    {{ course.title }}
                  </div>
                  <div :class="[
                    'text-xs mb-1',
                    isCourseInPast(course) ? 'text-gray-400' : ''
                  ]" :style="isCourseInPast(course) ? '' : 'color: rgb(252, 85, 32);'">
                    {{ formatTime(course.startTime) }} - {{ formatTime(course.endTime) }}
                  </div>
                  <div :class="[
                    'text-xs mb-1',
                    isCourseInPast(course) ? 'text-gray-400' : 'text-gray-600'
                  ]">
                    {{ course.instructor }}
                  </div>
                  <div :class="[
                    'text-xs',
                    isCourseInPast(course) ? 'text-gray-400' : 'text-gray-500'
                  ]">
                    {{ course.location }}
                  </div>
                  <div v-if="isCourseInPast(course)" class="text-xs text-gray-400 font-medium mt-2">
                    Kurs beendet
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
  </div>
</template>

<script setup lang="ts">
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

// Props for Builder.io customization
interface Props {
  showHeader?: boolean
  headerTitle?: string
  headerSubtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: true,
  headerTitle: 'Aktuelle Woche',
  headerSubtitle: ''
})

// Stores
const coursesStore = useCoursesStore()

// State
const isLoading = ref(false)
const error = ref<string | null>(null)
const courses = ref<Course[]>([])

// Computed
const today = computed(() => new Date())

const currentWeekStart = computed(() => {
  const start = new Date(today.value)
  const day = start.getDay()
  // Convert Sunday (0) to 7 for easier Monday-first calculation
  const mondayBasedDay = day === 0 ? 7 : day
  const diff = start.getDate() - mondayBasedDay + 1 // Monday as first day
  start.setDate(diff)
  start.setHours(0, 0, 0, 0)
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
      courses: courses.value.filter(course => course.date === dayDateStr)
    })
  }

  return days
})

// Methods
const fetchCurrentWeekCourses = async () => {
  try {
    isLoading.value = true
    error.value = null

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
      error.value = result.error || 'Fehler beim Laden der Kurse'
    }
  } catch (err: any) {
    error.value = err?.message || 'Unbekannter Fehler'
  } finally {
    isLoading.value = false
  }
}

const refreshCourses = async () => {
  await fetchCurrentWeekCourses()
}

const formatDayName = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', { weekday: 'long' })
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit'
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

const isCourseInPast = (course: Course) => {
  const now = new Date()
  const courseDate = new Date(course.date)
  
  // If the course date is before today, it's in the past
  if (courseDate.toDateString() !== now.toDateString()) {
    return courseDate < now
  }
  
  // If it's today, check if the course end time has passed
  const courseEndTime = course.endTime
  if (courseEndTime) {
    // Parse end time
    let endDateTime: Date
    
    if (courseEndTime.includes('T')) {
      // ISO datetime string
      endDateTime = new Date(courseEndTime)
    } else if (courseEndTime.includes(':')) {
      // Simple time string like "10:30"
      endDateTime = new Date(courseDate)
      const [hours, minutes] = courseEndTime.split(':').map(Number)
      endDateTime.setHours(hours, minutes)
    } else {
      return false
    }
    
    return endDateTime < now
  }
  
  return false
}

const handleCourseClick = (course: Course) => {
  if (!isCourseInPast(course)) {
    // You can emit an event or navigate to course details
    console.log('Course clicked:', course)
    // Could emit: emit('courseClick', course)
  }
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>