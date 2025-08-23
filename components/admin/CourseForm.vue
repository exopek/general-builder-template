<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- Modal -->
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div 
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ isEditing ? 'Kurs bearbeiten' : 'Neuen Kurs erstellen' }}
            </h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Title -->
              <div class="sm:col-span-2">
                <label for="title" class="block text-sm font-medium text-gray-700">
                  Kursname *
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Description -->
              <div class="sm:col-span-2">
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Beschreibung *
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="3"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                ></textarea>
              </div>

              <!-- Instructor -->
              <div>
                <label for="instructor" class="block text-sm font-medium text-gray-700">
                  Trainer *
                </label>
                <input
                  id="instructor"
                  v-model="form.instructor"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700">
                  Kategorie *
                </label>
                <input
                  id="category"
                  v-model="form.category"
                  type="text"
                  required
                  list="categories"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
                <datalist id="categories">
                  <option>Yoga</option>
                  <option>Fitness</option>
                  <option>Krafttraining</option>
                  <option>Cardio</option>
                  <option>Pilates</option>
                  <option>Zumba</option>
                </datalist>
              </div>

              <!-- Date -->
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700">
                  Datum *
                </label>
                <input
                  id="date"
                  v-model="form.date"
                  type="date"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Level -->
              <div>
                <label for="level" class="block text-sm font-medium text-gray-700">
                  Level *
                </label>
                <select
                  id="level"
                  v-model="form.level"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                >
                  <option value="beginner">Anfänger</option>
                  <option value="intermediate">Fortgeschritten</option>
                  <option value="advanced">Experte</option>
                </select>
              </div>

              <!-- Start Time -->
              <div>
                <label for="startTime" class="block text-sm font-medium text-gray-700">
                  Startzeit *
                </label>
                <input
                  id="startTime"
                  v-model="form.startTime"
                  type="time"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- End Time -->
              <div>
                <label for="endTime" class="block text-sm font-medium text-gray-700">
                  Endzeit *
                </label>
                <input
                  id="endTime"
                  v-model="form.endTime"
                  type="time"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Max Participants -->
              <div>
                <label for="maxParticipants" class="block text-sm font-medium text-gray-700">
                  Max. Teilnehmer *
                </label>
                <input
                  id="maxParticipants"
                  v-model.number="form.maxParticipants"
                  type="number"
                  required
                  min="1"
                  max="50"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Price -->
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700">
                  Preis (€) *
                </label>
                <input
                  id="price"
                  v-model.number="form.price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Location -->
              <div class="sm:col-span-2">
                <label for="location" class="block text-sm font-medium text-gray-700">
                  Ort *
                </label>
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Equipment -->
              <div class="sm:col-span-2">
                <label for="equipment" class="block text-sm font-medium text-gray-700">
                  Benötigte Ausrüstung (optional)
                </label>
                <input
                  id="equipment"
                  v-model="equipmentString"
                  type="text"
                  placeholder="z.B. Matte, Handtuch, Wasserflasche (durch Komma getrennt)"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>

              <!-- Image URL -->
              <div class="sm:col-span-2">
                <label for="image" class="block text-sm font-medium text-gray-700">
                  Bild-URL (optional)
                </label>
                <input
                  id="image"
                  v-model="form.image"
                  type="url"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-md">
              <div class="text-red-600 text-sm">
                {{ error }}
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            @click="handleSubmit"
            :disabled="!isFormValid || isLoading"
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg 
              v-if="isLoading" 
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ isLoading ? 'Speichern...' : (isEditing ? 'Änderungen speichern' : 'Kurs erstellen') }}
          </button>
          <button
            @click="$emit('close')"
            :disabled="isLoading"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:opacity-50"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course, CreateCourseData } from '~/stores/courses'

interface Props {
  course?: Course | null
  isEditing?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = withDefaults(defineProps<Props>(), {
  course: null,
  isEditing: false
})

const emit = defineEmits<Emits>()

// Stores
const coursesStore = useCoursesStore()

// State
const isLoading = ref(false)
const error = ref<string | null>(null)

const form = reactive<CreateCourseData>({
  title: '',
  description: '',
  instructor: '',
  date: '',
  startTime: '',
  endTime: '',
  maxParticipants: 10,
  price: 0,
  category: '',
  level: 'beginner',
  location: '',
  equipment: [],
  image: ''
})

const equipmentString = ref('')

// Computed
const isFormValid = computed(() => {
  return form.title &&
         form.description &&
         form.instructor &&
         form.date &&
         form.startTime &&
         form.endTime &&
         form.maxParticipants > 0 &&
         form.price >= 0 &&
         form.category &&
         form.level &&
         form.location
})

// Methods
const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  error.value = null
  
  try {
    // Parse equipment string
    form.equipment = equipmentString.value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
    
    let result
    if (props.isEditing && props.course) {
      result = await coursesStore.updateCourse(props.course.id, form)
    } else {
      result = await coursesStore.createCourse(form)
    }
    
    if (result.success) {
      emit('success')
    } else {
      error.value = result.error || 'Fehler beim Speichern des Kurses'
    }
  } catch (err: any) {
    error.value = err.message || 'Unerwarteter Fehler'
  } finally {
    isLoading.value = false
  }
}

// Initialize form with course data if editing
watch(() => props.course, (course) => {
  if (course) {
    form.title = course.title
    form.description = course.description
    form.instructor = course.instructor
    form.date = course.date
    form.startTime = course.startTime
    form.endTime = course.endTime
    form.maxParticipants = course.maxParticipants
    form.price = course.price
    form.category = course.category
    form.level = course.level
    form.location = course.location
    form.image = course.image || ''
    equipmentString.value = course.equipment?.join(', ') || ''
  }
}, { immediate: true })

// Set default date to tomorrow
onMounted(() => {
  if (!props.isEditing) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    form.date = tomorrow.toISOString().split('T')[0]
  }
})
</script>