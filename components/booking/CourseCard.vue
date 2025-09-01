<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <!-- Course Image -->
    <div class="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
      <img
        v-if="course.image"
        :src="course.image"
        :alt="course.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-20" />
      
      <!-- Level Badge -->
      <!-- <div class="absolute top-4 left-4">
        <span 
          class="px-3 py-1 rounded-full text-xs font-semibold text-white"
          :class="levelColors[course.level]"
        >
          {{ levelLabels[course.level] }}
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

    <!-- Course Content -->
    <div class="p-6">
      <!-- Title and Category -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-bold text-gray-900 line-clamp-1">
            {{ course.title }}
          </h3>
          <span class="text-sm text-gray-500">{{ course.category }}</span>
        </div>
        <p class="text-gray-600 text-sm line-clamp-2 mb-3">
          {{ course.description }}
        </p>
      </div>

      <!-- Course Details -->
      <div class="space-y-2 mb-4 text-sm text-gray-600 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:space-y-0">
        <!-- Date & Time -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ getCourseFullDateTime(course) }}
        </div>
        
        <!-- Instructor -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {{ course.instructor }}
        </div>
        
        <!-- Location -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ course.location }}
        </div>
        
        <!-- Duration -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ course.duration }} Minuten
        </div>

        <!-- Participants -->
        <!-- <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          {{ course.currentParticipants }} / {{ course.maxParticipants }} Teilnehmer
        </div> -->
      </div>

      <!-- Equipment (if any) -->
      <div v-if="course.equipment && course.equipment.length > 0" class="mb-4">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">Ausrüstung:</h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="item in course.equipment" 
            :key="item"
            class="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <!-- Membership Info and Action -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center text-green-600">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-semibold">Im Abo enthalten</span>
        </div>
        
        <!-- Action Button -->
        <div class="flex flex-col sm:flex-row gap-2">
          <!-- Details Button -->
          <button
            @click="$emit('view-details', course.id)"
            class="px-4 py-2 text-sm font-medium text-white-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors sm:flex-1"
          >
            Buchen
          </button>
          
          <!-- Book Button -->
          <!-- <button
            v-if="showBookingButton"
            @click="handleBooking"
            :disabled="!canBook || isBooking"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:flex-1"
            :class="bookingButtonClass"
          >
            <div class="flex items-center justify-center">
              <LoadingSpinner 
                v-if="isBooking" 
                size="sm" 
                color="white"
                class="mr-2"
              />
              {{ bookingButtonText }}
            </div>
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/stores/courses'

interface Props {
  course: Course
  showBookingButton?: boolean
}

interface Emits {
  (e: 'book-course', courseId: string): void
  (e: 'view-details', courseId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  showBookingButton: true
})

const emit = defineEmits<Emits>()

const { isAuthenticated } = useAuth()
const authStore = useAuthStore()
const bookingsStore = useBookingsStore()

const isBooking = ref(false)

// Level styling
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
const isAvailable = computed(() => {
  return props.course.currentParticipants < props.course.maxParticipants
})

const isAlreadyBooked = computed(() => {
  return bookingsStore.hasBookingForCourse(props.course.id)
})

const canBook = computed(() => {
  return isAuthenticated.value && 
         authStore.hasActiveMembership &&
         isAvailable.value && 
         !isAlreadyBooked.value &&
         props.course.isActive
})

const availabilityBadgeClass = computed(() => {
  if (!isAvailable.value) {
    return 'bg-red-100 text-red-800'
  }
  if (props.course.currentParticipants / props.course.maxParticipants > 0.8) {
    return 'bg-yellow-100 text-yellow-800'
  }
  return 'bg-green-100 text-green-800'
})

const availabilityText = computed(() => {
  if (!isAvailable.value) {
    return 'Ausgebucht'
  }
  const remaining = props.course.maxParticipants - props.course.currentParticipants
  if (remaining === 1) {
    return '1 Platz frei'
  }
  if (remaining <= 3) {
    return `${remaining} Plätze frei`
  }
  return 'Verfügbar'
})

const bookingButtonClass = computed(() => {
  if (isAlreadyBooked.value) {
    return 'bg-gray-400 text-white cursor-not-allowed'
  }
  if (!canBook.value) {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }
  return 'bg-indigo-600 text-white hover:bg-indigo-700'
})

const bookingButtonText = computed(() => {
  if (isBooking.value) {
    return 'Buchung...'
  }
  if (isAlreadyBooked.value) {
    return 'Bereits gebucht'
  }
  if (!isAuthenticated.value) {
    return 'Anmelden zum Buchen'
  }
  if (isAuthenticated.value && !authStore.hasActiveMembership) {
    return 'Mitgliedschaft erforderlich'
  }
  if (!isAvailable.value) {
    return 'Ausgebucht'
  }
  if (!props.course.isActive) {
    return 'Nicht verfügbar'
  }
  return 'Buchen'
})

// Formatters
const { formatDate, formatTime, formatCourseLevel, formatCourseCategory, formatCourseAvailability, getCourseFullDateTime } = useFormatters()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const handleBooking = async () => {
  if (!canBook.value) return
  
  if (!isAuthenticated.value) {
    await navigateTo('/auth/login')
    return
  }
  
  isBooking.value = true
  try {
    emit('book-course', props.course.id)
  } finally {
    // Reset will be handled by parent component
    setTimeout(() => {
      isBooking.value = false
    }, 1000)
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>