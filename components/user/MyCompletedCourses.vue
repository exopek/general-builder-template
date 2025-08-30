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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Keine abgeschlossenen Kurse
      </h3>
      <p class="text-gray-600 mb-4">
        Sie haben noch keine Kurse abgeschlossen.
      </p>
    </div>

    <!-- Completed Courses List -->
    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">
          Abgeschlossene Kurse ({{ totalCourses }})
        </h2>
        <div class="text-sm text-gray-600">
          Zeige {{ startIndex + 1 }}-{{ Math.min(startIndex + coursesPerPage, totalCourses) }} von {{ totalCourses }}
        </div>
      </div>

      <div class="space-y-4 mb-8">
        <div
          v-for="course in paginatedCourses"
          :key="course.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <!-- Course Title and Category -->
                <div class="flex items-center mb-2">
                  <h3 class="text-xl font-semibold text-gray-900 mr-3">
                    {{ course.title }}
                  </h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ course.category }}
                  </span>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2">
                    Abgeschlossen
                  </span>
                </div>

                <!-- Course Details -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <!-- Date -->
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div class="font-medium">{{ formatDate(course.date) }}</div>
                      <div class="text-xs text-gray-500">{{ formatDayOfWeek(course.date) }}</div>
                    </div>
                  </div>

                  <!-- Time -->
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div class="font-medium">{{ course.startTime }} - {{ course.endTime }}</div>
                      <div class="text-xs text-gray-500">{{ course.duration }} Min.</div>
                    </div>
                  </div>

                  <!-- Instructor -->
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <div class="font-medium">{{ course.instructor }}</div>
                      <div class="text-xs text-gray-500">Trainer</div>
                    </div>
                  </div>

                  <!-- Location -->
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div class="font-medium">{{ course.location }}</div>
                      <div class="text-xs text-gray-500">Standort</div>
                    </div>
                  </div>
                </div>

                <!-- Course Description -->
                <div v-if="course.description" class="mb-4 p-3 bg-gray-50 rounded-md">
                  <p class="text-sm text-gray-600">{{ course.description }}</p>
                </div>

                <!-- Course Info -->
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span class="text-green-600 font-medium">✓ Teilgenommen</span>
                  
                </div>
              </div>

              <!-- Actions -->
              <div class="ml-6 flex flex-col items-end space-y-3">
                <div class="flex flex-col space-y-2">
                  <!-- Rate Course -->
                  <button
                    @click="rateCourse(course)"
                    class="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Bewerten
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-lg">
        <div class="flex items-center">
          <p class="text-sm text-gray-700">
            Zeige
            <span class="font-medium">{{ startIndex + 1 }}</span>
            bis
            <span class="font-medium">{{ Math.min(startIndex + coursesPerPage, totalCourses) }}</span>
            von
            <span class="font-medium">{{ totalCourses }}</span>
            Ergebnissen
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <div class="flex items-center space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md',
                page === currentPage
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
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

const props = defineProps<Props>()

// Reactive state
const currentPage = ref(1)
const coursesPerPage = 10

// Computed
const sortedCourses = computed(() => {
  return [...props.courses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})

const totalCourses = computed(() => sortedCourses.value.length)
const totalPages = computed(() => Math.ceil(totalCourses.value / coursesPerPage))
const startIndex = computed(() => (currentPage.value - 1) * coursesPerPage)

const paginatedCourses = computed(() => {
  return sortedCourses.value.slice(
    startIndex.value,
    startIndex.value + coursesPerPage
  )
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatDayOfWeek = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'long'
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const rateCourse = (course: Course) => {
  // Implement course rating functionality
  console.log('Rate course:', course.title)
}
</script>