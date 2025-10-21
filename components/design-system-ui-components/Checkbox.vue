<template>
  <div class="inline-flex items-start">
    <label class="inline-flex items-center cursor-pointer group" :class="disabled ? 'cursor-not-allowed' : ''">
      <div class="relative">
        <input
          :id="checkboxId"
          type="checkbox"
          :checked="isChecked"
          :disabled="disabled"
          :required="required"
          :indeterminate="indeterminate"
          class="peer sr-only"
          @change="handleChange"
        />

        <div
          class="w-5 h-5 border-2 rounded transition-all"
          :class="[
            sizeClass,
            disabled
              ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
              : isChecked || indeterminate
                ? 'bg-primary border-primary'
                : 'bg-white border-gray-300 group-hover:border-primary'
          ]"
        >
          <svg
            v-if="isChecked && !indeterminate"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="white"
            class="w-full h-full"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <svg
            v-else-if="indeterminate"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="white"
            class="w-full h-full"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
          </svg>
        </div>
      </div>

      <span
        v-if="label || $slots.default"
        class="ml-3 transition-colors"
        :class="[
          disabled ? 'text-gray-400' : 'text-gray-700',
          labelSizeClass
        ]"
      >
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean | unknown[]
  value?: unknown
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  required: false,
  indeterminate: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | unknown[]]
  change: [checked: boolean]
}>()

const checkboxId = computed(() => `checkbox-${Math.random().toString(36).substr(2, 9)}`)

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizes[props.size]
})

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    if (checked) {
      newValue.push(props.value)
    } else {
      const index = newValue.indexOf(props.value)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', checked)
  }

  emit('change', checked)
}
</script>
