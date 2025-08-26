<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Meine Kurse</h1>
              <p class="mt-1 text-sm text-gray-500">
                Ihre angemeldeten und abgeschlossenen Kurse
              </p>
            </div>
            <NuxtLink
              to="/courses"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Neue Kurse entdecken
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <!-- Tabs -->
      <div v-else class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'upcoming'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'upcoming'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Kommende Kurse
            </button>
            <button
              @click="activeTab = 'completed'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'completed'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Abgeschlossene Kurse
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="mt-8">
          <!-- Upcoming Courses Tab -->
          <div v-if="activeTab === 'upcoming'">
            <MyUpcomingCourses :courses="upcomingCourses" />
          </div>

          <!-- Completed Courses Tab -->
          <div v-if="activeTab === 'completed'">
            <MyCompletedCourses :courses="completedCourses" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
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

// Page meta
definePageMeta({
  title: 'Kurse'
})

// Stores
const coursesStore = useCoursesStore()

// Reactive state
const activeTab = ref('upcoming')

// Mock data - Replace with actual enrolled courses data
const enrolledCourses = ref<Course[]>([
  // Upcoming courses for weekly view
  {
    id: 1,
    title: 'Yoga für Anfänger',
    category: 'Yoga',
    date: '2025-08-26',
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    instructor: 'Maria Schmidt',
    location: 'Studio 1',
    description: 'Eine entspannende Yoga-Stunde für Einsteiger',
    price: 15,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'HIIT Training',
    category: 'Fitness',
    date: '2025-08-28',
    startTime: '18:00',
    endTime: '19:00',
    duration: 60,
    instructor: 'Tom Mueller',
    location: 'Studio 2',
    description: 'Intensives Intervalltraining',
    price: 20,
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Aqua Fitness',
    category: 'Wassersport',
    date: '2025-08-29',
    startTime: '16:00',
    endTime: '17:00',
    duration: 60,
    instructor: 'Lisa Weber',
    location: 'Schwimmbad',
    description: 'Gelenkschonender Wassersport',
    price: 22,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Spinning',
    category: 'Cardio',
    date: '2025-09-02',
    startTime: '19:00',
    endTime: '20:00',
    duration: 60,
    instructor: 'Mike Johnson',
    location: 'Studio 3',
    description: 'Intensive Cardio-Einheit auf dem Spinning-Bike',
    price: 18,
    status: 'upcoming'
  },
  // Completed courses for pagination demo
  {
    id: 10,
    title: 'Pilates',
    category: 'Pilates',
    date: '2025-08-15',
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
    instructor: 'Anna Weber',
    location: 'Studio 1',
    description: 'Körperkräftigung und Flexibilität',
    price: 18,
    status: 'completed'
  },
  {
    id: 11,
    title: 'CrossFit Basics',
    category: 'Fitness',
    date: '2025-08-10',
    startTime: '17:00',
    endTime: '18:30',
    duration: 90,
    instructor: 'Sarah Brown',
    location: 'Functional Area',
    description: 'Grundlagen des funktionellen Trainings',
    price: 25,
    status: 'completed'
  },
  {
    id: 12,
    title: 'Zumba',
    category: 'Tanz',
    date: '2025-08-05',
    startTime: '20:00',
    endTime: '21:00',
    duration: 60,
    instructor: 'Carmen Rodriguez',
    location: 'Studio 2',
    description: 'Latino-Tanz-Fitness',
    price: 16,
    status: 'completed'
  },
  {
    id: 13,
    title: 'Meditation & Achtsamkeit',
    category: 'Entspannung',
    date: '2025-07-30',
    startTime: '18:30',
    endTime: '19:30',
    duration: 60,
    instructor: 'Dr. Thomas Zen',
    location: 'Ruheraum',
    description: 'Stressabbau durch Meditation',
    price: 12,
    status: 'completed'
  },
  {
    id: 14,
    title: 'Boxing Fundamentals',
    category: 'Kampfsport',
    date: '2025-07-25',
    startTime: '19:00',
    endTime: '20:30',
    duration: 90,
    instructor: 'Rocky Balboa',
    location: 'Boxring',
    description: 'Grundlagen des Boxens',
    price: 30,
    status: 'completed'
  },
  {
    id: 15,
    title: 'Stretching & Mobility',
    category: 'Regeneration',
    date: '2025-07-20',
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    instructor: 'Flexible Finn',
    location: 'Studio 1',
    description: 'Beweglichkeit und Regeneration',
    price: 14,
    status: 'completed'
  },
  {
    id: 16,
    title: 'Krafttraining für Fortgeschrittene',
    category: 'Kraftsport',
    date: '2025-07-15',
    startTime: '16:00',
    endTime: '17:30',
    duration: 90,
    instructor: 'Strong Steve',
    location: 'Kraftraum',
    description: 'Fortgeschrittene Krafttrainingsprogramme',
    price: 28,
    status: 'completed'
  },
  {
    id: 17,
    title: 'Yoga Flow',
    category: 'Yoga',
    date: '2025-07-12',
    startTime: '08:00',
    endTime: '09:15',
    duration: 75,
    instructor: 'Zen Zara',
    location: 'Studio 1',
    description: 'Dynamische Yoga-Sequenzen',
    price: 20,
    status: 'completed'
  },
  {
    id: 18,
    title: 'Functional Training',
    category: 'Fitness',
    date: '2025-07-08',
    startTime: '18:00',
    endTime: '19:00',
    duration: 60,
    instructor: 'Functional Frank',
    location: 'Functional Area',
    description: 'Alltagsbezogenes Krafttraining',
    price: 22,
    status: 'completed'
  },
  {
    id: 19,
    title: 'Dance Cardio',
    category: 'Tanz',
    date: '2025-07-03',
    startTime: '19:30',
    endTime: '20:30',
    duration: 60,
    instructor: 'Dancing Diana',
    location: 'Studio 2',
    description: 'Cardio-Training mit Tanz-Elementen',
    price: 17,
    status: 'completed'
  },
  {
    id: 20,
    title: 'Kettlebell Workshop',
    category: 'Kraftsport',
    date: '2025-06-28',
    startTime: '15:00',
    endTime: '16:30',
    duration: 90,
    instructor: 'Kettle Kate',
    location: 'Kraftraum',
    description: 'Einführung in das Kettlebell-Training',
    price: 35,
    status: 'completed'
  },
  {
    id: 21,
    title: 'Schwimmen für Anfänger',
    category: 'Wassersport',
    date: '2025-06-22',
    startTime: '11:00',
    endTime: '12:00',
    duration: 60,
    instructor: 'Swimming Sam',
    location: 'Schwimmbad',
    description: 'Grundlagen des Schwimmens',
    price: 25,
    status: 'completed'
  }
])

// Computed
const upcomingCourses = computed(() => 
  enrolledCourses.value.filter(course => course.status === 'upcoming')
)

const completedCourses = computed(() => 
  enrolledCourses.value.filter(course => course.status === 'completed')
)

// Methods
const loadCourses = async () => {
  await coursesStore.fetchCourses()
}

// Lifecycle
onMounted(async () => {
  await loadCourses()
})

// Dynamic imports
const MyUpcomingCourses = defineAsyncComponent(() => import('~/components/user/MyUpcomingCourses.vue'))
const MyCompletedCourses = defineAsyncComponent(() => import('~/components/user/MyCompletedCourses.vue'))
</script>