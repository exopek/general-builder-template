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
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Keine Kurse verfügbar
      </h3>
      <p class="text-gray-600 mb-4">
        Es sind derzeit keine Kurse verfügbar.
      </p>
      <NuxtLink
        to="/courses"
        class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Kurse entdecken
      </NuxtLink>
    </div>

    <!-- Courses List -->
    <div v-else class="space-y-4">
      <div
        v-for="course in courses"
        :key="course.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <!-- Course Title and Category -->
              <div class="flex items-center mb-2">
                <h3 class="text-xl font-semibold text-gray-900 mr-3">
                  {{ course.title }}
                </h3>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ course.category }}
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
                <span>Verfügbare Plätze: {{ course.maxParticipants - (course.currentParticipants || 0) }}/{{ course.maxParticipants }}</span>
                <span class="font-medium text-gray-900">{{ formatPrice(course.price) }}€</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="ml-6 flex flex-col items-end space-y-3">
              <!-- Actions -->
              <div class="flex flex-col space-y-2">
                <!-- View Course Details -->
                <NuxtLink
                  :to="`/courses/${course.id}`"
                  class="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Details anzeigen
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/stores/courses'

interface Props {
  courses: Course[]
}

const props = defineProps<Props>()

// Methods
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatDayOfWeek = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'long'
  })
}

const formatPrice = (price?: number) => {
  if (!price) return '0.00'
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}
</script>