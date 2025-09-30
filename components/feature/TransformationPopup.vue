<template>
  <div class="container">
    <!-- Trigger Button -->
    <BaseButton
      :text="buttonText"
      :variant="buttonVariant"
      :size="buttonSize"
      :icon="buttonIcon"
      @click="openModal"
    />

    <!-- Modal -->
    <BaseModal
      :show="showModal"
      :max-width="modalMaxWidth"
      :backdrop="modalBackdrop"
      :close-on-backdrop="closeOnBackdrop"
      @close="closeModal"
    >
      <div class="max-h-screen overflow-y-auto">
        <!-- Close Button -->
        <div v-if="showCloseButton" class="flex justify-end p-4 pb-0">
          <button
            @click="closeModal"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Schließen"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Questionnaire Content -->
        <div class="p-6 pt-2">
          <SevenWeekQuestionnaire
            @complete="handleQuestionnaireComplete"
            @step-change="handleStepChange"
          />
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/base/BaseButton.vue'
import BaseModal from '~/components/base/BaseModal.vue'
import SevenWeekQuestionnaire from '~/components/composite/SevenWeekQuestionnaire.vue'

interface UserData {
  age: number | null
  gender: string
  fitness: number
  balance: number
  happiness: number
  pushups: number
  summer: string
  followUp: string
  barriers: string[]
  otherReasons: string
}

interface Props {
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'secondaryFull' | 'ghost' | 'gradient' | 'outline'
  buttonSize?: 'sm' | 'md' | 'lg' | 'xl'
  buttonIcon?: string
  modalMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  modalBackdrop?: 'blur' | 'dark' | 'glass'
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
  autoClose?: boolean
  onComplete?: (data: UserData) => void
  redirectUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: '7-Wochen Challenge starten',
  buttonVariant: 'gradient',
  buttonSize: 'lg',
  modalMaxWidth: '2xl',
  modalBackdrop: 'glass',
  closeOnBackdrop: true,
  showCloseButton: true,
  autoClose: true
})

const emit = defineEmits<{
  open: []
  close: []
  complete: [data: UserData]
  stepChange: [step: number]
}>()

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
  emit('open')
}

const closeModal = () => {
  showModal.value = false
  emit('close')
}

const handleQuestionnaireComplete = (data: UserData) => {
  emit('complete', data)

  if (props.onComplete) {
    props.onComplete(data)
  }

  if (props.autoClose) {
    setTimeout(() => {
      closeModal()

      if (props.redirectUrl) {
        window.location.href = props.redirectUrl
      }
    }, 2500)
  }
}

const handleStepChange = (step: number) => {
  emit('stepChange', step)
}

// Keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showModal.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>