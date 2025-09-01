<template>
  <div class="min-h-screen bg-gray-50 pt-24">
    <!-- Loading State -->
    <div v-if="coursesStore.isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4" style="border-color: rgb(252, 85, 32);"></div>
        <p class="text-gray-600">Kurs wird geladen...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="coursesStore.error || !course" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <svg class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="text-xl font-semibold text-red-800 mb-2">Kurs nicht gefunden</h1>
          <p class="text-red-600 mb-4">
            {{ coursesStore.error || 'Der angeforderte Kurs konnte nicht gefunden werden.' }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              @click="loadCourse"
              class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Erneut versuchen
            </button>
            <NuxtLink
              to="/courses"
              class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-center"
            >
              Zu allen Kursen
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Details -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <div class="mb-6">
        <NuxtLink
          to="/courses"
          class="inline-flex items-center" style="color: rgb(252, 85, 32);"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zu allen Kursen
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Course Header -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <!-- Course Image -->
            <div class="relative h-64 sm:h-80" style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);">
              <img
                v-if="course.image"
                :src="course.image"
                :alt="course.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-20" />
              
              <!-- Level and Category Badges -->
              <!-- <div class="absolute top-4 left-4 flex gap-2">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  :class="levelColors[course.level]"
                >
                  {{ levelLabels[course.level] }}
                </span>
                <span class="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-xs font-semibold">
                  {{ course.category }}
                </span>
              </div> -->
              
              <!-- Availability Badge -->
              <div class="absolute top-4 right-4">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="availabilityBadgeClass"
                >
                  {{ availabilityText }}
                </span>
              </div>
            </div>

            <!-- Course Info -->
            <div class="p-6">
              <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ course.title }}</h1>
              <p class="text-lg text-gray-600 mb-6">{{ course.description }}</p>
              
              <!-- Key Details Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-500">Datum</div>
                    <div class="font-medium">{{ formatDate(course.date) }}</div>
                  </div>
                </div>

                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-500">Zeit</div>
                    <div class="font-medium">{{ formatTime(course.startTime) }}</div>
                  </div>
                </div>

                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-500">Trainer</div>
                    <div class="font-medium">{{ course.instructor }}</div>
                  </div>
                </div>

                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-500">Ort</div>
                    <div class="font-medium">{{ course.location }}</div>
                  </div>
                </div>

                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-500">Dauer</div>
                    <div class="font-medium">{{ course.duration }} Minuten</div>
                  </div>
                </div>

                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-500">Teilnehmer</div>
                    <div class="font-medium">{{ course.currentParticipants }} / {{ course.maxParticipants }}</div>
                  </div>
                </div>
              </div>

              <!-- Equipment Section -->
              <div v-if="course.equipment && course.equipment.length > 0" class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Benötigte Ausrüstung</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="item in course.equipment" 
                    :key="item"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style="background-color: rgba(252, 85, 32, 0.1); color: rgb(252, 85, 32);"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>

              <!-- Participant Progress Bar -->
              <div class="mb-6">
                <div class="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Auslastung</span>
                  <span>{{ Math.round((course.currentParticipants / course.maxParticipants) * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-300"
                    :class="progressBarColor"
                    :style="{ width: `${Math.min((course.currentParticipants / course.maxParticipants) * 100, 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-8">
           
            <!-- Booking Status -->
            <div class="mb-6">
              <div 
                class="text-center py-3 px-4 rounded-lg text-sm font-medium"
                :class="statusCardClass"
              >
                {{ statusText }}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button
                v-if="showBookingButton"
                @click="handleBooking"
                :disabled="!canBook || isBooking"
                class="w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="bookingButtonClass"
                :style="canBook ? 'background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);' : ''"
              >
                <svg 
                  v-if="isBooking" 
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                {{ bookingButtonText }}
              </button>

              <!-- Cancel Booking Button -->
              <button
                v-if="isAlreadyBooked"
                @click="handleCancelBooking"
                :disabled="isCanceling"
                class="w-full py-3 px-4 rounded-lg font-medium transition-colors bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  v-if="isCanceling" 
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                {{ isCanceling ? 'Stornierung läuft...' : 'Buchung stornieren' }}
              </button>

              <NuxtLink
                to="/courses"
                class="w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center block"
              >
                Weitere Kurse ansehen
              </NuxtLink>
            </div>

            <!-- Course Stats -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <h4 class="font-medium text-gray-900 mb-3">Kurs-Details</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Level:</span>
                  <span class="font-medium text-gray-500">{{ levelLabels[course.level] }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Kategorie:</span>
                  <span class="font-medium text-gray-500">{{ course.category }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Verfügbare Plätze:</span>
                  <span class="font-medium text-gray-500">{{ availableCourseSlots }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BookingModal -->
    <BookingModal
      v-if="showBookingModal"
      :course-id="courseId"
      :course-settings-id="courseSettingsId"
      @close="closeBookingModal"
      @success="handleBookingSuccess"
    />
  </div>
</template>

<script setup lang="ts">
// Page params
const route = useRoute()
const courseId = route.params.id as string
const courseSettingsId = route.query.courseSettingsId as string | undefined

// Stores and composables
const coursesStore = useCoursesStore()
const bookingsStore = useBookingsStore()
const { isAuthenticated } = useAuth()

// State
const showBookingModal = ref(false)
const isBooking = ref(false)
const isCanceling = ref(false)

// Get course data
const course = computed(() => coursesStore.currentCourse)

// Level configuration
const levelColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500', 
  advanced: 'bg-red-500'
}

const levelLabels = {
  beginner: 'Anfänger',
  intermediate: 'Fortgeschritten',
  advanced: 'Experte'
}

// Computed properties
const availableCourseSlots = computed(() => {
  return course.value ? course.value.maxParticipants - course.value.currentParticipants : 0
})

const isAvailable = computed(() => {
  return course.value ? course.value.currentParticipants < course.value.maxParticipants : false
})

const isAlreadyBooked = computed(() => {
  console.log('Checking if already booked for courseId:', course.value?.bookable)
  return course.value ? !course.value.bookable : true
})

const userBookingForCourse = computed(() => {
  return bookingsStore.bookings.find(booking => 
    booking.courseId === courseId && 
    booking.userId === useAuthStore().user?.id
  )
})

const canCancelBooking = computed(() => {
  if (!userBookingForCourse.value) return false
  return bookingsStore.canCancelBooking(userBookingForCourse.value).canCancel
})

const canBook = computed(() => {
  return isAuthenticated.value && 
         isAvailable.value && 
         !isAlreadyBooked.value &&
         course.value?.isActive
})

const showBookingButton = computed(() => {
  return course.value?.isActive && isAuthenticated.value
})

const availabilityBadgeClass = computed(() => {
  if (!isAvailable.value) {
    return 'bg-red-100 text-red-800'
  }
  if (course.value && course.value.currentParticipants / course.value.maxParticipants > 0.8) {
    return 'bg-yellow-100 text-yellow-800'
  }
  return 'bg-green-100 text-green-800'
})

const availabilityText = computed(() => {
  if (!course.value) return ''
  
  if (!isAvailable.value) {
    return 'Ausgebucht'
  }
  const remaining = course.value.maxParticipants - course.value.currentParticipants
  if (remaining === 1) {
    return '1 Platz frei'
  }
  if (remaining <= 3) {
    return `${remaining} Plätze frei`
  }
  return 'Verfügbar'
})

const statusCardClass = computed(() => {
  if (isAlreadyBooked.value) {
    return 'bg-blue-100 text-blue-800'
  }
  if (!isAvailable.value) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-green-100 text-green-800'
})

const statusText = computed(() => {
  if (isAlreadyBooked.value) {
    return 'Sie sind bereits für diesen Kurs angemeldet'
  }
  if (!isAvailable.value) {
    return 'Dieser Kurs ist ausgebucht'
  }
  return 'Dieser Kurs ist verfügbar'
})

const bookingButtonClass = computed(() => {
  if (isAlreadyBooked.value) {
    return 'bg-gray-400 text-white cursor-not-allowed'
  }
  if (!canBook.value) {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }
  return 'text-white transition-colors'
})

const bookingButtonText = computed(() => {
  if (isBooking.value) {
    return 'Buchung läuft...'
  }
  if (isAlreadyBooked.value) {
    return 'Bereits gebucht'
  }
  if (!isAuthenticated.value) {
    return 'Anmelden zum Buchen'
  }
  if (!isAvailable.value) {
    return 'Ausgebucht'
  }
  if (!course.value?.isActive) {
    return 'Nicht verfügbar'
  }
  return 'Jetzt buchen'
})

const progressBarColor = computed(() => {
  if (!course.value) return 'bg-gray-300'
  
  const percentage = (course.value.currentParticipants / course.value.maxParticipants) * 100
  if (percentage >= 90) return 'bg-red-500'
  if (percentage >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
})

// Methods
const loadCourse = async () => {
  await coursesStore.fetchCourse(courseId, courseSettingsId || '')
  if (isAuthenticated.value) {
    await bookingsStore.fetchBookings()
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  console.log(`formatting time for dateString: ${dateString}`)
  return new Date(dateString).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleBooking = async () => {
  if (!canBook.value) return
  
  if (!isAuthenticated.value) {
    await navigateTo(`/auth/login?redirect=${encodeURIComponent(route.fullPath)}`)
    return
  }
  
  showBookingModal.value = true
}

const closeBookingModal = () => {
  showBookingModal.value = false
}

const handleBookingSuccess = () => {
  closeBookingModal()
  // Refresh course data
  loadCourse()
}

const handleCancelBooking = async () => {
  console.log('Attempting to cancel booking for courseId:', userBookingForCourse.value)
  if (!userBookingForCourse.value) return
  
  isCanceling.value = true
  
  try {
    console.log('Attempting to cancel booking with ID:', userBookingForCourse.value.id)
    const result = await bookingsStore.cancelBooking(userBookingForCourse.value.id)
    
    if (result.success) {
      // Refresh bookings and course data
      await loadCourse()
    } else {
      console.error('Cancel booking failed:', result.error)
      // You might want to show an error toast here
    }
  } catch (error) {
    console.error('Cancel booking error:', error)
  } finally {
    isCanceling.value = false
  }
}

// Meta and SEO
useHead(() => ({
  title: course.value ? `${course.value.title} - Kurs Details` : 'Kurs Details',
  meta: [
    {
      name: 'description',
      content: course.value?.description || 'Kurs Details'
    }
  ]
}))

// Load course on mount
onMounted(async () => {
  await loadCourse()
})

// Dynamic import
const BookingModal = defineAsyncComponent(() => import('~/components/booking/BookingModal.vue'))
</script>