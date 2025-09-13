<template>
  <div>
    <!-- Next Course Hero Card -->
    <div v-if="nextCourse" class="relative overflow-hidden rounded-xl shadow-lg mb-6"
         style="background: linear-gradient(135deg, rgba(252, 209, 34, 0.1) 0%, rgba(252, 124, 34, 0.1) 35%, rgba(252, 85, 32, 0.1) 70%, rgba(251, 60, 54, 0.1) 100%)">

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div class="relative p-6 md:p-8">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex items-center space-x-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-sm font-medium text-gray-600">Ihr nächster Kurs</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">{{ nextCourse.title }}</h2>
        </div>

        <!-- Course Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          <!-- Datum -->
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
              <svg class="w-5 h-5" style="color: rgb(252, 124, 34)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Datum</p>
              <p class="font-semibold text-gray-900">{{ formatDate(nextCourse.date) }}</p>
            </div>
          </div>

          <!-- Uhrzeit -->
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
              <svg class="w-5 h-5" style="color: rgb(252, 124, 34)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Uhrzeit</p>
              <p class="font-semibold text-gray-900">{{ formatTime(nextCourse.startTime) }} - {{ formatTime(nextCourse.endTime) }}</p>
            </div>
          </div>

          <!-- Trainer -->
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
              <svg class="w-5 h-5" style="color: rgb(252, 124, 34)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Trainer</p>
              <p class="font-semibold text-gray-900">{{ nextCourse.instructor }}</p>
            </div>
          </div>

          <!-- Ort -->
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
              <svg class="w-5 h-5" style="color: rgb(252, 124, 34)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Ort</p>
              <p class="font-semibold text-gray-900">{{ nextCourse.location }}</p>
            </div>
          </div>
        </div>

        <!-- Countdown -->
        <div v-if="countdown.isValid" class="mb-6">
          <div class="bg-white bg-opacity-60 rounded-lg p-4 inline-flex items-center space-x-4">
            <span class="text-sm font-medium text-gray-600">Kurs startet in:</span>

            <div v-if="countdown.days > 0" class="flex items-center space-x-1">
              <span class="text-lg font-bold" style="color: rgb(252, 124, 34)">{{ countdown.days }}</span>
              <span class="text-sm text-gray-600">{{ countdown.days === 1 ? 'Tag' : 'Tage' }}</span>
            </div>

            <div class="flex items-center space-x-1">
              <span class="text-lg font-bold" style="color: rgb(252, 124, 34)">{{ countdown.hours.toString().padStart(2, '0') }}</span>
              <span class="text-sm text-gray-600">Std</span>
            </div>

            <div class="flex items-center space-x-1">
              <span class="text-lg font-bold" style="color: rgb(252, 124, 34)">{{ countdown.minutes.toString().padStart(2, '0') }}</span>
              <span class="text-sm text-gray-600">Min</span>
            </div>

            <div v-if="countdown.days === 0 && countdown.hours < 1" class="flex items-center space-x-1">
              <span class="text-lg font-bold text-red-500">{{ countdown.seconds.toString().padStart(2, '0') }}</span>
              <span class="text-sm text-gray-600">Sek</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <NuxtLink
            :to="`/courses/${nextCourse.id}`"
            class="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Kurs-Details anzeigen
          </NuxtLink>

          <button
            @click="addToCalendar"
            class="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Zum Kalender hinzufügen
          </button>
        </div>
      </div>
    </div>

    <!-- No Next Course Fallback -->
    <div v-else class="relative overflow-hidden rounded-xl shadow-sm border-2 border-dashed border-gray-200 mb-6">
      <div class="p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-2">Keine kommenden Kurse</h3>
        <p class="text-gray-600 mb-6 max-w-md mx-auto">
          Sie haben derzeit keine Kurse gebucht. Entdecken Sie unser vielfältiges Kursangebot!
        </p>

        <NuxtLink
          to="/courses"
          class="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Jetzt Kurs buchen!
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores
const bookingsStore = useBookingsStore()

// Reactive state
const currentTime = ref(new Date())

// Update time every second for countdown
let intervalId: NodeJS.Timeout | null = null

onMounted(() => {
  if (process.client) {
    intervalId = setInterval(() => {
      currentTime.value = new Date()
    }, 1000)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

// Computed
const nextCourse = computed(() => {
  const upcomingBookings = bookingsStore.upcomingBookings
  return upcomingBookings.length > 0 ? upcomingBookings[0].course : null
})

const countdown = computed(() => {
  if (!nextCourse.value?.date || !nextCourse.value?.startTime) {
    return { isValid: false, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const courseDateTime = new Date(`${nextCourse.value.date}T${nextCourse.value.startTime}`)
  const now = currentTime.value
  const timeDiff = courseDateTime.getTime() - now.getTime()

  if (timeDiff <= 0) {
    return { isValid: false, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

  return {
    isValid: true,
    days,
    hours,
    minutes,
    seconds
  }
})

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatTime = (timeString: string) => {
  const date = new Date(timeString)
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const addToCalendar = () => {
  if (!nextCourse.value) return

  const startDate = new Date(`${nextCourse.value.date}T${nextCourse.value.startTime}`)
  const endDate = new Date(`${nextCourse.value.date}T${nextCourse.value.endTime}`)

  const event = {
    title: nextCourse.value.title,
    start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    description: `Trainer: ${nextCourse.value.instructor}\\nOrt: ${nextCourse.value.location}`,
    location: nextCourse.value.location
  }

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`

  window.open(calendarUrl, '_blank')
}
</script>