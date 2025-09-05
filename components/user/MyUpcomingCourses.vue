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
        class="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
      >
        Kurse entdecken
      </NuxtLink>
    </div>

    <!-- Weekly Slider -->
    <div v-else>
      <div class="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 class="text-xl font-semibold" style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Wochenübersicht</h2>
        </div>
        
        <!-- Desktop Week Navigation -->
        <div class="hidden sm:flex items-center bg-white/60 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200/50">
          <button
            @click="previousWeek"
            :disabled="currentWeekIndex === 0"
            class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span class="text-sm text-gray-700 min-w-[220px] text-center font-semibold px-4">
            {{ formatWeekRange(currentWeek.weekStart, currentWeek.weekEnd) }}
          </span>
          
          <button
            @click="nextWeek"
            :disabled="currentWeekIndex >= weeklySchedule.length - 1"
            class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Week Navigation -->
      <div class="flex sm:hidden items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200/50 mb-6">
        <button
          @click="previousWeek"
          :disabled="currentWeekIndex === 0"
          class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span class="text-sm text-gray-700 flex-1 text-center font-semibold px-4">
          {{ formatWeekRange(currentWeek.weekStart, currentWeek.weekEnd) }}
        </span>
        
        <button
          @click="nextWeek"
          :disabled="currentWeekIndex >= weeklySchedule.length - 1"
          class="p-3 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <!-- Current Week Display -->
      <div 
        v-if="currentWeek"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <!-- Week Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200" style="background: linear-gradient(-90deg, rgba(252, 209, 34, 0.1) 0%, rgba(252, 124, 34, 0.1) 35%, rgba(252, 85, 32, 0.1) 70%, rgba(251, 60, 54, 0.1) 100%)">
          <h3 class="text-lg font-medium" style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
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
                  class="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-md p-3 transition-colors"
                  
                >
                  <div class="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                    {{ course.title }}
                  </div>
                  <div class="text-xs text-orange-700 mb-1">
                    {{ formatTime(course.startTime) }} - {{ formatTime(course.endTime) }}
                  </div>
                  <div class="text-xs mb-1 text-gray-600">
                    {{ course.instructor }}
                  </div>
                  <div class="text-xs text-gray-500">
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