<template>
  <div>
    

    <!-- Loading State -->
    <div v-if="coursesStore.isLoading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
      <p class="text-gray-600">Kurse werden geladen...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="coursesStore.error" class="text-center py-12">
      <div class="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
        <div class="text-red-600">
          <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="font-medium">Fehler beim Laden der Kurse</p>
          <p class="text-sm mt-1">{{ coursesStore.error }}</p>
        </div>
      </div>
    </div>

    <!-- Courses Table -->
    <div v-else-if="filteredCourses.length > 0" class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kurs
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum & Zeit
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teilnehmer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
               
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="course in paginatedCourses"
              :key="course.id"
              class="hover:bg-neutral-200"
            >
              <!-- Course Info -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ course.title }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ course.instructor }} • {{ course.category }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Date & Time -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(course.date) }}</div>
                <div class="text-sm text-gray-500">{{ course.startTime }} - {{ course.endTime }}</div>
              </td>

              <!-- Participants -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ course.currentParticipants }}/{{ course.maxParticipants }}
                    </div>
                    <div class="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        class="h-1.5 rounded-full"
                        :class="getOccupancyColor(course.currentParticipants / course.maxParticipants)"
                        :style="{ width: `${Math.min((course.currentParticipants / course.maxParticipants) * 100, 100)}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="course.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ course.isActive ? 'Aktiv' : 'Inaktiv' }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="viewParticipants(course.id)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Teilnehmer anzeigen"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </button>
                  <button
                    @click="$emit('edit-course', course)"
                    class="text-gray-600 hover:text-gray-900"
                    title="Bearbeiten"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                 
                  <button
                    @click="deleteCourse(course)"
                    class="text-red-600 hover:text-red-900"
                    title="Löschen"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredCourses.length > itemsPerPage" class="bg-white px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Zeige {{ (currentPage - 1) * itemsPerPage + 1 }} bis {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }} von {{ filteredCourses.length }} Kursen
          </div>
          <div class="flex space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Zurück
            </button>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Keine Kurse gefunden</h3>
      <p class="text-gray-600 mb-4">
        {{ searchTerm || selectedCategory || selectedStatus || selectedDate 
          ? 'Mit den aktuellen Filtern wurden keine Kurse gefunden.' 
          : 'Noch keine Kurse erstellt.' 
        }}
      </p>
      <button
        @click="$emit('create-course')"
        class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Ersten Kurs erstellen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/stores/courses'

interface Emits {
  (e: 'create-course'): void
  (e: 'edit-course', course: Course): void
}

const emit = defineEmits<Emits>()

// Stores
const coursesStore = useCoursesStore()

// State
const searchTerm = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedDate = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Computed
const courses = computed(() => coursesStore.courses)

const availableCategories = computed(() => {
  const categories = new Set(courses.value.map(course => course.category))
  return Array.from(categories).sort()
})

const filteredCourses = computed(() => {
  let filtered = courses.value

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(search) ||
      course.instructor.toLowerCase().includes(search) ||
      course.description.toLowerCase().includes(search)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(course => course.category === selectedCategory.value)
  }

  if (selectedStatus.value) {
    const isActive = selectedStatus.value === 'active'
    filtered = filtered.filter(course => course.isActive === isActive)
  }

  if (selectedDate.value) {
    filtered = filtered.filter(course => course.date === selectedDate.value)
  }

  return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage))

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCourses.value.slice(start, end)
})

// Methods
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

const getOccupancyColor = (ratio: number) => {
  if (ratio >= 1) return 'bg-red-500'
  if (ratio >= 0.8) return 'bg-yellow-500'
  return 'bg-green-500'
}

const clearFilters = () => {
  searchTerm.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
  selectedDate.value = ''
  currentPage.value = 1
}

const viewParticipants = (courseId: string) => {
  navigateTo(`/admin/participants?course=${courseId}`)
}

const toggleCourseStatus = async (course: Course) => {
  const action = course.isActive ? 'deaktivieren' : 'aktivieren'
  if (confirm(`Möchten Sie den Kurs "${course.title}" wirklich ${action}?`)) {
    const result = await coursesStore.updateCourse(course.id, { 
      isActive: !course.isActive 
    })
    if (!result.success) {
      alert(result.error || `Fehler beim ${action} des Kurses`)
    }
  }
}

const deleteCourse = async (course: Course) => {
  if (course.currentParticipants > 0) {
    alert('Kurse mit Teilnehmern können nicht gelöscht werden. Bitte stornieren Sie zuerst alle Buchungen.')
    return
  }

  if (confirm(`Möchten Sie den Kurs "${course.title}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`)) {
    const result = await coursesStore.deleteCourse(course.id)
    if (!result.success) {
      alert(result.error || 'Fehler beim Löschen des Kurses')
    }
  }
}

// Reset pagination when filters change
watch([searchTerm, selectedCategory, selectedStatus, selectedDate], () => {
  currentPage.value = 1
})

// Load courses on mount
onMounted(async () => {
  await coursesStore.fetchCourses()
})
</script>