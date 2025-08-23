<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
        
        <!-- Modal Container -->
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="transform opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="transform opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="show"
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              @click.stop
            >
              <!-- Modal Content -->
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <!-- Icon -->
                  <div 
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                    :class="iconBgClass"
                  >
                    <component 
                      :is="iconComponent" 
                      class="h-6 w-6" 
                      :class="iconClass"
                    />
                  </div>
                  
                  <!-- Content -->
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                      {{ title }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        <slot v-if="$slots.default"></slot>
                        <span v-else>{{ message }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Actions -->
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                <!-- Confirm Button -->
                <button
                  @click="handleConfirm"
                  :disabled="isLoading"
                  class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="confirmButtonClass"
                >
                  <LoadingSpinner 
                    v-if="isLoading" 
                    size="sm" 
                    color="white"
                    class="mr-2"
                  />
                  {{ isLoading ? loadingText : confirmText }}
                </button>
                
                <!-- Cancel Button -->
                <button
                  @click="handleCancel"
                  :disabled="isLoading"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ cancelText }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon 
} from '@heroicons/vue/24/outline'

interface Props {
  show: boolean
  title: string
  message?: string
  type?: 'warning' | 'danger' | 'info' | 'success'
  confirmText?: string
  cancelText?: string
  loadingText?: string
  isLoading?: boolean
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'warning',
  confirmText: 'Bestätigen',
  cancelText: 'Abbrechen',
  loadingText: 'Wird verarbeitet...',
  isLoading: false,
  closeOnBackdrop: true
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

const iconComponent = computed(() => {
  switch (props.type) {
    case 'warning':
      return ExclamationTriangleIcon
    case 'danger':
      return XCircleIcon
    case 'info':
      return InformationCircleIcon
    case 'success':
      return CheckCircleIcon
    default:
      return ExclamationTriangleIcon
  }
})

const iconBgClass = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'bg-yellow-100'
    case 'danger':
      return 'bg-red-100'
    case 'info':
      return 'bg-blue-100'
    case 'success':
      return 'bg-green-100'
    default:
      return 'bg-yellow-100'
  }
})

const iconClass = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'text-yellow-600'
    case 'danger':
      return 'text-red-600'
    case 'info':
      return 'text-blue-600'
    case 'success':
      return 'text-green-600'
    default:
      return 'text-yellow-600'
  }
})

const confirmButtonClass = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
    case 'info':
      return 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
    default:
      return 'bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600'
  }
})

const handleConfirm = () => {
  if (!props.isLoading) {
    emit('confirm')
  }
}

const handleCancel = () => {
  if (!props.isLoading) {
    emit('cancel')
    emit('close')
  }
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop && !props.isLoading) {
    emit('close')
  }
}

// Handle escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.show && !props.isLoading) {
    handleCancel()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>