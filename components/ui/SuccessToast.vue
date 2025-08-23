<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="transform opacity-100 translate-y-0 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 translate-y-0 sm:translate-x-0"
      leave-to-class="transform opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
    >
      <div
        v-if="show"
        class="fixed top-4 right-4 z-50 w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="p-4">
          <div class="flex items-start">
            <!-- Success Icon -->
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <!-- Content -->
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ title }}</p>
              <p v-if="message" class="mt-1 text-sm text-gray-500">{{ message }}</p>
              
              <!-- Action Button -->
              <div v-if="actionText && actionHandler" class="mt-3 flex">
                <button
                  @click="handleAction"
                  class="rounded-md bg-white text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {{ actionText }}
                </button>
              </div>
            </div>
            
            <!-- Close Button -->
            <div class="ml-4 flex flex-shrink-0">
              <button
                @click="dismiss"
                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  title: string
  message?: string
  actionText?: string
  actionHandler?: () => void
  duration?: number // Auto hide after X milliseconds
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000 // 5 seconds default
})

const emit = defineEmits<{
  dismiss: []
  action: []
}>()

const show = ref(true)
let timeoutId: NodeJS.Timeout | null = null

const dismiss = () => {
  show.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  emit('dismiss')
}

const handleAction = () => {
  if (props.actionHandler) {
    props.actionHandler()
  }
  emit('action')
  dismiss()
}

// Auto hide functionality
if (props.duration > 0) {
  timeoutId = setTimeout(() => {
    dismiss()
  }, props.duration)
}

// Clean up timeout on unmount
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>