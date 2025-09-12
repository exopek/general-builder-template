<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Kurs-Verwaltung</h1>
        <p class="mt-1 text-sm text-gray-500">
          Erstellen und verwalten Sie alle Kurse
        </p>
      </div>
      <button
        @click="showCreateModal = true"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Neuen Kurs erstellen
      </button>
    </div>

    <!-- Main Content -->
    <CourseManager @create-course="handleCreateCourse" @edit-course="handleEditCourse" />

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
  layout: 'admin',
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