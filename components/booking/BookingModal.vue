<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="handleClose"
    ></div>

    <!-- Modal -->
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div 
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              Kurs buchen
            </h3>
            <button
              @click="handleClose"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Course Info -->
          <div v-if="course" class="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">{{ course.title }}</h4>
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(course.date) }} • {{ course.startTime }} - {{ course.endTime }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ course.instructor }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ course.location }}
              </div>
              <div class="pt-2 border-t border-gray-200 text-center">
                <span class="text-sm text-green-600 font-semibold">✓ Im Mitgliedsabonnement enthalten</span>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading && !course" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
            <p class="text-gray-600">Kursdaten werden geladen...</p>
          </div>

          <!-- Error State -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-center text-red-600">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium">{{ error }}</span>
            </div>
          </div>

          <!-- Validation Errors -->
          <div v-if="validationErrors.length > 0" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="text-yellow-600">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium">Buchung nicht möglich:</span>
              <ul class="list-disc list-inside mt-2">
                <li v-for="error in validationErrors" :key="error">{{ error }}</li>
              </ul>
            </div>
          </div>

          <!-- Booking Form -->
          <form v-if="course && validationErrors.length === 0" @submit.prevent="handleBooking" class="space-y-4">
            <!-- Notes -->
            <div>
              <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                Anmerkungen (optional)
              </label>
              <textarea
                id="notes"
                v-model="form.notes"
                rows="3"
                placeholder="Besondere Wünsche, Einschränkungen oder Anmerkungen..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                :disabled="isBooking"
              ></textarea>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="form.acceptTerms"
                  type="checkbox"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  :disabled="isBooking"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-gray-700">
                  Ich akzeptiere die 
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">Allgemeinen Geschäftsbedingungen</a>
                  und die 
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">Stornierungsbedingungen</a>
                </label>
                <p class="text-gray-500 mt-1">
                  Stornierung bis 4 Stunden vor Kursbeginn möglich • Kostenfrei für Mitglieder
                </p>
              </div>
            </div>
          </form>

          <!-- Course Full Message -->
          <div v-if="course && !isAvailable" class="text-center py-4">
            <svg class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Kurs ist ausgebucht</h3>
            <p class="text-gray-600">Leider sind alle Plätze für diesen Kurs bereits belegt.</p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div v-if="course && isAvailable && validationErrors.length === 0" class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            @click="handleBooking"
            :disabled="!canBook || isBooking"
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg 
              v-if="isBooking" 
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ isBooking ? 'Buchung läuft...' : 'Jetzt buchen' }}
          </button>
          <button
            type="button"
            @click="handleClose"
            :disabled="isBooking"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:opacity-50"
          >
            Abbrechen
          </button>
        </div>

        <!-- Close Button for other states -->
        <div v-else class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            @click="handleClose"
            class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:w-auto"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/stores/courses'

interface Props {
  courseId: string
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Stores
const coursesStore = useCoursesStore()
const bookingsStore = useBookingsStore()

// State
const isLoading = ref(false)
const isBooking = ref(false)
const error = ref<string | null>(null)
const form = reactive({
  notes: '',
  acceptTerms: false
})

// Get course data
const course = computed(() => {
  return coursesStore.courses.find(c => c.id === props.courseId) || 
         (coursesStore.currentCourse?.id === props.courseId ? coursesStore.currentCourse : null)
})

// Computed
const isAvailable = computed(() => {
  return course.value ? course.value.currentParticipants < course.value.maxParticipants : false
})

const validationErrors = computed(() => {
  if (!course.value) return []
  
  const validation = bookingsStore.validateBooking(props.courseId)
  return validation.errors
})

const canBook = computed(() => {
  return course.value && 
         isAvailable.value && 
         form.acceptTerms && 
         validationErrors.value.length === 0 && 
         !isBooking.value
})

// Methods
const loadCourse = async () => {
  if (course.value) return
  
  isLoading.value = true
  error.value = null
  
  try {
    const result = await coursesStore.fetchCourse(props.courseId)
    if (!result.success) {
      error.value = result.error || 'Kurs konnte nicht geladen werden'
    }
  } catch (err: any) {
    error.value = err.message || 'Unerwarteter Fehler beim Laden des Kurses'
  } finally {
    isLoading.value = false
  }
}

const handleBooking = async () => {
  if (!canBook.value) return
  
  isBooking.value = true
  error.value = null
  
  try {
    const result = await bookingsStore.createBooking({
      courseId: props.courseId,
      notes: form.notes.trim() || undefined
    })
    
    if (result.success) {
      emit('success')
    } else {
      error.value = result.error || 'Buchung fehlgeschlagen'
    }
  } catch (err: any) {
    error.value = err.message || 'Unerwarteter Fehler bei der Buchung'
  } finally {
    isBooking.value = false
  }
}

const handleClose = () => {
  if (!isBooking.value) {
    emit('close')
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

// Handle Escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleClose()
  }
}

// Lifecycle
onMounted(async () => {
  document.addEventListener('keydown', handleEscape)
  await loadCourse()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Focus trap for accessibility
const focusFirst = () => {
  nextTick(() => {
    const firstFocusable = document.querySelector('[autofocus]') as HTMLElement
    if (firstFocusable) {
      firstFocusable.focus()
    }
  })
}

onMounted(() => {
  focusFirst()
})
</script>

<style scoped>
/* Custom scrollbar for modal */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}
</style>