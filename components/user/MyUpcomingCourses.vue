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
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" 
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Keine kommenden Kurse
      </h3>
      <p class="text-gray-600 mb-4">
        Sie sind derzeit für keine kommenden Kurse angemeldet.
      </p>
      <NuxtLink
        to="/courses"
        class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Kurse entdecken
      </NuxtLink>
    </div>

    <!-- Weekly Slider -->
    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white-900">Wochenübersicht</h2>
        
        <!-- Week Navigation -->
        <div class="flex items-center space-x-4">
          <button
            @click="previousWeek"
            :disabled="currentWeekIndex === 0"
            class="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            :class="{ 'hover:bg-gray-50': currentWeekIndex > 0 }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span class="text-sm text-white-600 min-w-[200px] text-center">
            {{ formatWeekRange(currentWeek.weekStart, currentWeek.weekEnd) }}
          </span>
          
          <button
            @click="nextWeek"
            :disabled="currentWeekIndex >= weeklySchedule.length - 1"
            class="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            :class="{ 'hover:bg-gray-50': currentWeekIndex < weeklySchedule.length - 1 }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Current Week Display -->
      <div 
        v-if="currentWeek"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <!-- Week Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-white-900">
            {{ formatWeekRange(currentWeek.weekStart, currentWeek.weekEnd) }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ currentWeek.courses.length }} {{ currentWeek.courses.length === 1 ? 'Kurs' : 'Kurse' }}
          </p>
        </div>

        <!-- Week Days -->
        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-7 gap-4">
            <div 
              v-for="day in currentWeek.days" 
              :key="day.date"
              class="min-h-[100px]"
            >
              <!-- Day Header -->
              <div class="mb-2">
                <div class="text-sm font-medium text-gray-900">
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
                  class="bg-indigo-50 border border-indigo-200 rounded-md p-3 transition-colors"
                  
                >
                  <div class="text-sm font-medium text-indigo-900 mb-1">
                    {{ course.title }}
                  </div>
                  <div class="text-xs text-indigo-700 mb-1">
                    {{ formatTime(course.startTime) }} - {{ formatTime(course.endTime) }}
                  </div>
                  <div class="text-xs text-indigo-600">
                    {{ course.instructor }}
                  </div>
                  <div class="text-xs text-indigo-600">
                    {{ course.location }}
                  </div>
                </div>
              </div>

              <!-- Empty Day -->
              <div 
                v-if="day.courses.length === 0"
                class="text-xs text-gray-400 italic"
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
  id: number
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
  status: string
}

interface Props {
  courses: Course[]
}

interface DaySchedule {
  date: string
  courses: Course[]
}

interface WeekSchedule {
  weekStart: string
  weekEnd: string
  courses: Course[]
  days: DaySchedule[]
}

const props = defineProps<Props>()

// Reactive state
const currentWeekIndex = ref(0)

// Computed
const currentWeek = computed(() => {
  if (!weeklySchedule.value.length) return null
  return weeklySchedule.value[currentWeekIndex.value] || null
})
const weeklySchedule = computed<WeekSchedule[]>(() => {
  if (!props.courses.length) return []

  const weeks = new Map<string, Course[]>()
  
  // Group courses by week
  props.courses.forEach(course => {
    const courseDate = new Date(course.date)
    const weekStart = getStartOfWeek(courseDate)
    const weekKey = weekStart.toISOString().split('T')[0]
    
    if (!weeks.has(weekKey)) {
      weeks.set(weekKey, [])
    }
    weeks.get(weekKey)!.push(course)
  })

  // Convert to week schedule format
  return Array.from(weeks.entries())
    .map(([weekStartStr, weekCourses]) => {
      const weekStart = new Date(weekStartStr)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)

      // Create all 7 days of the week
      const days: DaySchedule[] = []
      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(weekStart)
        dayDate.setDate(dayDate.getDate() + i)
        const dayDateStr = dayDate.toISOString().split('T')[0]
        
        days.push({
          date: dayDateStr,
          courses: weekCourses.filter(course => course.date === dayDateStr)
        })
      }

      return {
        weekStart: weekStartStr,
        weekEnd: weekEnd.toISOString().split('T')[0],
        courses: weekCourses,
        days
      }
    })
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart))
})

// Methods
const getStartOfWeek = (date: Date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday as first day
  return new Date(d.setDate(diff))
}

const formatWeekRange = (startStr: string, endStr: string) => {
  const start = new Date(startStr)
  const end = new Date(endStr)
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit'
  }
  
  return `${start.toLocaleDateString('de-DE', formatOptions)} - ${end.toLocaleDateString('de-DE', formatOptions)}`
}

const formatDayName = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', { weekday: 'short' })
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit'
  })
}

const formatTime = (timeStr: string) => {
  const date = new Date(timeStr)
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const viewCourseDetails = (course: Course) => {
  // Navigate to course details or show modal
  navigateTo(`/courses/${course.id}`)
}

const previousWeek = () => {
  if (currentWeekIndex.value > 0) {
    currentWeekIndex.value--
  }
}

const nextWeek = () => {
  if (currentWeekIndex.value < weeklySchedule.value.length - 1) {
    currentWeekIndex.value++
  }
}

// Watch for changes in weeklySchedule and reset to first week
watch(weeklySchedule, () => {
  currentWeekIndex.value = 0
}, { immediate: true })
</script>