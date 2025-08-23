<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
      <TransitionGroup
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="transform opacity-100 translate-y-0 sm:translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-y-0 sm:translate-x-0"
        leave-to-class="transform opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
        move-class="transition-transform"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          :class="getToastClasses(toast.type)"
        >
          <div class="p-4">
            <div class="flex items-start">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <component 
                  :is="getIcon(toast.type)" 
                  class="h-6 w-6" 
                  :class="getIconClasses(toast.type)"
                />
              </div>
              
              <!-- Content -->
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium" :class="getTitleClasses(toast.type)">
                  {{ toast.title }}
                </p>
                <p v-if="toast.message" class="mt-1 text-sm" :class="getMessageClasses(toast.type)">
                  {{ toast.message }}
                </p>
                
                <!-- Action Button -->
                <div v-if="toast.actionText && toast.actionHandler" class="mt-3 flex">
                  <button
                    @click="handleAction(toast)"
                    class="rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                    :class="getActionClasses(toast.type)"
                  >
                    {{ toast.actionText }}
                  </button>
                </div>
              </div>
              
              <!-- Close Button -->
              <div class="ml-4 flex flex-shrink-0">
                <button
                  @click="() => remove(toast.id)"
                  class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  :class="getCloseButtonClasses(toast.type)"
                >
                  <span class="sr-only">Schließen</span>
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Toast } from '~/composables/useToast'

const { toasts, remove } = useToast()

const handleAction = (toast: Toast) => {
  if (toast.actionHandler) {
    toast.actionHandler()
  }
  remove(toast.id)
}

const getIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return XCircleIcon
    case 'warning':
      return ExclamationTriangleIcon
    case 'info':
      return InformationCircleIcon
    default:
      return InformationCircleIcon
  }
}

const getToastClasses = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'bg-white'
    case 'error':
      return 'bg-white'
    case 'warning':
      return 'bg-white'
    case 'info':
      return 'bg-white'
    default:
      return 'bg-white'
  }
}

const getIconClasses = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'text-green-400'
    case 'error':
      return 'text-red-400'
    case 'warning':
      return 'text-yellow-400'
    case 'info':
      return 'text-blue-400'
    default:
      return 'text-blue-400'
  }
}

const getTitleClasses = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'text-gray-900'
    case 'error':
      return 'text-gray-900'
    case 'warning':
      return 'text-gray-900'
    case 'info':
      return 'text-gray-900'
    default:
      return 'text-gray-900'
  }
}

const getMessageClasses = (type: Toast['type']) => {
  return 'text-gray-500'
}

const getActionClasses = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'bg-white text-green-600 hover:text-green-500 focus:ring-green-500'
    case 'error':
      return 'bg-white text-red-600 hover:text-red-500 focus:ring-red-500'
    case 'warning':
      return 'bg-white text-yellow-600 hover:text-yellow-500 focus:ring-yellow-500'
    case 'info':
      return 'bg-white text-blue-600 hover:text-blue-500 focus:ring-blue-500'
    default:
      return 'bg-white text-blue-600 hover:text-blue-500 focus:ring-blue-500'
  }
}

const getCloseButtonClasses = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'bg-white text-gray-400 hover:text-gray-500 focus:ring-green-500'
    case 'error':
      return 'bg-white text-gray-400 hover:text-gray-500 focus:ring-red-500'
    case 'warning':
      return 'bg-white text-gray-400 hover:text-gray-500 focus:ring-yellow-500'
    case 'info':
      return 'bg-white text-gray-400 hover:text-gray-500 focus:ring-blue-500'
    default:
      return 'bg-white text-gray-400 hover:text-gray-500 focus:ring-blue-500'
  }
}
</script>