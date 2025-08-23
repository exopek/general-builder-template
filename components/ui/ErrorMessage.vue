<template>
  <div
    v-if="show"
    class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
    :class="[
      size === 'sm' && 'p-3 text-sm',
      size === 'lg' && 'p-6 text-lg',
      dismissible && 'relative pr-12'
    ]"
  >
    <div class="flex items-start">
      <!-- Error Icon -->
      <div class="flex-shrink-0" v-if="showIcon">
        <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      
      <!-- Message Content -->
      <div class="ml-3 flex-1">
        <h3 v-if="title" class="text-sm font-medium mb-1">{{ title }}</h3>
        <div class="text-sm">
          <slot v-if="$slots.default"></slot>
          <p v-else-if="message">{{ message }}</p>
          <ul v-else-if="errors && errors.length" class="list-disc list-inside space-y-1">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      
      <!-- Dismiss Button -->
      <button
        v-if="dismissible"
        @click="dismiss"
        class="absolute top-3 right-3 text-red-400 hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors"
      >
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
  title?: string
  errors?: string[]
  dismissible?: boolean
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  autoHide?: number // Auto hide after X milliseconds
}

const props = withDefaults(defineProps<Props>(), {
  dismissible: false,
  showIcon: true,
  size: 'md',
  autoHide: 0
})

const emit = defineEmits<{
  dismiss: []
}>()

const show = ref(true)

const dismiss = () => {
  show.value = false
  emit('dismiss')
}

// Auto hide functionality
if (props.autoHide > 0) {
  setTimeout(() => {
    dismiss()
  }, props.autoHide)
}
</script>