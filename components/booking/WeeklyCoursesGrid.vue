<template>
  <div>
    <!-- Empty State -->
    <div v-if="courses.length === 0" class="text-center py-12">
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
            Wochenübersicht
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
                  @click="handleCourseClick(course)"
                  class="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:from-orange-100 hover:to-red-100 hover:border-orange-300 transform hover:scale-[1.02]"
                >
                  <div class="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                    {{ course.title }}
                  </div>
                  <div class="text-xs mb-1" style="color: rgb(252, 85, 32);">
                    {{ formatTime(course.startTime) }} - {{ formatTime(course.endTime) }}
                  </div>
                  <div class="text-xs text-gray-600 mb-1">
                    {{ course.instructor }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ course.location }}
                  </div>
                  <!-- <div class="mt-2 flex items-center justify-between">
                    <span class="text-xs font-medium text-green-600">
                      {{ course.availableSlots || 0 }} verfügbar
                    </span>
                    <div class="text-xs font-semibold" style="color: rgb(252, 85, 32);">
                      {{ course.price }}€
                    </div>
                  </div> -->
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

interface Props {
  courses: Course[]
}

interface DaySchedule {
  date: string
  courses: Course[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  courseClick: [course: Course]
}>()

// Computed
const weekDays = computed<DaySchedule[]>(() => {
  if (!props.courses.length) return []

  // Get the first course date to determine the week
  const firstCourseDate = new Date(props.courses[0].date)
  const weekStart = getStartOfWeek(firstCourseDate)

  // Create all 7 days of the week
  const days: DaySchedule[] = []
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(weekStart)
    dayDate.setDate(dayDate.getDate() + i)
    const dayDateStr = dayDate.toISOString().split('T')[0]
    
    days.push({
      date: dayDateStr,
      courses: props.courses.filter(course => course.date === dayDateStr)
    })
  }

  return days
})

// Methods
const getStartOfWeek = (date: Date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday as first day
  return new Date(d.setDate(diff))
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

const handleCourseClick = (course: Course) => {
  emit('courseClick', course)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>