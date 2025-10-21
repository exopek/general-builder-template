<template>
  <Teleport to="body">
    <div
      class="fixed z-50 flex flex-col gap-3"
      :class="positionClass"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-8"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-start p-4 rounded-lg shadow-lg border backdrop-blur-sm min-w-80"
          :class="getVariantClass(toast.variant)"
        >
          <div class="flex-shrink-0">
            <component :is="getIcon(toast.variant)" class="w-5 h-5" :class="getIconColor(toast.variant)" />
          </div>

          <div class="flex-1 ml-3">
            <h4 v-if="toast.title" class="font-semibold text-sm mb-1">
              {{ toast.title }}
            </h4>
            <p class="text-sm">
              {{ toast.message }}
            </p>
          </div>

          <button
            type="button"
            class="flex-shrink-0 ml-4 hover:opacity-70 transition-opacity"
            @click="removeToast(toast.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Toast {
  id: string
  title?: string
  message: string
  variant: 'info' | 'success' | 'warning' | 'error'
  duration?: number
}

interface Props {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top-right'
})

const toasts = ref<Toast[]>([])

const positionClass = computed(() => {
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  }
  return positions[props.position]
})

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = `toast-${Date.now()}-${Math.random()}`
  const newToast = { ...toast, id }
  toasts.value.push(newToast)

  if (toast.duration !== 0) {
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 3000)
  }
}

const removeToast = (id: string) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const getVariantClass = (variant: Toast['variant']) => {
  const variants = {
    info: 'bg-blue-50/95 border-blue-200 text-blue-900',
    success: 'bg-green-50/95 border-green-200 text-green-900',
    warning: 'bg-yellow-50/95 border-yellow-200 text-yellow-900',
    error: 'bg-red-50/95 border-red-200 text-red-900'
  }
  return variants[variant]
}

const getIconColor = (variant: Toast['variant']) => {
  const colors = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  }
  return colors[variant]
}

const getIcon = (variant: Toast['variant']) => {
  return 'svg'
}

defineExpose({
  addToast,
  removeToast
})
</script>
