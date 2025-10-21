<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block mb-2 font-medium text-gray-700"
      :class="labelSizeClass"
    >
      {{ label }}
      <span v-if="required" class="text-primary ml-1">*</span>
    </label>

    <div
      class="relative border-2 border-dashed rounded-xl transition-all"
      :class="[
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400 cursor-pointer'
      ]"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInputRef"
        type="file"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        class="sr-only"
        @change="handleFileChange"
      />

      <div class="p-8 text-center">
        <div class="mb-4 flex justify-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-gray-400"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
        </div>

        <p class="text-base text-gray-700 mb-2">
          <span class="text-primary font-medium">Click to upload</span>
          or drag and drop
        </p>

        <p class="text-sm text-gray-500">
          {{ hint || `${accept ? `${accept} files` : 'Any file type'}${maxSize ? `, max ${formatBytes(maxSize)}` : ''}` }}
        </p>
      </div>
    </div>

    <div v-if="files.length > 0" class="mt-4 space-y-2">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
      >
        <div class="flex items-center space-x-3 flex-1 min-w-0">
          <div class="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-primary"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
            <p class="text-xs text-gray-500">{{ formatBytes(file.size) }}</p>
          </div>
        </div>

        <button
          type="button"
          class="flex-shrink-0 ml-4 p-1 hover:bg-gray-200 rounded transition-colors"
          @click.stop="removeFile(index)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5 text-gray-400"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <p
      v-if="error"
      class="mt-2 text-sm text-red-500"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  multiple?: boolean
  accept?: string
  maxSize?: number
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  multiple: false,
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:files': [files: File[]]
  change: [files: File[]]
}>()

const fileInputRef = ref<HTMLInputElement>()
const files = ref<File[]>([])
const isDragging = ref(false)

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInputRef.value?.click()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    processFiles(Array.from(target.files))
  }
}

const handleDragOver = () => {
  if (!props.disabled) {
    isDragging.value = true
  }
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  if (!props.disabled && event.dataTransfer?.files) {
    processFiles(Array.from(event.dataTransfer.files))
  }
}

const processFiles = (newFiles: File[]) => {
  if (props.multiple) {
    files.value = [...files.value, ...newFiles]
  } else {
    files.value = [newFiles[0]]
  }

  emit('update:files', files.value)
  emit('change', files.value)
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
  emit('update:files', files.value)
  emit('change', files.value)
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
</script>
