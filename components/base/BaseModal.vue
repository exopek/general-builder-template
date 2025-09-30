<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="handleBackdropClick"
      >
        <div
          class="fixed inset-0"
          :class="backdropClass"
        ></div>

        <div class="flex min-h-screen items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="transform opacity-0 translate-y-4 scale-95"
            enter-to-class="transform opacity-100 translate-y-0 scale-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="transform opacity-100 translate-y-0 scale-100"
            leave-to-class="transform opacity-0 translate-y-4 scale-95"
          >
            <div
              v-if="show"
              class="relative w-full rounded-xl bg-white shadow-2xl"
              :class="[maxWidthClass, contentClass]"
              @click.stop
            >
              <slot />
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  closeOnBackdrop?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  backdrop?: 'blur' | 'dark' | 'glass'
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true,
  maxWidth: 'lg',
  backdrop: 'glass',
  contentClass: ''
})

const emit = defineEmits<{
  close: []
}>()

const backdropClass = computed(() => {
  const backdrops = {
    blur: 'bg-gray-900/50 backdrop-blur-sm',
    dark: 'bg-gray-900/75',
    glass: 'bg-gray-900/25 backdrop-blur-md'
  }
  return backdrops[props.backdrop]
})

const maxWidthClass = computed(() => {
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: 'max-w-full'
  }
  return maxWidths[props.maxWidth]
})

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('close')
  }
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.show) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  if (props.show) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})

watch(() => props.show, (newShow) => {
  if (newShow) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>