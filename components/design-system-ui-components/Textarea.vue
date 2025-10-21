<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="textareaId"
      class="block mb-2 font-medium transition-colors"
      :class="[
        disabled ? 'text-gray-400' : 'text-gray-700',
        labelSizeClass
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-primary ml-1">*</span>
    </label>

    <div class="relative">
      <textarea
        :id="textareaId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :maxlength="maxLength"
        class="w-full px-4 py-2.5 border rounded-lg transition-all focus:outline-none focus:ring-2 resize-none"
        :class="[
          textareaSizeClass,
          disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900',
          readonly ? 'bg-gray-50' : '',
          error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : 'border-gray-300 focus:ring-primary/30 focus:border-primary',
          autoResize ? 'overflow-hidden' : 'overflow-auto'
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div
        v-if="showCount && maxLength"
        class="absolute bottom-3 right-3 text-xs text-gray-400 pointer-events-none"
      >
        {{ characterCount }} / {{ maxLength }}
      </div>
    </div>

    <p
      v-if="error || hint"
      class="mt-2 text-sm transition-colors"
      :class="error ? 'text-red-500' : 'text-gray-500'"
    >
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  rows?: number
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  maxLength?: number
  showCount?: boolean
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  rows: 4,
  disabled: false,
  readonly: false,
  required: false,
  showCount: false,
  autoResize: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const textareaId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)

const characterCount = computed(() => props.modelValue?.length || 0)

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const textareaSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm py-2',
    md: 'text-base py-2.5',
    lg: 'text-lg py-3'
  }
  return sizes[props.size]
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)

  // Auto-resize textarea
  if (props.autoResize) {
    target.style.height = 'auto'
    target.style.height = `${target.scrollHeight}px`
  }
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>
