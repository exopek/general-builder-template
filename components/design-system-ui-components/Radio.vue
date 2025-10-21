<template>
  <div class="space-y-3">
    <label
      v-if="label"
      class="block mb-2 font-medium text-gray-700"
      :class="labelSizeClass"
    >
      {{ label }}
      <span v-if="required" class="text-primary ml-1">*</span>
    </label>

    <div
      class="space-y-3"
      :class="inline ? 'flex flex-wrap gap-4' : ''"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="inline-flex items-center"
      >
        <label class="inline-flex items-center cursor-pointer group" :class="disabled ? 'cursor-not-allowed' : ''">
          <div class="relative">
            <input
              :id="`${radioId}-${option.value}`"
              type="radio"
              :name="name || radioId"
              :value="option.value"
              :checked="modelValue === option.value"
              :disabled="disabled || option.disabled"
              :required="required"
              class="peer sr-only"
              @change="handleChange(option.value)"
            />

            <div
              class="border-2 rounded-full transition-all flex items-center justify-center"
              :class="[
                sizeClass,
                disabled || option.disabled
                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                  : modelValue === option.value
                    ? 'bg-white border-primary'
                    : 'bg-white border-gray-300 group-hover:border-primary'
              ]"
            >
              <div
                v-if="modelValue === option.value"
                class="rounded-full bg-primary transition-all"
                :class="dotSizeClass"
              />
            </div>
          </div>

          <span
            class="ml-3 transition-colors"
            :class="[
              disabled || option.disabled ? 'text-gray-400' : 'text-gray-700',
              labelSizeClass
            ]"
          >
            {{ option.label }}
          </span>
        </label>
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
interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  label?: string
  name?: string
  options: Option[]
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  inline?: boolean
  hint?: string
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  required: false,
  inline: false,
  options: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const radioId = computed(() => `radio-${Math.random().toString(36).substr(2, 9)}`)

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizes[props.size]
})

const dotSizeClass = computed(() => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
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

const handleChange = (value: string | number) => {
  if (!props.disabled) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>
