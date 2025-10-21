<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
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
      <span
        v-if="prefixIcon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <component :is="prefixIcon" class="w-5 h-5" />
      </span>

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        class="w-full px-4 py-2.5 border rounded-lg transition-all focus:outline-none focus:ring-2"
        :class="[
          inputSizeClass,
          prefixIcon ? 'pl-11' : '',
          suffixIcon || clearable ? 'pr-11' : '',
          disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900',
          readonly ? 'bg-gray-50' : '',
          error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : 'border-gray-300 focus:ring-primary/30 focus:border-primary'
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <span
        v-if="suffixIcon || (clearable && modelValue)"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        :class="clearable && modelValue ? 'cursor-pointer hover:text-gray-600' : 'pointer-events-none'"
        @click="handleClear"
      >
        <component
          v-if="clearable && modelValue"
          :is="'span'"
          class="w-5 h-5 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </component>
        <component v-else-if="suffixIcon" :is="suffixIcon" class="w-5 h-5" />
      </span>
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
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  prefixIcon?: string
  suffixIcon?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  min?: number
  max?: number
  step?: number
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substring(2, 11)}`)

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const inputSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm py-2',
    md: 'text-base py-2.5',
    lg: 'text-lg py-3'
  }
  return sizes[props.size]
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleClear = () => {
  if (props.clearable && !props.disabled && !props.readonly) {
    emit('update:modelValue', '')
  }
}
</script>
