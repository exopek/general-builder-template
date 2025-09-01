<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Kurs-Verwaltung</h1>
              <p class="mt-1 text-sm text-gray-500">
                Erstellen und verwalten Sie alle Kurse
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <NuxtLink
                to="/admin"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                title="Zurück zum Dashboard"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </NuxtLink>
              <button
                @click="showCreateModal = true"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Neuen Kurs erstellen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CourseManager @create-course="handleCreateCourse" @edit-course="handleEditCourse" />
    </div>

    <!-- Course Form Modal -->
    <CourseForm
      v-if="showCreateModal || showEditModal"
      :course="selectedCourse"
      :is-editing="showEditModal"
      @close="closeModals"
      @success="handleFormSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/stores/courses'

// Page meta
definePageMeta({
  middleware: 'admin',
  title: 'Kurs-Verwaltung'
})

// State
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedCourse = ref<Course | null>(null)

// Methods
const handleCreateCourse = () => {
  selectedCourse.value = null
  showCreateModal.value = true
}

const handleEditCourse = (course: Course) => {
  selectedCourse.value = course
  showEditModal.value = true
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedCourse.value = null
}

const handleFormSuccess = () => {
  closeModals()
  // CourseManager will automatically refresh via reactivity
}

// Dynamic imports
const CourseManager = defineAsyncComponent(() => import('~/components/admin/CourseManager.vue'))
const CourseForm = defineAsyncComponent(() => import('~/components/admin/CourseForm.vue'))
</script>